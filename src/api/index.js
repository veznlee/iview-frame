const __config = {
  production: {
    // 请求根路径
    baseUrl: 'http://116.62.243.51:8888/',
    // 网站首页
    webIndex: 'http://116.62.243.51:8888/',
    // 请求路径
    serverUrl: 'http://116.62.243.51:8888/',
    // 图片根路径
    imgUrl: 'http://116.62.243.51:8888/pic/',
    // 第三方项目文件上传接口
    fileUploadOther: 'http://116.62.243.51:8888/pic/uploadFile',

    LOGIN_URL: 'http://116.62.243.51:8085/#/login', // 单点登录的登录页面
    IMP_URL: 'http://116.62.243.51:8085/#/dashboard' // 单点登录的系统页
  },
  dev: {
    // 请求根路径
    baseUrl: 'http://192.168.0.106:8888/',
    // 网站首页
    webIndex: 'http://192.168.0.106:8888/',
    // 请求路径
    serverUrl: 'http://192.168.0.106:8888/',
    // 图片根路径
    imgUrl: 'http://192.168.0.106:8888/file/',
    // 第三方项目文件上传接口
    fileUploadOther: 'http://192.168.0.106:8888/file/uploadFile',

    LOGIN_URL: 'http://192.168.0.112:8080/#/login', // 单点登录的登录页面
    IMP_URL: 'http://192.168.0.112:8080/#/dashboard' // 单点登录的系统页
  }
}

const appBaseUrls = process.env.NODE_ENV === 'production' ? __config.production : __config.dev
const appUrlsConfig = Object.assign(appBaseUrls, {
  // 登录
  login: 'user/ajaxLogin',
  // 权限获取
  userInfo: 'sys/operator/info',
  // 登出
  loginOut: 'user/loginOut',
  // 文件上传
  fileUpload: 'pub/uploadFile',
  // 文件下载
  fileDownload: 'bs/downloadFile',
  // 字典集
  dictDatas: 'sys/dictDatas/1/'
})

export const urlPre = 'chk/'
export default appUrlsConfig