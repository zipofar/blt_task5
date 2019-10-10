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
          :state="loginFieldState"
          @blur="changeStateLoginField"
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
          :state="passwordFieldState"
          @blur="changeStatePasswordField"
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
          :state="passwordConfirmFieldState"
          @blur="changeStatePasswordConfirmField"
        ></b-form-input>

        <b-form-invalid-feedback :state="!issetErr">
          {{ validationErr }}
        </b-form-invalid-feedback>

      </b-form-group>
      <b-button type="submit" :disabled="isSubmitBtnDisabled" :variant="colorSubmit">Register</b-button>

    </b-form>

  </div>
</template>

<script>
const isValidLogin = (text) => (text !== '' && text.length > 2);
const isValidPassword = (text) => (text !== '' && text.length > 2);

const mapState = (state, dataIsValid) => {
  if (state === 'init') {
    return null;
  }
  if (state === 'success' && !dataIsValid) {
    return false;
  }
  if (state === 'success' && dataIsValid) {
    return true;
  }
  if (state === 'failure' && dataIsValid) {
    return true;
  }
  if (state === 'failure' && !dataIsValid) {
    return false;
  }
};

export default {
  name: 'RegistrationForm',
  data: function () {
    return {
      login: '',
      password: '',
      confirmPassword: '',
      loginFieldStateStore: 'init',
      passwordFieldStateStore: 'init',
      passwordConfirmFieldStateStore: 'init',
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const payload = {
        username: this.login,
        password: this.password,
        router: this.$router,
      };

      this.$store.dispatch('makeRegistration', payload);
    },
    changeStateLoginField() {
      this.loginFieldStateStore = isValidLogin(this.login) ? 'success' : 'failure';
    },
    changeStatePasswordField() {
      this.passwordFieldStateStore = isValidPassword(this.password) ? 'success' : 'failure';
    },
    changeStatePasswordConfirmField() {
      const isSamePassword = this.confirmPassword === this.password;
      this.passwordConfirmFieldStateStore = isValidPassword(this.confirmPassword) && isSamePassword ? 'success' : 'failure';
    },
  },
  computed: {
    validationErr() {
      return this.$store.state.UIRegistration.errMsg;
    },
    issetErr() {
      return this.$store.state.UIRegistration.makeRegistration === 'failure';
    },
    passwordConfirmFieldState() {
      return mapState(this.passwordConfirmFieldStateStore, isValidPassword(this.password));
      return this.password === this.confirmPassword && this.confirmPassword !== '' && this.confirmPassword.length > 2;
    },
    passwordFieldState() {
      return mapState(this.passwordFieldStateStore, isValidPassword(this.password));
    },
    loginFieldState() {
      return mapState(this.loginFieldStateStore, isValidLogin(this.login));
    },
    isSubmitBtnDisabled() {
      return !this.loginFieldState || !this.passwordFieldState || !this.passwordConfirmFieldState;
    },
    colorSubmit() {
      return this.isSubmitBtnDisabled ? '' : 'primary';
    },
  },
}
</script>
