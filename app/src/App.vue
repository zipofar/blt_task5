<template>
  <div id="app">
    <Menu />
    <ListPages />
    <router-link to="/pages/1">Page 1</router-link>
    <router-link to="/pages/2">Page 2</router-link>
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
