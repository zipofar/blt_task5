const Koa = require('koa');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');

const app = new Koa();

app.use(indexRoute.routes());
app.use(userRoute.routes());

const server = app.listen(3000);

module.exports = server;
