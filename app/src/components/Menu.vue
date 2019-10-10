<template>
  <b-navbar toggleable="lg">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav>
	<b-nav-item href="#/">Home</b-nav-item>
	<b-nav-item
          v-b-tooltip.hover
          title="Only for admin"
          href="#/users"
          v-bind:disabled="!isAdmin"
        >
          Users
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
	<b-nav-form inline>

          <b-button-group v-if="isGuest">
            <b-button
              href="#/login"
              variant="outline-primary"
            >
              Login
            </b-button>

            <b-button
              href="#/registration"
              variant="outline-primary"
            >
              Registration
            </b-button>
          </b-button-group>

	  <b-form-group
	    v-if="!isGuest"
	    :label="username"
            label-for="btn-logout"
	    label-cols-sm="4"
	    label-cols-lg="4"
          >
	    <b-button v-on:click="logout" id="btn-logout">Logout</b-button>
	  </b-form-group>
	</b-nav-form>
      </b-navbar-nav class="ml-auto">

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    logout: function () {
      this.$store.dispatch('logout');
    }
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    isGuest() {
      return !this.$store.getters.userIsAuth;
    },
    isAdmin() {
      return this.$store.getters.userIsAdmin;
    },
  },
}
</script>
