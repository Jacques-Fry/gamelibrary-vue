<template>
  <div class="UserTitle">

    <!-- 搜索栏 -->
    <div class="search-option">
      <div>
        <el-input
          size="mini"
          v-model="user.username"
          clearable
          placeholder="用户名"
        ></el-input>
      </div>

      <div>
        <el-input
          size="mini"
          v-model="user.nickname"
          clearable
          placeholder="昵称"
        ></el-input>
      </div>

      <div>
        <el-input
          size="mini"
          v-model="user.tel"
          clearable
          placeholder="手机号"
        ></el-input>
      </div>

      <div>
        <el-select size="mini" v-model="user.roleId" placeholder="用户类型">
          <el-option label="全部角色" :value="null"></el-option>
          <el-option
            v-for="(item, index) in roleList"
            :key="'role' + index"
            :label="item.nickname"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <div class="option-search">
        <el-button
          :loading="loading"
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="queryData"
          >搜索</el-button
        >
      </div>
    </div>

    <!-- 功能栏 -->
    <div class="action-option">
      <el-row :gutter="10" type="flex" class="row-bg">
        <el-col :span="1.5">
          <el-button size="mini" type="danger" class="iconfont jacques-dongjie">
            冻结</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button
            size="mini"
            class="iconfont jacques-zujian-icon-14"
            @click="showImportUserDataDialog"
          >
            导入</el-button
          >
        </el-col>

        <el-col :span="1.5" label="right">
          <el-button
            size="mini"
            class="iconfont jacques-zujian-icon-13"
            @click="this.exportData"
          >
            导出</el-button
          >
        </el-col>
      </el-row>
    </div>

    <!-- 弹窗 -->
    <MessageBox ref="importUserDataDialog" title="导入用户数据">
      <div slot="show-data" class="import-user-data-dialog">
        <el-upload
          action
          drag
          multiple
          ref="importUserDataFile"
          :auto-upload="true"
          :http-request="uploadFile"
          :disabled="uplaodDisabled"
          :before-upload="beforeUpload"
          :on-success="fileChange"
          :on-error="fileChange"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传xlsx文件，且不超过500kb
          </div>
        </el-upload>
      </div>

      <!-- <span slot="show-footer">
        <el-button
          size="small"
          type="warning"
          @click="submitFile"
          :loading="loadingUplaod"
        >
          确认上传</el-button
        >
      </span> -->
    </MessageBox>
  </div>
</template>
<script>
import MessageBox from "components/content/message/MessageBox.vue";

export default {
  name: "UserTitle",
  props: {
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    roleList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      user: {
        username: "",
        nickname:"",
        tel: "",
        roleId: null,
      },
      loadingUplaod: false,
      uplaodDisabled: false,
    };
  },
  components: {
    MessageBox,
  },
  methods: {
    // 查询数据
    queryData() {
      this.$emit("searchDataList", this.user);
    },
    // 导出数据
    exportData() {
      this.$emit("exportData");
    },
    // 导入数据
    showImportUserDataDialog() {
      this.$refs.importUserDataDialog.show = true;
    },
    // 手动提交文件
    submitFile() {
      this.$refs.importUserDataFile.submit();
    },
    // 文件上传前
    beforeUpload() {
      console.log("开始上传文件");
      this.uplaodDisabled = true;
    },
    // 文件上传成功后
    // 文件上传失败后
    fileChange() {
      console.log("文件上传结束");
      this.uplaodDisabled = false;
    },
    // 上传文件处理逻辑
    uploadFile(data) {
      let formData = new FormData();
      formData.append("file", data.file);
      this.$emit("importUserData", formData);
      console.log("文件上传结束");
      this.uplaodDisabled = false;
      return true;
    },
  },
};
</script>
<style scoped>
.UserTitle {
  margin: 10px 0;
}

.search-option {
  position: relative;
  width: 100%;
  display: flex;
  height: 30px;
}
.search-option div {
  margin-right: 10px;
}

.action-option {
  margin-top: 10px;
  width: 100%;
  height: 30px;
}

.import-user-data-dialog {
  text-align: center;
}
</style>