const Router = require('koa-joi-router');
const bcrypt = require('bcryptjs');
const params = require('../utils/paramsChecker');
const LoginAction = require('../actions/auth/LoginAction');
const qUser = require('../db/queries/users');

const { Joi } = Router;
const router = Router();
const permitParams = ['username', 'id', 'role'];

router.route({
  method: 'post',
  path: '/api/v1/registration',
  validate: {
    body: {
      username: Joi.string().min(3).max(10).required(),
      password: Joi.string().min(3).max(10).required(),
    },
    type: 'json',
    continueOnError: false,
  },
  handler: async (ctx) => {
    const { username, password } = ctx.request.body;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await qUser.create({ username, password: hash });

    if (newUser) {
      const jwtToken = LoginAction(newUser, password);
      if (!jwtToken) {
        ctx.throw(404, 'Login or Password Incorrect');
      }
      ctx.status = 201;
      ctx.body = {
        data: {
          token: jwtToken,
          user: params(newUser).permit(permitParams),
        },
      };
    } else {
      ctx.throw(422, 'User Exist');
    }
  },
});

module.exports = router;
