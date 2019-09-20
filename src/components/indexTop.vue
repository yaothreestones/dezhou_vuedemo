<template>
  <div id="indexpage">
    <div id="mf_body">
      <div id="mf_left" class="iof_left">
        <div id="mf_left_logo">
          <img src="@/assets/img/index/title.png" style="height: 40px;margin: 25px 0 0;" />
        </div>
        <div
          style="display:flex;width: 80%;margin: auto;    background: linear-gradient(#36c7d5,#079fad);"
          id="menuNavigate"
        >
          <div class="iof_nav_parent" v-for="(item,index) in menuLists" :key="index">
            <div class="iof_nav_parentName" @click="goMenu(item.url,item.id,item.name)">{{item.name}}</div>
          </div>
        </div>
        <div id="iof_position">
          <span class="nowposition">当前位置：{{location}}</span>
          <span id="nowposition"></span>
        </div>
        <div class="iof_userinfo">{{username}}</div>
        <div class="iof_logout logouticon" @click="logout()">退出</div>
      </div>
      <div id="mf_right">
        <div class="maplist mapicon" style="display:none"></div>
        <div id="mf_content"></div>
      </div>
    </div>
    <div class="mf_mask">
      <iframe
        style="position: absolute; z-index: -1; width: 100%; height: 100%; top: 0; left: 0;scrolling:no;"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>
<script>
import Ajax from "@/components/ajax/ajax";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      username: JSON.parse(localStorage.getItem("admin")).realName,
      menuLists: [],
      location:''
    };
  },
  methods: {
    logout() {
      Ajax.logout({}).then(res => {
        if (res.data.code == 200) {
          this.$router.push({ name: "login" });
        }
      });
    },
    menuNavigate() {
      Ajax.menuNavigate({}).then(res => {
        this.menuLists = res.data.data;
        this.$store.dispatch("addFun", this.menuLists);
      });
    },
    goMenu(url, id,name) {
      this.$emit("goMenu", { url, id });
      this.location = name
    }
  },
  created() {},
  computed: {},
  mounted() {
    this.menuNavigate();
  }
};
</script>
<style scoped>
#mf_left_logo {
  text-align: center;
  background: url(../assets/img/index/background.png) no-repeat 100% 100%;
  height: 96px;
}
#iof_position {
  height: 35px;
  background: #fff;
  margin-bottom: 14px;
  width: 80%;
  margin: 0 auto 14px auto;
}
.nowposition {
  color: #999999;
  display: inline-block;
  line-height: 33px;
  margin-left: 50px;
}
#nowposition {
  display: inline-block;
  color: #86ccbf;
}
.iof_userinfo {
  font-size: 12px;
  position: absolute;
  right: 90px;
  top: 20px;
  height: 50px;
  line-height: 50px;
}
.iof_updatepwd,
.iof_logout {
  font-size: 12px;
  height: 50px;
  line-height: 50px;
  position: absolute;
  right: 72px;
  top: 20px;
  padding: 0 25px;
  cursor: pointer;
}
.logouticon {
  background: url(../assets/img/index/015.png) no-repeat scroll 0px 15px;
  background-size: 20px 20px;
}
.iof_logout {
  right: 0;
}
.iof_left {
  color: #fff;
}
.iof_nav_parent.active {
  background: #019aaa;
  border-top: 1px solid #43b3c0;
  border-right: 1px solid #008594;
  border-left: 1px solid #008594;
}
.iof_nav_parent {
  position: relative;
  color: #fff;
  border-top: 1px solid #69d2df;
  width: 8vw;
  box-sizing: border-box;
  height: 33px;
}
.iof_nav_parentName {
  height: 33px;
  line-height: 33px;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
  font-size: 12px;
  letter-spacing: 0.2em;
  background-size: 25px;
}
#indexpage {
  background-color: #e6f8f7;
}
</style>