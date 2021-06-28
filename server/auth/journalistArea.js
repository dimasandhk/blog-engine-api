const jwt = require("jsonwebtoken");
require("dotenv").config();
const Journalist = require("../models/Journalist");

const auth = async (req, res, next) => {
	try {
		const { journalistToken } = req.cookies;
		if (!journalistToken) throw new Error();

		const decodedObject = jwt.verify(journalistToken, process.env.JWT_JOURNALIST);
		const journalist = await Journalist.findOne({
			_id: decodedObject._id,
			"tokens.token": journalistToken
		});

		if (!journalist) throw new Error();
		req.token = journalistToken;
		req.journalist = journalist;
		next();
	} catch (err) {
		res.status(401).send({ msg: "Authentication Needed" });
	}
};

module.exports = auth;
