import axios from 'axios'

const ENV = process.env.NODE_ENV
// 创建请求实例
const service = axios.create({
  timeout: 5000, // 请求超时时间
  method: 'get'
})

// // 请求拦截器
// service.interceptors.request.use(
//   config => {
//     console.log(config)
//     // 在发送请求之前做些什么
//     return config
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   }
// )
// 响应拦截器
service.interceptors.response.use(
  // 响应成功
  response => {
    if (response) {
      switch (response.status) {
        case 200:
          break
        default:
          console.error(response.data.data.msg ? response.data.data.msg : '返回的状态码非200')
      }
      return response
    } else {
      console.error('响应成功,但是响应信息不存在')
    }
  },
  // 响应失败
  error => {
    console.error(ENV === 'development' ? error.message : '请求错误')
    return Promise.reject(error.response.data)
  }
)

export default service
