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

<style lang="scss">
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


.flex {
  display: flex;
  flex-direction: row;
  width: 100%;

  &-item {
    margin-left: 20px;
    &:nth-child(1) { margin-left: 0; }
    &_grow {
      flex-grow: 1;
    }
    &_non-grow {
      flex-grow: 0;
    }

    &_shrink {
      flex-shrink: 1;
    }
    &_non-shrink {
      flex-shrink: 0;
    }
  }
}


.a {
  &-flex {
    display: flex;
    align-items: center;

    &__item {
      &_space {
        &-left { margin-left: auto }
        &-right { margin-right: auto }
      }
    }
  }
  &-image {
    &_responsive {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }
  &-card {
    &__image {
      display: block;
      &-holder { 
        overflow: hidden;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  &-assets-list {
    &__asset { margin-bottom: 40px; }
  }

  &-label {
    &_code {
      font-family: monospace;
      background-color: #EDF2FC;
    }
    &_no-wrap { white-space: nowrap }
  }
  &-flex {
    display: flex;
    align-items: center;

    &__item {
      &_space {
        &-left { margin-left: auto }
        &-right { margin-right: auto }
      }
    }
  }
  &-m,
  &-margin {
    &_right,
    &_r {
      &_10 { margin-right: 10px }
      &_20 { margin-right: 20px }
      &_30 { margin-right: 30px }
      &_40 { margin-right: 40px }
      &_50 { margin-right: 50px }
    }
    &_left,
    &_l {
      &_10 { margin-left: 10px }
      &_20 { margin-left: 20px }
      &_30 { margin-left: 30px }
      &_40 { margin-left: 40px }
      &_50 { margin-left: 50px }
    }
    &_bottom,
    &_b {
      &_10 { margin-bottom: 10px }
      &_20 { margin-bottom: 20px }
      &_30 { margin-bottom: 30px }
      &_40 { margin-bottom: 40px }
      &_50 { margin-bottom: 50px }
    }
  }
}
</style>

