const router = require("express").Router();
const auth = require("../auth/journalistArea");
const Journalist = require("../models/Journalist");

const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/journalist/signup", async (req, res) => {
	const newJournalist = new Journalist(req.body);

	try {
		const savedJournalist = await newJournalist.save();
		const token = await savedJournalist.generateToken();

		res.cookie("journalistToken", token);
		res.send(savedJournalist);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post("/journalist/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const journalist = await Journalist.login(email, password);
		const token = await journalist.generateToken();

		res.cookie("journalistToken", token);
		res.send(journalist);
	} catch (err) {
		if (!Object.keys(err).length)
			return res.status(500).send({ msg: "Email or password doesn't match" });

		res.status(500).send(err);
	}
});

router.post("/journalist/logout", auth, async (req, res) => {
	try {
		req.journalist.tokens = req.journalist.tokens.filter(({ token }) => {
			return token !== req.token;
		});

		await req.journalist.save();
		res.clearCookie("journalistToken");
		res.send({ message: "Logout Success" });
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/journalist/profile-verify", async (req, res) => {
	const { journalistToken } = req.cookies;

	try {
		const decoded = jwt.verify(journalistToken, process.env.JWT_JOURNALIST);
		const journalist = await Journalist.findOne({
			_id: decoded._id,
			"tokens.token": journalistToken
		});
		if (!journalist) throw new Error();

		res.send(journalist);
	} catch (err) {
		if (!Object.keys(err).length) return res.status(401).send({ msg: "Not a journalist" });
		res.status(401).send(err);
	}
});

module.exports = router;
