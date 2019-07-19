export default {
  trim: function (str) {
    return (str + '').replace(/(^\s*)|(\s*$)/g, "")
  },
  /*去除字符串左边空格*/
  ltrim: function (str) {
    return str.replace(/(^\s*)/g, "")
  },
  /*去除字符串右边空格*/
  rtrim: function (str) {
    return str.replace(/(\s*$)/g, "")
  },
  isPhone: function (str) {
    return /^1[345789]\d{9}$/.test(str)
  },
  isTelPhone: function (str) {
    return /^(0\d{3}\-?\d{7})|(0\d{2}\-?\d{8})|(1[345789]\d{9})$/.test(str)
  },
  isCnIdCard: function (str) {
    return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(str)
  },
  isCnName: function (str) {
    // return /^([\u4e00-\u9fa5]+(·{0,1})){0,4}[\u4e00-\u9fa5]$/.test(str)
    return /^[\u4E00-\u9FA5\u9FA6-\u9FBB]{2,6}$/.test(str)
  },
  isEmail: function (str) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)
  },
  isIp: function (str) {
    return /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/.test(str)
  },
  isPostCode: function (str) {
    return /^[1-9][0-9]{5}$/.test(str)
  },
  isAccount: function (str) {
    return /^[a-zA-Z][a-zA-Z0-9_\-]{2,}$/.test(str)
  },
  isPassword: function (str) {
    return /^[a-zA-Z0-9_,;'"~#@&%\!\^\$\.\*\+\?\-\=\|\\\/\:\<\>]{6,30}$/.test(str)
  },
  /**用于判断字符串是否包含大写字母，小写字母以及数字中的至少两种 */
  isIncludeTwoType: function (str) {
    return /^[a-zA-Z0-9]*(([A-Z][a-z])|([A-Z][0-9])|([a-z][0-9])|([a-z][A-Z])|([0-9][A-Z])|([0-9][a-z]))+[a-zA-Z0-9]*$/.test(str)
  },
  /*判断值是否为空*/
  isEmpty: function (val) {
    if ((val == null || typeof val == "undefined") || (typeof (val) == "string" && val == "" && val != "undefined") || val === undefined) {
      return true
    } else {
      return false
    }
  },
  /*判断一个object对象是否为空*/
  isEmptyObj: function (obj) {
    for (var key in obj) {
      return false
    };
    return true
  },
  computedFileSize: function (number) {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB'
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + 'MB'
    }
  },
  bytesToSize: function (bytes) {
    if (bytes === 0) return '0 B'
    let k = 1024, // or 1000
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
  },
  typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    return map[toString.call(obj)]
  },
  isLeapYear: function (year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
  },
  getMonthDays: function (year, month) {
    var arr = [31, 28, 31, 30, 31, 30, 31, 30, 31, 31, 30, 31]
    var days = arr[month]
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      days = 29
    }
    return days
  },
  dateFormat: function (date, fmt) {
    var date = new Date(date)
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
        .substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
          : "/u5468")
          : "")
        + week[date.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
          : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt
  },
  getTheLatestDays: function (num, str) {
    let arr = []
    let split = str || '-'
    let seconds = (new Date()).getTime()
    function fill(num) {
      return num < 10 ? '0' + num : num
    }
    for (let i = 0; i < num; i++) {
      let day = new Date(seconds - 86400000 * i)
      arr.push(day.getFullYear() + split + fill(day.getMonth() + 1) + split + day.getDate())
    }
    return arr
  },
  getTheLatestMonth: function (num, opt) {
    let option = opt || {}
    let arr = []
    let split = option.split || '-'
    let day = option.startMonth ? new Date(option.startMonth) : new Date()
    let cm = day.getMonth() + 1
    let cy = day.getFullYear()
    let startY = cy
    let startM = cm
    function fill(num) {
      return num < 10 ? '0' + num : num
    }

    if (option.after) { // 往后推
      if (option.notIncludeNow) {
        startM += 1
      }
      for (let i = 0; i < num; i++) {
        if (startM > 12) {
          startM = 1
          startY += 1
        }
        arr.push(startY + split + fill(startM));
        startM += 1
      }
    } else { // 默认往前
      if (option.notIncludeNow) {
        cm -= 1
      }
      let rest = cm - num
      if (rest >= 0) {
        startM = rest
      } else { // 只要月份不够，起始年就要减一
        startY -= 1
        rest = rest * -1 // 差多少个月
        let ys = Math.floor(rest / 12) // 循环几年
        let rm = rest - ys * 12 // 剩下的月份
        startY = startY - ys
        startM = 12 - rm
      }
      for (let i = 0; i < num; i++) {
        startM += 1
        if (startM > 12) {
          startM = 1
          startY += 1
        }
        arr.push(startY + split + fill(startM))
      }
    }
    return arr
  },
  conversionNumber(number, num, floatNum) {
    let n = num || 1000, f = floatNum || 1
    let cn = number / n
    var s = cn.toString()
    var rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  }
}