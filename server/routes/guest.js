const router = require("express").Router();
const Blog = require("../models/Blog");
const getProfile = require("./handler/getProfile");

router.get("/blogs", async (req, res) => {
	try {
		res.send(await Blog.find({}, "title desc creator creatorId createdAt"));
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
		const { id } = req.query;
		if (!id) throw { msg: "Id Must be provided", code: 400 };

		const selected = await Blog.find({ creatorId: id }, "title desc creator creatorId createdAt");
		if (!selected.length) throw { msg: "Creator not found", code: 404 };
		res.send(selected);
	} catch (err) {
		const { code, msg } = err;
		res.status(code).send({ msg });
	}
});

router.post("/comment-blog", async (req, res) => {
	try {
		const { id } = req.query;
		if (!id) throw { msg: "Id Must be provided", code: 400 };

		const selected = await Blog.findOne({ _id: id });
		if (!selected) throw { msg: "Blog not found", code: 404 };

		const { name, desc } = req.body;
		if (!name || !desc) throw { msg: "Name and description must be provided", code: 401 };

		selected.comments.push({ name, desc, profile: getProfile(name) });
		await selected.save();

		res.send(selected.comments);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/oldest-blog", async (req, res) => {
	try {
		const { page } = req.query;
		if (!page) throw { msg: "Page query must be provided", code: 400 };

		const response = await Blog.paginate(
			{},
			{
				page,
				limit: 10,
				sort: { createdAt: "asc" },
				select: "creator creatorId title desc createdAt updatedAt"
			}
		);
		if (!response.docs.length) return res.status(404).send(response);

		res.send(response);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/latest-blog", async (req, res) => {
	try {
		const { page } = req.query;
		if (!page) throw { msg: "Page query must be provided", code: 400 };

		const response = await Blog.paginate(
			{},
			{
				page,
				limit: 10,
				sort: { createdAt: "desc" },
				select: "creator creatorId title desc createdAt updatedAt"
			}
		);
		if (!response.docs.length) return res.status(404).send(response);

		res.send(response);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
