const Router = require('koa-router');
const q = require('../db/queries/users');

const router = new Router();

router.get('/users', async (ctx) => {
  try {
    const users = q.getAllUsers();
    ctx.body = {
      status: 'success',
      data: users,
    };
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
