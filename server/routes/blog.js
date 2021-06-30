const router = require("express").Router();
const auth = require("../auth/blog");

const marked = require("marked");
const sanitize = require("sanitize-html");

const localizeDate = require("./handler/localDate");

const Blog = require("../models/Blog");

router.post("/blog/new", auth, async (req, res) => {
	const body = { creator: req.journalist.name, creatorId: req.id, ...req.body };
	const newBlog = new Blog(body);

	newBlog.rawContent = newBlog.content;
	newBlog.content = sanitize(marked(newBlog.content));

	try {
		await newBlog.save();
		console.log(localizeDate(new Date()));
		res.send(newBlog);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
