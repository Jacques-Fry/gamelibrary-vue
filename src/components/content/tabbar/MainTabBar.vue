<template>
  <TabBar>
    <div class="tab-bar-left" slot="tab-bar-left">资料库</div>
    <div slot="tab-bar-center">
      <!-- 菜单 -->
      <el-menu
        ref="menu"
        mode="horizontal"
        background-color="#34373C"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :default-active="defaultActive"
      >
        <el-submenu index="userManager">
          <template slot="title">用户管理</template>
          <el-menu-item index="/user">用户</el-menu-item>
          <el-menu-item index="/role">角色</el-menu-item>
          <el-menu-item index="/permission">权限</el-menu-item>
        </el-submenu>
        <el-submenu index="logManager">
          <template slot="title">日志记录</template>
          <el-menu-item index="/log">操作记录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- 用户菜单 -->
    <div class="tab-bar-right" slot="tab-bar-right">
      <el-menu
        mode="horizontal"
        background-color="#34373C"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="user-menu"
        router
        :default-active="defaultActive"
      >
        <el-submenu index="2">
          <template slot="title">
            <el-avatar
              v-if="user.avatar"
              :src="user.avatar"
            ></el-avatar>
            <el-avatar v-else class="user-head-portrait">管理</el-avatar>
            <span>{{ user.nickname }}</span>
          </template>
          <el-menu-item index="/detail">个人中心</el-menu-item>
          <el-menu-item index="2-2">切换账号</el-menu-item>
          <el-menu-item index="2-3" @click.native="loginOut"
            >退出登录</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
  </TabBar>
</template>

<script type="text/javascript">
import TabBar from "components/common/tabbar/TabBar";

import { mapGetters } from "vuex";

import { logout } from "network/user.js";
export default {
  name: "MainTabBar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
    defaultActive() {
      return this.$route.path;
    },
  },
  components: {
    TabBar,
  },
  methods: {
    // 退出登录
    loginOut() {
      logout().then((res) => {
        localStorage.clear();
        this.$store.commit("setToken", "");
        this.$bus.$emit("toLogin");
      });
    },
  },
};
</script>

<style scoped>
.tab-bar-left {
  padding: 0 20px;
  font-size: 30px;
  font-weight: 600;
}

.user-head-portrait {
  vertical-align: middle;
}
.user-name {
  cursor: pointer;

  margin-left: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-dropdown-item {
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
