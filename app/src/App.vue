<template>
  <div id="app">
    <Menu />
    <ListPages />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Page from './components/Page.vue'
import ListPages from './components/ListPages.vue'

export default {
  name: 'app',
  components: {
    Menu,
    Page,
    ListPages,
  }
}
</script>
