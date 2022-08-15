import { createStore } from 'vuex'
import userStore from './user.store'

export default createStore({
  modules: {
    user: { ...userStore }
  }
})
