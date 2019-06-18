process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../src/server');
const knex = require('../src/server/db/connection');

chai.use(chaiHttp);

describe('API Pages', () => {
  const agent = chai.request.agent(server);
  const userCredentials = {
    'username': 'user1',
    'password': 'pass1',
  };

  before(async () => {
    await agent.post('/auth/login').type('json').send(userCredentials)
  });

  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  it('should return root page', async () => {
    await chai
      .request(server)
      .get('/pages')
      .set('Authorization', `Bearer ${agent.body.data}` )
      .end((err, res) => {
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
  });

  it('should return root second page (next 5 record)', (done) => {
    chai
      .request(server)
      .get('/pages/?page=2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(5);
        res.body.data[0].should.have.property('id');
        res.body.data[0].id.should.equal(6);
        res.body.data[0].should.have.property('title');
        res.body.data[0].title.should.equal('Title 5');
        res.body.data[0].should.have.property('greeting');
        res.body.data[0].greeting.should.equal('Greeting 5');
        res.body.data[0].should.have.property('content');
        res.body.data[0].content.should.equal('Content 5');
        res.body.data[0].should.have.property('user_id');
        res.body.data[0].user_id.should.equal(1);
        done();
      });
  });

  it('should return 404 when page is empty', (done) => {
    chai
      .request(server)
      .get('/pages?page=200')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        done();
      });
  });

  it('should return first page when number page is letter', (done) => {
    chai
      .request(server)
      .get('/pages/?page=erunda')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(5);
        done();
      });
  });
});
