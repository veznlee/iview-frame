import axios from 'axios'
import { tokenInstance } from '@/libs/tokenHttp'

export function login(data) { // 登录不一样，登录不需要token
  return axios({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return tokenInstance({
    url: '/user/info',
    method: 'get'
  })
}

export function getPermission() {
  return tokenInstance({
    url: '/user/info',
    method: 'get'
  })
}

export function loginOut() {
  return tokenInstance({
    url: '/user/logout',
    method: 'get'
  })
}
