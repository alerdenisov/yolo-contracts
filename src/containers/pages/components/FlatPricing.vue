<template lang="pug">
  el-row
    el-col(:span='24').a-flex
      span &nbsp;{{model.left}}&nbsp;{{leftTicker}}&nbsp;is&nbsp;
      el-input(v-model.number='model.right')
        span(slot='suffix') {{rightTicker}}
      div(v-if='!disableExample').a-flex.a-flex__item.a-flex__item_space-left
        span &nbsp;example:&nbsp;
        el-input(v-model.number='model.test')
          span(slot='suffix') {{leftTicker}}
        span &nbsp;will&nbsp;be&nbsp;{{change(model.test).toString(10)}}&nbsp;{{rightTicker}}
</template>

<script>
export default {
  props: [ 'state', 'disableExample', 'initialPrice', 'bn' ],

  computed: {
    initialState () {
      return this.state
    },
    left () {
      return this.bn(this.model.left || 0)
    },
    leftDecimals () {
      switch (this.initialState.type) {
        case 'ether':
          return 18
        case 'bitcoin':
          return 1
        case 'token':
          return 10
      }
    },
    leftTicker () {
      switch (this.initialState.type) {
        case 'ether':
          return 'ETH'
        case 'bitcoin':
          return 'BTC'
        case 'token':
          return 'ALT'
      }
    },
    right () {
      return this.bn(this.model.right || 0)
    },
    rightDecimals () {
      return this.$store.state.assets.list[this.initialState.asset].decimals.toNumber()
    },
    rightTicker () {
      return this.$store.state.assets.list[this.initialState.asset].ticker
    },
    price () {
      return this.left
        .mul(10 ** this.leftDecimals)
        .mul(10 ** this.leftDecimals)
        .div(
          this.right.mul(10 ** this.leftDecimals)
        )
        .floor()
    },
    maxCap () {
      return this.$store.state.assets.list[this.initialState.asset].maxCap || 0
    },
    maxCapPrice () {
      return this.bn(this.price).mul(this.maxCap.div(10 ** this.rightDecimals).floor())
    }
  },

  data () {
    return {
      model: {
        left: 1,
        right: 1e18 / (this.initialPrice || 1e17),
        test: 1.55
      }
    }
  },

  mounted () {
    this.$emit('result', this.price)
  },

  watch: {
    price (value) {
      if (value) {
        this.$emit('result', value)
      }
    }
  },

  methods: {
    change (eth) {
      return this.bn(eth)
        .mul(10 ** this.leftDecimals)
        .mul(10 ** this.rightDecimals)
        .div(this.price)
        .div(10 ** this.rightDecimals)
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-input {
    width: auto
  }
</style>
