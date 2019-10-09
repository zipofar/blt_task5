const initState = {
  user: {
    userIsAuth: false,
    role: '',
  },
  UILogin: {
    makeLogin: '',
    errMsg: '',
  },
  UIRegistration: {
    makeRegistration: '',
    errMsg: '',
  },
  numCurrentPagination: 1,
};

module.exports = initState;
