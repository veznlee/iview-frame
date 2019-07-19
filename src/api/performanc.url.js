import { urlPre as pre } from './index'
export const list = {
  list: pre + 'reportEventInfos',
  add: pre + 'reportEventInfo',
  deal: pre + 'reportEventInfo/handle',
  detail: pre + 'detail/',
  typeTotal: pre + 'reportEventInfos/ecc',
  waitDeal: pre + 'reportEventInfos/waitingHandle'
}

export const configUrl = {
  list: pre + 'manageItems',
  add: pre + 'manageItem',
  deleteItem: pre + 'manageItemDetail/',
  itemList: pre + 'reportEventInfo/handle'
}