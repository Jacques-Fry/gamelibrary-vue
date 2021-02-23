<template>
  <div class="RoleContent">
    <RoleTitle @searchDataList="searchDataList" :loading="loading" />

    <Table
      class="Table"
      :titles="titles"
      :columns="columns"
      :dataList="dataList"
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
  </div>
</template>
<script>
import RoleTitle from "./RoleTitle.vue";

import Table from "components/common/table/Table.vue";

import { queryRoleList } from "network/role.js";

import { CommonDataListContent } from "common/mixins.js";

export default {
  name: "RoleContent",
  data() {
    return {
      titles: [{ name: "角色名" }, { name: "角色别称" }],
      columns: [
        { name: "name", styleEnable: false },
        { name: "nickname", styleEnable: false },
      ],
      searchData: {
        name: "",
        nickname: "",
      },
    };
  },
  components: { RoleTitle, Table },
  created() {
    this.queryDataList();
  },
  methods: {
    // 分页查询角色列表
    queryDataList() {
      let loadingInstance = this.pageLoading();
      queryRoleList(this.searchData, this.currentPage, this.pageSize).then(
        (res) => {
          this.pageStopLoading(loadingInstance);
          if (res && res.code === 200) {
            this.total = res.data.total;
            let list = res.data.data;
            list.forEach((item) => {
              item.isCheck = false;
            });
            this.dataList = list;
          }
        }
      );
    },
    // 条件搜索
    searchDataList(data) {
      this.searchData = data;
      this.queryDataList();
    },
  },
  mixins: [CommonDataListContent],
};
</script>
<style scoped>
.RoleContent {
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
</style>