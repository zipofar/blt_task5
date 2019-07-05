<template>
  <div class="login">
    <input v-model="login" placeholder="Login">
    <input type="password" v-model="password" placeholder="Password">
    <button v-on:click="makeReg">Register</button>
  </div>
</template>

<script>
import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'RegistrationForm',
  data: function () {
    return {
      login: '',
      password: '',
      user: {},
      token: '',
    };
  },
  methods: {
    makeReg: function () {
      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: '/v1/registration',
        data: {
          username: this.login,
          password: this.password,
        },
      })
      .then((res) => {
        this.user = res.data.data.user;
        this.token = res.data.data.token;
      })
      .catch((err) => { console.log(err) })
    },
  },
}
</script>
