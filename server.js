const express = require("express");
const mongoose = require("mongoose");
const app = express();

// routes
app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.get("/blog", (req, res) => {
  res.send("hello blog");
});

// app.listen(3000, () => {
//   console.log("node api app is running on port 3000");
// });

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:<password>@express-api.n7ykngh.mongodb.net/Express-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to Mongo DB");
    app.listen(3000, () => {
      console.log("node api app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("cannot connect to database \n", error);
  });
