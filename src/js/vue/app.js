import 'babel-polyfill';
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';
import apollo from './apollo' // apollo client plugin for vue
import router from './router'

// https://www.npmjs.com/package/vue-awesome
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/heart'

// Install the vue-apollo plugin and use the apollo client
Vue.use(VueApollo, {
  apollo,
});

// use vue-material: https://github.com/marcosmoura/vue-material
Vue.use(VueMaterial)

// Aplly themes
Vue.material.theme.registerAll({
  default: {
    primary: 'cyan',
    accent: 'pink'
  },
  phone: {
    primary: 'indigo',
    accent: 'pink'
  }
})

const app = new Vue({
  router
}).$mount('#root')