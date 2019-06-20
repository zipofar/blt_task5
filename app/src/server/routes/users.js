const Router = require('koa-joi-router');
const qUser = require('../db/queries/users');
const paginate = require('../utils/paginator');
const params = require('../utils/paramsChecker');
const isAuth = require('../services/auth/isAuth');

const router = Router();
const permitParams = ['username', 'id', 'role'];

router.get('/users', async (ctx) => {
  if (!isAuth(ctx)) {
    return;
  }
  const { page } = ctx.request.query;
  const users = await qUser.getAll(paginate().page(page).perpage(5));
  ctx.body = {
    data: users.map(u => (params(u).permit(permitParams))),
  };
});

router.get('/users/:id', async (ctx) => {
  if (!isAuth(ctx)) {
    return;
  }

  const user = await qUser.getByColumn('id', ctx.params.id);

  if (user) {
    ctx.body = {
      data: params(user).permit(permitParams),
    };
  } else {
    ctx.throw(404, 'User not found');
  }
});

module.exports = router;
