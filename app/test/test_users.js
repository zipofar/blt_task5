process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const knex = require('../src/server/db/connection');

chai.use(chaiHttp);

describe('API Users', () => {
  const userCredentials = {
    username: 'user1',
    password: 'pass1',
  };

  const session = {};

  before(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    const resLogin = await chai.request(server).post('/auth/login').type('json').send(userCredentials);
    session.jwt = resLogin.body.data;
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
      .get('/users')
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.data.should.be.a('array');
    res.body.data.length.should.equal(5);
    res.body.data[0].id.should.equal(1);
    res.body.data[0].username.should.equal('user0');
    res.body.data[0].role.should.equal('user');
  });

  it('should return second 5 users', async () => {
    const res = await chai.request(server)
      .get('/users?page=2')
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.data.should.be.a('array');
    res.body.data.length.should.equal(2);
    res.body.data[0].id.should.equal(6);
  });

  it('should return 404 when no more users', async () => {
    const res = await chai.request(server)
      .get('/pages?page=2000')
      .send();

    res.should.have.status(404);
    res.should.be.json;
  });

  it('should return first 5 users when number page is letter', async () => {
    const res = await chai.request(server)
      .get('/users?page=text')
      .set('Authorization', `Bearer ${session.jwt}`)
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.data.should.be.a('array');
    res.body.data.length.should.equal(5);
  });

  it('should return user with id = 1', async () => {
    const res = await chai.request(server)
      .get('/users/1')
      .set('Authorization', `Bearer ${session.jwt}`)
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.data.should.be.a('object');
    res.body.data.id.should.equal(1);
    res.body.data.username.should.equal('user0');
    res.body.data.role.should.equal('user');
  });
});
