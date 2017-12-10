<template lang="pug">
  #app.app(style='width: 100%')
    app-header.app__header(:user='user')
    app-body.app__body(:user='user')
</template>

<script>
import AppHeader from './Header'
import AppBody from './Body'
import { mapState, mapActions } from 'vuex'
import { ACTION_TYPES } from '../util/constants'
import Auth from '~/src/js/contracts/Auth'

require('normalize.css')

export default {
  name: 'App',
  components: {
    AppHeader,
    AppBody
  },
  computed: {
    ...mapState({
      hasInjectedWeb3: state => state.web3.isInjected,
      hasWeb3InjectedBrowser: state => state.user.hasWeb3InjectedBrowser,
      isConnectedToApprovedNetwork: state => state.user.isConnectedToApprovedNetwork,
      hasCoinbase: state => state.user.hasCoinbase,
      networkId: state => state.web3.networkId,
      coinbase: state => state.web3.coinbase,
      currentRoute: state => state.currentRoute,
      user: state => state.user
    }),
    isLoggedIn () {
      return this.$store.state.user.isLoggedIn
    }
  },
  methods: {
    ...mapActions([
      ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO,
      ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS
    ])
  },

  watch: {
    async hasInjectedWeb3 (has) {
      if (has) {
        if (!this.isLoggedIn) {
          try {
            const userData = await Auth.login(this.$store.state)
            await this[ACTION_TYPES.LOGIN](userData)
          } catch (error) {
          }

          if (!this.user.isLoggedIn) {
            this.$router.push('/')
          } else {
            this.$router.push('/dashboard')
          }
        }
      }
    }
  },

  async beforeCreate () {
    await this.$store.dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
    await this.$store.dispatch(ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS)
  },

  async created () {
    this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](this.$route)
  }
}
</script>

<style lang="postcss">
body {
  margin: 0;
  width: 100%;

  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;

  overflow-y: scroll;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

.app {
  display: flex;
  flex-direction: column;

  min-height: 100vh;

  &__header {}
  &__body {
    flex-grow: 1;
  }
}

.el-header {
  padding: 0;
}
</style>

