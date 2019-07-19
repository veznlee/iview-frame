<template>
  <div class="common-board-container">
    <div class="common-board-body">
      <div class="common-board-scroll">
        <Card class="common-home-card" v-if="currUserInfo.qz != 1">
          <div slot="title" class="card-title">
            <span class="title-icon t-icon-waitdo"></span>
            我的待办事项({{dataTotalWait}})
          </div>
          <div class="card-body">
            <Table border :columns="tableColumnsWait" :data="dataListWait"></Table>
          </div>
        </Card>
        <Card class="common-home-card" v-else>
          <div slot="title" class="card-title">
            <span class="title-icon t-icon-message"></span>
            最新应急通知({{dataTotal}})
          </div>
          <div class="card-body">
            <Table border :columns="tableColumns" :data="dataList"></Table>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import hasFullScreen from '@/mixins/has-full-screen'
import pageUrl from '@/api/emergency.url'
import { mapMutations } from 'vuex'
export default {
  mixins: [hasFullScreen],
  data() {
    return {
      currUserInfo: {},
      viewModel: false,
      detailData: {},
      tableColumnsWait: [{
        title: '事件编号',
        key: 'eventNum',
        align: 'center'
      },
      {
        title: '服务区名称',
        key: 'serviceAreaName',
        align: 'center'
      },
      {
        title: '服务区方位',
        key: 'serviceSapName',
        align: 'center'
      },
      {
        title: '上报类型',
        key: 'eventTypeName',
        align: 'center'
      },
      {
        title: '上报事件',
        key: 'eventContent',
        align: 'center'
      },
      {
        title: '处置优先级',
        key: 'priorityName',
        align: 'center'
      },
      {
        title: '上报时间',
        key: 'createTime',
        align: 'center'
      },
      {
        title: '处置状态',
        key: 'nodeStatus',
        align: 'center'
      },
      {
        title: '操作',
        key: 'action',
        width: 100,
        align: 'center',
        render: (h, params) => {
          return h('div', [h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                this.viewDeail(params.row)
              }
            }
          }, '查看详情')])
        }
      }],
      tableColumns: [{
        title: '事件编号',
        key: 'eventNum',
        align: 'center'
      },
      {
        title: '服务区名称',
        key: 'serviceAreaName',
        align: 'center'
      },
      {
        title: '服务区方位',
        key: 'serviceSapName',
        align: 'center'
      },
      {
        title: '通知类型',
        key: 'eventTypeName',
        align: 'center'
      },
      {
        title: '通知内容',
        key: 'eventContent',
        align: 'center'
      }],
      dataList: [],
      dataTotal: 0,
      dataListWait: [],
      dataTotalWait: 0
    }
  },
  created() {
    this.currUserInfo = this.$storage.getLocalObj(this.$appConfig.appSUName)
    if (this.currUserInfo.qz === 1) {
      this.requestList(pageUrl.list, { page: 1, pageSize: 30 })
    } else {
      this.requestList(pageUrl.waitDeal, { page: 1, pageSize: 30 }, 'dataListWait', 'dataTotalWait')
    }
    // this.requestList(pageUrl.list,{page:1,pageSize:20});
    // this.requestList(pageUrl.waitDeal,{page:1,pageSize:20},'dataListWait','dataTotalWait');
  },
  methods: {
    ...mapMutations([
      'setViewEmergency'
    ]),
    requestList(url, params, listName = 'dataList', totalName = 'dataTotal') {
      this.$thttp({
        method: 'post',
        url: url,
        data: params
      }).then((data) => {
        if (data.code === 0) {
          this[listName] = data.data
          this[totalName] = data.total
        } else {
          this.$DelayWarning(data.msg)
        }
      })
    },
    // 查看
    viewDeail(data) {
      this.detailData = data
      this.viewModel = true
      this.setViewEmergency(data)
      // this.$router.push({name: 'emergencyDetail', params: {id: data.id}})
    },
    // 关闭查看
    handleCancelView() {
      this.viewModel = false
    }
  }
}
</script>
<style lang="scss" scoped>
.common-home-card:hover {
  box-shadow: none;
}
</style>
