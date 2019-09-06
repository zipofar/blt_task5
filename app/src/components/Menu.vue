<template>
  <div class="menu">
    <ul>
      <li><a href="#/">Home</a></li>
      <li v-if="isGuest"><a href="#/login">Login</a></li>
      <li v-if="isGuest"><a href="#/registration">Registration</a></li>
      <li v-if="!isGuest">Hello, {{ userName }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data: function () {
    return {
      currentPage: 1,
      pages: [],
      userName: this.$store.state.user.username,
      isGuest: !this.$store.state.userIsAuth,
    }
  },
  methods: {
  },
  created: function () {
  }
}
</script>
