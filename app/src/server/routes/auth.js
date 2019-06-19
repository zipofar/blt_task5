const Router = require('koa-joi-router');
const qUser = require('../db/queries/users');
const LoginAction = require('../actions/auth/LoginAction');

const { Joi } = Router;
const router = Router();

router.route({
  method: 'post',
  path: '/auth/login',
  validate: {
    body: {
      username: Joi.string().min(3).required(),
      password: Joi.string().min(3).required(),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    const { username, password } = ctx.request.body;
    const user = await qUser.getByColumn('username', username);

    if (!user) {
      ctx.throw(404, 'Login or Password Incorrect');
    }

    const jwtToken = LoginAction(user, password);

    if (!jwtToken) {
      ctx.throw(404, 'Login or Password Incorrect');
    }

    ctx.body = {
      data: jwtToken,
    };
  },
});

module.exports = router;
