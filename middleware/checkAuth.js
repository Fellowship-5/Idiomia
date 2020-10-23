const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	let token;
	try {
		token = await req.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Authentication failed!');
		}
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (error) {
		res.status(403).json({
			msg: 'Authentication failed!'
		});
		return next(error);
	}
};
