const Router = require('koa-joi-router');
const q = require('../db/queries/users');

const { Joi } = Router;
const router = Router();

router.route({
  method: 'post',
  path: '/registration',
  validate: {
    body: {
      username: Joi.string().min(3).max(10).required(),
      password: Joi.string().min(3).max(10).required(),
    },
    type: 'json',
    continueOnError: true,
  },
  handler: async (ctx) => {
    if (ctx.invalid) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        data: ctx.invalid.body,
      };
      return;
    }

    try {
      const { body } = ctx.request;
      const issetUser = await q.issetUser(body);

      if (issetUser) {
        ctx.status = 400;
        ctx.body = {
          status: 'error',
          data: 'User exist',
        };
        return;
      }

      await q.createUser(body);
      const newUser = await q.getUserByUsername(body.username);
      const { id, username } = newUser;
      ctx.body = {
        status: 'success',
        data: { id, username },
      };
    } catch (err) {
      console.log(err);
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message || 'Sorry, an error has occurred.',
      };
    }
  },
});

module.exports = router;
