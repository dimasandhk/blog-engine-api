const mongoose = require("mongoose");
const mgPaginate = require("mongoose-paginate-v2");

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
		rawContent: {
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

blogSchema.plugin(mgPaginate);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
