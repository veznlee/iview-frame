<template>
  <div class="page-full-screen home-frame">
    <div class="full-absolute-top home-frame-top">
      <top-app-bar />
    </div>
    <div class="full-absolute-left home-frame-left" style="top:50px;">
      <left-nav ref="sideMenu" :menus="menus" :active-name="$route.name" @on-select="turnToPage"></left-nav>
    </div>
    <div class="f-full-body home-frame-body" :class="{'fixed-full-screen':isFullScreen}">
      <router-view></router-view>
    </div>
    <div class="full-absolute-bottom home-frame-bottom" style="left:232px;"></div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import leftNav from '@/components/left-nav'
import topAppBar from '@/components/top-app-bar'
// import { getMenuByRouter } from '@/libs/appUtil'
export default {
  name: 'home',
  components: {
    leftNav,
    topAppBar
  },
  data() {
    return {
      currentRouter: {},
      openTags: [],
      menus: []
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.tags.tagNavList
    },
    isFullScreen() {
      return this.$store.state.frameBodyFull
    }
  },
  created() {
    let menus = this.$storage.getLocalObj(this.$appConfig.appSPName) || []
    if (menus.length) {
      this.menus = menus
    }
  },
  methods: {
    ...mapMutations([
      'setTagNavList',
      'addTag',
      'setLocal',
      'closeTag'
    ]),
    getFirstMenu() {
      let menu = this.menus[0]
      let currentRouter
      if (!menu.children || (menu.children && menu.children.length === 0)) {
        currentRouter = menu
      } else {
        currentRouter = menu.children[0]
      }
      return currentRouter
    },
    turnToPage(route) {
      let { name, params, query } = {}
      if (typeof route === 'string') {
        name = route
      } else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    }
  }
}
</script>
