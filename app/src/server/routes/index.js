const Router = require('koa-router');

const router = new Router();

router.get('/api/v1', async (ctx) => {
  ctx.body = {
    ...ctx.body,
    message: 'Hello from test project',
  };
});

module.exports = router;
