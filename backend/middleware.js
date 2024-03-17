module.exports.checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.status(300).json({ message: 'User already logged in.' });
	}
	next();
};

module.exports.checkNotAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(300).json({ message: 'User already logged out.' });
};
