<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心
          <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { removeToken } from '@/libs/appUtil'
import { loginOut } from '@/api/user'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleLogout() {
      loginOut().then(data => {
        this.doLoginOut()
      }).catch(err => {
        this.doLoginOut()
      })
    },
    doLoginOut() {
      removeToken()
      window.localStorage.removeItem(this.$appConfig.appSPName)
      this.$router.push({ name: this.$appConfig.LOGIN_PAGE_NAME })
    },
    message() {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick(name) {
      switch (name) {
        case 'logout': this.handleLogout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
