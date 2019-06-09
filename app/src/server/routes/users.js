const Router = require('koa-router');
const q = require('../db/queries/users');

const router = new Router();

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

router.post('/users', async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const user = await q.getUserByUsername(username);
    console.log(user)
    ctx.body = {
      status: 'success',
      data: user,
    };
  } catch (err) {

  }
});

module.exports = router;
