const User = require('../models/user');
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
