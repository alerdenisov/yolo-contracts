import { APPROVED_NETWORK_ID, NETWORKS } from '~/src/util/constants'

export function allEvents (accessFn, dataObject, filter) {
  return new Promise((resolve, reject) => {
    accessFn({
      ...dataObject,
      method: (instance, coinbase) => {
        return new Promise((resolve, reject) => {
          instance.allEvents(filter).get((error, result) => {
            if (error) {
              return reject(error)
            }

            return resolve(result)
          })
        }).then(resolve).catch(reject)
      }
    })
  })
}

export function constantCall (accessFn, field, dataObject, ...args) {
  return new Promise((resolve, reject) => {
    accessFn({
      ...dataObject,
      method: (instance, coinbase) => {
        if (typeof instance.methods[field] === 'undefined') {
          console.log(instance, field, dataObject)
          throw new Error(`undefined field: ${field}`)
        }
        return instance.methods[field](...args).call({ from: coinbase }).then(resolve).catch(reject)
      }
    })
  })
}

export function method (accessFn, field, dataObject, ...args) {
  return new Promise((resolve, reject) => {
    accessFn({
      ...dataObject,
      method: (instance, coinbase) => {
        if (typeof instance.methods[field] === 'undefined') {
          console.log(instance, field, dataObject)
          throw new Error(`undefined field: ${field}`)
        }

        console.log(coinbase)

        return instance.methods[field](...args).estimateGas({ gas: 5 * 1e6, from: coinbase })
        .then(estimateGas => {
          console.log(estimateGas)
          if (estimateGas === 5 * 1e6) {
            throw new Error(`out of gas on method: ${field}`)
          }

          return estimateGas
        })
        .then(gas => {
          return instance.methods[field](...args).send({ from: coinbase })
        })
        .then(resolve)
        .catch(reject)
      }
    })
  })
}

export function accessWith (contractJson, dataObject = {}) {
  const state = dataObject.state

  if (!dataObject.method) {
    throw new Error('no method providen')
  }

  if (!state || !state.web3 || !state.web3.instance) {
    console.log(Object.assign({}, state.web3))
    throw new Error('Web3 is not initialised. Use a Web3 injector')
  }

  if (state.web3.networkId !== APPROVED_NETWORK_ID) {
    throw new Error(`You are NOT connected to the ${NETWORKS[APPROVED_NETWORK_ID]} on which this dApp runs.`)
  }

  const web3 = state.web3.instance()
  const address = dataObject.address || contractJson.networks[state.web3.networkId].address
  const contract = new web3.eth.Contract(contractJson.abi, address)
  return web3.eth.getCoinbase().then(coinbase => {
    console.log(coinbase)
    return dataObject.method(contract, coinbase)
  }).catch(console.error)
}
