import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import auth from './modules/auth'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  },
  modules: {
    auth
  }
})

// Define own `useStore` composition function.
export function useStore() {
  return baseUseStore(key)
}
