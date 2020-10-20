const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/checkAutch');
const proverbsController = require('../controllers/proverbs-controllers');

const router = express.Router();

router.get('/all-proverbs', proverbsController.getProverbs);
router.post(
	'/post-proverb',
	[ (check('proverb').not().isEmpty(), check('translation').not().isEmpty(), check('explanation').not().isEmpty()) ],
	proverbsController.postProverb
);
router.use(checkAuth);
router.post(
	'/post-my-proverb',
	[ (check('proverb').not().isEmpty(), check('translation').not().isEmpty(), check('explanation').not().isEmpty()) ],
	proverbsController.postUserProverb
);
router.get('/my-proverbs', proverbsController.getProverbsByUserId);

module.exports = router;
