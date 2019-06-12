const Router = require('koa-joi-router');
const qUser = require('../db/queries/users');
const params = require('../utils/paramsChecker');

const router = Router();

router.get('/users', async (ctx) => {
  const users = await qUser.getAll();
  ctx.body = {
    data: users.map(u => (params(u).permit(['username', 'id', 'role']))),
  };
});

router.get('/users/:id', async (ctx) => {
  const user = await qUser.getByColumn('id', ctx.params.id);

  if (user) {
    ctx.body = {
      data: params(user).permit(['username', 'id', 'role']),
    };
  } else {
    ctx.throw(404, 'User not found');
  }
});

module.exports = router;
