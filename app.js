const dotenv = require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./DBConfig/dbConnection");

const app = express();

// Environment Variable
const port = process.env.PORT || 5000;

// DB connection
connectDB();

// Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// View Templating Engines
app.set("view engine", "ejs");
app.set("views", "./views");

//Middlewares
app.use(express.json());
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

//Listen on port Number
app.listen(port, () => console.log(`Listening on Port: ${port}`));
