const mongoose = require("mongoose");

mongoose.connect(
	"mongodb://127.0.0.1:27017/blog-engine",
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true
	},
	(err) => {
		if (!err) return console.log("Connected");
		console.error(err);
	}
);
