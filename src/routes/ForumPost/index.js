const router = require('express').Router();
const controller = require('./controller');

router.get('/postList', controller.postList); 
router.get('/singlePost/:id', controller.singlePost);
router.get('/singlePost/:id/Answers', controller.Answers);

module.exports = router;

