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
      @showData="showDialog"
      @updData="showUpdDailog"
      :option="{ show: true, upd: true, del: false }"
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

    <!-- 用户详情 -->
    <MessageBox title="用户详情" ref="showDialog">
      <table class="deatils-table" slot="show-data">
        <tr>
          <th>头像</th>
          <td>
            <el-avatar
              :size="60"
              v-if="userInfo.avatar"
              :src="userInfo.avatar"
            ></el-avatar>
            <el-avatar :size="60" v-else class="user-head-portrait"
              >无头像</el-avatar
            >
          </td>
        </tr>
        <tr>
          <th>用户名</th>
          <td>{{ userInfo.username }}</td>
        </tr>
        <tr>
          <th>昵称</th>
          <td>{{ userInfo.nickname }}</td>
        </tr>
        <tr>
          <th>联系电话</th>
          <td>{{ userInfo.tel }}</td>
        </tr>
        <tr>
          <th>邮箱</th>
          <td>{{ userInfo.email }}</td>
        </tr>
        <tr>
          <th>生日</th>
          <td>{{ userInfo.birthday | formatBirthday }}</td>
        </tr>
        <tr>
          <th>账户状态</th>
          <td>
            <el-tag :type="switchUserStatusTag(userInfo.status)">
              {{ userInfo.statusName }}
            </el-tag>
          </td>
        </tr>
        <tr>
          <th>角色权限</th>
          <td>
            <el-tag :type="switchUserRoleTag(userInfo.roleName)">
              {{ userInfo.roleName }}
            </el-tag>
          </td>
        </tr>
        <tr>
          <th>注册时间</th>
          <td>{{ userInfo.createTime }}</td>
        </tr>
      </table>
      <span slot="show-footer"> </span>
    </MessageBox>

    <!-- 修改用户信息 -->
    <MessageBox title="修改用户信息" ref="updDialog">
      <el-form
        ref="updForm"
        :model="userInfo"
        slot="show-data"
        label-width="80px"
      >
        <el-form-item>
          <el-upload
            action=""
            class="avatar-uploader"
            :show-file-list="false"
            accept="image/jpeg,image/png,image/gif"
            multiple
            :http-request="uploadUserAcatar"
          >
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="用户名"
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
          label="联系电话"
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
      </el-form>

      <span slot="show-footer">
        <el-button size="small" type="warning" @click="updateUserData"
          >确认修改</el-button
        >
      </span>
    </MessageBox>
  </main>
</template>
<script>
import { formatDate } from "common/utils.js";

import UserTitle from "./UserTitle.vue";

import Table from "components/common/table/Table.vue";
import MessageBox from "components/content/message/MessageBox.vue";

import {
  queryUserList,
  selectUserById,
  exportUserData,
  importUserData,
  addUserData,
  updUserData,
  uploadAcatar,
} from "network/user.js";
import { getAllRole } from "network/role.js";

import { CommonDataListContent } from "common/mixins.js";
import { download } from "common/utils.js";
export default {
  name: "UserContent",
  data() {
    return {
      // 表格头
      titles: [
        {
          name: "",
          width: 50,
        },
        {
          name: "昵称",
        },
        {
          name: "用户名",
        },
        {
          name: "联系电话",
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
          name: "avatar",
          styleEnable: true,
          style: {
            default: {
              begin: `<span class="el-avatar el-avatar--circle"><img src="`,
              end: `" style="object-fit: cover;" /></span>`,
            },
          },
        },
        {
          name: "nickname",
          styleEnable: false,
        },
        {
          name: "username",
          styleEnable: false,
        },
        {
          name: "tel",
          styleEnable: true,
          style: {
            default: {
              begin: `<span class="iconfont jacques-dianhua"></span> `,
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
              end: `</span>`,
            },
            已冻结: {
              begin: `<span class="el-tag el-tag--warning">`,
              end: `</span>`,
            },
            正常: {
              begin: `<span class="el-tag el-tag--success">`,
              end: `</span>`,
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
            管理员: {
              begin: `<span class="el-tag el-tag--warning el-tag--plain">`,
              end: `</span>`,
            },
          },
        },
        {
          name: "createTime",
          styleEnable: true,
          style: {
            default: {
              begin: `<i class="iconfont jacques-time"></i> `,
              end: ``,
            },
          },
        },
      ],
      // 查询数据
      searchData: {
        username: "",
        nickname: "",
        tel: "",
        roleId: null,
      },
      // 角色列表
      roleList: [],
      // 用户详情数据
      userInfo: {
        id: 0,
        username: "",
        avatar: "",
        nickname: "",
        tel: "",
        email: "",
        birthday: 0,
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
  mounted() {
    // this.showUpdDailog(1);
  },
  methods: {
    // 上传用户头像
    uploadUserAcatar(data) {
      let formData = new FormData();
      formData.append("file", data.file);
      uploadAcatar(formData).then((res) => {
        this.userInfo.avatar = res.data;
      });
    },
    // 修改用户信息
    updateUserData() {
      this.$refs.updForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        updUserData(this.userInfo).then((res) => {
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
      this.userInfo = {};
      selectUserById(id).then((res) => {
        if (res && res.code == 200) {
          this.userInfo = res.data;
          // 注册时间
          this.userInfo.createTime = this.timeFormat(this.userInfo.createTime);
          // 角色权限
          this.userInfo.roleName = this.switchUserRole(this.userInfo.roleId);
          // 账户状态
          this.userInfo.statusName = this.switchUserStatus(
            this.userInfo.status
          );
        }
      });
    },
    // 用户数据导出
    exportData() {
      exportUserData().then((res) => {
        download(res, "用户数据.xlsx");
      });
    },
    // 用户数据导入
    importUserData(data) {
      importUserData(data).then((res) => {
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
            let list = res.data.data;
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

    // 弹出数据详情
    showDialog(id) {
      this.selectUserInfoById(id);
      this.$refs.showDialog.show = true;
    },
    // 弹出修改窗口
    showUpdDailog(id) {
      this.selectUserInfoById(id);
      this.$refs.updDialog.show = true;
    },
    // 转换用户状态数据
    switchUserStatus(value) {
      return value == 0 ? "正常" : value == 1 ? "已冻结" : "未知状态";
    },
    // 转换用户角色数据
    switchUserRole(value) {
      const data = this.roleList.find((item) => {
        return item.id == value;
      });
      return data ? data.nickname : "未知角色";
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
    formatBirthday(value) {
      if (value) {
        return formatDate(new Date(value), "yyyy年MM月dd日");
      } else {
        return value;
      }
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

.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>