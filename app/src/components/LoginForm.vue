<template>
  <div class="container">

    <b-form @submit="onSubmit">

      <b-form-group
        id="login-group-1"
        label="Login:"
        label-for="input-login"
      >

        <b-form-input
          id="input-login"
          v-model="login"
          required
          placeholder="Enter login"
        ></b-form-input>

      </b-form-group>

      <b-form-group
        id="password-group-1"
        label="Password:"
        label-for="input-password"
      >

        <b-form-input
          id="input-password"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>

        <b-form-invalid-feedback :state="!issetErr">
          {{ validationErr }}
        </b-form-invalid-feedback>

      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>

    </b-form>

  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data: function () {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    onSubmit (e) {
      e.preventDefault();
      const payload = {
        username: this.login,
        password: this.password,
        router: this.$router,
      };

      this.$store.dispatch('login', payload);
    },
  },
  computed: {
    validationErr () {
      return this.$store.state.UILogin.errMsg;
    },
    issetErr () {
      return this.$store.state.UILogin.makeLogin === 'failure';
    },
  },
}
</script>
