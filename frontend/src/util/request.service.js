import axios from 'axios'
import CryptoHandler from '@/util/crypto-handler'
import store from '@/store/index';

export default class RequestService  {
  static IsAuthenticate() {
    let accessToken = store.state.accessToken;

    if (!accessToken) {
      const userInfoString = localStorage.getItem('user-info');

      if (!userInfoString) {
          this.Logoff();
          return false;
      }

      const userInfo = JSON.parse(userInfoString);

      store.commit('user/setUser', userInfo);
      accessToken = userInfo.accessToken;
    }
    if (accessToken !== null) {
      return true;
    } else {
      this.Logoff();
      return false;
    }
  }

  static Logoff() {
    store.commit('user/logoff');
    localStorage.removeItem('user-info');
    window.location.href = "/";
  }

  static Login(email, password) {
    password = CryptoHandler.encrypt(password);
    return axios.post(process.env.VUE_APP_BACKEND_URL_BASE + '/auth/signin', {
      email,
      password
    }).then((result) => {
      const data = result.data;
      store.commit('user/setUser', data);
      localStorage.setItem('user-info', JSON.stringify(data));
      setTimeout(() => {
          this.Logoff();
      }, data.expiresIn);
      
      return true;
    }).catch((error) => {
      throw error;
    }) 
  }

  static SaveUser(user) {
    let body = {
      ...user
    }
    const pass = CryptoHandler.encrypt(user.password)
    body = {
      ...body,
      password: pass
    }
    return axios.post(process.env.VUE_APP_BACKEND_URL_BASE + '/user', body)
    .then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    }) 
  }

  static listProject() {
    return axios.get(process.env.VUE_APP_BACKEND_URL_BASE + '/project', {
      headers: {
        'Authorization': `Bearer ${store.state.user.accessToken }`
      },
    }).then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    })
  }

  static getTasks(projectId) {
    return axios.get(process.env.VUE_APP_BACKEND_URL_BASE + `/task/project/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${store.state.user.accessToken }`
      },
    }).then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    })
  }

  static SaveProject(project) {
    let body = {
      ...project
    }
    return axios.post(process.env.VUE_APP_BACKEND_URL_BASE + '/project', body, {
      headers: {
        'Authorization': `Bearer ${store.state.user.accessToken }`
      },
    })
    .then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    }) 
  }

  static SaveTask(task) {
    let body = {
      ...task
    }
    return axios.post(process.env.VUE_APP_BACKEND_URL_BASE + '/task', body, {
      headers: {
        'Authorization': `Bearer ${store.state.user.accessToken }`
      },
    })
    .then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    }) 
  }

  static CheckTask(taskId) {
    let body = {
      id: taskId
    }
    return axios.post(process.env.VUE_APP_BACKEND_URL_BASE + '/task/done', body, {
      headers: {
        'Authorization': `Bearer ${store.state.user.accessToken }`
      },
    })
    .then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    }) 
  }

  static ExcluirTask(taskId) {
    return axios.delete(process.env.VUE_APP_BACKEND_URL_BASE + `/task/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${store.state.user.accessToken }`
      },
    })
    .then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    }) 
  }

  static ExcluirProject(projectId) {
    return axios.delete(process.env.VUE_APP_BACKEND_URL_BASE + `/project/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${store.state.user.accessToken }`
      },
    })
    .then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    }) 
  }

  static EditProject(projectId, projectName) {
    let body = {
      name: projectName
    }
    return axios.put(process.env.VUE_APP_BACKEND_URL_BASE + `/project/${projectId}`, body, {
      headers: {
        'Authorization': `Bearer ${store.state.user.accessToken }`
      },
    })
    .then((result) => {
      return result.data;
    }).catch((error) => {
      throw error;
    }) 
  }
}