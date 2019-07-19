<template>
  <div class="integration-panel-page">
    <div class="page-container">
      <div class="integration-panel-header">
        <div class="f-flex-item">
          <div class="auto-item">
            <p class="system-name">智慧服务区综合管理平台</p>
          </div>
          <div class="fix-item user-info">
            <div class="system-info-wrap clearfix">
              <ul class="sys-info-list">
                <li class="sys-item">
                  <div class="user-info clearfix" @mouseenter="openMenu" @mouseleave="closeMenu">
                    <div class="user-head img-box">
                      <img :src="`${publicPath}static/images/dashboard_user_header.png`" alt="用户头像" />
                    </div>
                    <div class="user-name">{{user.realName}}</div>
                  </div>
                </li>
                <li class="sys-item">
                  <div class="login-out">
                    <span class="login-out-btn" @click="loginOut"></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="integration-nav-container">
        <div>
          <h2 class="nav-card-title">综合运营</h2>
          <ul class="nav-card-list clearfix">
            <li class="list-item nav-znfx-item">
              <div class="icon-box">
                <span class="nav-icon"></span>
              </div>
              <p class="nav-text">智能分析系统</p>
            </li>
            <li class="list-item nav-ywgl-item">
              <div class="icon-box">
                <span class="nav-icon"></span>
              </div>
              <p class="nav-text">业务管理系统</p>
            </li>
            <li class="list-item nav-yjsb-item" @click="$router.push({name:'home'})">
              <div class="icon-box">
                <span class="nav-icon"></span>
              </div>
              <p class="nav-text">应急上报系统</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="nav-card-title">业务管理</h2>
          <ul class="nav-card-list clearfix">
            <li
              class="list-item"
              :class="item.iconName"
              v-for="(item,index) in otherMenus"
              :key="index"
              @click="goSystem(item)"
            >
              <div class="icon-box">
                <span class="nav-icon"></span>
              </div>
              <p class="nav-text">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fix-footer">
      <div class="footer-inner f-flex-item">
        <div class="auto-item">
          <p class="copy-right">贵州升智交科信息技术发展有限公司 技术支持：0851-85865111</p>
        </div>
        <div class="fix-item">
          <div class="img-box">
            <img :src="`${publicPath}static/images/app_code.png`" alt />
          </div>
          <p>扫码下载APP</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/dashboard.scss'
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      user: {},
      otherMenus: [{
        url: '',
        name: '资产管理系统',
        iconName: 'nav-zcgl-item'
      }, {
        url: '',
        name: '能耗管理系统',
        iconName: 'nav-nhgl-item'
      }, {
        url: '',
        name: '油气管理系统',
        iconName: 'nav-yqgl-item'
      }, {
        url: '',
        name: '视频管理系统',
        iconName: 'nav-spgl-item'
      }, {
        url: '',
        name: '客房管理系统',
        iconName: 'nav-kfgl-item'
      }, {
        url: '',
        name: '信息发布系统',
        iconName: 'nav-xxfb-item'
      }, {
        url: '//www.baidu.com',
        name: '报警系统',
        iconName: 'nav-bjgl-item'
      }]
    }
  },
  created() {
    this.user = this.$storage.getLocalObj(this.$appConfig.appSUName)
  },
  methods: {
    openMenu() {

    },
    closeMenu() {

    },
    // 系统跳转
    goSystem(item) {
      if (item.url) {
        window.location.replace(item.url)
      } else {
        this.$DelayWarning('该系统尚未集成进来，暂无法访问！')
      }
    },
    // 登出
    loginOut() {
      let _appConfig = this.$appConfig
      this.$storage.removeLocal(this.$appConfig.appTokenName)
      this.$storage.removeLocal('serverAreaList')
      this.$storage.removeLocal(_appConfig.appSPName)
      this.$storage.removeLocal(_appConfig.appSUName)
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="">
</style>
