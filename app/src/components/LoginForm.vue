<template>
  <div class="login">
    <input v-model="login" placeholder="Login">
    <input type="password" v-model="password" placeholder="Password">
    <button v-on:click="makeAuth">Login</button>
    <p v-if="errMessage !== ''"><i>{{ errMessage }}</i></p>
    <p v-if="fetchState === 'request'"><i>Loading...</i></p>
    <p v-if="fetchState === 'success'"><i>Hello, {{ user.username }}</i></p>
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
      errMessage: '',
      fetchState: '',
    };
  },
  methods: {
    makeAuth: function () {
      this.fetchState = 'request';
      this.errMessage = '';
      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: '/v1/auth/login',
        data: {
          username: this.login,
          password: this.password,
        },
      })
      .then((res) => {
        this.fetchState = 'success';
        this.user = res.data.data.user;
        this.errMessage = '';
        this.$store.commit('setUserAuth');
        this.$store.commit('setUserInfo', res.data.data.user);
      })
      .catch((err) => {
        this.fetchState = 'failure';
        this.errMessage = errorHandler(err);
      })
    },
  },
}
</script>
