require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Product = require("./models/productModel");
const mongoUrl = process.env.MONGO_URL;

app.use(express.json());

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

app.post("/product", async (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("message :", error.message);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("message: ", error.message);
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(500).json(updatedProduct);
  } catch (error) {
    res.status(500).json("message :", error.message);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: `cannot find product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to Mongo DB");
    app.listen(3000, () => {
      console.log("node api app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("cannot connect to database \n", error);
  });
