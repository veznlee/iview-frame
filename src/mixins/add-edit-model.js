/**
 * 新增编辑mixin
 */
export default {
  data() {
    return {
      aeModel: false,
      aeFormReset: true, // 用于重置表单
      aeFormData: {}, // 表单数据
      isEdit: false, // 是否为修改
      isView: false // 是否为查看
    }
  },
  methods: {
    openAE() { // 打开对话框
      this.aeModel = true
    },
    confirmAE() { // 确定按钮事件，不是提交保存
      this.$refs.aeForm.handleSubmit()
    },
    cancelAE() { // 取消按钮事件
      this.aeModel = false
      this.resetAEModal()
    },
    resetAEModal() { // 表单重置
      this.aeFormReset = false
      this.$nextTick(() => {
        this.aeFormReset = true
      })
    }
  }
}
