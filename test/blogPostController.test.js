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
                expect(res).to.be.json;
                console.log(res.body);
                done();
            });
    });

    it ('should add an item on POST', function() {
        const newPost = {
            title: "Bob's Post", 
            content: "Bob's story",
            author: "Bob",
            publishDate: "newDate"
        }
        return chai
        // Should this have server passed in instead?? v v v
        .request(app)
        .post("/blog-posts")
        .send(newPost)
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            // finish test by finding structure of post res, also 
            // be sure to check with id
        });
    });

    it('should update items on PUT', function(done) {
        const update = {
            title: "toilets",
            content: "poop"
        };
        chai.request(app).get("/blog-posts")
        .then(function(res) {
            const id = res.body[0].id;
            console.log('res.body', res.body);
            console.log('res.body[0]', res.body[0]);
            console.log('res.body[0].id', res.body[0].id);
            chai.request(app).put(`/blog-posts/${id}`).send(update).then(function(res) {
                console.log(res);
                expect(res.body.title).to.equal(update.title);
                // expect,expect...etc
                done();
            });
        });
    });
    it('should delete item on DELETE', function(done) {
        chai.request(app).get("/blog-posts")
        .then(function(res) {
            const id = res.body[0].id;
            chai.request(app).delete(`/blog-posts/${id}`).then(function(res) {
                expect(res.body.message).to.equal('Blog post terminated.');
            done();
            });
        });
    });
});
