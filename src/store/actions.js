import { ACTION_TYPES, MUTATION_TYPES } from '../util/constants'
import getWeb3 from '../util/web3/getWeb3'
import monitorWeb3 from '../util/web3/monitorWeb3'

const autoActions = Object.keys(ACTION_TYPES).reduce((acc, key) => {
  acc[ACTION_TYPES[key]] = function ({ commit }, ...args) {
    commit(MUTATION_TYPES[key], ...args)
  }

  return acc
}, {})

export default {
  ...autoActions,

  [ACTION_TYPES.REGISTER_WEB3_INSTANCE] ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      // Try to initialize web3
      getWeb3
      .then((result) => {
        commit(MUTATION_TYPES.REGISTER_WEB3_INSTANCE, {
          result,
          callback: (state) => {
            monitorWeb3(state)
            resolve()
          }
        })
      })
      .catch((e) => {
        if (e.result) {
          const result = e.result
          commit(MUTATION_TYPES.REGISTER_WEB3_INSTANCE, {
            result: {
              web3: (result.hasInjectedWeb3 ? () => result.web3 : null),
              hasInjectedWeb3: (result.hasInjectedWeb3 ? result.hasInjectedWeb3 : false),
              web3Error: e.err
            },
            callback: (state) => {
              monitorWeb3(state)
              resolve(result)
            }
          })
        }
      })
    })
  },
  [ACTION_TYPES.LOGIN] ({ commit }, userData) {
    return new Promise(function (resolve, reject) {
      commit(MUTATION_TYPES.LOGIN, {
        userData,
        callback: () => resolve(userData)
      })
    })
  },
  [ACTION_TYPES.LOGOUT] ({ commit }) {
    return new Promise(function (resolve, reject) {
      commit(MUTATION_TYPES.LOGOUT, {
        callback: () => resolve()
      })
    })
  }
}
