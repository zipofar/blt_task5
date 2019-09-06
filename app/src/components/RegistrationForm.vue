<template>
  <div class="login" v-if="userIsAuth">
    <input v-model="login" placeholder="Login">
    <input type="password" v-model="password" placeholder="Password">
    <button v-on:click="makeRegister">Register</button>
    <p v-if="errorMsg">{{ errorMsg }}</p>
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
      errorMsg: '',
      userIsAuth: this.$store.state.userIsAuth,
    };
  },
  methods: {
    makeRegister: function () {
      this.errorMsg = '';
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
        this.$store.commit('setUserAuth');
        this.$store.commit('setUserInfo', res.data.data.user);
      })
      .catch((err) => {
        this.errorMsg = err.response.data.message;
      })
    },
  },
}
</script>
