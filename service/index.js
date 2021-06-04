import axios from 'axios'
import { message } from 'antd'
import Router from 'next/router'
import config from '../config'
import tools from '@libs/utils'

const { getStorage } = tools
let { host, env } = config
const loadingList = []

// 修改baseURL
const getHost = req => {
  if(req.url.indexOf('moyang') >= 0){
    if(env === 'DEV'){
      return '//dev-api.in-spire.cn/'
    }
    if(env === 'TEST'){
      return '//test-api.in-spire.cn/'
    }
    if(env === 'PROD'){
      return '//dev-api.in-spire.cn/'
    }
  }
  return req.baseURL;
}

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
    request.baseURL = getHost(request)
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
    if (code === 2004) return Router.push('/404')
    return { data: data.data, code, message: data?.message }
  },
  async error => {
    message.destroy()
    console.log(error)
  },
)

export default ajaxinstance
