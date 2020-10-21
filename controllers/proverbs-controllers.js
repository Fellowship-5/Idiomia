const { validationResult } = require('express-validator');
const finderUserById = require('../services/user_methods.js');
const Proverb = require('../models/proverb');
const user = require('../models/user');

const getProverbs = async (req, res, next) => {
	res.send('hi from prov bro ;) ');
};

const postProverb = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(errors);
	}

	const { proverb, literalTranslation: translation, explanation, userId } = req.body;

	const postedProverb = new Proverb({
		proverb,
		translation,
		explanation,
		userId
	});

	if (userId) {
		const user = finderUserById(userId);
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
			await sess.commitTransaction();
		} catch (error) {
			res.status(500).json({
				msg: 'Could not save proverb for user'
			});
			return next(error);
		}
		res.status(201).json({ user_proverbs: user.proverbs });
	} else {
		try {
			await postedProverb.save();
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: 'Could not save user in database'
			});
			return next(error);
		}
		res.status(201).json({ proverb: postedProverb });
	}
};

exports.postProverb = postProverb;
exports.getProverbs = getProverbs;
