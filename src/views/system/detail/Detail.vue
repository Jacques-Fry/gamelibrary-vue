<template>
  <div class="UserDetail">
    <div class="user-center">
      <div class="user-menu">
        <transition name="scale-fade" mode="in-out">
          <div class="user-menu-top" v-show="detailsMenuShow">
            <div>
              <!-- 头像 -->
              <el-avatar
                :size="60"
                v-if="user.avatar"
                :src="user.avatar"
                class="atatar"
              ></el-avatar>
              <el-avatar :size="60" v-else class="user-head-portrait"
                >暂无头像</el-avatar
              >
            </div>
            <!-- 昵称 -->
            <div class="user-menu-top-username">
              {{ user.nickname }}
            </div>
            <!-- 角色 -->
            <div class="user-menu-top-roleName">
              <el-tag :type="switchUserRoleTag(roleName)">
                {{ roleName }}
              </el-tag>
            </div>
          </div>
        </transition>

        <transition name="scale-fade" mode="in-out">
          <!-- 菜单内容 -->
          <div class="user-menu-content" v-show="detailsMenuShow">
            <el-row>
              <el-col>
                <el-menu
                mode="vertical"
                  row="userSettingMenu"
                  router
                  :default-active="defaultActive"
                  active-background-color="#d4d4d4"
                  text-color="#000"
                  active-text-color="#409eff"
                >
                  <el-menu-item index="/detail/userdetailsetting">
                    <span>个人设置</span>
                  </el-menu-item>
                  <el-menu-item index="/detail/usersercuritysetting">
                    <span>安全设置</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </transition>
      </div>

      <!-- 内容 -->
      <transition name="slide-fade" mode="in-out">
        <div class="user-setting" v-show="detailsMenuContentShow">
          <div class="user-setting-title">个人设置</div>
          <el-divider></el-divider>
          <router-view />
          <el-divider></el-divider>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import { getAllRole } from "network/role.js";

import { formatDate } from "common/utils.js";

import UserDetailSetting from "./childComps/UserDetailSetting";

export default {
  name: "UserDetail",
  components: { UserDetailSetting },
  data() {
    return {
      detailsMenuShow: false,
      detailsMenuContentShow: false,
      // 角色列表
      roleList: [],
      userInfo: {},
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
    // 当前激活菜单
    defaultActive() {
      return this.$route.path;
    },
    roleName() {
      const data = this.roleList.find((item) => {
        return item.id == this.user.roleId;
      });
      return data ? data.nickname : "未知角色";
    },
  },
  created() {
    this.$store.commit("setBreadcrumbList", []);

    this.selectAllRole();
  },
  mounted() {
    this.detailsMenuShow = true;
    this.detailsMenuContentShow = true;
  },
  methods: {
    // 查询所有角色列表
    selectAllRole() {
      getAllRole().then((res) => {
        if (res && res.code == 200) {
          this.roleList = res.data;
        }
      });
    },
    // 转换用户状态标签
    switchUserStatusTag(value) {
      return value == 0 ? "success" : "danger";
    },
    // 转换用户角色标签
    switchUserRoleTag(value) {
      return value == "超级管理员"
        ? "danger"
        : value == "管理员"
        ? "warning"
        : "info";
    },
  },
  filters: {
    //日期格式化
    timeFormat(value) {
      if (value) {
        return formatDate(new Date(value), "yyyy年MM月dd日");
      } else {
        return value;
      }
    },
    // 转换用户状态数据
    switchUserStatus(value) {
      return value == 0 ? "正常" : value == 1 ? "已冻结" : "未知状态";
    },
  },
};
</script>
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
.UserDetail {
  position: relative;
  width: 100%;
  height: 100%;
}

.user-center {
  margin-top: 50px;
  width: 860px;
  display: flex;
  position: relative;
  margin-left: 50%;
  right: 430px;
}

.user-menu {
  width: 300px;
}
.user-menu-top {
  height: 80px;
  line-height: 80px;
  padding: 10px 10px;

  display: flex;
  text-align: center;
  vertical-align: middle;

  background-color: #fff;
}
.user-menu-top-username {
  height: 60px;
  line-height: 60px;
  margin-left: 10px;
}

.user-menu-top-roleName {
  height: 60px;
  line-height: 60px;
  margin-left: 10px;
}

.user-menu-content {
  margin-top: 10px;

  background-color: #fff;
}

.user-setting {
  width: 500px;
  margin-left: 20px;
  padding: 20px;

  background-color: #fff;
}

.user-setting-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
