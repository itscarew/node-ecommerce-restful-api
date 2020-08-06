const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")

const UserRoutes = require("./api/routes/user.routes");
const ProductRoutes = require("./api/routes/product.routes");
const OrderRoutes = require("./api/routes/order.routes");

//connect to the Database
mongoose.connect("mongodb://localhost:27017/rest-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

//Handling CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes which should handle request
app.use("/user", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/orders", OrderRoutes);
app.use("/uploads", express.static("uploads"));

//err message that passes when a route that does not exist is passed!!
app.use((req, res, next) => {
  const error = new Error("You entered a route that does not exist !!");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({
    err:  error.message,
    
  });
});

module.exports = app;
