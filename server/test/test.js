import chaiHttp from 'chai-http';

import chai from 'chai';

import index from '../index';

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

describe('Test for API', () => {
  describe('GET /', () => {
    it('Should return 200', (done) => {
      chai.request(index)
        .get('/api')
        .end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
		it('Should return 404 for unknown routes', (done) => {
			chai.request(index)
			.get('/some/very/useless/route')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
		});
		it('Should return 404 for posts to undefined routes', (done) => {
			chai.request(index)
			.post('/another/undefined/route')
			.send({random: "random"})
			.end((err, res) => {
				expect(res).to.have.status(404);
				done();
			});
		});
	});
  });
  describe('API to Get all recipes', () => {
		it('Should return 200', () => {
			chai.request(index)
			.get('/api/recipes')
			.end((err, res) => {
				expect(res).to.have.status(200);
				done();
			});
		});
		it('Should return an object', () => {
			chai.request(index)
			.get('/api/recipes')
			.end((err, res) => {
				expect(res.body).to.have.property('status').equal('success');
				done();
			});
		});
	});
  describe('API to add a new recipe', () => {
		it('Should return 200 if successful', () => {
			chai.request(index)
			.post('/api/recipes')
			.send({
        composer: "taju",
				title : "Amala",
				ingredients: ['potato', 'yam'],
				description: "some new description"
			})
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.have.property('status').equal('success');
				done();
			});
		});
	});
