const isAuth = (ctx) => {
  const { user } = ctx.state;
  if (typeof user === 'undefined') {
    ctx.status = 401;
    return false;
  }
  return true;
};

module.exports = isAuth;
