<template>
  <div>
    <stageTop @goMenu="goMenu"></stageTop>
    <div id="mf_content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import stageTop from "@/components/indexTop";
export default {
  data() {
    return {};
  },
  components: { stageTop },
  methods: {
    goMenu(obj) {
      var uri = obj.url.split("pages")[1].split(".html")[0];
      this.$router.push({ path: "/backStage" + uri });
    }
  }
};
</script>
<style scoped>
#mf_content {
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  margin-bottom: 10px;
  min-height: 600px;
  width: 80%;
  margin: 0 auto;
}
</style>