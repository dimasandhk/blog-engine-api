const router = require("express").Router();

router.post("/signup-journalist", (req, res) => {
	const { email } = req.body;
	res.send({ email });
});

module.exports = router;
