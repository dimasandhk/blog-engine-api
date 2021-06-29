const router = require("express").Router();
const auth = require("../auth/blog");

const marked = require("marked");
const sanitize = require("sanitize-html");

const Journalist = require("../models/Journalist");
const Blog = require("../models/Blog");

router.post("/blog/new", auth, async (req, res) => {
	const body = { creator: req.journalist.name, creatorId: req.id, ...req.body };
	const newBlog = new Blog(body);
	newBlog.content = sanitize(marked(newBlog.content));

	try {
		await newBlog.save();
		res.send(newBlog);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
