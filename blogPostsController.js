const { BlogPosts } = require('../models')

// getAll
function(id) {
    // if id passed in, retrieve single post,
    // otherwise send all posts.
    if (id !== null) {
        return this.posts.find(post => post.id === id);
    }
    // return posts sorted (descending) by
    // publish date
    return this.posts.sort(function (a, b) {
        return b.publishDate - a.publishDate
    });
}
//post
function(title, content, author, publishDate) {
    const post = {
        id: uuid.v4(),
        title: title,
        content: content,
        author: author,
        publishDate: publishDate || Date.now()
    };
    this.posts.push(post);
    return post;
}
//put
function(updatedPost) {
    const { id } = updatedPost;
    const postIndex = this.posts.findIndex(
        post => post.id === updatedPost.id);
    if (postIndex === -1) {
        throw new StorageException(
            `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.posts[postIndex] = Object.assign(
        this.posts[postIndex], updatedPost);
    return this.posts[postIndex];
}

// delete
function(id) {
    const postIndex = this.posts.findIndex(
        post => post.id === id);
    if (postIndex > -1) {
        this.posts.splice(postIndex, 1);
    }
}

const BlogPostsController = {
    getAll: getAll,
    post: post,
    put: put,
    delete: delete;
};

module.export = BlogPostsController;