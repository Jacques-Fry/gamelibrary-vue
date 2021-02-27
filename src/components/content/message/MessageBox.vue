<template>
  <div name="MessageBox">
    <div class="wage-detail">
      <el-dialog
        :title="title"
        :visible.sync="show"
        :width="width"
        center
        :close-on-click-modal="false"
      >
        <slot name="show-data" />
        <div slot="footer" class="dialog-footer" :class="footStyle">
          <slot name="show-footer" />
          <span style="margin-left: 10px">
            <el-button size="small" @click="show = false">关闭</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    width: {
      type: String,
      default: "30%",
    },
    footStyle: {
      type: String,
      default: "center",
    },
  },
  data() {
    return { show: false };
  },
  methods: {
    // 开启
    open() {
      this.show = true;
    },
    // 关闭
    close() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.right {
  text-align: right;
}
.center {
  text-align: center;
}
.left {
  text-align: left;
}
</style>>