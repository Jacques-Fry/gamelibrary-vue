<template>
  <div class="UserDetail">
    <div>
      <el-upload
        action=""
        class="avatar-uploader"
        :show-file-list="false"
        accept="image/jpeg,image/png,image/gif"
        multiple
        :http-request="uploadUserAcatar"
      >
        <el-avatar
          :size="80"
          v-if="user.avatar"
          :src="user.avatar"
          class="atatar"
        ></el-avatar>
        <el-avatar :size="80" v-else class="user-head-portrait"
          >暂无头像</el-avatar
        >
      </el-upload>
    </div>

    <div>
      <p>
        <span>
          <i class="iconfont jacques-nicheng"></i>
          <span class="title"> 昵称:</span>
        </span>
        <span>{{ user.nickname }}</span>
      </p>
      <p>
        <span class="title">
          <i class="iconfont jacques-shengri"></i>
          <span class="title">手机:</span>
        </span>
        <span>{{ user.tel }}</span>
      </p>
      <p>
        <span class="title">
          <i class="iconfont jacques-youxiang"></i>
          <span class="title">邮箱: </span>
        </span>
        <span>{{ user.email }}</span>
      </p>
      <p>
        <span class="title"
          ><i class="iconfont jacques-shengri"></i> 生日:</span
        >
        <span>{{ user.birthday | timeFormat }}</span>
      </p>
      <p>
        <span class="title"><i class="iconfont jacques-jiaose"></i> 角色:</span>
        <span>{{ user.roleName }}</span>
      </p>
      <p>
        <span class="title"
          ><i class="iconfont jacques-zhuangtai"></i> 账户状态:</span
        >
        <span>{{ user.statusName }}</span>
      </p>
      <p>
        <span class="title"
          ><i class="iconfont jacques-shijian"></i> 注册时间:</span
        >
        <span>{{ user.createTime | timeFormat }}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import { details, uploadAcatar } from "network/user.js";

import { formatDate } from "common/utils.js";

export default {
  name: "UserDetail",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  created() {
    let breadcrumbList = [
      {
        name: "个人中心",
        url: "/detail",
      },
    ];
    this.$store.commit("setBreadcrumbList", breadcrumbList);

    this.selectDetails();
  },
  methods: {
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
  },
};
</script>
<style scoped>
.title {
  /* font-weight: 600; */
}
</style>