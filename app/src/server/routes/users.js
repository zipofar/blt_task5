const Router = require('koa-joi-router');
const q = require('../db/queries/users');

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
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
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
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

module.exports = router;
