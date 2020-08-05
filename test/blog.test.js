// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Students", () => {
  describe("GET /", () => {
    // Test to get all students record
    it("should get all students record", (done) => {
      chai.request(app)
        .get('/api/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should get array of tags", (done) => {
      const tag = "health"
      chai.request(app)
        .get(`/api/posts?tags=${tag}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

  });
});