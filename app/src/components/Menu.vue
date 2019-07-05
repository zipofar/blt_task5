<template>
  <div class="menu">
    <ul>
      <li><a href="#/">Home</a></li>
      <li><a href="#/login">Login</a></li>
      <li><a href="#/registration">Registration</a></li>
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
    }
  },
  methods: {
  },
  created: function () {
  }
}
</script>
