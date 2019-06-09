const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const app = new Koa();

app.use(bodyParser());
app.use(indexRoute.routes());
app.use(userRoute.routes());
app.use(authRoute.routes());

const server = app.listen(4000);

module.exports = server;
