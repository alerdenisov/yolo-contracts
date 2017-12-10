<template lang="pug">
  el-header.a-header
    el-menu.a-header__menu.a-menu(mode="horizontal" :router="true")
      el-menu-item.a-menu__item.menu-item(index="1" route="/") 
        strong YOLO
        span .place
      el-menu-item.a-menu__item.menu-item(index="8" route="/projects") Projects
      el-menu-item.a-menu__item.menu-item(index="2" route="/submit") Submit Project
      .a-menu__divider
      el-menu-item.a-menu__item.menu-item(index="4" route="/sign-up" v-if="!user.isLoggedIn") Sign Up
      el-menu-item.a-menu__item.menu-item(index="5" route="/profile/edit" v-if="user.isLoggedIn") Edit Profile
      el-menu-item.a-menu__item.menu-item(index="6" route="/" @click="logUserIn" v-if="!user.isLoggedIn") Login
      el-menu-item.a-menu__item.menu-item(index="7" route="/" @click="logUserOut" v-if="user.isLoggedIn") Logout
</template>

<script>
import Auth from '~/src/js/contracts/Auth'
import { mapActions } from 'vuex'
import { ACTION_TYPES } from '../util/constants'

export default {
  name: 'header',
  props: [ 'user' ],

  computed: {
  },

  methods: {
    async logUserIn () {
      const user = await Auth.login(this.$store.state)
      this[ACTION_TYPES.LOGIN](user)
    },

    logUserOut () {},

    ...mapActions([
      ACTION_TYPES.LOGIN
    ])
  }
}
</script>
