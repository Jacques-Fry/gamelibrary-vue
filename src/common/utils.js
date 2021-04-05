/**
 * 节流
 * @param {*} func 
 * @param {*} delay 
 * @returns 
 */
export function debounce(func, delay) {
    let timer = null;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
/**
 * 日期格式化
 * @param {*} date 
 * @param {*} fmt 
 * @returns 
 */
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

/**
 * 字符串补零
 * @param {*} str 
 * @returns 
 */
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

/**
 * 获取随机颜色
 * @returns 
 */
export function randomColor() {
    return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
}

/**
 * 下载文件
 * @param {*} data 数据
 * @param {*} fileName 下载后的文件名
 */
export function download(data, fileName) {
    var blob = new Blob([data]);
    // msSaveOrOpenBlob方法返回bool值
    if (window.navigator.msSaveOrOpenBlob) {
        // 本地保存
        navigator.msSaveBlob(blob, fileName);
    } else {
        // a标签下载
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
    }
}