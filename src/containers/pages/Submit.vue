<template lang="pug">
  el-row
    el-col(:span='16' :offset='4')
      h2 Submit Project
        
      el-steps(:active='currentStep' style='margin-bottom: 40px')
        el-step(title='Create', description='Register rights on idea')
        el-step(title='Tokenize', description='Configure rights token')
        el-step(title='Offer', description='Get money to implement')

      el-row(:gutter='40' style='margin-bottom: 60px;')
        el-col(:span='24')
          //- Content here
          el-row(v-if='currentStep === 0')
            el-col(:span='24')
              h3 Project Details
              el-form(label-position='top', label-width='100px', :model='idea')
                .flex
                  .flex-item.flex-item_grow
                    el-form-item(label='Cover Image')
                      el-upload.cover-uploader(
                        action='https://jsonplaceholder.typicode.com/posts/'
                        drag
                        :auto-upload='false'
                        :show-file-list='false'
                        :on-change='uploadCover'
                        v-loading='idea.coverLoading')
                        img.avatar(v-if='idea.coverUrl', :src='idea.coverUrl')
                        i.el-icon-plus.uploader-icon(v-else='')
                      //- input(type='file' @change='(evt) => uploadFile(evt, "cover")')
                  .flex-item
                    el-form-item(label='Project Logotype')
                      //- input(type='file' @change='(evt) => uploadFile(evt, "avatar")')
                      el-upload.avatar-uploader(
                        action='https://jsonplaceholder.typicode.com/posts/'
                        drag
                        :auto-upload='false'
                        :show-file-list='false'
                        :on-change='uploadAvatar'
                        v-loading='idea.avatarLoading')
                        img.avatar(v-if='idea.avatarUrl', :src='idea.avatarUrl')
                        i.el-icon-plus.uploader-icon(v-else='')
                el-form-item(label='Project Name')
                  el-input(v-model='idea.name')
                el-row.submit-project__description(:gutter='20' type='flex')
                  el-col.submit-project__description-col.submit-project__description-col_textarea(:span='12')
                    el-input.submit-project__description-textarea(
                      type="textarea" 
                      v-model='idea.description'
                    )
                  el-col.submit-project__description-col.submit-project__description-col_output(:span='12')
                    div.submit-project__description-output.markdown-output(v-html='compiledDescription')                        
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
              el-form(label-position='left' label-width='100px' :model='idea' ref='createAssetForm')
                el-form-item(label='Token Name' prop='name')
                  el-input(v-model='idea.token.name' @change="valid")
                el-form-item(label='Token Ticker' prop='ticker')
                  el-input(v-model='idea.token.ticker' @change="valid")
                el-form-item(label='Decimals' prop='decimals')
                  el-input(v-model.number='idea.token.decimals' type="number" @change="valid")

          el-form(label-position='left' label-width='100px' :model='idea' ref='createAssetForm' v-if='currentStep === 2' )
            el-row(:gutter='20')
              el-col(:span='24')
                h3 Setup Invest Round
              el-col(:span='24')
                  el-row(:gutter='20')
                    el-col(:span='8')
                      el-form-item(label='Start Date' prop='name')
                        el-date-picker(v-model='idea.ico.startRaw', type='date', placeholder='Pick a start date')
                    el-col(:span='8')
                      el-form-item(label='End Date' prop='name')
                        el-date-picker(v-model='idea.ico.endRaw', type='date', placeholder='Pick a end date')
              el-col(:span='24' v-if='icoDuration')
                h4 {{icoDuration}} day of crowdsale with a rules:
                
              el-col(:span='8' v-if='icoDuration')
                el-form-item(label='Cap' prop='name')
                  el-input(v-model.number='idea.ico.capPart' type="number")
                    span(slot='suffix') %
              el-col(:span='8' v-if='icoDuration')
                el-form-item(label='Total Supply' prop='name')
                  el-input(:value='1e6' type="number" :disabled='true')
                    span(slot='suffix') {{ idea.token.ticker }}
                    span(slot='prefix') of

            el-row(:gutter='20' v-if='icoAmount')
              el-col(:span='8')
                h4 {{icoAmount}} {{ idea.token.ticker }} will be offered with a price:

            el-row(:gutter='20' v-if='icoAmount')
              el-col(:span='8' v-if='icoDuration')
                el-form-item(label='Base Price' prop='name')
                  el-input(v-model='idea.ico.price' type="number")
                    span(slot='suffix') ETH
              el-col(:span='8' v-if='icoDuration')
                el-form-item(:label='`for 1 ${this.idea.token.ticker}`' prop='name')
            
            el-row(:gutter='20' v-if='idea.ico.price')
              h4 Bonuses:
              el-tabs(v-model='activeBonuse')
                el-tab-pane(label='Referal', name='first') Referal
                el-tab-pane(label='Amount', name='second') Amount
                el-tab-pane(label='Time', name='third') Time
                el-tab-pane(label='Personal', name='fourth') Personal
              
            //- div
              //- div(v-for='slice, index in slices').a-flex.a-m_b_10
              //-   el-col(:span='6').a-flex.a-m_r_20
              //-     span.a-label.a-label_no-wrap not less than &nbsp;
              //-     el-input(v-model.number='slice.min')
              //-       span(slot='suffix') {{leftTicker}}
              //-   ae-flat-pricing(
              //-     :state='initialState' 
              //-     :initialPrice='slice.price' 
              //-     :disableExample='true'
              //-     @result='(price) => setPrice(index, price)')
              //-   el-button(type='danger' icon='el-icon-close' @click='removeSlice(index)').a-flex__item_space-left
              //- div.a-m_b_10
              //-   el-button(type='primary' icon='el-icon-plus' @click='addSlice') Add slice
        //- el-col(:span='8')
        //-   h3 Project Setup
        //-   el-button(type='text' @click='reset') Reset

      el-button-group
        el-button(icon='el-icon-arrow-left' :disabled='disableBack' @click='step(-1)') Back
        el-button(type='primary' :disabled='disableNext' @click='step(1)')
          span Next step
          i.el-icon-arrow-right.el-icon-right
</template>

<script>
import marked from 'marked'
import projectTypes from '~/src/util/projectTypes'
import AeFlatPricing from './components/FlatPricing'
export default {
  name: 'Submit',
  props: ['user'],

  components: {
    AeFlatPricing
  },

  data () {
    return {
      currentStep: 2,
      idea: {
        token: {},
        ico: {}
        // avatarUrl: '/static/avatar.png',
        // coverUrl: '/static/cover.jpg'
      },
      projectTypes,
      inMiddleWay: true,
      avatarUrl: null,
      coverUrl: null
    }
  },

  computed: {
    icoAmount () {
      return 1e6 * this.idea.ico.capPart / 100
    },
    icoDuration () {
      if (!this.idea.ico.startRaw || !this.idea.ico.endRaw) {
        return 0
      }

      return this.idea.ico.endRaw.getDate() - this.idea.ico.startRaw.getDate()
    },
    disableBack () {
      return false
    },

    disableNext () {
      return false
    },
    compiledDescription () {
      return marked(this.idea.description || '', { sanitize: true })
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
    },

    uploadFile (event, prefix) {
      event.stopPropagation()
      event.preventDefault()
      const file = event.target.files[0]
      let reader = new window.FileReader()
      reader.onloadend = () => {
        this.uploadToIPFS(reader, prefix).then(r => {
          console.log(r.headers.get('ipfs-hash'))
          console.log(r.headers.keys())
          this.idea[prefix] = r
        })
      }
      reader.readAsArrayBuffer(file)
    },

    async uploadCover () {
      console.log('test')
      this.$set(this.idea, 'coverLoading', true)
      setTimeout(() => {
        this.$set(this.idea, 'coverUrl', '/static/cover.jpg')
        this.$set(this.idea, 'coverLoading', false)
      }, 1700)
    },

    async uploadAvatar () {
      console.log('test')
      this.$set(this.idea, 'avatarLoading', true)
      setTimeout(() => {
        this.$set(this.idea, 'avatarUrl', '/static/avatar.png')
        this.$set(this.idea, 'avatarLoading', false)
      }, 400)
    },

    uploadToIPFS (file, prefix) {
      // empty folder
      const hash = 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn'
      const domain = 'http://localhost:5001'
      console.log(file.result)
      // return fetch(`https://ipfs.macholibre.org/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn/${this.idea.name}-${prefix}`, {
      //   method: 'DELETE',
      //   redirect: 'manual'
      // }).then(deleteResponse => {
      //   // but PUT doesn't return the hash we'd expect if the file exists, so we first get a tree without it
      //   let clearedHash = deleteResponse.headers.get('ipfs-hash') || 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn'
      //   return fetch(`https://ipfs.macholibre.org/ipfs/${clearedHash}/${this.idea.name}-${prefix}`, {
      //     method: 'PUT',
      //     body: file.result,
      //     redirect: 'manual'
      //   })

      return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest()
        req.onreadystatechange = () => {
          if (req.readyState !== XMLHttpRequest.DONE) {
            return
          }

          if (req.status >= 200 && req.status < 300) {
            resolve(req.getResponseHeader('ipfs-hash'))
          } else {
            reject(req)
          }
        }

        req.onerror = (error) => { reject(error) }
        req.open('PUT', `${domain}/ipfs/${hash}/${prefix}`, true)
        // req.setRequestHeader(`content-type`, `image/png`)
        req.send(file.result)
      })
    }
  }
}
</script>

<style lang="scss">
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .markdown-output {
    height: 100%;
    overflow: hidden;
  }

  .submit-project {
    &__description {
      max-height: 65vh;
      overflow: hidden;

      &-output,
      &-textarea,
      &-textarea textarea {
        height: 100%;
        overflow: auto;
      }
    }    
  }

  .cover-uploader {
    .el-upload,
    .el-upload-dragger {
      width: 100%;
    }
  }

  .avatar-uploader {
    .el-upload-dragger {
      width: 180px;
      height: 180px;
    }
  }
  
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
