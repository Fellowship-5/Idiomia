const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.post(
	'/signup',
	[
		check('name').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 6 })
	],
	usersController.signup
);
router.post('/login', usersController.login);
router.use(checkAuth);
router.get('/get-user', usersController.getUserInfo);

module.exports = router;
