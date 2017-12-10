<template lang="pug">
  span.a-currency
    span(v-if='ticker && !tickerOnRight').a-currency__ticker.a-currency__ticker_left {{ ticker }}
    span(v-if='ticker && !tickerOnRight && !stitchTicker') &nbsp;
    span.a-currency__fixed {{ fixedPart }}
    span.a-currency__divider {{ dividerSign }}
    span.a-currency__decimals {{ decimalsPart }}
    span(v-if='ticker && tickerOnRight && !stitchTicker') &nbsp;
    span(v-if='ticker && tickerOnRight').a-currency__ticker.a-currency__ticker_right {{ ticker }}
</template>
<script>
export default {
  name: 'Currency',
  props: ['decimals', 'value', 'ticker', 'tickerOnRight', 'stitchTicker', 'dot'],

  computed: {
    divider () {
      const decimals = typeof this.decimals === 'object'
        ? this.decimals.toNumber()
        : parseInt(this.decimals)
      return Math.max(1, 10 ** decimals)
    },
    divided () {
      const value = typeof this.value === 'object'
        ? this.value.div(this.divider).toNumber()
        : parseInt(this.value) / this.divider
      return value
    },
    decimalsPart () {
      return Math.floor((this.divided - Math.floor(this.divided)) * this.divider)
    },
    fixedPart () {
      return Math.floor(this.divided)
    },
    dividerSign () {
      return this.dot || '.'
    }
  }
}
</script>