const Router = require('koa-joi-router');
const _ = require('lodash');
const q = require('../db/queries/pages');
const paginate = require('../utils/paginator');
const { isAuth } = require('../services/auth');

const { Joi } = Router;
const router = Router();
const perPage = 5;

router.get('/api/v1/pages', async (ctx) => {
  const { page } = ctx.request.query;
  const pages = await q.getAll(paginate().page(page).perpage(perPage));
  const countRecords = await q.countRecords();
  const countPagination = Math.ceil(countRecords / perPage);
  if (_.isEmpty(pages)) {
    ctx.status = 404;
  } else {
    ctx.body = {
      pages,
      countPagination,
    };
  }
});

router.get('/api/v1/pages/primary', async (ctx) => {
  const page = await q.getPrimaryPage();
  if (page) {
    ctx.body = page;
  } else {
    ctx.throw(404, 'Page not found');
  }
});

router.get('/api/v1/pages/:id', async (ctx) => {
  const page = await q.getById(ctx.params.id);
  if (page) {
    ctx.body = page;
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
      ctx.status = 403;
      return;
    }
    const { user } = ctx.session.state;
    const newPage = await q.create({ ...ctx.request.body, user_id: user.userId });
    ctx.body = newPage;
  },
});

router.route({
  method: 'post',
  path: '/api/v1/pages/:id',
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
      ctx.throw(403, 'You are not authenticated');
    }

    const page = await q.getById(ctx.params.id);

    if (!page) {
      ctx.throw(404, 'Page not found');
    }

    const { user } = ctx.session.state;

    if (page.user_id === user.id) {
      const updatedPage = await q.update({
        ...ctx.request.body,
        user_id: user.id,
      }, page.id);

      ctx.body = updatedPage;
      return;
    }

    ctx.throw(403, 'You are not owner this page');
  },
});

module.exports = router;
