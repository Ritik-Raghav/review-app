const { where } = require('sequelize');
const Comment = require('../models/comment');
const Blog = require('../models/blog');

exports.postComment = async (req, res, next) => {

    try {
        const comment = req.body.comment;
        const id = req.params.id;
        console.log(id);
        const blog = await Blog.findOne({ where : { id } });
        console.log(blog)
        const newComment = await blog.createComment({
            comment: comment
        })
        res.json(newComment);
        
    }
    catch(error) {
        console.log(error);
    }
}

exports.getCommentById = async (req, res , next) => {
    try {
        const id = req.params.id;
        console.log(id)
        const blog = await Blog.findOne({ where : { id }});

        if (!blog) {
            return res.status(404).json({ message: 'blog not found' })
        }
        const comments = await blog.getComments();

        res.status(200).json(comments);

    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch data'});
    }
}



// // // exports.deleteExpense = async (req, res, next) => {
// // //     const expenseId = req.params.id;
// // //     try {
// // //         const expense = await Expense.findByPk(expenseId);
// // //         if (!expense) {
// // //             return res.status(404).json({ message: 'Expense not found!'});
// // //         }
// // //         await expense.destroy();
// // //         console.log('Expense Deleted!');
// // //         res.status(200).json({ message: 'Expense deleted successfully!'});
// // //     }
// // //     catch(error)  {
// // //         console.log(error);
// // //         res.status(500).json({ message: 'Failed to delete Expense'});
// // //     }
// // // }