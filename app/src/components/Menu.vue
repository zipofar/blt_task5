<template>
  <div class="menu">
    <ul>
      <li><a href="#/">Home</a></li>
      <li v-if="isGuest"><a href="#/login">Login</a></li>
      <li v-if="isGuest"><a href="#/registration">Registration</a></li>
      <li v-if="!isGuest">Hello, {{ username }} <button v-on:click="logout">Logout</button></li>
    </ul>
  </div>
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
