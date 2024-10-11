const Blog = require('../models/blog');

exports.postBlog = async (req, res, next) => {

    try {
        const title = req.body.title;
        const author = req.body.author;
        const content = req.body.content;

        const newBlog = await Blog.create({
            title: title,
            author: author,
            content: content
        });

        console.log(newBlog);
        res.status(201).json(newBlog);
    }
    catch(error) {
        console.log(error);
    }
    next();
}

exports.getBlog = async (req, res, next) => {

    try {
        const blogs = await Blog.findAll();

        console.log(blogs);
        res.status(201).json(blogs);
    }
    catch(error) {
        console.log(error);
    }
}

