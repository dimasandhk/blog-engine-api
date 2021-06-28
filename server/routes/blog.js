const router = require("express").Router();
const auth = require("../auth/blog");

const Journalist = require("../models/Journalist");

router.post("/blog/new", auth, async (req, res) => {
	const journalist = await Journalist.findOne({ _id: req.id });
	res.send(journalist);
});

module.exports = router;
