/*
 * @Descripttion:
 * @version: 1.10.1
 * @Author:
 * @Date: 2021-03-15 14:44:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-22 14:00:50
 */

console.log("开始加载socketIO...");

import socketIO from 'socket.io-client'
import qs from 'qs'
import { Notification } from 'element-ui'
import store from '@/store'
// 有需求则使用
const query = {}

const io = socketIO(`/${Object.keys(query).length ? '?' + qs.stringify(query) : ''}`, {
    // path: '/abcd',
    secure: true,
    // transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
})

io.on('connect', () => {

    console.log('socket.io 已连接')
    store.commit('setSocket', { key: 'isConnect', value: true })

    io.on('disconnect', async() => {
            store.commit('setSocket', { key: 'isConnect', value: false })
            console.error('实时连接断开,请刷新界面重新连接！')
        })
        // 系统常规消息通知
    io.on('systemMsg', ({ code, data, msg }) => {
        console.log(code, data, msg, 'systemMsg code,data,msg')
        if (code == 2000) {
            const { title, message } = data
            Notification({
                title,
                message,
            })
        }
    })
})

// 发出请求后，等待服务器返回数据（一次）
io.onceHandle = ({ emitName, emitData = {}, onName, overTime = 0 }) => new Promise(resolve => {
    let timer = null
    if (overTime > 0) {
        timer = setTimeout(() => {
            io.removeAllListeners(onName)
            resolve({ code: 1000, data: '', msg: 'socket处理超时' })
        }, overTime)
    }

    console.log(onName, '已监听 -- socket')
    io.once(onName, onData => {
        console.log(`${onName} 监听结果`, onData)
        if (timer) clearTimeout(timer)
        resolve(onData)
    })
    console.log(emitName, '已发送 -- socket', emitData)
    io.emit(emitName, emitData)
})

console.log("socketIO加载完成");

export default io