const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");

require("./db");

app.use(cookieParser());
app.use(express.json());

app.use("/api", require("./routes/journalist"));
app.use("/api", require("./routes/blog"));

app.listen(port, () => console.log(`Up on port ${port}`));
