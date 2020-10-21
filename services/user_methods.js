const User = require('../models/user');

const findUserById = async (userId) => {
	let user;
	try {
		user = await User.findById(userId);
		return user;
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Could not find user in database'
		});
		return next(error);
	}
};

exports.findUserById = findUserById;
