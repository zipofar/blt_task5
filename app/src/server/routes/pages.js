const Router = require('koa-joi-router');
const _ = require('lodash');
const q = require('../db/queries/pages');
const paginate = require('../utils/paginator');
const { isAuth } = require('../services/auth');

const { Joi } = Router;
const router = Router();

router.get('/api/v1/pages', async (ctx) => {
  const { page } = ctx.request.query;
  const pages = await q.getAll(paginate().page(page).perpage(5));
  ctx.body = {
    data: pages,
  };
  if (_.isEmpty(pages)) {
    ctx.status = 404;
  }
});

router.get('/api/v1/pages/user/:id', async (ctx) => {
  const { page } = ctx.request.query;
  const pages = await q.getAllByUser(paginate().page(page).perpage(5));
  ctx.body = {
    data: pages,
  };
});

router.get('/api/v1/pages/:id', async (ctx) => {
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
  path: '/api/v1/pages',
  validate: {
    body: {
      title: Joi.string().min(1).max(100).required(),
      greeting: Joi.string().min(1).max(100).required(),
      content: Joi.string(),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    if (!isAuth(ctx)) {
      return;
    }
    const { user } = ctx.state;
    const newPage = await q.create({ ...ctx.request.body, user_id: user.userId });
    ctx.body = {
      data: newPage,
    };
  },
});

module.exports = router;
