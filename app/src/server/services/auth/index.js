const isAuth = (ctx) => {
  const { userIsAuth } = ctx.session.state.user;
  return userIsAuth;
};

const isAdmin = (ctx) => {
  const { role } = ctx.session.state.user;
  return role === 'admin';
};

module.exports = {
  isAuth,
  isAdmin,
};
