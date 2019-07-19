import { tokenInstance } from '@/libs/tokenHttp'

export function saveErrorLogger(data) { // 错误日志
  return tokenInstance({
    url: '/user/login',
    method: 'post',
    data
  })
}