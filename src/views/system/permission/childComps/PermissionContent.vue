<template>
  <div class="PermissionContent">
    <PermissionTitle @searchDataList="searchDataList" :loading="loading" />

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
      </table>
      <span slot="show-footer">
        <el-button size="small" type="warning">修 改</el-button>
      </span>
    </MessageBox>
  </div>
</template>
<script>
import PermissionTitle from "./PermissionTitle.vue";

import MessageBox from "components/content/message/MessageBox.vue";
import Table from "components/common/bootstrap/table/Table.vue";

import { queryPermissionList, selectDetails } from "network/permission.js";

import { CommonDataListContent } from "common/mixins.js";

export default {
  name: "PermissionContent",
  data() {
    return {
      titles: [{ name: "权限名称" }, { name: "权限别称" }, { name: "路径" }],
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
      ],
      searchData: {
        name: "",
        nickname: "",
      },
      permissionInfo: { id: 0, url: "", name: "", nickname: "" },
    };
  },
  components: { PermissionTitle, Table, MessageBox },
  created() {
    this.queryDataList();
  },
  methods: {
    selectDetails(id) {
      selectDetails(id).then((res) => {
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
          let list = res.data.list;
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
    showMessageBox(id) {
      this.permissionInfo = {};
      this.selectDetails(id);
      this.$refs.detailsDialog.show = true;
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