const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

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
	}
	res.json({ proverbs: proverbs.map((proverb) => proverb.toObject({ getters: true })) });
};

const postProverb = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(errors);
	}

	const { proverb, translation, explanation, userId } = req.body;

	if (userId) {
		const postedProverb = new Proverb({
			proverb,
			translation,
			explanation,
			userId
		});
		let user;
		try {
			user = await User.findById(userId);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'Could not find user in database'
			});
			return next(error);
		}

		if (!user) {
			res.status(500).json({
				msg: 'Could not find user'
			});
			throw new Error('Invalid credentials.');
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
	} else {
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
	}
};

const getProverbsByUserId = async (req, res, next) => {
	const userId = req.params.uid;

	let user;
	try {
		user = await User.findById(userId);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not save user in database '
		});
		return next(error);
	}
	res.json({
		user_proverbs: user.proverbs
	});
};

exports.postProverb = postProverb;
exports.getProverbsByUserId = getProverbsByUserId;
exports.getProverbs = getProverbs;
