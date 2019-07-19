<template>
  <div class="frame-left-wrap">
    <div class="wrap-main">
      <div class="nav-container">
        <ul class="module-nav-box">
          <li class="sub-nav-content-item" v-for="navItem in menus" :key="navItem.id">
            <template v-if="navItem.children && navItem.children.length">
              <div class="sub-nav-title" @click="toggleOpenMenu(navItem)">
                <span style="display:inline-block;width:21px;">
                  <i class="ivu-icon ivu-icon-md-arrow-dropright nav-arrow" :class="{'is-open':inOpen(navItem.name)}"></i>
                </span>
                <!-- <i class="ivu-icon nav-icon" :class="navItem.meta.icon"></i> -->
                <span>{{navItem.meta.title}}</span>
              </div>
              <ul class="module-nav-box" :class="inOpen(navItem.name) ? 'is-open' : 'is-close'">
                <li class="sub-nav-item" :class="{'active':activeRouterName == item.name}" v-for="item in navItem.children" :key="item.id" @click="goToMenu(item)">
                  <span class="text-title">{{item.meta.title}}</span>
                </li>
              </ul>
            </template>
            <template v-else>
              <div class="sub-nav-title" :class="{'active':activeRouterName == navItem.name}" @click="goToMenu(navItem)">
                <span style="display:inline-block;width:16px;"></span>
                <!-- <i class="ivu-icon nav-icon" :class="navItem.meta.icon"></i> -->
                <span>{{navItem.meta.title}}</span>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { oneOf, indexOfArray } from '@/libs/tools'
// import CollapseTransition from './collapse-transition';
export default {
  components: {
    // CollapseTransition
  },
  props: {
    menus: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      openMenus: [],
      openTags: [],
      activeRouterName: ''
    }
  },
  watch: {
    '$route': {
      handler(newRoute) {
        const mts = newRoute.matched
        if (mts.length >= 2) {
          const pRoute = mts[mts.length - 2]
          this.openMenuByRouteName(pRoute.name)
        }
        let activeName = newRoute.name
        // 如果是详情页，让激活菜单保持为列表页
        if (/\S+Detail$/.test(activeName)) {
          activeName = activeName.slice(0, -6) + 'List'
        }
        this.activeRouterName = activeName
      },
      immediate: true
    }
  },
  methods: {
    inOpen(name) {
      return oneOf(name, this.openMenus)
    },
    handlerClickMenu(menu) {
      if (menu.children && menu.children.length) {
        this.toggleOpenMenu(menu)
      } else {
        this.goToMenu(menu)
      }
    },
    toggleOpenMenu(item) {
      const name = item.name
      const index = indexOfArray(name, this.openMenus)
      if (index >= 0) {
        this.openMenus.splice(index, 1)
      } else {
        this.openMenus.push(name)
      }
    },
    goToMenu(item) {
      if (this.activeRouterName === item.name) return
      const index = this.findRouterIndexInTags(item)
      if (index < 0) {
        this.openTags.push(item)
        this.$router.push({
          name: item.name
        })
      } else {
        this.$router.push({
          name: item.name
        })
      }
    },
    findRouterIndexInTags(item) {
      for (let i = 0; i < this.openTags.length; i++) {
        if (this.openTags[i].name === item.name) {
          return i
        }
      }
      return -1
    },
    openMenuByRouteName(name) {
      const index = indexOfArray(name, this.openMenus)
      if (index < 0) {
        this.openMenus.push(name)
      }
    }
  }
}
</script>
