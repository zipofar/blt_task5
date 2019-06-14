const Router = require('koa-joi-router');
const q = require('../db/queries/pages');
const paginate = require('../utils/paginator');

const { Joi } = Router;
const router = Router();

router.get('/pages', async (ctx) => {
  const { page } = ctx.request.query;
  const pages = await q.getAll(paginate().page(page).perpage(2));
  ctx.body = {
    data: pages,
  };
});

router.get('/pages/:id', async (ctx) => {
  const page = await q.getById(ctx.params.id);
  if (page) {
    ctx.body = {
      data: page,
    };
  } else {
    ctx.throw(404, 'Page not found');
  }
});

router.route({
  method: 'post',
  path: '/pages',
  validate: {
    body: {
      title: Joi.string().min(1).max(100).required(),
      greeting: Joi.string().min(1).max(100).required(),
      content: Joi.string(),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    const { userId } = ctx.state.user;
    const newPage = await q.create({ ...ctx.request.body, user_id: userId });
    ctx.body = {
      data: newPage,
    };
  },
});

module.exports = router;
