<template>
  <main class="UserContent" ref="UserContent" id="UserContent">
    <UserTitle
      @searchDataList="searchDataList"
      @exportData="exportData"
      @importUserData="importUserData"
      :roleList="roleList"
      :loading="loading"
    />

    <Table
      class="Table"
      :titles="titles"
      :columns="columns"
      :dataList="dataList"
      @showMessageBox="showMessageBox"
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

    <MessageBox title="用户详情" ref="detailsDialog">
      <table class="deatils-table" slot="show-data">
        <tr>
          <th>用户名</th>
          <td>{{ userInfo.username }}</td>
        </tr>
        <tr>
          <th>联系电话</th>
          <td>{{ userInfo.tel }}</td>
        </tr>
        <tr>
          <th>账户状态</th>
          <td>{{ userInfo.status }}</td>
        </tr>
        <tr>
          <th>角色权限</th>
          <td>{{ userInfo.roleId }}</td>
        </tr>
        <tr>
          <th>注册时间</th>
          <td>{{ userInfo.createTime }}</td>
        </tr>
      </table>
      <span slot="show-footer">
        <el-button size="small" type="warning">修 改</el-button>
      </span>
    </MessageBox>
  </main>
</template>
<script>
import UserTitle from "./UserTitle.vue";

import Table from "components/common/bootstrap/table/Table.vue";
import MessageBox from "components/content/message/MessageBox.vue";

import { queryUserList, selectUserById, exportData } from "network/user.js";
import { getAllRole } from "network/role.js";

import { CommonDataListContent } from "common/mixins.js";
import { download } from "common/utils.js";
import { uploadFile } from "network/common.js";
export default {
  name: "UserContent",
  data() {
    return {
      // 表格头
      titles: [
        {
          name: "用户名",
        },
        {
          name: "手机号",
        },
        {
          name: "账户状态",
        },
        { name: "角色权限" },
        {
          name: "注册时间",
        },
      ],
      // 表格展示字段
      columns: [
        {
          name: "username",
          styleEnable: true,
          style: {
            default: {
              begin: ``,
              end: ``,
            },
          },
        },
        {
          name: "tel",
          styleEnable: true,
          style: {
            default: {
              begin: `<i class="iconfont jacques-dianhua"></i> `,
              end: ``,
            },
          },
        },
        {
          name: "statusName",
          styleEnable: true,
          style: {
            default: {
              begin: `<span class="el-tag">`,
              end: `</el-tag>`,
            },
            已冻结: {
              begin: `<span class="el-tag el-tag--warning">`,
              end: `</el-tag>`,
            },
            正常: {
              begin: `<span class="el-tag el-tag--success">`,
              end: `</el-tag>`,
            },
          },
        },
        {
          name: "roleName",
          styleEnable: true,
          style: {
            default: {
              begin: `<span class="el-tag el-tag--info el-tag--plain">`,
              end: `</span>`,
            },
            超级管理员: {
              begin: `<span class="el-tag el-tag--danger el-tag--plain">`,
              end: `</span>`,
            },
          },
        },
        {
          name: "createTime",
          styleEnable: true,
          style: {
            default: {
              begin:  `<i class="iconfont jacques-time"></i> `,
              end: ``,
            },
          },
        },
      ],
      // 查询数据
      searchData: {
        username: "",
        tel: "",
        roleId: null,
      },
      // 角色列表
      roleList: [],
      // 用户详情数据
      userInfo: {
        id: 0,
        username: "",
        tel: "",
        status: 0,
        roleId: 0,
        createTime: 0,
      },
    };
  },
  computed: {},
  components: { UserTitle, Table, MessageBox },
  created() {
    // 查询所有角色
    this.selectAllRole();
    // 查询用户列表
    this.queryDataList();
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
    selectUserInfoById(id) {
      selectUserById(id).then((res) => {
        if (res && res.code == 200) {
          this.userInfo = res.data;
          // 注册时间
          this.userInfo.createTime = this.timeFormat(this.userInfo.createTime);
          // 角色权限
          this.userInfo.roleId = this.switchUserRole(this.userInfo.roleId);
          // 账户状态
          this.userInfo.status = this.switchUserStatus(this.userInfo.status);
        }
      });
    },
    // 用户数据导出
    exportData() {
      exportData().then((res) => {
        download(res, "用户数据.xlsx");
      });
    },
    // 用户数据导入
    importUserData(data) {
      uploadFile("/user/import", data).then((res) => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          // 刷新用户列表
          this.queryDataList();
        }
      });
    },
    // 分页查询用户
    queryDataList() {
      let loadingInstance = this.pageLoading();
      queryUserList(this.searchData, this.currentPage, this.pageSize).then(
        (res) => {
          this.pageStopLoading(loadingInstance);
          if (res && res.code === 200) {
            this.total = res.data.total;
            let list = res.data.list;
            list.forEach((item) => {
              // 转换时间格式
              item.createTime = this.timeFormat(item.createTime);
              // 是否选中
              item.isCheck = false;
              // 用户状态
              item.statusName = this.switchUserStatus(item.status);
              // 用户角色
              item.roleName = this.switchUserRole(item.roleId);
            });
            this.dataList = list;
          }
        }
      );
    },
    // 搜索查询
    searchDataList(data) {
      this.searchData = data;
      this.queryDataList();
    },
    // 转换用户状态数据
    switchUserStatus(status) {
      return status == 0 ? "正常" : status == 1 ? "已冻结" : "未知状态";
    },
    // 转换用户角色数据
    switchUserRole(roleId) {
      const data = this.roleList.find((item) => {
        return item.id == roleId;
      });
      return data ? data.nickname : "未知角色";
    },
    // 弹出详情
    showMessageBox(id) {
      this.userInfo = {};
      this.selectUserInfoById(id);
      this.$refs.detailsDialog.show = true;
    },
  },
  mixins: [CommonDataListContent],
};
</script>

<style scoped>
.UserContent {
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