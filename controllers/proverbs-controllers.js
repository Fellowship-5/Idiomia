const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { findEntryById } = require('../services/user_methods.js');
const Proverb = require('../models/proverb');
const User = require('../models/user');
const proverb = require('../models/proverb');

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
		contributor: req.userData.userId
	});

	let user;
	try {
		user = await User.findById(req.userData.userId);
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
};

const getProverbsByUserId = async (req, res, next) => {
	let userWithProverbs;
	try {
		userWithProverbs = await User.findById(req.userData.userId).populate('proverbs');
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not find user in database'
		});
		return next(error);
	}

	res.json({
		user_proverbs: userWithProverbs.proverbs.map((proverb) => proverb.toObject({ getters: true }))
	});
};

const editUserProverb = async (req, res, next) => {
	const { translation, explanation } = req.body;
	const proverbId = req.params.pid;

	const proverbToEdit = await findEntryById(proverbId, 'proverb', 'Could not find proverb in database');

	proverbToEdit.translation = translation;
	proverbToEdit.explanation = explanation;

	try {
		await proverbToEdit.save();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not save proverb in database '
		});
		return next(error);
	}
	res.status(200).json({ edited_proverb: proverbToEdit.toObject({ getters: true }) });
};

const deleteUserProverb = async (req, res, next) => {
	const proverbId = req.params.pid;

	let proverbToDelete;
	try {
		proverbToDelete = await Proverb.findById(proverbId).populate('contributor');
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not find proverb in database'
		});
		return next(error);
	}

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await proverbToDelete.remove({ session });
		proverbToDelete.contributor.proverbs.pull(proverbToDelete);
		await proverbToDelete.contributor.save({ session });
		await session.commitTransaction();
	} catch (error) {
		res.status(500).json({
			msg: 'Could not delete proverb for user'
		});
		return next(error);
	}
	res.status(200).json({ msg: 'proverb was deleted successfully' });
};

exports.postProverb = postProverb;
exports.getProverbsByUserId = getProverbsByUserId;
exports.getProverbs = getProverbs;
exports.postUserProverb = postUserProverb;
exports.editUserProverb = editUserProverb;
exports.deleteUserProverb = deleteUserProverb;
