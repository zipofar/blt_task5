const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    data: {
      message: 'Hello from test project',
    },
  };
});

module.exports = router;
