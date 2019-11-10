const Router = require('koa-joi-router');
const _ = require('lodash');
const qUser = require('../db/queries/users');
const paginate = require('../utils/paginator');
const params = require('../utils/paramsChecker');
const { isAdmin } = require('../services/auth');

const router = Router();
const permitParams = ['username', 'id', 'role'];
const perPage = 5;

router.get('/api/v1/users', async (ctx) => {
  if (!isAdmin(ctx)) {
    ctx.status = 403;
    return;
  }
  const { page } = ctx.request.query;
  const users = await qUser.getAll(paginate().page(page).perpage(5));
  const countRecords = await qUser.countRecords();
  const countPagination = Math.ceil(countRecords / perPage);
  if (_.isEmpty(users)) {
    ctx.status = 404;
  } else {
    ctx.body = {
      users: users.map(u => (params(u).permit(permitParams))),
      countPagination,
    };
  }
});

router.get('/api/v1/users/:id', async (ctx) => {
  if (!isAdmin(ctx)) {
    ctx.status = 403;
    return;
  }

  const user = await qUser.getByColumn('id', ctx.params.id);

  if (user) {
    ctx.body = {
      user: params(user).permit(permitParams),
    };
  } else {
    ctx.throw(404, 'User not found');
  }
});

module.exports = router;
