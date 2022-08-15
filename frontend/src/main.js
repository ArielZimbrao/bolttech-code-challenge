import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from '@meforma/vue-toaster';
import store from './store'

createApp(App)
.use(store)
.use(router)
.use(Toaster)
.mount('#app')
