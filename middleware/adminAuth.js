const { findEntryById } = require('../services/user_methods');

module.exports = async (req, res, next) => {
	//look the user up
	//check whether his role is admin
	const user = await findEntryById(req.userData.userId, 'user', 'could not reach database');
	console.log('user', user);
};
