import { tokenInstance } from '@/libs/tokenHttp'

export const getUnreadCount = () => {
  return tokenInstance({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return tokenInstance({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return tokenInstance({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return tokenInstance({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return tokenInstance({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return tokenInstance({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
