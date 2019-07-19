<template>
  <div class="home-frame-top-bar">
    <div class="f-flex-item">
      <div class="auto-item name-item">
        <div class="system-name">
          <div class="f-fl f-pr">
            <span style="display:inline-block">服务区应急上报备案系统</span>
          </div>
        </div>
      </div>
      <div class="fix-item user-info">
        <div class="system-info-wrap clearfix">
          <ul class="sys-info-list">
            <li class="sys-item f-pr" style="margin-right:-10px;" v-clickoutside="closeNotice">
              <div class="icon-box f-csp" style="width:30px;" @click="getNewNotices">
                <Icon type="ios-notifications" />
                <div class="message-num-circle" v-show="noticeTotal>0">{{noticeTotal}}</div>
              </div>
              <transition name="fade">
                <div class="message-list-wrap dropdown-card-wrap" v-show="noticeIsShow">
                  <div v-if="noticeTotal == 0">
                    <!-- <p class="f-tac" style="width: 320px;"></p> -->
                    <div class="common-list-item" style="width: 200px;">当前没有最新消息!</div>
                    <div class="common-list-item" style="width: 200px;">
                      <a href="javascript:;" @click="goNoticeList">查看更多>></a>
                    </div>
                  </div>
                  <div v-else class="ivu-dropdown-menu" style="width: 320px;height:auto;">
                    <div class="common-request-loading" v-show="noticeIsLoading">
                      <Spin fix>
                        <Icon type="ios-loading" size="24" class="loading-spin-icon-load"></Icon>
                        <div>加载中</div>
                      </Spin>
                    </div>
                    <div v-show="!noticeIsLoading">
                      <div
                        class="common-list-item"
                        v-for="item in noticeList"
                        :key="item.id"
                        @click="goNoticeList"
                      >{{item.event}}-{{item.cstatuContent}}-{{item.createTime}}</div>
                      <div class="common-list-item">
                        <p class="f-tar" @click="goNoticeList">
                          <a href="javascript:;">查看更多>></a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </li>
            <li class="sys-item">
              <div class="user-info clearfix">
                <div class="user-head img-box">
                  <img :src="`${publicPath}static/images/user_head.png`" alt="用户头像" />
                </div>
                <div class="user-name">{{user.realName}}</div>
              </div>
            </li>
            <li class="sys-item">
              <div class="login-out" @click="loginOut">
                <i class="ivu-icon ivu-icon-md-power"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pageUrl from '@/api/notice.url'
import { mapMutations, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      user: {},
      noticeList: [],
      noticeIsLoading: true,
      noticeIsShow: false
    }
  },
  methods: {
    ...mapMutations([
      'setNoticeNum'
    ]),
    ...mapGetters([
      'getNoticeNum'
    ]),
    // 获取总数
    getTotal() {
      this.$thttp({
        method: 'get',
        url: pageUrl.total
      }).then((data) => {
        if (data.code === 0) {
          this.noticeTotal = data.data
          this.setNoticeNum(data.data)
        } else {
          this.$DelayWarning(data.msg)
        }
      })
    },
    // 获取列表
    getList(num) {
      this.noticeIsLoading = true
      this.$thttp({
        method: 'get',
        url: pageUrl.latestList + num
      }).then((data) => {
        this.noticeIsLoading = false
        if (data.code === 0) {
          this.noticeList = data.data
          // this.setRead(num);
        } else {
          this.$DelayWarning(data.msg)
        }
      }).catch(() => {
        this.noticeIsLoading = false
      })
    },
    // 标记已读
    setRead(num) {
      this.$thttp({
        method: 'put',
        url: pageUrl.read,
        data: {
          page: 1,
          pageSize: num
        }
      }).then((data) => {
        if (data.code === 0) {
          let rest = 0
          if (num >= pageUrl.everyNum) {
            rest = this.noticeTotal - pageUrl.everyNum
          }
          this.noticeTotal = rest
          this.setNoticeNum(rest)
        }
      })
    },
    // 查看消息
    getNewNotices() {
      if (this.noticeIsShow) return
      this.noticeIsShow = true
      // let getNum = this.noticeTotal>=pageUrl.everyNum ? pageUrl.everyNum : this.noticeTotal;
      // this.getList(getNum);
    },
    // 关闭查看消息
    closeNotice() {
      this.noticeIsShow = false
    },
    // 页面跳转
    goNoticeList() {
      this.$router.push({ name: 'noticeList' })
    },
    // 登出
    loginOut() {
      const _appConfig = this.$appConfig
      this.$storage.removeLocal(_appConfig.appTokenName)
      this.$storage.removeLocal(_appConfig.appSPName)
      this.$storage.removeLocal(_appConfig.appSUName)
      this.$storage.removeLocal('serverAreaList')
      window.location = this.$urlConfig.LOGIN_URL
    }
  },
  computed: {
    noticeTotal: {
      get() {
        return this.getNoticeNum()
        // return this.$store.getters.getNoticeNum
      },
      set() { }
    }
  },
  created() {
    this.getTotal()
    this.getList(pageUrl.everyNum)
    let _config = this.$appConfig
    this.token = this.$storage.getLocal(_config.appTokenName) || '-1'
    this.user = this.$storage.getLocalObj(_config.appSUName)
    let sys = this.$storage.getLocalObj(_config.appSSName)
    if (sys && sys.self && sys.self.length) {
      let sysList = sys.self
      for (let i = 0; i < sysList.length; i++) {
        if (sysList[i].appPre === _config.appPre) {
          sysList.splice(i, 1)
        }
      }
      this.systemList = sysList
    }
  }
}
</script>

<style lang="scss" scoped>
.name-item {
  width: 400px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  font-weight: bold;
}
.system-info-wrap .sys-info-list {
  float: right;
}
.system-info-wrap .sys-item {
  float: left;
  padding: 3px;
  margin-left: 20px;
}
.system-info-wrap .icon-box {
  line-height: 40px;
}
.system-info-wrap .user-info {
  position: relative;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.system-info-wrap .user-info .user-head {
  float: left;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  margin: 9px 0;
}
.system-info-wrap .user-info .user-head img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.system-info-wrap .user-name {
  font-family: '微软雅黑';
  float: left;
  margin-left: 7px;
  line-height: 42px;
}
.system-info-wrap .login-out {
  padding: 10px 0;
  cursor: pointer;
}
.system-info-wrap .ivu-icon {
  font-size: 18px;
  vertical-align: middle;
  color: #fff;
}
.system-info-wrap .login-out-btn {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  // background:url(./img/login_out.png) no-repeat;
  // background-position:center;
  cursor: pointer;
}
.message-num-circle {
  position: absolute;
  right: 8px;
  top: 10px;
  padding: 0 5px;
  height: 16px;
  line-height: 16px;
  border-radius: 8px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: #f00;
}
.message-list-wrap {
  top: 45px;
  left: -127px;
  max-height: 200px;
}
.change-system-list {
  left: 212px;
  top: 100%;
  margin-top: -10px;
}
</style>
