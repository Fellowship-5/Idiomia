const express = require('express');
const { check } = require('express-validator');

const proverbsController = require('../controllers/proverbs-controllers');

const router = express.Router();

router.get('/all-proverbs', proverbsController.getProverbs);
router.get('/:uid', proverbsController.getProverbsByUserId);
router.post(
	'/post-proverb',
	[ (check('proverb').not().isEmpty(), check('translation').not().isEmpty(), check('explanation').not().isEmpty()) ],
	proverbsController.postProverb
);

module.exports = router;
