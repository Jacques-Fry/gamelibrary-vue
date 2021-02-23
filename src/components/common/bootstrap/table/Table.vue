<template>
  <div class="Table">
    <el-table
      :data="dataList"
      style="width: 100%"
      height="100%"
      min-height="100%"
      :max-height="maxHeight"
      @select-all="selectAll"
      @select="selectOne"
      @cell-dblclick="cellDblClick"
    >
      <!-- 选择框 -->
      <el-table-column type="selection" width="55"> </el-table-column>

      <!-- 表头 -->
      <el-table-column
        v-for="(title, index) of titles"
        :key="title.name + index"
        :label="title.name"
        lazy
      >
        <!-- 数据渲染 -->
        <template slot-scope="scope">
          <!-- 特殊数据渲染模式 -->
          <div v-if="columns[index].styleEnable">
            <div
              v-if="columns[index].style[scope.row[columns[index].name]]"
              v-html="
                columns[index].style[scope.row[columns[index].name]].begin +
                scope.row[columns[index].name] +
                columns[index].style[scope.row[columns[index].name]].end
              "
            ></div>
            <div
              v-else
              v-html="
                columns[index].style.default.begin +
                scope.row[columns[index].name] +
                columns[index].style.default.end
              "
            ></div>
          </div>
          <!-- 普通数据渲染模式 -->
          <div v-else>
            {{ scope.row[columns[index].name] }}
          </div>
        </template>
      </el-table-column>

      <!-- 元素操作栏 -->
      <el-table-column fixed="right" label="操作" width="120">
        <template>
          <el-button type="text" size="small"> 移除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "Table",
  props: {
    // 表头数据
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    // 展示内容
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    // 数据
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 最大高度
    maxHeight: {
      type: Number,
      default() {
        return 720;
      },
    },
    // 最大宽度
    maxWidth: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  computed: {
    checkNum() {
      return this.dataList.filter((item) => item.isCheck).length;
    },
    isIndeterminate() {
      return this.checkNum > 0 && this.checkNum < this.dataList.length;
    },
  },
  data() {
    return {
      isCheckAll: false,
    };
  },
  methods: {
    // 选择全部
    selectAll(selection) {
      this.isCheckAll = selection.length > 0;
      this.dataList.forEach((item) => {
        item.isCheck = this.isCheckAll;
        console.log(item.isCheck);
      });
    },
    // 单选
    selectOne(selection, row) {
      row.isCheck = selection.length > 0;
    },
    // 双击事件
    cellDblClick(row) {
      this.$emit("showMessageBox", row.id);
    },
  },
};
</script>
<style scoped>
</style>