const Router = require('koa-joi-router');
const qUser = require('../db/queries/users');
const params = require('../utils/paramsChecker');
const LoginAction = require('../actions/auth/LoginAction');
const initState = require('../initAppState');

const { Joi } = Router;
const router = Router();
const permitParams = ['username', 'id', 'role'];

router.route({
  method: 'post',
  path: '/api/v1/auth/login',
  validate: {
    body: {
      username: Joi.string().min(3).required().error(new Error('Login length must be at least 3 characters long')),
      password: Joi.string().min(3).required().error(new Error('Password length must be at least 3 characters long')),
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

    const userInfo = params(user).permit(permitParams);
    const updatedUserInfo = { ...userInfo, userIsAuth: true };

    ctx.body = updatedUserInfo;
    ctx.session.state.user = updatedUserInfo;

    ctx.cookies.set('jwtToken', jwtToken);
  },
});

router.route({
  method: 'post',
  path: '/api/v1/auth/logout',
  handler: async (ctx) => {
    if (ctx.session.state.user.userIsAuth) {
      ctx.session.state = initState;
      ctx.body = initState;
    } else {
      ctx.throw(404, 'Your are not user');
    }
  },
});

module.exports = router;
