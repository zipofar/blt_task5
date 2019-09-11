const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const session = require('koa-session');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const pageRoute = require('./routes/pages');
const registrationRoute = require('./routes/registration');
const authRoute = require('./routes/auth');
const csrfRoute = require('./routes/csrf');
const appStateRoute = require('./routes/appState');

const port = process.env.SERVER_PORT || 4000;
const jwtSecret = process.env.JWT_SECRET;
const appEnv = process.env.APP_ENV;

const app = new Koa();

app.keys = ['key'];
app.use(session(app));

if (appEnv === 'development') {
  const cors = require('@koa/cors');
  app.use(cors());
}

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
app.use(csrfRoute.middleware());
app.use(appStateRoute.middleware());
app.use(registrationRoute.middleware());
app.use(authRoute.middleware());

app.use(jwt({ secret: jwtSecret, passthrough: true }));
// Protected routes by JWT
app.use(userRoute.middleware());
app.use(pageRoute.middleware());

const server = app.listen(port);

module.exports = server;
