<template>
  <div id="app">
    <Menu />
    <MainPage />
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu,
    MainPage,
  }
}
</script>
