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
  UIPages: {
    numCurrentPagination: 1,
    countPagination: 1,
    stateFetch: '',
  },
  pages: [],
};

module.exports = initState;
