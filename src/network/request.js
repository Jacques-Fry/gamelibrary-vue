import axios from 'axios'
import Vue from 'vue'
import store from '@/store'

const vue = new Vue()

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 10000
  })

  //axios拦截器
  //请求拦截
  instance.interceptors.request.use(config => {
    // console.log(store.getters.getToken)
    // console.log(typeof (store.getters.getToken) == "string")
    if (typeof (store.getters.getToken) == "string" && store.getters.getToken) config.headers['Authorization'] = store.getters.getToken
    return config
  }, err => {
    console.log(err)
    vue.$message({
      showClose: true,
      message: "网络异常",
      type: "error"
    })
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    if (res.status != 200) {
      vue.$message({
        showClose: true,
        message: "网络异常",
        type: "error"
      })
    }
    else if (res.data.code === 6000) {
      localStorage.clear()
      store.commit('setToken', '')
      vue.$bus.$emit("toLogin");
      vue.$message({
        showClose: true,
        message: res.data.msg,
        type: "error"
      });
    } else if (res.data.code && res.data.code != 200) {
      vue.$message({
        showClose: true,
        message: res.data.msg,
        type: "error"
      });
    }
    return res.data
  }, err => {
    console.log(err)
    vue.$message({
      showClose: true,
      message: "网络异常",
      type: "error"
    })
  })

  //发送网络请求
  return instance(config)
}