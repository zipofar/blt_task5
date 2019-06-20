process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const knex = require('../src/server/db/connection');

chai.use(chaiHttp);

describe('API Login', () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  it('should return jwt token', async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/login')
      .type('json')
      .send({
        username: 'user1',
        password: 'pass1',
      });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  });

  it('should return error, if username not exist', async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/login')
      .type('json')
      .send({
        username: 'unknown',
        password: 'pass1',
      });

    res.should.have.status(404);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.message.should.equal('Login or Password Incorrect');
  });

  it('should return error, if password incorrect', async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/login')
      .type('json')
      .send({
        username: 'user1',
        password: 'wrong',
      });

    res.should.have.status(404);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.message.should.equal('Login or Password Incorrect');
  });
});
