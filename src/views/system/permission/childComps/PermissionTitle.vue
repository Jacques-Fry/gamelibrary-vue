<template>
  <div class="PermissionTitle">
    <div class="search-option">
      <div >
        <el-input size="mini" v-model="permission.name" clearable placeholder="权限名称"></el-input>
      </div>

      <div>
        <el-input size="mini" v-model="permission.nickname" clearable placeholder="权限别称"></el-input>
      </div>

       <div>
        <el-input size="mini" v-model="permission.type" clearable placeholder="权限类型"></el-input>
      </div>

      <div >
        <el-button
          :loading="loading"
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="queryData"
        >搜索</el-button>
      </div>
    </div>

    <!-- 功能栏 -->
    <div class="action-option">
       <el-row :gutter="10" type="flex" class="row-bg">
        <el-col :span="1.5">
          <el-button size="mini" type="success" class="iconfont jacques--tainjia" @click="addPermission">
            添加权限</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "PermissionTitle",
  props: {
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      permission: {
        name: "",
        nickname: "",
        type:""
      }
    };
  },
  methods: {
    queryData() {
      this.$emit("searchDataList",this.permission);
    },
    addPermission(){
       this.$emit("addPermission");
    }
  }
};
</script>
<style scoped>
.PermissionTitle {
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

.search-option div {
  margin-right: 10px;
}
</style>