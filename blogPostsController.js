const { BlogPosts } = require('./models')

// getAll
function getAll(req,res) {
    //use the class method to retrieve data
    //be sure to return json in your requests as we are not using a templating view engine in this app
   res.json(BlogPosts.get());
}
//post
function post(req,res) {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const publishDate = req.body.publishDate;
    res.json(BlogPosts.create(title, content, author, publishDate));
}
//put
function update(req, res) {
    res.json(BlogPosts.update({
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    }))
}
// delete
function destroy(req, res) {
    const blogPost = req.params.id;
    BlogPosts.delete(blogPost);
    res.json({message: 'Blog post terminated.'})
}

const BlogPostsController = {
    getAll: getAll,
    create: post,
    update: update,
    destroy: destroy
};

module.exports = BlogPostsController;