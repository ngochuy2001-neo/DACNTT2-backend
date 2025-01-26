require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const database = require("./configs/database");
const cors = require("cors");

const app = express();
const port = 4200;

database.connect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const route = require("./routes/index.route");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

route(app);

app.listen(port, () => {
  console.log(`Has been run on port ${port}`);
});
