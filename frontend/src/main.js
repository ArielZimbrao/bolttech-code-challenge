import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from '@meforma/vue-toaster';
import vTitle from 'vuejs-title'
import store from './store'

createApp(App)
.use(store)
.use(router)
.use(Toaster)
.use(vTitle)
.mount('#app')
