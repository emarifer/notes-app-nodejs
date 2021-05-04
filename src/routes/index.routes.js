const router = require('express').Router();
const { renderIndex, renderDoc } = require('../controllers/index.controller');

router.get('/', renderIndex);

router.get('/documentation', renderDoc);

module.exports = router;