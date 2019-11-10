process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const knex = require('../src/server/db/connection');
const utils = require('./utils');

const session = {};

chai.use(chaiHttp);

describe('API Users', () => {
  before(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();

    const resLogin = await chai.request(server)
      .post('/api/v1/auth/login')
      .type('json')
      .send({
        username: 'admin',
        password: 'admin',
      });
    const cookies = resLogin.headers['set-cookie'];
    session.cookie = utils.parseCookie(cookies, /koa.sess/);
  });

  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  it('should return first 5 users', async () => {
    const res = await chai.request(server)
      .get('/api/v1/users')
      .set('Cookie', session.cookie)
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.users.length.should.equal(5);
    res.body.users[0].id.should.equal(1);
    res.body.users[0].username.should.equal('user0');
    res.body.users[0].role.should.equal('user');
    res.body.users[0].should.not.have.property('password')
  });

  it('should return second 5 users', async () => {
    const res = await chai.request(server)
      .get('/api/v1/users?page=2')
      .set('Cookie', session.cookie)
      .send();

    res.should.have.status(200);
    res.body.users.should.be.a('array');
    res.body.users.length.should.equal(2);
    res.body.users[0].id.should.equal(6);
  });

  it('should return 404 when no more users', async () => {
    const res = await chai.request(server)
      .get('/api/v1/pages?page=2000')
      .set('Cookie', session.cookie)
      .send();

    res.should.have.status(404);
    res.should.be.json;
  });

  it('should return first 5 users when number page is letter', async () => {
    const res = await chai.request(server)
      .get('/api/v1/users?page=text')
      .set('Cookie', session.cookie)
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.users.should.be.a('array');
    res.body.users.length.should.equal(5);
  });

  it('should return user with id = 1', async () => {
    const res = await chai.request(server)
      .get('/api/v1/users/1')
      .set('Cookie', session.cookie)
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.user.id.should.equal(1);
    res.body.user.username.should.equal('user0');
    res.body.user.role.should.equal('user');
    res.body.user.should.not.have.property('password')
  });
});
