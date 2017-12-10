<template lang="pug">
  el-container(width='100%')
    el-main
      router-view
</template>

<script>
export default {
  name: 'body',
  props: ['user']
}
</script>
