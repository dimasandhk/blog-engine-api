const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		desc: {
			type: String,
			required: true,
			minlength: 30
		},
		content: {
			type: String,
			required: true
		},
		creator: {
			type: String,
			required: true
		},
		creatorId: {
			type: String,
			required: true
		},
		comments: [
			{
				name: {
					type: String,
					required: true
				},
				desc: {
					type: String,
					required: true
				}
			}
		]
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
