<template>
  <div>
    <el-form
      ref="updForm"
      :model="passwordData"
      slot="show-data"
      label-width="80px"
    >
      <el-form-item
        label="密码"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        prop="password"
      >
        <el-input v-model="passwordData.password"></el-input>
      </el-form-item>

      <el-form-item
        label="确认密码"
        :rules="[{ required: true, message: '昵称不能为空' }]"
        prop="password2"
      >
        <el-input v-model="passwordData.password2"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="warning">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserSercuritySetting",
  data() {
    return {
      passwordData: {
        password: "",
        password2: "",
      },
    };
  },
};
</script>

<style>
</style>