
const userStore = {
  namespaced: true,
  state () {
    return { 
      userId: 0, 
      accessToken: '', 
      expiresIn: 0, 
    }
  },
  mutations: {
    setUser (state, user) {
      state.userId = user.userId; 
      state.userName = user.userName;
      state.userEmail = user.userEmail;
      state.accessToken = user.accessToken; 
      state.expiresIn = user.expiresIn; 
    },
    logoff (state) {
      state.userId = 0; 
      state.userName = '';
      state.userEmail = '';
      state.accessToken = ''; 
      state.expiresIn = 0; 
    }
  },
  actions: {
    setUser({ commit }, user ) {
      commit('setUser', user );
    }
  },
}

export default userStore