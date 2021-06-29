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
		if (!id) throw { msg: "Id Must be provided", code: 400 };

		const selectedBlog = await Blog.findOne({ _id: id });
		if (!selectedBlog) throw { msg: "Blog not found", code: 404 };
		res.send(selectedBlog);
	} catch (err) {
		const { code, msg } = err;
		res.status(code).send({ msg });
	}
});

router.get("/journalist/blog", async (req, res) => {
	try {
	} catch (err) {}
});

module.exports = router;
