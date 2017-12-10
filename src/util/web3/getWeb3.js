import Web3 from 'web3'

function loadWeb3 (resolve, reject) {
  var web3 = window.web3

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider)
    resolve({
      hasInjectedWeb3: true,
      web3
    })
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    resolve({
      hasInjectedWeb3: true,
      web3
    })
  }
}

let getWeb3 = new Promise(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (document.readyState === 'complete') {
    loadWeb3(resolve, reject)
  } else {
    window.addEventListener('load', () => {
      console.log('loaded')
      loadWeb3(resolve, reject)
    })
  }
})
.then((result) => { // get blockchain network Id
  return result.web3.eth.net.getId().then(networkId => ({ ...result, networkId }))
})
.then((result) => { // get coinbase
  return result.web3.eth.getCoinbase().then(coinbase => ({ ...result, coinbase }))
})
.then((result) => {
  return { ...result, address: result.web3.eth.defaultAccount || result.coinbase }
})

export default getWeb3
