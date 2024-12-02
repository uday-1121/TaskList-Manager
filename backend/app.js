const express = require("express");
const app = express();
const cors = require("cors");

require("./connections/connection");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.get("/", (req, res) => {
    res.send("Hello");
});
app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
    console.log("Server Started");
});