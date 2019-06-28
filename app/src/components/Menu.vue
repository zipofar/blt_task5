<template>
  <div class="menu">
    <ul>
      <li><a href="">Login</a></li>
      <li><a href="">Registration</a></li>
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
