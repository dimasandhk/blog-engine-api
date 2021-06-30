const md5 = require("md5");

module.exports = function (email) {
	const address = String(email).trim().toLowerCase();
	const hash = md5(address);
	return `https://www.gravatar.com/avatar/${hash}?s=300&d=retro`;
};
