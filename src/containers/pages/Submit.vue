<template lang="pug">
  el-row
    el-col(:span='23')
      h2 Submit Idea
        
      el-steps(:active='currentStep' style='margin-bottom: 40px')
        el-step(title='Create', description='Register rights on idea')
        el-step(title='Tokenize', description='Configure rights token')
        el-step(title='Manage', description='Setup organization')
        el-step(title='Offer', description='Get money to implement')
</template>

<script>
export default {
  name: 'Submit',
  props: ['user'],

  data () {
    return {
      currentStep: 0
    }
  }
}
</script>
