const jwt = require("jsonwebtoken");
require("dotenv").config();

const Journalist = require("../models/Journalist");

const auth = async (req, res, next) => {
	try {
		const token = req.cookies.journalistToken;
		if (!token) throw new Error();

		const decoded = jwt.verify(token, process.env.JWT_JOURNALIST);
		const journalist = await Journalist.findOne({
			_id: decoded._id,
			"tokens.token": token
		});

		if (!journalist) throw new Error();
		delete journalist.tokens;
		req.id = journalist._id;
		next();
	} catch (err) {
		res.status(401).send({ msg: "Please Authenticate" });
	}
};

module.exports = auth;
