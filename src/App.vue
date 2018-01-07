<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
    <div class="md-overlay" v-show="overLayFlag" @click="hideOverLay"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/Header/Header'
import NavFooter from '@/components/Footer/Footer'

export default {
  name: 'app',
  components: {
    NavHeader,
    NavFooter
  },
  data() {
    return {
      overLayFlag: false
    }
  },
  created() {
    this.toggleOverLay()
    this.hideOverLay()
  },
  methods: {
    toggleOverLay() {
      this.$bus.$on('toggle-overLay', (flag) => {
        this.overLayFlag = flag
      })
    },
    hideOverLay() {
      this.overLayFlag = false
      this.$bus.$emit('hide-filterPop')
    }
  },
  beforeDestroy() {
    this.$bus.$off('toggle-overLay')
  }
};
</script>

<style>
@import "~./../assets/css/base.css";
@import "~./../assets/css/checkout.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
