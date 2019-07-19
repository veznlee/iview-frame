import { urlPre as pre } from './index'

export default {
  total: pre + 'reportNoteInfo/count',
  latestList: pre + 'lastNotes/',
  list: pre + 'reportNoteInfos',
  read: pre + 'reportNoteInfos',
  everyNum: 5 // 每次读几条
}