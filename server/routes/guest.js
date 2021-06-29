const router = require("express").Router();
const Blog = require("../models/Blog");

router.get("/blogs", async (req, res) => {
	try {
		res.send(await Blog.find({}, "title desc creator creatorId"));
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/blog", async (req, res) => {
	try {
		const { id } = req.query;
		if (!id) throw new Error("Id must be provided");

		res.send(await Blog.findOne({ _id: id }));
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
