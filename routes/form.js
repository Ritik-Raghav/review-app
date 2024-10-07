const express = require('express');
const router = express.Router();
const formController = require('../controllers/form');

router.post('/', formController.postReview);

router.get('/', formController.getReview);

// router.delete('/delete/:id', formController.deleteExpense);



module.exports = router;