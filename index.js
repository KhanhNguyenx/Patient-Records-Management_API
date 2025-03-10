const express = require("express");
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
database.connect();

const app = express();
const port = process.env.PORT;
const routeApi = require("./api/routers/index.router");

// Parse application/json
app.use(bodyParser.json());

// Enable All CORS Requests
app.use(cors());

//Cookie parser
app.use(cookieParser());

// Route API version 1
routeApi(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
