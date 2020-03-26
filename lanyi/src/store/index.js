import Vue from 'vue'
import Vuex from 'vuex'

import {registerModule} from './registerStore/registerModule'
import {loginModule} from './loginStore/loginModule'
import {indexModule} from './indexStore/indexModule'
import {movieModule} from './movieStore/movieModule'
import {homeModule} from './homeStore/homeModule'
import {movieDetailModule} from './movieDetailStore/movieDetailModule'
import {mineModule} from './mineStore/mineModule'
import {collectModule} from './collectStore/collectModule'
import {buyTicketModule} from './buyTicketStore/buyTicketModule'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    // 注册模块
    registerModule,

    // 登录模块
    loginModule,

    indexModule,

    movieModule,

    homeModule,

    movieDetailModule,

    mineModule,

    collectModule,

    buyTicketModule
  }
  
})
