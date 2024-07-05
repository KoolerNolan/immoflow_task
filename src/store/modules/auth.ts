import { Module } from '@/vuex'
import Cookies from 'js-cookie'

interface AuthState {
  isLoggedIn: boolean
  userFormData: {
    name: string
    email: string
    password: string
  }
}

const authModule: Module<AuthState, any> = {
  state: () => ({
    isLoggedIn: false,
    userFormData: {
      name: '',
      email: '',
      password: ''
    }
  }),
  mutations: {
    setLoggedIn(state) {
      state.isLoggedIn = true
    },
    setLoggedOut(state) {
      state.isLoggedIn = false
      state.userFormData = { name: '', email: '', password: '' } // Reset user data on logout
    },
    setUserFormData(state, formData) {
      state.userFormData = formData
    },
    updateUserName(state, name) {
      state.userFormData.name = name
    },
    updateUserEmail(state, email) {
      state.userFormData.email = email
    },
    updateUserPassword(state, password) {
      state.userFormData.password = password
    }
  },
  actions: {
    async initializeUser({ state, commit }) {
      if (!state.isLoggedIn) return false

      const storedFormData = Cookies.get('userFormData')
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData)
        commit('setUserFormData', parsedData)
      }
    },
    async login({ commit }, { email, password }) {
      const storedFormData = Cookies.get('userFormData')
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData)
        if (email === parsedData.email && password === parsedData.password) {
          commit('setLoggedIn')
          localStorage.setItem('isLoggedIn', 'true')
          return true // Login successful
        }
      }
      return false // Login failed
    },
    logout({ commit }) {
      commit('setLoggedOut')
      localStorage.removeItem('isLoggedIn')
    },
    deleteAccount({ commit }) {
      Cookies.remove('userFormData')
      commit('setLoggedOut')
      localStorage.removeItem('isLoggedIn')
      return true // Account deletion successful
    },
    checkLoginStatus({ commit }) {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      if (isLoggedIn === 'true') {
        commit('setLoggedIn')
      } else {
        commit('setLoggedOut')
      }
    },
    async updateUserName({ state, commit }, name) {
      if (!state.isLoggedIn) return false

      const storedFormData = Cookies.get('userFormData')
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData)
        parsedData.name = name
        Cookies.set('userFormData', JSON.stringify(parsedData))
        commit('updateUserName', name)
        return true
      }
      return false
    },
    async updateUserEmail({ state, commit }, email) {
      if (!state.isLoggedIn) return false

      const storedFormData = Cookies.get('userFormData')
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData)
        parsedData.email = email
        Cookies.set('userFormData', JSON.stringify(parsedData))
        commit('updateUserEmail', email)
        return true
      }
      return false
    },
    async updateUserPassword({ state, commit }, password) {
      if (!state.isLoggedIn) return false

      const storedFormData = Cookies.get('userFormData')
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData)
        parsedData.password = password
        Cookies.set('userFormData', JSON.stringify(parsedData))
        commit('updateUserPassword', password)
        return true
      }
      return false
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userFormData: (state) => state.userFormData
  }
}

export default authModule
