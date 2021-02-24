<template>
  <div name="MessageBox">
    <div class="wage-detail">
      <el-dialog
        :title="title"
        :visible.sync="show"
        width="30%"
        center
        :close-on-click-modal="false"
      >
        <slot name="show-data" />
        <div slot="footer" class="dialog-footer">
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
  },
  data() {
    return { show: false };
  },
  methods: {},
};
</script>

<style scoped>
</style>>