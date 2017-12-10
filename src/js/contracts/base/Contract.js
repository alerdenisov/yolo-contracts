import { accessWith, constantCall, method, allEvents } from './utils'

export default class Contract {
  constructor (address) {
    this.coinbase = '0x0'
    this.baseObject = {}

    if (address) {
      this.baseObject.address = address
    }
  }

  events (state, filter = { fromBlock: 0, toBlock: 'latest' }) {
    return allEvents(
      this.accessWith.bind(this),
      { state },
      filter
    )
  }

  method (state, methodName, ...args) {
    return method(
      this.accessWith.bind(this),
      methodName,
      { state },
      ...args
    )
  }

  constant (state, field, ...args) {
    this.coinbase = state.user.coinbase
    return constantCall(this.accessWith.bind(this), field, { state }, ...args)
  }

  accessWith (dataObject) {
    return accessWith(this.json, Object.assign(this.baseObject, dataObject))
  }
}
