const Router = require('koa-router');
const _ = require('lodash');
const q = require('../db/queries/users');
const LoginAction = require('../actions/auth/LoginAction');

const router = new Router();

router.post('/auth/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const user = await q.getUserByUsername(username);
    const { error: loginError, ok: jwtToken } = LoginAction(user, password);
    if (!_.isUndefined(loginError)) {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'Login or Password Incorrect',
      };
    } else {
      ctx.body = {
        status: 'success',
        data: jwtToken,
      };
    }
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

module.exports = router;
