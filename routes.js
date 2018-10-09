
const express = require('express');
const router = express.Router();
const BlogPostsController = require('./blogPostsController');

router.get('/blog-posts', BlogPostsController.getAll);
router.post('/blog-posts', BlogPostsController.create); 
router.put('/blog-posts/:id', BlogPostsController.update);
router.delete('/blog-posts/:id', BlogPostsController.destroy);

module.exports = router;