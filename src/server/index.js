const Koa = require('koa');

const app = new Koa();

app.use(async (ctx) => { ctx.body = 'Jopa la-la'; });

app.listen(3000);
