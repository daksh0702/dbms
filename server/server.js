const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
