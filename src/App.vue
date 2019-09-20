
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import router from './router/index'
import store from './components/store'
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
</style>
