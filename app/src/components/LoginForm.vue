<template>
  <div class="login">
    <input v-model="login" placeholder="Login">
    <input type="password" v-model="password" placeholder="Password">
    <button v-on:click="makeAuth">Login</button>
    <p v-if="errMessage !== ''"><i>{{ errMessage }}</i></p>
    <p v-if="fetchStateUser === 'request'"><i>Loading...</i></p>
    <p v-if="fetchStateUser === 'success'"><i>Hello, {{ username }}</i></p>
  </div>
</template>

<script>
import axios from 'axios';
import errorHandler from '../utils/errorHandler';

const apiBaseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'LoginForm',
  data: function () {
    return {
      login: '',
      password: '',
      csrf: '',
      errMessage: '',
      fetchStateUser: '',
      fetchStateCsrf: '',
    };
  },
  methods: {
    makeAuth: function () {
      this.fetchStateUser = 'request';
      this.errMessage = '';
      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: '/v1/auth/login',
        headers: {
          'x-csrf-token': this.$cookie.get('csrf'),
        },
        data: {
          username: this.login,
          password: this.password,
        },
      })
      .then(({ data }) => {
        this.fetchStateUser = 'success';
        this.errMessage = '';
        this.$store.commit('updateUser', data);
      })
      .catch((err) => {
        this.fetchStateUser = 'failure';
        this.errMessage = errorHandler(err);
      })
    },
  },
  computed: {
    username: function () {
      return this.$store.state.user.username;
    }
  },
}
</script>
