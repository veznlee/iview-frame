const _appPre = 'er'
const appConfig = {
  appTitle: '服务区应急上报系统',
  appPre: _appPre,
  appTokenName: _appPre + '_ftuidake', // token的缓存名字
  appLUName: _appPre + '_login', // 登录账号缓存
  appSUName: _appPre + '_ferusdake', // 登录返回的用户信息
  appSPName: _appPre + '_permission', // storagePermission
  appSSName: _appPre + '_systems', // storageSystem
  cookieExpires: 1, // cookie缓存时间
  useI18n: false,
  pageSize: 10, // 默认分页数
  maxPageSize: 5, // 最多显示页数
  pageSelects: [10, 15, 20], // 可选的每页数据数目
  hasHomePage: false, // 如果没有首页的时候，必须把首页的名字设置为一个路由里无法匹配到的字符串，如'id123456'
  homeName: 'home123456', // 首页的名字
  LOGIN_PAGE_NAME: 'login',
  REGISTER_PAGE_NAME: 'register',
  NOFOUND_PAGE_NAME: 'error_404',
  ERROR_PAGE_NAME: 'error_401',
  // 没有token就能访问的页面
  NO_NEED_TOKEN_PAGES: ['loading', 'login', 'register', 'error_404', 'error_401'],
  // 没有在权限里面配置，但必须要有token才能访问的页面
  NO_NEED_PERMISSION_PAGES: ['loading'],
  plugin: {
    'error-store': {
      showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}

export default appConfig
