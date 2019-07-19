import { urlPre as pre } from './index'

export default {
  list: pre + 'sysAlarmInfos',
  report: pre + 'sysAlarmInfo/report'
}

export const configUrl = {
  list: pre + 'autoReportConfigs',
  add: pre + 'autoReportConfig'
}