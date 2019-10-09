<template>

  <div class="container">

    <b-form @submit="onSubmit">

      <b-form-group
        id="login-group-1"
        label="Login:"
        label-for="input-login"
        description="Length must be at least 3 characters long"
      >

        <b-form-input
          id="input-login"
          v-model="login"
          required
          placeholder="Enter login"
          :state="loginIsFill"
        ></b-form-input>

      </b-form-group>

      <b-form-group
        id="password-group-1"
        label="Password:"
        label-for="input-password"
        description="Length must be at least 3 characters long"
      >

        <b-form-input
          id="input-password"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
          :state="passwordIsFill"
        ></b-form-input>

      </b-form-group>

      <b-form-group
        id="password-group-2"
        label="Confirm password:"
        label-for="input-password-confirm"
      >

        <b-form-input
          id="input-password-confirm"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Enter password"
          :state="passwordIsSame"
        ></b-form-input>

        <b-form-invalid-feedback :state="!issetErr">
          {{ validationErr }}
        </b-form-invalid-feedback>

      </b-form-group>
      <b-button type="submit" :disabled="submitIsOff" :variant="colorSubmit">Login</b-button>

    </b-form>

  </div>
</template>

<script>
export default {
  name: 'RegistrationForm',
  data: function () {
    return {
      login: '',
      password: '',
      confirmPassword: '',
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

      this.$store.dispatch('makeRegistration', payload);
    },
  },
  computed: {
    validationErr() {
      return this.$store.state.UIRegistration.errMsg;
    },
    issetErr() {
      return this.$store.state.UIRegistration.makeRegistration === 'failure';
    },
    passwordIsSame() {
      return this.password === this.confirmPassword && this.confirmPassword !== '' && this.confirmPassword.length > 2;
    },
    passwordIsFill() {
      return this.password !== '' && this.password.length > 2;
    },
    loginIsFill() {
      return this.login !== '' && this.login.length > 2;
    },
    submitIsOff() {
      return !this.loginIsFill || !this.passwordIsFill || !this.passwordIsSame;
    },
    colorSubmit() {
      return this.submitIsOff ? '' : 'primary';
    },
  },
}
</script>
