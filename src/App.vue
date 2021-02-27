<template>
  <div id="app">
    <MainLayout  v-if="isLogin" />
    <router-view  v-else />
  </div>
</template>

<script>
import MainLayout from "components/content/layout/MainLayout";

import { details } from "network/user.js";

import { mapGetters } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapGetters(["isLogin"]),
    isOtherPage() {
      const otherPage = ["/login"];
      return otherPage.find((item) => item == this.$route.path);
    },
  },
  mounted() {
    this.$bus.$on("toLogin", () => {
      this.$router.push("/login");
    });
  },
  components: {
    MainLayout,
  },
  created() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$message.error("未登录,请先登录");
      this.$router.push("/login");
    } else {
      this.$store.commit("setToken", token);
      //获取用户数据
      details().then((res) => {
        this.$store.commit("setUser", res.data);
        this.$notify({
          showClose: true,
          title: "欢迎回来 " + res.data.nickname,
          type: "success",
        });
      });
    }
  },
};
</script>

<style>
@import "assets/css/animation.css";
@import "assets/css/base.css";
@import "assets/css/normalize.css";
@import "assets/icon/iconfont.css";
</style>
<style scoped>
#app {
  min-width: 1250px;
}
</style>
