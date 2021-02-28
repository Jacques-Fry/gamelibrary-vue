<template>
  <div>
    <el-form
      ref="updForm"
      :model="userInfo"
      slot="show-data"
      label-width="80px"
    >
      <el-form-item
        label="账号"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        prop="username"
      >
        <el-input v-model="userInfo.username" disabled></el-input>
      </el-form-item>

      <el-form-item
        label="昵称"
        :rules="[{ required: true, message: '昵称不能为空' }]"
        prop="nickname"
      >
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>

      <el-form-item
        label="电话"
        :rules="[{ required: true, message: '联系电话不能为空' }]"
        prop="tel"
      >
        <el-input v-model="userInfo.tel"></el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>

      <el-form-item label="生日">
        <el-date-picker
          v-model="userInfo.birthday"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="updateDetails">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { details, uploadAcatar, updDetails } from "network/user.js";

export default {
  name: "UserDetailSetting",
  created() {
    this.selectDetails();
  },
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    // 修改用户信息
    updateDetails() {
      updDetails(this.userInfo).then((res) => {
        if (res && res.code == 200) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        }
      });
    },
    // 上传用户头像
    uploadUserAcatar(data) {
      let formData = new FormData();
      formData.append("file", data.file);
      uploadAcatar(formData).then((res) => {
        this.userInfo.avatar = res.data;
      });
    },
    // 查询用户详情
    selectDetails() {
      details().then((res) => {
        if (res.code == 200) {
          this.userInfo = res.data;
        }
      });
    },
  },
};
</script>

<style>
</style>