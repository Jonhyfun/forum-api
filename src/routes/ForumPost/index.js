const router = require('express').Router();
const controller = require('./controller');

router.get('/postList', controller.postList); 
router.post('/postList', controller.enviarPost);
router.get('/singlePost/:id', controller.singlePost);
router.get('/singlePost/:id/UpdateRank', controller.updateRank);
router.post('/singlePost/:id/Answers',controller.enviarResposta);
router.get('/singlePost/:id/Answers', controller.Answers);

module.exports = router;

