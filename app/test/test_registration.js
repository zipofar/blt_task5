process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const knex = require('../src/server/db/connection');

chai.use(chaiHttp);

describe('API Registration', () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  it('should return new user', async () => {
    const res = await chai.request(server)
      .post('/registration')
      .type('json')
      .send({ username: 'newUser', password: 'pass1' });

    res.should.have.status(201);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.data.username.should.equal('newUser');
    res.body.data.role.should.equal('user');
  });

  it('should return user exist', async () => {
    const res = await chai.request(server)
      .post('/registration')
      .type('json')
      .send({ username: 'user1', password: 'pass1' });

    res.should.have.status(422);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.message.should.equal('User Exist');
  });
});
