const User = require('../models/user');
<<<<<<< HEAD
const Proverb = require('../models/proverb');

const findEntryById = async (id, collection, errorMsg) => {
	let entry;
	try {
		if (collection === 'proverb') {
			entry = await Proverb.findById(id);
		}
		if (collection === 'user') {
			entry = await User.findById(id);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: errorMsg
		});
		return next(error);
	}
	return entry;
};

exports.findEntryById = findEntryById;
=======

const findUserById = async (userId) => {
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
	return user;
};

exports.findUserById = findUserById;
>>>>>>> end-points_login_signup
