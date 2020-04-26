import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    // 注册
    registerUser(context, { username, password, nickname }) {
      return new Promise(resolve => {
        let options = {
          username,
          password,
          nickname,
          appKey: window.WebIM.config.appkey,
          success: function (res) {
            console.log('注册成功', res)
            resolve(res)
          },
          error: function (err) {
            console.log('注册失败', err)
            
          },
          apiUrl: window.WebIM.config.apiURL
        };
        window.WebIM.conn.registerUser(options);
      })
    },

    onLogin({ commit }, {username,password}) {

      return new Promise(resolve => {
        var options = {
          apiUrl: window.WebIM.config.apiURL,
          user:username,
          pwd: password,
          appKey: window.WebIM.config.appkey,
          success: function (res) {
            resolve(res)
          },
          error: function (err) {
            resolve('666')
        }
        };
        window.WebIM.conn.open(options);
      })

    }
  }

})
