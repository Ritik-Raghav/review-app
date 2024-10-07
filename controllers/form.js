const Review = require('../models/review');

exports.postReview = async (req, res, next) => {

    try {
        const companyName = req.body.companyName;
        const pros = req.body.pros;
        const cons = req.body.cons;
        const rating = req.body.rating;

        const newReview = await Review.create({
            companyName: companyName,
            pros: pros,
            cons: cons,
            rating: rating
        });

        console.log(newReview);
        res.status(201).json(newReview);
    }
    catch(error) {
        console.log(error);
    }
}

exports.getReview = async (req, res , next) => {
    try {
        const data = await Review.findAll();
        res.status(200).json(data);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch data'});
    }
}



// exports.deleteExpense = async (req, res, next) => {
//     const expenseId = req.params.id;
//     try {
//         const expense = await Expense.findByPk(expenseId);
//         if (!expense) {
//             return res.status(404).json({ message: 'Expense not found!'});
//         }
//         await expense.destroy();
//         console.log('Expense Deleted!');
//         res.status(200).json({ message: 'Expense deleted successfully!'});
//     }
//     catch(error)  {
//         console.log(error);
//         res.status(500).json({ message: 'Failed to delete Expense'});
//     }
// }