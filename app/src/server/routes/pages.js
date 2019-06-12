const Router = require('koa-joi-router');
const q = require('../db/queries/pages');

const { Joi } = Router;
const router = Router();

router.get('/pages', async (ctx) => {
  const pages = await q.getAll();
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
      user_id: Joi.number().required(),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    const newPage = await q.create(ctx.request.body);
    ctx.body = {
      data: newPage,
    };
  },
});

module.exports = router;
