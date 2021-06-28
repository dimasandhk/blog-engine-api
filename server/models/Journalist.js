const mongoose = require("mongoose");
const { isEmail } = require("validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const journalistSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		trim: true,
		validate(value) {
			if (!isEmail(value)) throw new Error("Email is invalid");
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		trim: true
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});

journalistSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

journalistSchema.methods.generateToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWTSECRET);

	user.tokens.push({ token });
	await user.save();

	return token;
};

journalistSchema.statics.loginAuth = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error({ error: "Email or password doesn't match" });

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error({ error: "Email or password doesn't match" });

	return user;
};

journalistSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const Journalist = mongoose.model("Journalist", journalistSchema);
module.exports = Journalist;
