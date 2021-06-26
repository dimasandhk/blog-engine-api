const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog-engine", {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
	console.log("Connected to database");
});
