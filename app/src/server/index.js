const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const port = process.env.APP_PORT || 4000;
const jwtSecret = process.env.JWT_SECRET;

const app = new Koa();

app.use(bodyParser());
app.use(indexRoute.routes());
app.use(authRoute.routes());
app.use(jwt({ secret: jwtSecret }));
app.use(userRoute.routes());

const server = app.listen(port);

module.exports = server;
