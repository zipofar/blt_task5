const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const CSRF = require('koa-csrf');

const initState = require('../initAppState');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const pageRoute = require('./routes/pages');
const registrationRoute = require('./routes/registration');
const authRoute = require('./routes/auth');
const appStateRoute = require('./routes/appState');

const port = process.env.SERVER_PORT || 4000;
const appEnv = process.env.APP_ENV;

const app = new Koa();

app.keys = ['key'];
app.use(session(app));

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

// Init App State
app.use(async (ctx, next) => {
  if (typeof ctx.session.state === 'undefined') {
    ctx.session.state = { ...initState };
  }
  ctx.body = { state: ctx.session.state };
  await next();
});

// Set CSRF
if (appEnv !== 'test') {
  app.use(new CSRF());
  app.use(async (ctx, next) => {
    ctx.cookies.set('csrf', ctx.csrf, { httpOnly: false });
    await next();
  });
}

app.use(indexRoute.routes());
app.use(appStateRoute.middleware());
app.use(registrationRoute.middleware());
app.use(authRoute.middleware());
app.use(userRoute.middleware());
app.use(pageRoute.middleware());

const server = app.listen(port);

module.exports = server;
