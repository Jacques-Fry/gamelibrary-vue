<template>
  <div class="PermissionContent">
    <PermissionTitle
      @searchDataList="searchDataList"
      :loading="loading"
      @addPermission="showAddDialog"
    />

    <Table
      class="Table"
      :titles="titles"
      :columns="columns"
      :dataList="dataList"
      @showData="showDialog"
      @updData="showUpdDailog"
      @delData="deletePermissionData"
    />

    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 详情弹窗 -->
    <MessageBox title="权限详情" ref="showDialog">
      <table class="deatils-table" slot="show-data">
        <tr>
          <th>权限名称</th>
          <td>{{ permissionInfo.name }}</td>
        </tr>
        <tr>
          <th>权限别称</th>
          <td>{{ permissionInfo.nickname }}</td>
        </tr>
        <tr>
          <th>访问路径</th>
          <td>{{ permissionInfo.url }}</td>
        </tr>
        <tr>
          <th>权限类型</th>
          <td>{{ permissionInfo.type }}</td>
        </tr>
      </table>
      <span slot="show-footer"> </span>
    </MessageBox>

    <!-- 修改信息弹窗 -->
    <MessageBox title="修改权限信息" ref="updDialog">
      <el-form
        ref="updForm"
        :model="permissionInfo"
        slot="show-data"
        label-width="80px"
      >
        <el-form-item
          label="权限名称"
          prop="name"
          :rules="[{ required: true, message: '权限名称不能为空' }]"
        >
          <el-input v-model="permissionInfo.name"></el-input>
        </el-form-item>

        <el-form-item
          label="权限别称"
          prop="nickname"
          :rules="[{ required: true, message: '权限别称不能为空' }]"
        >
          <el-input v-model="permissionInfo.nickname"></el-input>
        </el-form-item>

        <el-form-item
          label="访问路径"
          prop="url"
          :rules="[{ required: true, message: '访问路径不能为空' }]"
        >
          <el-input v-model="permissionInfo.url"></el-input>
        </el-form-item>

        <el-form-item
          label="权限类型"
          prop="type"
          :rules="[{ required: true, message: '权限类型不能为空' }]"
        >
          <el-input v-model="permissionInfo.type"></el-input>
        </el-form-item>
      </el-form>

      <span slot="show-footer">
        <el-button size="small" type="warning" @click="updatePermissionData"
          >保存修改</el-button
        >
      </span>
    </MessageBox>
    <!-- 添加信息弹窗 -->
    <MessageBox title="新增权限" ref="addDialog">
      <el-form
        ref="addForm"
        :model="permissionAddData"
        slot="show-data"
        label-width="80px"
      >
        <el-form-item
          label="权限名称"
          prop="name"
          :rules="[{ required: true, message: '权限名称不能为空' }]"
        >
          <el-input v-model="permissionAddData.name"></el-input>
        </el-form-item>

        <el-form-item
          label="权限别称"
          prop="nickname"
          :rules="[{ required: true, message: '权限别称不能为空' }]"
        >
          <el-input v-model="permissionAddData.nickname"></el-input>
        </el-form-item>

        <el-form-item
          label="访问路径"
          prop="url"
          :rules="[{ required: true, message: '访问路径不能为空' }]"
        >
          <el-input v-model="permissionAddData.url"></el-input>
        </el-form-item>

        <el-form-item
          label="权限类型"
          prop="type"
          :rules="[{ required: true, message: '权限类型不能为空' }]"
        >
          <el-input v-model="permissionAddData.type"></el-input>
        </el-form-item>
      </el-form>

      <span slot="show-footer">
        <el-button size="small" @click="resetForm('addForm')">重置</el-button>
        <el-button size="small" type="warning" @click="addPermissionData"
          >保存数据</el-button
        >
      </span>
    </MessageBox>
  </div>
</template>
<script>
import PermissionTitle from "./PermissionTitle.vue";

import MessageBox from "components/content/message/MessageBox.vue";
import Table from "components/common/table/Table.vue";

import {
  queryPermissionList,
  selectPermissionDetails,
  addPermissionData,
  updPermissionData,
  delPermissionData,
} from "network/permission.js";

import { CommonDataListContent } from "common/mixins.js";

export default {
  name: "PermissionContent",
  data() {
    return {
      titles: [
        { name: "权限名称" },
        { name: "权限别称" },
        { name: "访问路径" },
        { name: "权限类型" },
      ],
      columns: [
        { name: "name", styleEnable: false },
        { name: "nickname", styleEnable: false },
        {
          name: "url",
          styleEnable: true,
          style: {
            default: {
              begin: `<i class="iconfont jacques-URLguanli"></i>`,
              end: ``,
            },
          },
        },
        { name: "type", styleEnable: false },
      ],
      searchData: {
        name: "",
        nickname: "",
        type: "",
      },
      permissionInfo: { id: 0, url: "", name: "", nickname: "", type: "" },
      permissionAddData: { url: "", name: "", nickname: "", type: "" },
    };
  },
  components: { PermissionTitle, Table, MessageBox },
  created() {
    this.queryDataList();
  },
  methods: {
    // 删除权限
    deletePermissionData(id) {
      this.$msgbox({
        title: "消息",
        message: "删除该权限将同时清除与角色的绑定信息,是否确认删除?",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            delPermissionData(id).then((res) => {
              if (res && res.code == 200) {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success",
                });
                done();
              }
              instance.confirmButtonLoading = false;
              instance.confirmButtonText = "确定";
            });
          } else {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
            done();
          }
        },
      })
        .then((action) => {
          this.queryDataList();
        })
        .catch((err) => {});
    },
    // 添加数据
    addPermissionData() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        addPermissionData(this.permissionAddData).then((res) => {
          if (res && res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });

            this.$refs.addDialog.show = false;
            this.permissionAddData = {};
            this.queryDataList();
          }
        });
      });
    },
    // 修改数据
    updatePermissionData() {
      this.$refs.updForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        updPermissionData(this.permissionInfo).then((res) => {
          if (res && res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
          }
        });
      });
    },
    // 查询详情
    selectDetails(id) {
      this.permissionInfo = {};
      selectPermissionDetails(id).then((res) => {
        if (res.code == 200) {
          this.permissionInfo = res.data;
        }
      });
    },
    // 分页查询权限列表
    queryDataList() {
      let loadingInstance = this.pageLoading();
      queryPermissionList(
        this.searchData,
        this.currentPage,
        this.pageSize
      ).then((res) => {
        this.pageStopLoading(loadingInstance);
        if (res && res.code === 200) {
          this.total = res.data.total;
          let list = res.data.data;
          list.forEach((item) => {
            item.isCheck = false;
          });
          this.dataList = list;
        }
      });
    },
    // 条件搜索权限列表
    searchDataList(data) {
      this.searchData = data;
      this.queryDataList();
    },
    // 弹出详情
    showDialog(id) {
      this.selectDetails(id);
      this.$refs.showDialog.show = true;
    },
    // 弹出修改窗口
    showUpdDailog(id) {
      this.selectDetails(id);
      this.$refs.updDialog.show = true;
    },
    // 弹出添加窗口
    showAddDialog() {
      this.$refs.addDialog.show = true;
    },
    // 重置表单数据
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mixins: [CommonDataListContent],
};
</script>
<style scoped>
.PermissionContent {
  position: relative;
  height: 100%;
}
.Table {
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  height: calc(100% - 138px);
}
.paging {
  text-align: center;
  margin-left: 10px;
  padding-top: 20px;

  width: 100%;
  height: 50px;
  background-color: #fff;
}

.deatils-table {
  width: 100%;
}
.deatils-table tr {
  line-height: 20px;
}
.deatils-table tr th {
  width: 50%;
  text-align: right;
  padding-right: 10px;
}
.deatils-table tr td {
  text-align: left;
  padding-left: 10px;
}
</style>