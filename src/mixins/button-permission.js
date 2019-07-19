import { findRouterByName } from '@/libs/appUtil.js'
export default {
  data() {
    return {
      BPS: {}
    }
  },
  created() {
    this.getBtnPermission()
  },
  methods: {
    getBtnPermission() {
      let permission = this.$storage.getLocalObj(this.$appConfig.appSPName)
      let route = findRouterByName(permission, this.$route.name)
      if (route && route.permission) {
        let arr = route.permission.split(',')
        let obj = {}
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i]] = true
        }
        this.BPS = obj
      }
    }
  }
}
