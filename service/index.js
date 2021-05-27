import axios from 'axios'
import { message } from 'antd'
import Router from 'next/router'
import config from '../config'
import tools from '@libs/utils'

const { getStorage } = tools
const { host } = config
const loadingList = []

// 实例化 ajax请求对象
const ajaxinstance = axios.create({
  baseURL: host,
  timeout: 20000,
  data: {},
  headers: { systemCode: 'S005,' },
})

// 请求拦截器
ajaxinstance.interceptors.request.use(
  request => {
    const token = getStorage('token')
    const { params = {} } = request
    if (!params.noloading && loadingList.length < 1) {
      message.loading('加载中...', 20)
      loadingList.push(1)
    }
    token && (request.headers['Token'] = token)
    return request
  },
  error => {
    message.destroy()
    message.error(error)
  },
)

// 响应拦截器
ajaxinstance.interceptors.response.use(
  response => {
    // console.log(response)
    const { config, data } = response
    const { code } = data
    if (loadingList.length > 0) {
      message.destroy()
      loadingList.shift()
    }
    // 跳到首页
    if (code === 2001) return Router.push('/')
    if (code === 190002) return Router.push('/404')
    if (data?.message) {
      message.error(data?.message)
    }
    return { data: data.data, code, message: data?.message }
  },
  async error => {
    message.destroy()
    console.log(error)
  },
)

export default ajaxinstance
