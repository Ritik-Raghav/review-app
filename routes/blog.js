const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');


router.post('/', blogController.postBlog);
router.get('/', blogController.getBlog);


module.exports = router;