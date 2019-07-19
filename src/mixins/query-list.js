/**
 * 列表查询页面mixin
 */
import appConfig from '@/config'
export default {
  data() {
    return {
      initListWhenCreated: true, // 是否一进入页面就查询
      searchform: {}, // 搜索项
      dataList: [], // 数据列表
      dataTotal: 0, // 数据总数
      page: {
        page: 1,
        pageSize: appConfig.pageSize
      },
      maxTodayOption: { // 搜索的最大日期
        disabledDate (date) {
          return date && date.valueOf() >= (new Date()).getTime()
        }
      }
    }
  },
  created() {
    if (this.initListWhenCreated) {
      this.getList()
    }
  },
  methods:{
    // 获取列表
    getList() {
      const searchData = this.formatSearchDataTime(Object.assign({},this.searchform,this.page))
      if (!searchData) return
      this.$thttp({
        url:this.listUrl,
        data:searchData,
        method:'post'
      }).then(data => {
        if (data.code*1 === 0) {
          this.dataList = data.data
          this.dataTotal = data.total
        } else {
          this.$DelayWarning(data.msg)
        }
      })
    },
    // 格式化搜索参数，主要是针对日期的判断和格式化
    formatSearchDataTime(data = {}, formatOption = {}) {
      let opt = Object.assign({
        eventName: '搜索',
        timeInterval: 94608000000,
        timeText: '3年'
      }, formatOption)
      if (data.startDate && data.endDate) {
        if (data.startDate > data.endDate) {
          this.$DelayWarning(opt.eventName+'开始时间不能大于结束时间')
          return false
        }
        // 时间间隔超过三年
        if (data.endDate.getTime() - data.startDate.getTime() > opt.timeInterval) {
          this.$DelayWarning('一次性' + opt.eventName + '数据的时间间隔不能超过' + opt.timeText)
          return false
        }
      }
      if (data.startDate && data.startDate !== '') {
        data.startDate = dateFormat(data.startDate, 'yyyy-MM-dd')
      }
      if (data.endDate && data.endDate !== '') {
        data.endDate = dateFormat(data.endDate, 'yyyy-MM-dd')
      }
      return data
    },
    search() {
      this.page.page = 1
      this.getList()
    },
    // 切换分页
    pageChange(index) {
      this.page.page = index
      this.getList()
    },
    pageSizeChange(size) {
      this.page.pageSize = size
      this.getList()
    }
  }
}