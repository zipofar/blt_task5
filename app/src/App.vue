<template>
  <div id="app">
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu,
  },
  beforeCreate: function () {
    this.$store.dispatch('loadState')
  },
}
</script>
