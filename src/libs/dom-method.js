export const addClass = function(obj, cls) {
  let obj_class = obj.className
  let blank = (obj_class !== '') ? ' ' : ''
  let added = obj_class + blank + cls
  obj.className = added
}

export const removeClass = function(obj, cls) {
  let obj_class = ' ' + obj.className + ' '
  obj_class = obj_class.replace(/(\s+)/gi, ' ')
  let removed = obj_class.replace(' ' + cls + ' ', ' ')
  removed = removed.replace(/(^\s+)|(\s+$)/g, '')
  obj.className = removed
}

export const hasClass = function(obj, cls) {
  let obj_class = obj.className
  let obj_class_lst = obj_class.split(/\s+/)
  for (let x = 0; x < obj_class_lst.length; x++) {
    if (obj_class_lst[x] === cls) {
      return true
    }
  }
  return false
}

export default { addClass, removeClass, hasClass }