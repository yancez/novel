import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import Message from 'muse-ui-message'
import 'muse-ui-message/dist/muse-ui-message.css'
import 'muse-ui/dist/muse-ui.css'
import './assets/styles/font/iconfont.css'
import './assets/styles/reset.scss'
import 'lib-flexible/flexible.js'

Vue.use(MuseUI)
Vue.config.productionTip = false
const ToastOption = {
  position: 'top', // 弹出的位置
  time: 3000, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: false, // 是否显示关闭按钮
  successIcon: 'check_circle', // 成功信息图标
  infoIcon: 'info', // 信息信息图标
  warningIcon: 'priority_high', // 提醒信息图标
  errorIcon: 'warning' // 错误信息图标
}
Vue.use(Toast, ToastOption)
const MessageOption = {
  successIcon: 'check_circle',
  infoIcon: 'info',
  warningIcon: 'priority_high',
  errorIcon: 'warning',
  iconSize: 36,
  width: 350,
  maxWidth: '50%',
  className: '',
  okLabel: '确定',
  cancelLabel: '取消',
  transition: 'scale'
}
Vue.use(Message, MessageOption)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
