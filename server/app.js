const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("./db");

app.use(express.json());
app.use("/api", require("./routes/journalist"));

app.listen(port, () => console.log(`Up on port ${port}`));
