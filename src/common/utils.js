export function debounce(func, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

//随机颜色
export function randomColor() {
  return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
}

// 下载文件
export function download(data, fileName) {
  var blob = new Blob([data]);
  if (window.navigator.msSaveOrOpenBlob) {//msSaveOrOpenBlob方法返回bool值
      navigator.msSaveBlob(blob, fileName);//本地保存
  } else {
      var link = document.createElement('a');//a标签下载
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
  }
}