<template>
  <div>
    <transition name="slide-fade" mode="in-out">
      <div class="content" v-show="contentShow">
        <div class="content-title iconfont jacques-anquanshezhi1">安全设置</div>
        <el-divider></el-divider>

        <el-divider content-position="left">修改密码</el-divider>

        <el-form
          ref="updForm"
          :model="passwordData"
          slot="show-data"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="新密码" prop="password">
            <el-input v-model="passwordData.password" show-password />
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass" show-password>
            <el-input v-model="passwordData.checkPass" show-password />
          </el-form-item>

          <el-form-item>
            <el-button
              type="warning"
              @click="updatePassword"
              :loading="loadingUplaod"
              >保存修改</el-button
            >
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
      </div>
    </transition>
  </div>
</template>

<script>
import { updPassword } from "network/user.js";

export default {
  name: "UserSercuritySetting",
  data() {
    return {
      // 密码提交数据
      passwordData: {
        password: "",
        checkPass: "",
      },
      contentShow: false,
      regulars: {
        password: new RegExp("^$|[a-zA-Z0-9]{6,32}"),
      },
      // 表单验证规则
      rules: {
        password: [
          {
            validator: this.validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            validator: this.validatePass2,
            trigger: "blur",
          },
        ],
      },
      // 加载按钮
      loadingUplaod: false,
    };
  },
  mounted() {
    this.contentShow = true;
  },
  methods: {
    // 修改密码
    updatePassword() {
      this.$refs.updForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        this.loadingUplaod = true;
        updPassword(this.passwordData.password).then((res) => {
          if (res && res.code == 200) {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success",
            });
            this.$refs.updForm.resetFields();
          }

          this.loadingUplaod = false;
        });
      });
    },
    validatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!this.regulars.password.test(value)) {
        callback(new Error("请输入6-32位英文或数字的字符"));
      } else {
        if (this.passwordData.checkPass !== "") {
          this.$refs.updForm.validateField("checkPass");
        }
        callback();
      }
    },
    validatePass2(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (!this.regulars.password.test(value)) {
        callback(new Error("请输入6-32位英文或数字的字符"));
      } else if (value !== this.passwordData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
  },
};
</script>

<style scoped>
.content {
  width: 500px;
  margin-left: 20px;
  padding: 20px;

  background-color: #fff;
}

.content-title {
  font-size: 20px;
  font-weight: bold;

  color: #505050;
}
</style>