<template>
  <div class="login" v-if="userIsAuth">
    <input v-model="login" placeholder="Login">
    <input type="password" v-model="password" placeholder="Password">
    <button v-on:click="makeRegister">Register</button>
    <p v-if="errMessage !== ''"><i>{{ errMessage }}</i></p>
  </div>
</template>

<script>
import axios from 'axios';
import errorHandler from '../utils/errorHandler';

const apiBaseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'RegistrationForm',
  data: function () {
    return {
      login: '',
      password: '',
      errMessage: '',
      userIsAuth: !this.$store.state.user.userIsAuth,
      fetchStateUser: '',
    };
  },
  methods: {
    makeRegister: function () {
      this.errorMsg = '';
      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: '/v1/registration',
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
        this.$store.commit('updateUser', data);
        this.$router.push({ name: 'root' });
      })
      .catch((err) => {
        this.fetchStateUser = 'failure';
        this.errMessage = errorHandler(err);
      })
    },
  },
}
</script>
