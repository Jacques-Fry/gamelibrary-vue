<template>
  <div class="UserDetail">
    <div class="user-center">
      <transition name="scale-fade" mode="in-out">
        <div class="user-menu" v-show="detailsMenuShow">
          <div class="user-menu-top">
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
          <div class="user-menu-content"></div>
        </div>
      </transition>
      <transition name="slide-fade" mode="in-out">
        <div class="user-setting" v-show="detailsMenuShow">
          <p>
            <span>
              <i class="iconfont jacques-nicheng"></i>
              <span class="title"> 昵称: </span>
            </span>
            <span>{{ user.nickname }}</span>
          </p>
          <p>
            <span class="title">
              <i class="iconfont jacques-dianhua"></i>
              <span class="title"> 手机: </span>
            </span>
            <span>{{ user.tel }}</span>
          </p>
          <p>
            <span class="title">
              <i class="iconfont jacques-youxiang"></i>
              <span class="title"> 邮箱: </span>
            </span>
            <span>{{ user.email }}</span>
          </p>
          <p>
            <span class="title"
              ><i class="iconfont jacques-shengri"></i> 生日:
            </span>
            <span>{{ user.birthday | timeFormat }}</span>
          </p>
          <p>
            <span class="title"
              ><i class="iconfont jacques-zhuangtai"></i> 账户状态:
            </span>
            <span>
              <el-tag :type="switchUserStatusTag(user.status)">
                {{ user.status | switchUserStatus }}
              </el-tag>
            </span>
          </p>
          <p>
            <span class="title"
              ><i class="iconfont jacques-shijian"></i> 注册时间:
            </span>
            <span>{{ user.createTime | timeFormat }}</span>
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import { getAllRole } from "network/role.js";
import { details, uploadAcatar } from "network/user.js";

import { formatDate } from "common/utils.js";

export default {
  name: "UserDetail",
  components: {},
  data() {
    return {
      detailsMenuShow: false,
      // 角色列表
      roleList: [],
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
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
    this.selectDetails();
  },
  mounted() {
    this.detailsMenuShow = true;
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
    // 查询用户详情
    selectDetails() {
      details().then((res) => {
        if (res.code == 200) {
          this.$store.commit("setUser", res.data);
        }
      });
    },
    // 上传用户头像
    uploadUserAcatar(data) {
      let formData = new FormData();
      formData.append("file", data.file);
      uploadAcatar(formData).then((res) => {
        this.user.avatar = res.data;
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

  display: flex;
  justify-content: center;
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
  height: 210px;
  margin-top: 10px;

  background-color: #fff;
}

.user-setting {
  width: 500px;
  margin-left: 20px;
  padding: 20px;

  background-color: #fff;
}
</style>