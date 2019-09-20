<template>
  <div class="body">
    <div class="logindiv" id="logindiv">
      <div class="loginbox">
        <div class="loginlogo"></div>
        <div class="loginbody">
          <div
            style="
    color:  #6dc4b4;
    font-weight: bold;
    margin-top: 40px;
    margin-left: 20px;
    margin-bottom: 30px;
"
          >医疗废物智能化追溯管理系统</div>
          <input
            type="text"
            class="logininput loginname"
            placeholder="账号"
            id="username"
            v-model="username"
          />
          <input
            type="password"
            class="logininput loginpw"
            placeholder="密码"
            id="password"
            v-model="password"
          />
          <div style="
    display:  flex;
    align-items:  center;
    margin: 10px 0 0 20px;
">
            <input
              type="type"
              id="code"
              style="
	outline: none;
    box-sizing:  border-box;
    height: 30px;
    border: 1px solid #E9E9E9;
    width: 128px;
    color: #1D81BB;
    "
            />
            <div id="imgcodebox" style="
    width: 100px;
    height: 30px;
"></div>
          </div>
          <span class="loginbtn" @click="login()">登 录</span>
          <span style="    display: block;
				text-align: center;" class="warntxt"></span>
        </div>
      </div>
    </div>
    <div class="propinfo"></div>
  </div>
</template>
<script>
import Ajax from "@/components/ajax/ajax";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      let parm = {
        username: this.username,
        password: this.password
      };
      if (!this.username || !this.password) {
        return;
      }
      Ajax.login(parm).then(res => {
        if (res.data.code == 200) {
          localStorage.setItem("admin", JSON.stringify(res.data.data));
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("usertype", res.data.data.type);
          localStorage.setItem("instId", res.data.data.instId);
          this.$router.push(`/backStage`);
        } else {
        }
      });
    }
  }
};
</script>
<style>
.body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: url(../assets/img/login/loginbg.jpg) no-repeat center;
  background-size: cover;
}

.logindiv {
  width: 540px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -270px;
  margin-top: -150px;
  border-radius: 5px;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -moz-box;
  display: box;
  box-shadow: 0px 0px 0px 7px #89dfd7;
  -moz-box-shadow: 0px 0px 0px 7px #89dfd7;
  -webkit-box-shadow: 0px 0px 0px 7px #89dfd7;
  background-color: #fff;
  overflow: hidden;
}

.loginlogo {
  width: 270px;
  height: 300px;
  background: #d8fff6 url(../assets/img/login/01.png) no-repeat center;
  background-size: 160px 100px;
}

.loginbox {
  display: flex;
}

.loginbody {
  width: 270px;
}

.logininput {
  height: 30px;
  border: 1px solid #e9e9e9;
  width: 228px;
  padding-left: 40px;
  margin: 10px 0 0 20px;
  color: #1d81bb;
  outline: none;
  box-sizing: border-box;
}

.loginbtn {
  display: inline-block;
  margin-top: 10px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  word-spacing: 1em;
  width: 228px;
  background: #6dc4b4;
  color: #ffffff;
  cursor: pointer;
  margin-left: 20px;
}

.loginbtn:hover {
  background-color: #1d81bb;
}

.loginname {
  background: url(../assets/img/login/login02.png) no-repeat 10px center;
  background-size: 20px;
}

.loginpw {
  background: url(../assets/img/login/login03.png) no-repeat 10px center;
  background-size: 20px;
}

.warntxt {
  color: orangered;
  font-size: 12px;
}
</style>