import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage as Message } from 'element-plus'
import * as errorCode from './errorCode'

const service = axios.create({
  baseURL: import.meta.env.VITE_WEB_URL,
  withCredentials: true,
  timeout: 10000
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?'
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName]
        const part = encodeURIComponent(propName) + '='
        if (value !== null && typeof value !== 'undefined') {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              const params = propName + '[' + key + ']'
              const subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          } else {
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code
    // 获取错误信息
    const msg =
      errorCode.default[code as keyof typeof errorCode] ||
      res.data.msg ||
      errorCode.default.default

    if (code === 401) {
      return Promise.reject(
        new Error('无效的会话，或者会话已过期，请重新登录。')
      )
    } else if (code === 500) {
      Message.error(msg)
      return Promise.reject(new Error(msg))
    } else if (code == 205 || code == 204) {
      return res.data
    } else if (code == 400) {
      Message.error(msg)
      return Promise.reject(new Error('参数错误！'))
    } else if (code !== 200 && code != 202) {
      Message.error({
        message: msg
      })
      return Promise.reject(new Error('error'))
    }
    return res.data
  },
  (error: AxiosError) => {
    let { message: messageText } = error
    if (messageText == 'Network Error') {
      messageText = '后端接口连接异常'
    } else if (messageText.includes('timeout')) {
      messageText = '系统接口请求超时'
    } else if (messageText.includes('Request failed with status code')) {
      messageText =
        '系统接口' + messageText.substr(messageText.length - 3) + '异常'
    }
    Message.error({
      duration: 5 * 1000,
      message: messageText
    })
    return Promise.reject(error)
  }
)

export default service
