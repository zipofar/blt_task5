const Router = require('koa-router');

const router = new Router();

router.get('/api/v1', async (ctx) => {
  ctx.body = {
    data: {
      message: 'Hello from test project',
    },
  };
});

module.exports = router;
