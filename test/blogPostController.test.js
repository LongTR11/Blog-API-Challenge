const chai = require('chai');
const chaiHTTP = require('chai-http');
const {app, runServer, closeServer} =  require('../server');
const expect = chai.expect;
chai.use(chaiHTTP);

describe('blogPostController', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it ('should list blog posts', function(done) {
        chai.request(app)
            .get('/blog-posts')
            .then(function(res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});
