<template>
  <div class="page-full-screen home-frame page-loading" style="background-color:#fff">
    <Spin fix>
      <div v-show="loading">
        <Icon type="ios-loading" size="40" class="loading-spin-icon-load"></Icon>
        <div style="font-size:14px;line-height:40px;">正在请求权限，请稍等...</div>
      </div>
    </Spin>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  created() {
    let params = this.$route.params
    let _config = this.$appConfig
    if (params.token) {
      this.$storage.setLocal(_config.appTokenName, params.token)
      this.$http({
        method: 'post',
        url: this.$urlConfig.baseUrl + this.$urlConfig.userInfo + '/' + params.id,
        headers: {
          token: params.token
        }
      }).then(response => {
        const data = response.data
        this.loading = false
        if (data.code === 0) {
          const dt = data.data
          this.$storage.setLocalObj(_config.appSPName, dt.menu)
          this.$storage.setLocalObj(_config.appSUName, dt.operator)
          this.$storage.setLocalObj(_config.appSSName, dt.systems)
          this.$storage.setLocalObj('serverAreaList', dt.serverAreaList)
          if (dt.menu && dt.menu.length) {
            const mu = dt.menu[0]
            if (mu.children && mu.children.length) {
              this.$router.replace({ name: mu.children[0].name })
            } else {
              this.$router.replace({ name: mu.name })
            }
          } else {
            this.$Modal.info({
              title: '系统提示',
              content: '<div style="font-size:14px;line-height:40px;">\
                  您所登陆的账号还未分配权限，不能进入系统，请联系管理员！点击【确定】返回系统面板!</p>\
                </div>',
              onOk: function () {
                window.history.go(-1)
              }
            })
          }
        } else {
          this.$DelayWarning(data.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
