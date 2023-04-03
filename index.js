const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const authRoute = require("./routes/auth");

dotenv.config();

// create app
const app = express();

// Config middleware
app.use(express.json());

// Connect Database
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection Successfull!"))
  .catch((err) => console.log(err));

// Create API Endpoint
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

// App listen
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
