const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5002;

const productsFilePath = path.join(__dirname, "products.json");
const storeFilePath = path.join(__dirname, "store.json");

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Read existing products from products.js
const getProducts = () => {
  try {
    delete require.cache[require.resolve("./products")]; // Clear cache to get fresh data
    return require("./products");
  } catch (error) {
    return [];
  }
};

// Save products to products.js
const saveProducts = (products) => {
  fs.writeFileSync(
    productsFilePath,
    `module.exports = ${JSON.stringify(products, null, 4)};`
  );
};

// Read store data from store.json
const getStore = () => {
  try {
    return JSON.parse(fs.readFileSync(storeFilePath, "utf-8"));
  } catch (error) {
    return {};
  }
};

const getStoreData = () => {
  try {
    return JSON.parse(fs.readFileSync(storeFilePath, "utf-8"));
  } catch (error) {
    return [];
  }
};

// Save store data to store.json
const saveStore = (storeData) => {
  fs.writeFileSync(storeFilePath, JSON.stringify(storeData, null, 4));
};

// API to login and verify email/password
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const stores = getStoreData(); // Read stores from store.json

  const store = stores.find(
    (s) => s.email === email && s.password === password
  );

  if (store) {
    res.json({
      success: true,
      message: "Login successful",
      token: "abc123xyz", // Replace with JWT in production
      storeId: store.storeId,
      storename: store.storename,
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
});

// API to add a product
app.post("/add-product", (req, res) => {
  const newProduct = req.body;

  if (!newProduct || Object.keys(newProduct).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product data" });
  }

  let products = getProducts();
  products.push(newProduct);
  saveProducts(products);

  res.json({
    success: true,
    message: "Product added successfully",
    data: products,
  });
});

// API to get all products
app.get("/products", (req, res) => {
  res.json({ success: true, data: getProducts() });
});

// API to delete a product by ID
app.delete("/delete-product/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  let products = getProducts();

  const filteredProducts = products.filter(
    (product) => product.id !== productId
  );

  if (filteredProducts.length === products.length) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  saveProducts(filteredProducts);
  res.json({
    success: true,
    message: "Product deleted successfully",
    data: filteredProducts,
  });
});

// API to update store.json
app.post("/update-store", (req, res) => {
  const newStoreData = req.body;

  if (!newStoreData || Object.keys(newStoreData).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid store data" });
  }

  saveStore(newStoreData);
  res.json({
    success: true,
    message: "Store updated successfully",
    data: newStoreData,
  });
});

// API to add a new store (same as update but only adds new store if it's empty)
app.post("/add-store", (req, res) => {
  const newStore = req.body;

  if (!newStore || Object.keys(newStore).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid store data" });
  }

  let existingStore = getStore();

  if (Object.keys(existingStore).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Store already exists. Use /update-store instead.",
    });
  }

  saveStore(newStore);
  res.json({
    success: true,
    message: "Store added successfully",
    data: newStore,
  });
});

// API to get store.json data
app.get("/store", (req, res) => {
  res.json({ success: true, data: getStore() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
