<template>
  <div class="login-page-wrap login-page">
    <div class="login-form f-usn">
      <div class="login-card clearfix">
        <div class="card-header">
          <div class="title">智慧服务区信息管理系统</div>
          <div class="sub-title">智慧服务区，智慧的生活</div>
        </div>
        <div class="card-body">
          <Alert type="error" v-show="loginErr">{{ loginErrMsg }}！</Alert>
          <div class="form-con">
            <login-form :disabled="loginDisabled" @on-success-valid="handleSubmit"></login-form>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">贵州升智交科信息技术发展有限公司</div>
  </div>
</template>
<script>
import encryptEncode64 from '@/libs/encryptCode'
import mixinEncrypt from '@/libs/mixinEncrypt'
import LoginForm from '@/components/login-form'
import { setToken } from '@/libs/appUtil'
let redirectObj = {}
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      title: '登录页面',
      loginErr: false,
      loginErrMsg: '',
      loginTime: 0,
      loginDisabled: false,
      passwordErrorTime: 1
    }
  },
  methods: {
    handleSubmit(obj) {
      setToken('testToken')
      this.toNextPage()
      /**
      var time = (new Date()).getTime()
      if (time - this.loginTime < 2000) return
      // this.loginDisabled = true;
      this.loginTime = time
      var loginData = {
        username: obj.account,
        password: obj.password
      }
      this.$http({
        url: this.$urlConfig.serverUrl + this.$urlConfig.login,
        method: 'post',
        data: {
          username: loginData.username,
          password: encryptEncode64(loginData.password)
        }
      }).then(response => {
        const data = response.data
        if (data.code * 1 === 0) {
          let _appConfig = this.$appConfig
          let DT = data.data
          this.$storage.setLocal(_appConfig.appTokenName, DT.token)
          this.$storage.setLocalObj(_appConfig.appSUName, DT.operator)
          this.$storage.setLocalObj(_appConfig.appSPName, DT.menu)
          this.$storage.setLocalObj(_appConfig.appSSName, DT.systems)
          this.$storage.setLocalObj('serverAreaList', DT.serverAreaList)
          if (obj.rememberme) {
            this.$storage.setLocalObj(_appConfig.appLUName, {
              username: loginData.username,
              password: mixinEncrypt.encrypt(loginData.password)
            })
          } else {
            this.$storage.removeLocal(_appConfig.appLUName)
          }
          // 跳转第一个菜单
          if (DT.menu && DT.menu.length) {
            const mu = DT.menu[0]
            if (mu.children && mu.children.length) {
              this.$router.push({ name: mu.children[0].name })
            } else {
              this.$router.push({ name: mu.name })
            }
          } else {
            this.$Modal.info({
              title: '系统提示',
              content: '<div style="font-size:14px;line-height:40px;">\
                  您所登陆的账号还未分配权限，不能进入系统，请联系管理员！</p>\
                </div>'
            })
          }
        } else {
          this.loginErrMsg = data.msg
          this.loginErr = true
          setTimeout(() => {
            this.loginErr = false
          }, 2000)
        }
      }).catch(error => {
        this.$Message.error('请求超时！')
      })
      */
    },
    noAccount() {
      this.$Message.warning('请联系管理员')
    },
    // 切换登陆方式
    switchMode(mode) {
      this.loginMode = mode
    },
    toNextPage() {
      if (redirectObj.redirect) {
        const redirectPath = redirectObj.redirect
        const query = { ...redirectObj }
        delete query.redirect
        this.$router.push({ path: redirectPath, query: query })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
  },
  created() {
    redirectObj = this.$route.query
  }
}
</script>

<style scoped lang="scss">
.login-page {
  position: relative;
  width: 100%;
  min-width: 1360px;
  height: 100%;
  min-height: 770px;
  overflow: auto;
  box-sizing: border-box;
  .footer {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    font-size: 16px;
    color: #9395c3;
    text-align: center;
  }
}
.login-form {
  position: relative;
  padding-top: 12%;
  width: 432px;
  margin: 0 auto;
}
.login-card {
  width: 432px;
  background: #fff;
  border: 1px solid #e9e9e9;
  border-radius: 1px;
  transition: all 0.3s ease-in-out;
  .card-header {
    padding: 44px 0 10px 0;
    text-align: center;
    .title {
      font-size: 30px;
      font-weight: bold;
      line-height: 50px;
      color: #0084ff;
    }
    .sub-title {
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      color: #1571fe;
    }
    p {
      font-size: 16px;
      line-height: 36px;
      color: #666;
    }
  }
  .card-body {
    width: 352px;
    margin: 0 auto;
    .ivu-alert {
      margin-bottom: 0;
    }
    .form-con {
      padding-top: 10px;
    }
    .login-tip {
      line-height: 20px;
      margin-bottom: 24px;
      text-align: left;
      span {
        color: #108aed;
        cursor: pointer;
      }
    }
  }
  .card-footer {
    text-align: center;
    line-height: 56px;
    background: #f9f9f9;
    font-size: 14px;
  }
}
.login-form-item {
  .login-input {
    width: 100%;
    height: 20px;
  }
}
.color {
  color: #f00;
}
.login-title {
  @extend .color;
  background: '#fff';
}

.login-mode {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  .by-account,
  .by-SMS {
    display: inline-block;
    height: 34px;
    width: 125px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
  .by-account {
    border-radius: 20px 0 0 20px;
  }
  .by-SMS {
    border-radius: 0px 20px 20px 0px;
  }
  .login-css {
    color: #fff;
    padding-top: 4px;
    background-color: #108ff5;
    border: 1px solid #108ff5;
  }
  .the-others {
    color: #108ff5;
    border: 1px solid #108ff5;
    background-color: #fff;
    padding-top: 4px;
  }
}
</style>

<style lang="scss">
.login-page .login-input .ivu-input {
  font-size: 16px;
  border-width: 0 0 1px 0;
  border-radius: 0;
  &:focus {
    box-shadow: none;
  }
}
.login-page .ivu-form-item-error .login-input .ivu-input {
  border-width: 0 0 1px 0;
  border-radius: 0;
  &:focus {
    box-shadow: none;
  }
}
</style>
