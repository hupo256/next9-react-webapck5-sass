import axios from 'axios'
import { message } from 'antd'
import config from '../config'
import tools from '../libs/utils'

const { getStorage } = tools
const { host } = config

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
    if (!params.noloading) message.loading('加载中...', 20)
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
    const { config, data } = response
    const { code } = data
    message.destroy()
    if (code === 100001) {
      // 相应的错误码处理
    }
    return { data: data.data, code, message: data?.message }
  },
  async error => {
    message.destroy()
    console.log(error)
    // message.error(error)
  },
)

export default ajaxinstance
