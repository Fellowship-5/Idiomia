const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { findUserById } = require('../services/user_methods');

const Proverb = require('../models/proverb');
const User = require('../models/user');

const getProverbs = async (req, res, next) => {
	let proverbs;
	try {
		proverbs = await Proverb.find({});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'could not retrieve proverbs from database'
		});
		return next(error);
	}
	res.json({ proverbs: proverbs.map((proverb) => proverb.toObject({ getters: true })) });
};

const postProverb = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(errors);
	}

	const { proverb, translation, explanation } = req.body;

	const postedProverb = new Proverb({
		proverb,
		translation,
		explanation
	});
	try {
		await postedProverb.save();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not save user in database '
		});
		return next(error);
	}
	res.status(201).json({ proverb: postedProverb });
};

const postUserProverb = async (req, res, next) => {
	const { proverb, translation, explanation } = req.body;

	const postedProverb = new Proverb({
		proverb,
		translation,
		explanation,
		userId: req.userData.userId
	});

	const user = await findUserById(req.userData.userId);

	if (!user) {
		res.status(500).json({
			msg: 'Could not find user'
		});
		return next(new Error('Invalid credentials.'));
	}

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await postedProverb.save({ session });
		user.proverbs.push(postedProverb);
		await user.save({ session });
		await session.commitTransaction();
	} catch (error) {
		res.status(500).json({
			msg: 'Could not save proverb for user'
		});
		return next(error);
	}
	res.status(201).json({ user_proverbs: user.proverbs });
};

const getProverbsByUserId = async (req, res, next) => {
	const user = await findUserById(req.userData.userId);
	res.json({
		user_proverbs: user.proverbs
	});
};

exports.postProverb = postProverb;
exports.getProverbsByUserId = getProverbsByUserId;
exports.getProverbs = getProverbs;
exports.postUserProverb = postUserProverb;
