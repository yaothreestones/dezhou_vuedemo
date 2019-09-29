
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import router from "./router/index";
import store from "./components/store";
export default {
  name: "App",
  router,
  store
};
</script>

<style>
html,
body {
  margin: 0;
  font-size: 12px !important;
  width: 100%;
  height: 100%;
}
h1,
h2 {
  margin: 0;
}
#app {
  font-family: "微软雅黑", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
  font-size: 13px !important;
  background-color: #e6f8f7;
}
canvas {
  width: 10rem;
}
.el-input input {
  height: 1.6vw !important;
  line-height: 1;
}
.el-input {
  height: 1.6vw !important;
}
.el-input__icon {
  line-height: 1 !important;
}
.tablelist {
  color: #7f8387;
  width: 100%;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 3px;
  border-bottom: 1px solid #e8edf1;
}
.tablelist th,
.tablelist th:last-of-type {
  color: #000;
  padding-right: 0;
  background-color: #e6f8f7;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border-top: 1px solid #dcecf3;
  border-bottom: 1px solid #dcecf3;
}
.bottompage {
  padding: 10px 10px 10px 20px;
  background-color: #ffffff;
  line-height: 25px;
  height: 30px;
  color: #000 !important;
}
.tablelist td {
  height: 40px;
  line-height: 22px;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #e8edf1;
}
.tablelist td {
  padding-right: 0;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f7f8fa;
}
.tablelist td a {
  color: #26becc;
  cursor: pointer;
  font-size: 14px;
}
ul {
  list-style: none
}
</style>
