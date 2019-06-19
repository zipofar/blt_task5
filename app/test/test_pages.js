process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const knex = require('../src/server/db/connection');

chai.use(chaiHttp);

describe('API Pages', () => {
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

  it('should return first page', async () => {
    const res = await chai.request(server)
      .get('/pages')
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.data.should.be.a('array');
    res.body.data.length.should.equal(5);
    res.body.data[0].should.have.property('id');
    res.body.data[0].id.should.equal(1);
    res.body.data[0].should.have.property('title');
    res.body.data[0].title.should.equal('Title 0');
    res.body.data[0].should.have.property('greeting');
    res.body.data[0].greeting.should.equal('Greeting 0');
    res.body.data[0].should.have.property('content');
    res.body.data[0].content.should.equal('Content 0');
    res.body.data[0].should.have.property('user_id');
    res.body.data[0].user_id.should.equal(1);
  });

  it('should return second page (next 5 record)', async () => {
    const res = await chai.request(server)
      .get('/pages?page=2')
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.data.should.be.a('array');
    res.body.data.length.should.equal(5);
    res.body.data[0].should.have.property('id');
    res.body.data[0].id.should.equal(6);
  });

  it('should return 404 when page is empty', async () => {
    const res = await chai.request(server)
      .get('/pages?page=2000')
      .send();

    res.should.have.status(404);
    res.should.be.json;
  });

  it('should return first page when number page is letter', async () => {
    const res = await chai.request(server)
      .get('/pages?page=text')
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.data.should.be.a('array');
    res.body.data.length.should.equal(5);
  });

  it('should return current page where id = 1', async () => {
    const res = await chai.request(server)
      .get('/pages/1')
      .send();

    res.should.have.status(200);
    res.should.be.json;
    res.body.data.should.be.a('object');
    res.body.data.id.should.equal(1);
    res.body.data.title.should.equal('Title 0');
    res.body.data.greeting.should.equal('Greeting 0');
    res.body.data.content.should.equal('Content 0');
    res.body.data.user_id.should.equal(1);
  });

  it('should create new page', async () => {
    const res = await chai.request(server)
      .post('/pages')
      .set('Authorization', `Bearer ${session.jwt}`)
      .type('json')
      .send({
        title: 'New Title',
        greeting: 'New Greeting',
        content: 'New Content',
      });

    res.should.have.status(200);
    res.should.be.json;
    res.body.data.should.be.a('object');
    res.body.data.title.should.equal('New Title');
    res.body.data.greeting.should.equal('New Greeting');
    res.body.data.content.should.equal('New Content');
    res.body.data.user_id.should.equal(2);
  });

});
