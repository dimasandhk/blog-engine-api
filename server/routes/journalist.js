const router = require("express").Router();
const auth = require("../auth/journalistArea");
const Journalist = require("../models/Journalist");

router.post("/signup-journalist", async (req, res) => {
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

router.post("/login-journalist", async (req, res) => {
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

router.post("/logout-journalist", auth, async (req, res) => {
	try {
		req.journalist.tokens = req.journalist.tokens.filter(({ token }) => {
			return token !== req.token;
		});

		await req.journalist.save();
		res.send({ message: "Logout Success" });
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
