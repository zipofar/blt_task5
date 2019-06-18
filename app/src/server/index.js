const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const pageRoute = require('./routes/pages');
const registrationRoute = require('./routes/registration');
const authRoute = require('./routes/auth');

const port = process.env.APP_PORT || 4000;
const jwtSecret = process.env.JWT_SECRET;

const app = new Koa();
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message || 'Sorry, an error has occurred.',
      properties: err.properties,
    };
  }
});

app.use(bodyParser());
// Public routes
app.use(indexRoute.routes());
app.use(registrationRoute.middleware());
app.use(authRoute.middleware());

app.use(jwt({ secret: jwtSecret, passthrough: true }));
// Protected routes by JWT
app.use(userRoute.middleware());
app.use(pageRoute.middleware());

const server = app.listen(port);

module.exports = server;
