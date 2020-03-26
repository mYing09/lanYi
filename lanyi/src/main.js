import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import {
  Field,
  CellGroup,
  Icon,
  Button,
  Checkbox,
  Toast,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Search,
  Swipe,
  SwipeItem,
  NavBar,
  Grid,
  GridItem,
  Cell
} from 'vant';

import 'lib-flexible/flexible'

Vue.use(VueAxios, axios)

Vue
  .use(Field)
  .use(Icon)
  .use(CellGroup)
  .use(Button)
  .use(Checkbox)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(NavBar)
  .use(Grid)
  .use(GridItem)
  .use(Cell);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
