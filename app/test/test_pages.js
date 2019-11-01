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

  /*
  before(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    const resLogin = await chai.request(server).post('/api/v1/auth/login').type('json').send(userCredentials);
    session.jwt = resLogin.body.data;
  });
  */

  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  it('should return first 5 pages', async () => {
    const res = await chai.request(server)
      .get('/api/v1/pages')
      .send();

    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.pages.should.be.a('array');
    res.body.pages.length.should.equal(5);
    res.body.pages[0].id.should.equal(1);
    res.body.pages[0].title.should.equal('Title 0');
    res.body.pages[0].user_id.should.equal(1);
  });

  it('should return second 5 pages', async () => {
    const res = await chai.request(server)
      .get('/api/v1/pages?page=2')
      .send();

    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.pages.should.be.a('array');
    res.body.pages.length.should.equal(5);
    res.body.pages[0].should.have.property('id');
    res.body.pages[0].id.should.equal(6);
  });

  it('should return 404 when no more pages', async () => {
    const res = await chai.request(server)
      .get('/api/v1/pages?page=2000')
      .send();

    res.should.have.status(404);
  });

  it('should return first 5 pages when offset page is letter', async () => {
    const res = await chai.request(server)
      .get('/api/v1/pages?page=text')
      .send();

    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.pages.should.be.a('array');
    res.body.pages.length.should.equal(5);
  });

  it('should return page with id = 1', async () => {
    const res = await chai.request(server)
      .get('/api/v1/pages/1')
      .send();

    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.id.should.equal(1);
    res.body.title.should.equal('Title 0');
    res.body.greeting.should.equal('Greeting 0');
    res.body.content.should.equal('Content 0');
    res.body.user_id.should.equal(1);
  });

  it('should create new page', async () => {
    const resLogin = await chai.request(server)
      .post('/api/v1/auth/login')
      .type('json')
      .send({
        username: 'user1',
        password: 'pass1',
      });
    const cookie = resLogin.headers['set-cookie'];
    console.log(cookie)

    const res = await chai.request(server)
      .post('/api/v1/pages')
      .set('Cookie', cookie)
      .type('json')
      .send({
        title: 'New Title',
        greeting: 'New Greeting',
        content: 'New Content',
      });

    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.title.should.equal('New Title');
    res.body.greeting.should.equal('New Greeting');
    res.body.content.should.equal('New Content');
    res.body.user_id.should.equal(2);
  });

});
