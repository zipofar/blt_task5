const isAuth = (ctx) => {
  const { user } = ctx.session.state;
  if (!user.userIsAuth) {
    ctx.status = 401;
    return false;
  }
  return true;
};

module.exports = isAuth;
