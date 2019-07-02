<template>
  <div id="app">
    <Menu />
    <ListPages />
  </div>
</template>

<script>
import ListPages from './components/ListPages.vue'
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu,
    ListPages,
  }
}
</script>
