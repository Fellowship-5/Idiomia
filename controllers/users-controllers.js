const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(errors);
	}
	const { name, email, password, country, phone, newsletters } = req.body;

	let userExists;
	try {
		userExists = await User.findOne({ email });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not save user in database'
		});
		return next(error);
	}
	if (userExists) {
		res.status(422).json({
			msg: 'Invalid credentials.'
		});
		throw new Error('Invalid credentials.');
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		res.status(500).json({
			msg: 'Could not save user'
		});
		return next(error);
	}

	const newUser = new User({ name, email, password: hashedPassword, country, phone, newsletters });

	try {
		await newUser.save();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not save user in database'
		});
		return next(error);
	}

	let token;
	try {
		token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_KEY, {
			expiresIn: '1h'
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			msg: 'sign up failed. Please try again later'
		});
		return next(error);
	}

	res.status(201).json({
		userId: newUser.id,
		email: newUser.email,
		token
	});
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not find user in database'
		});
		return next(error);
	}

	if (!existingUser) {
		res.status(422).json({
			msg: 'Invalid credentials.'
		});
		throw new Error('Invalid credentials.');
	}

	let validPassword = false;
	try {
		validPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			msg: 'login failed. Please try again later'
		});
		return next(error);
	}

	if (!validPassword) {
		res.status(422).json({
			msg: 'Invalid credentials.'
		});
		throw new Error('Invalid credentials.');
	}

	let token;
	try {
		token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, {
			expiresIn: '1h'
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			msg: 'sign up failed. Please try again later'
		});
		return next(error);
	}

	res.json({
		userId: existingUser.id,
		email: existingUser.email,
		token: token
	});
};

exports.signup = signup;
exports.login = login;