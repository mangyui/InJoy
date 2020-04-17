
// 图片转bese64
function imageToBase64 (img) {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  var dataURL = canvas.toDataURL('image/' + ext)
  return dataURL
}

// 压缩图片
function dealImage (base64, w, callback) {
  var newImage = new Image()
  var quality = 0.6 // 压缩系数0-1之间
  newImage.src = base64
  newImage.setAttribute('crossOrigin', 'Anonymous') // url为外域时需要
  var imgWidth, imgHeight
  newImage.onload = function () {
    imgWidth = this.width
    imgHeight = this.height
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w
        canvas.height = w * imgHeight / imgWidth
      } else {
        canvas.height = w
        canvas.width = w * imgWidth / imgHeight
      }
    } else {
      canvas.width = imgWidth
      canvas.height = imgHeight
      quality = 0.6
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
    var base64 = canvas.toDataURL('image/jpeg', quality) // 压缩语句
    // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
    // while (base64.length / 1024 > 150) {
    // quality -= 0.01
    // base64 = canvas.toDataURL("image/jpeg", quality)
    // }
    // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
    // while (base64.length / 1024 < 50) {
    // quality += 0.001
    // base64 = canvas.toDataURL("image/jpeg", quality)
    // }
    callback(base64) // 必须通过回调函数返回，否则无法及时拿到该值
  }
}

// 截取视频第一帧图片
function setVideoPoster (e) {
  let ele = e.target
  ele.disablePictureInPicture = true
  let canvas = document.createElement('canvas')
  canvas.width = ele.videoWidth
  canvas.height = ele.videoHeight
  canvas.getContext('2d').drawImage(ele, 0, 0, canvas.width, canvas.height)
  ele.setAttribute('poster', canvas.toDataURL('image/png'))
}

// 时间过去格式化
function formatTime (time) {
  // time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 60) {
    return '刚刚'
  } else if (diff < 600) {
    return Math.floor(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return add0(d.getHours()) + ':' + add0(d.getMinutes())
  } else {
    return add0(d.getMonth() + 1) + '-' + add0(d.getDate()) + ' ' + add0(d.getHours()) + ':' + add0(d.getMinutes())
  }
}

function add0 (num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}

// 时间过去格式化
function commomTime (time) {
  let d = new Date(time)
  if (d instanceof Date) {
    return add0(d.getFullYear()) + '-' + add0(d.getMonth() + 1) + '-' + add0(d.getDate()) +
    ' ' + add0(d.getHours()) + ':' + add0(d.getMinutes()) + ':' + add0(d.getSeconds())
  } else {
    return ''
  }
}

// 时间过去格式化
function diffNow (time) {
  const d = new Date(time)
  const now = Date.now()

  let diff = (d - now) / 1000

  if (diff < 0) {
    return '已过时'
  } else { // less 1 hour
    let days = Math.floor(diff / (24 * 3600))
    let hours = Math.floor((diff % (24 * 3600)) / 3600)
    let minutes = Math.floor(((diff % (24 * 3600)) % 3600) / 60)
    return days + '天' + hours + '时' + minutes + '分'
  }
}

function debounce (fn, timeout) {
  var timers
  return function () {
    if (timers) {
      clearTimeout(timers)
    }
    let args = arguments
    timers = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}

module.exports = {
  imageToBase64,
  dealImage,
  setVideoPoster,
  formatTime,
  commomTime,
  diffNow,
  debounce
}
