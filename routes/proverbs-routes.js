const express = require('express');
const { check } = require('express-validator');

const proverbsController = require('../controllers/proverbs-controllers');

const router = express.Router();

router.get('/all-proverbs', proverbsController.getProverbs);

router.post(
	'/post-proverb',
	[
		check('proverb').not().isEmpty(),
		check('literalTranslation').not().isEmpty(),
		check('explanation').not().isEmpty()
	],
	proverbsController.postProverb
);

module.exports = router;
