const Router = require('koa-joi-router');
const initState = require('../initAppState');

const router = Router();

router.get('/api/v1/service/app_state', async (ctx) => {
  if (typeof ctx.session.state === 'undefined') {
    ctx.session.state = { ...initState };
  }
  ctx.body = { ...ctx.session.state };
});

module.exports = router;
