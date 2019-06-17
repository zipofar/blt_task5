const Router = require('koa-router');
const paginate = require('../utils/paginator');
const q = require('../db/queries/pages');

const router = new Router();

router.get('/', async (ctx) => {
  const { page } = ctx.request.query;
  const pages = await q.getAll(paginate().page(page).perpage(5));
  ctx.body = {
    data: pages,
  };
});

module.exports = router;
