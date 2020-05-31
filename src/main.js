import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import TreeTable from 'vue-table-with-tree-grid'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import WebIM from './webim'
Vue.use(WebIM)
Vue.use(VueQuillEditor)
// axios.defaults.baseURL = 'http://106.52.251.50:8080/api/private/v1/'
axios.defaults.baseURL = 'http://47.115.124.102:8888/api/private/v1/'
// 请求拦截，为请求头加上Authorization字段提供token令牌
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

// 过滤器
function add0(m) { return m < 10 ? '0' + m : m }
Vue.filter('dateFormat', function (shijianchuo) {
  var time = new Date(shijianchuo*1000);
  var y = time.getFullYear()+2;
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  console.log(time)
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
