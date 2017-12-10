import AuthJson from '~/build/contracts/Auth.json'
import Contract from './base/Contract'

let instance

class Auth extends Contract {
  constructor () {
    super()
    this.json = AuthJson
    instance = instance || this
    return instance
  }

  editProfile (state, data) {
    const web3 = state.web3.instance().utils
    return this.method(state, 'update', web3.asciiToHex(data.firstName), web3.asciiToHex(data.lastName), web3.asciiToHex(data.email))
  }
  signup (state, data) {
    const web3 = state.web3.instance().utils
    return this.method(state, 'signup', web3.asciiToHex(data.firstName), web3.asciiToHex(data.lastName), web3.asciiToHex(data.email))
  }

  login (state) {
    return this.constant(state, 'login').then(result => this.getUTF8DataOfResults(state, result))
  }

  getUTF8DataOfResults (state, results) {
    console.log('login', results)
    const utf8Results = Object.values(results).map(result => state.web3.instance().utils.toUtf8(result))
    return {
      firstName: utf8Results[0],
      lastName: utf8Results[1],
      email: utf8Results[2]
    }
  }
}

export default new Auth()
