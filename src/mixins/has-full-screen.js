import { mapMutations } from 'vuex'
export default {
  computed: {
    fullBtnType() {
      return this.$store.state.frameBodyFull ? 'ios-contract' : 'ios-expand'
    },
    isFullScreen() {
      return this.$store.state.frameBodyFull
    }
  },
  methods: {
    ...mapMutations([
      'toggleFrameBodyFull'
    ]),
    toggleContainerFullState() {
      this.toggleFrameBodyFull()
      this.$nextTick(() => {
        var resizeEvent = new Event('resize')
        window.dispatchEvent(resizeEvent)
      })
    }
  }
}
