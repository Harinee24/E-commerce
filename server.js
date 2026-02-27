const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "ecommerce_secret";

// ================= MongoDB =================
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ================= Schemas =================
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);

// ================= Middleware =================
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No Token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// ================= Auth =================
app.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashed });
  await user.save();
  res.json({ message: "Registered" });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

  res.json({ token });
});

// ================= Products =================
app.post("/products", verifyToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.json({ message: "Admin only" });

  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ================= Orders =================
app.post("/order", verifyToken, async (req, res) => {
  const order = new Order({
    userId: req.user.id,
    products: req.body.products,
    total: req.body.total
  });

  await order.save();
  res.json({ message: "Order Placed" });
});

app.get("/admin/orders", verifyToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.json({ message: "Admin only" });

  const orders = await Order.find();
  res.json(orders);
});

app.listen(5000, () => console.log("Server running on 5000"));
