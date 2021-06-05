<template>
  <div name="UserDetailSetting">
    <transition name="slide-fade" mode="in-out">
      <div class="content" v-show="contentShow">
        <div class="content-title iconfont jacques-gerenshezhi">个人设置</div>
        <el-divider></el-divider>
        <el-form
          ref="updForm"
          :model="userInfo"
          slot="show-data"
          label-width="80px"
        >
          <el-form-item class="atatar">
            <div>
              <!-- 头像 -->
              <el-avatar
                :size="80"
                v-if="userInfo.avatar"
                :src="userInfo.avatar"
              ></el-avatar>
              <el-avatar :size="80" v-else class="user-head-portrait"
                >暂无头像</el-avatar
              >
            </div>
            <div>
              <el-upload
                action=""
                class="avatar-uploader"
                :show-file-list="false"
                accept="image/jpeg,image/png,image/gif"
                multiple
                :http-request="uploadUserAcatar"
              >
                <el-button size="small">更换头像</el-button>
              </el-upload>
            </div>
          </el-form-item>

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
            <el-button
              type="warning"
              @click="updateDetails"
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
import { details, uploadAcatar, updDetails, updAvatar } from "network/user.js";

export default {
  name: "UserDetailSetting",
  created() {
    this.selectDetails();
  },
  data() {
    return {
      userInfo: {},
      contentShow: false,

      // 加载按钮
      loadingUplaod: false,
    };
  },
  mounted() {
    this.contentShow = true;
  },
  methods: {
    // 修改用户信息
    updateDetails() {
      this.$refs.updForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        this.loadingUplaod = true;
        updDetails(this.userInfo).then((res) => {
          if (res && res.code == 200) {
            this.$message({
              showClose: true,
              message: "设置成功",
              type: "success",
            });
          }
          this.loadingUplaod = false;
          // 更新用户信息
          selectDetails()
        });
      });
    },
    // 上传用户头像
    uploadUserAcatar(data) {
      let formData = new FormData();
      formData.append("file", data.file);
      uploadAcatar(formData).then((res) => {
        if (res && res.code == 2000) {
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success",
          });
          this.userInfo.avatar = res.data;
        }
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

.atatar {
  line-height: 60px;

  vertical-align: middle;
}
</style>