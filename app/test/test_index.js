process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../src/server');
const knex = require('../src/server/db/connection');

chai.use(chaiHttp);

describe('Root Route', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => (
            knex.seed.run()
              .then(() => (done()))
          ));
      });
  });

  afterEach((done) => {
    knex.migrate.rollback().then(() => (done()));
  });

  it('should return root page', (done) => {
    chai
      .request(server)
      .get('/')
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
        done();
      });
  });
});
