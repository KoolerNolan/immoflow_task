import { Module } from 'vuex';
import Cookies from 'js-cookie'

interface AuthState {
  isLoggedIn: boolean;
}

const authModule: Module<AuthState, any> = {
  state: () => ({
    isLoggedIn: false
  }),
  mutations: {
    setLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      const storedFormData = Cookies.get('userFormData');
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData);
        if (email === parsedData.email && password === parsedData.password) {
          commit('setLoggedIn');
          localStorage.setItem('isLoggedIn', 'true');
          return true; // Login successful.
        }
      }
      return false; // Login failed.
    },
    logout({ commit }) {
      commit('setLoggedOut');
      localStorage.removeItem('isLoggedIn');
    },
    checkLoginStatus({ commit }) {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        commit('setLoggedIn');
      } else {
        commit('setLoggedOut');
      }
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn
  }
}

export default authModule;
