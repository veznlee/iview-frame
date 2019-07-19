/**
 * 查看弹窗mixin
 */
export default {
  data() {
    return {
      viewModel:false,
      viewId:'',
      viewData:{}
    }
  },
  methods:{
    // 直接查看不需要再请求的数据
    viewItem(item) {
      this.viewData = item
      this.viewModel = true
    },
    // 查看需要根据id再请求的数据
    viewItemById(id) {
      this.viewId = id
      this.viewModel = true
    },
    // 关闭查看
    cancelView() {
      this.viewModel = false
    }
  }
}