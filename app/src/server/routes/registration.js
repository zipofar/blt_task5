const Router = require('koa-joi-router');
const bcrypt = require('bcryptjs');
const params = require('../utils/paramsChecker');
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
      ctx.status = 201;
      const userInfo = params(newUser).permit(permitParams);
      const updatedUserInfo = { ...userInfo, userIsAuth: true };

      ctx.body = updatedUserInfo;
      ctx.session.state.user = updatedUserInfo;
    } else {
      ctx.throw(422, 'User Exist');
    }
  },
});

module.exports = router;
