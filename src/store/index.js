import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './states'
import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'
Vue.use(Vuex)
Vue.component('icon', Icon)
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules : {
    
  },
  strict : true
})
