/**
 * 图片预览
 */
export default {
  data() {
    return {
      previewSrc: '', // 预览略缩图片
      viewPictureModel: false,  //预览全图
    }
  },
  methods: {
    viewPicture(src) {
      this.previewSrc = src
      this.viewPictureModel = true
    },
    viewPictureClose() {
      this.viewPictureModel = false
    }
  }
}
