const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const connectDB = require("./config/db/db");
//IMPORT ROUTES
const authRoute = require("./routes/auth/auth");

//DATABASE CONNECTION
connectDB();

//MIDDLEWARE --> DISABLING CORS AND USED FOR JSON OUTPUT
app.use(express.json(), cors());

//IMPORT ROUTES
const authDashboard = require("./routes/auth/authDashboard");

//ROUTE MIDDLEWARE
app.use("/api/users", authRoute);
app.use("/api/dashboard", authDashboard);

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server up and running🏃‍♂️ at http://localhost:${port}`)
);
