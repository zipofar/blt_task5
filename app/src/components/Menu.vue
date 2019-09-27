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

	  <b-button
            v-if="isGuest"
            href="#/login"
            variant="outline-primary"
          >
            Login
          </b-button>

	  <b-button
            v-if="isGuest"
            href="#/registration"
            variant="outline-primary"
          >
            Registration
          </b-button>

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
import axios from 'axios';
import errorHandler from '../utils/errorHandler';

const apiBaseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'Menu',
  data: function () {
    return {
      currentPage: 1,
      pages: [],
      errMessage: '',
      fetchStateAppState: '',
      isAdmin: this.$store.getters.userIsAdmin,
    }
  },
  methods: {
    logout: function () {
      this.fetchStateAppState = 'request';
      this.errMessage = '';
      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: '/v1/auth/logout',
        headers: {
          'x-csrf-token': this.$cookie.get('csrf'),
        },
      })
      .then(({ data }) => {
        this.fetchStateAppState = 'success';
        this.$store.commit('updateState', data);
        this.errMessage = '';
      })
      .catch((err) => {
        this.fetchStateAppState = 'failure';
        this.errMessage = errorHandler(err);
      });
    }
  },
  computed: {
    username: function () {
      return this.$store.state.user.username;
    },
    isGuest: function () {
      return !this.$store.state.user.userIsAuth;
    },
  },
  beforeMount: function () {
    this.fetchStateAppState = 'request';
    this.errMessage = '';
    axios({
      method: 'get',
      baseURL: apiBaseUrl,
      url: '/v1/service/app_state',
    })
    .then(({ data }) => {
      this.fetchStateAppState = 'success';
      this.$store.commit('updateState', data);
      this.errMessage = '';
    })
    .catch((err) => {
      this.fetchStateAppState = 'failure';
      this.errMessage = errorHandler(err);
    });
  },
}
</script>
