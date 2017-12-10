<template lang="pug">
  el-row
    el-col(:span='23')
      h2 Submit Project
        
      el-steps(:active='currentStep' style='margin-bottom: 40px')
        el-step(title='Create', description='Register rights on idea')
        el-step(title='Tokenize', description='Configure rights token')
        el-step(title='Manage', description='Setup organization')
        el-step(title='Offer', description='Get money to implement')

      el-row(:gutter='40' style='margin-bottom: 60px;')
        el-col(:span='16')
          //- Content here
          el-row(v-if='currentStep === 0')
            el-col(:span='24')
              h3 Project Details
              el-form(label-position='top', label-width='100px', :model='idea')
                el-row(:gutter='20')
                  el-col(:span='8')
                    el-form-item(label='Cover Image')
                      el-upload.avatar-uploader(
                        action='https://jsonplaceholder.typicode.com/posts/'
                        drag
                        :show-file-list='false'
                        :on-success='handleAvatarSuccess'
                        :before-upload='beforeAvatarUpload')
                        img.avatar(v-if='imageUrl', :src='imageUrl')
                        i.el-icon-plus.avatar-uploader-icon(v-else='')
                  el-col(:span='8')
                    el-form-item(label='Cover Image')
                      el-upload.avatar-uploader(
                        action='https://jsonplaceholder.typicode.com/posts/'
                        drag
                        :show-file-list='false'
                        :on-success='handleAvatarSuccess'
                        :before-upload='beforeAvatarUpload')
                        img.avatar(v-if='imageUrl', :src='imageUrl')
                        i.el-icon-plus.avatar-uploader-icon(v-else='')
                  el-col(:span='8')
                    el-form-item(label='Cover Image')
                      el-upload.avatar-uploader(
                        action='https://jsonplaceholder.typicode.com/posts/'
                        drag
                        :show-file-list='false'
                        :on-success='handleAvatarSuccess'
                        :before-upload='beforeAvatarUpload')
                        img.avatar(v-if='imageUrl', :src='imageUrl')
                        i.el-icon-plus.avatar-uploader-icon(v-else='')
                el-form-item(label='Project Name')
                  el-input(v-model='idea.name')
                el-form-item(label='Description')
                  el-input(
                    type="textarea" 
                    v-model='idea.description'
                    :autosize="{ minRows: 5, maxRows: 10}"
                  )
                el-form-item(label='Project Type')
                  el-cascader(
                    placeholder='Select Type'
                    :options='projectTypes'
                    v-model='idea.type'
                    style='width: 100%'
                  )
          el-row(v-if='currentStep === 1')
            el-col(:span='24')
              h3 Token Details
        el-col(:span='8')
          h3 Project Setup
          el-button(type='text' @click='reset') Reset

      el-button-group
        el-button(icon='el-icon-arrow-left' :disabled='disableBack' @click='step(-1)') Back
        el-button(type='primary' :disabled='disableNext' @click='step(1)')
          span Next step
          i.el-icon-arrow-right.el-icon-right
</template>

<script>
import projectTypes from '~/src/util/projectTypes'
export default {
  name: 'Submit',
  props: ['user'],

  data () {
    return {
      currentStep: 0,
      idea: {},
      projectTypes,
      inMiddleWay: true
    }
  },

  computed: {
    disableBack () {
      return false
    },

    disableNext () {
      return false
    }
  },

  methods: {
    step (direction) {
      this.currentStep += direction
    },

    reset () {
      if (this.inMiddleWay) {
        this.$confirm('Are you sure to reset idea? You\'re already spent gas on some transactions')
          .then(this._reset)
          .catch(_ => {})
      } else {
        this.idea = {}
        this.currentStep = 0
      }
    }
  }
}
</script>

<style lang="postcss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
