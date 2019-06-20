process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../src/server');
const knex = require('../src/server/db/connection');

chai.use(chaiHttp);

describe('API Index', () => {
  it('should return index page', (done) => {
    chai
      .request(server)
      .get('/api/v1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.have.property('message');
        done();
      });
  });
});
