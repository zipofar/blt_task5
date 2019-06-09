const Router = require('koa-joi-router');
const _ = require('lodash');
const q = require('../db/queries/users');

const { Joi } = Router;
const router = Router();

router.get('/users', async (ctx) => {
  try {
    const users = await q.getAllUsers();
    ctx.body = {
      status: 'success',
      data: users,
    };
  } catch (err) {
    console.log(err);
  }
});

router.get('/users/:id', async (ctx) => {
  try {
    const user = await q.getUserById(ctx.params.id);
    ctx.body = {
      status: 'success',
      data: user,
    };
  } catch (err) {
    console.log(err);
  }
});

router.route({
  method: 'post',
  path: '/users',
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

    const { username, password } = ctx.request.body;

    try {
      const user = await q.getUserByUsername(username);

      if (!_.isUndefined(user)) {
        ctx.status = 400;
        ctx.body = {
          status: 'error',
          data: 'User exist',
        };
        return;
      }

      await q.createUser({ username, password });
      const newUser = await q.getUserByUsername(username);
      console.log(newUser)
      ctx.body = {
        status: 'success',
        data: { id: newUser.id, username: newUser.username },
      };
    } catch (err) {
      console.log(err);
    }
  },
});

module.exports = router;
