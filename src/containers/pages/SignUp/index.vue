<template lang='pug'>
  .sign-up
    //- data.firstName, data.lastName, data.email
    el-form.sign-up__form(label-position='top', label-width='100px', :model='userData')
      el-form-item.sign-up__form-item(label='First Name')
        el-input(v-model='userData.firstName')
      el-form-item.sign-up__form-item(label='Last Name')
        el-input(v-model='userData.lastName')
      el-form-item.sign-up__form-item(label='Email')
        el-input(v-model='userData.email')
      el-form-item
        el-button(type='primary', @click='signUp') Sign Up
</template>

<script>
import Auth from '~/src/js/contracts/Auth'

export default {
  data () {
    return {
      userData: {}
    }
  },

  methods: {
    async signUp () {
      const signuptx = await Auth.signup(this.$store.state, this.userData)
      console.log(signuptx)
    }
  }
}
</script>

<style lang="scss">
.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #555861;

  &__form {
    max-width: 420px;
    width: 100%;

    padding: 30px;
    background-color: white;
  }
}
</style>
