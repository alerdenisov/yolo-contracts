import Web3 from 'web3'
import store from '../../store/'
import { ACTION_TYPES, APPROVED_NETWORK_ID } from '../../util/constants.js'

const monitorWeb3 = function (state) {
  let networkId = state && state.web3 ? state.web3.networkId : ''
  let coinbase = state && state.web3 ? state.web3.coinbase : ''
  let web3 = window.web3
  let isLocalWeb3 = false

  // Checking if browser is Web3-injected (Mist/MetaMask)
  if (typeof web3 !== 'undefined' && web3) {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider)
  } else {
    console.log('monitorWeb3: No web3 in browser')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    isLocalWeb3 = true
  }

  // if (web3) {
  //   web3.eth.filter('latest', function (error, result) {
  //     if (!error) {
  //       // console.log(result)
  //     }
  //   })

  //   web3.eth.filter('pending', function (error, result) {
  //     if (!error) {
  //       // console.log(result)
  //     }
  //   })
  // }

  // setInterval(async () => {
  //   if (!web3 || isLocalWeb3) {
  //     return
  //   }

  //   const id = await web3.eth.getId()
  //   if(id !== networkId) {
  //     store.dispatch(ACTION_TYPES.LOGOUT)
  //     window.location.reload()
  //   } 
    
  //   const newCoinbase = await web.eth.getCoinbase()
  //   if(newCoinbase !== coinbase) {
  //     if (id === APPROVED_NETWORK_ID) {
  //       store.dispatch(ACTION_TYPES.UPDATE_WEB3_PROPERTIES, {
  //         properties: ['coinbase'],
  //         value: [newCoinbase]
  //       })
  //     } else {
  //       store.dispatch(ACTION_TYPES.LOGOUT)
  //       window.location.reload()
  //     }
  //   }
  // }, 666)
}

export default monitorWeb3
