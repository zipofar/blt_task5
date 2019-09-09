const Router = require('koa-joi-router');
const uuid = require('uuid/v4');

const router = Router();

router.get('/api/v1/service/csrf', async (ctx) => {
  const csrf = uuid();
  ctx.body = {
    data: {
      csrf,
    },
  };
  ctx.session.csrf = csrf;
});

module.exports = router;
