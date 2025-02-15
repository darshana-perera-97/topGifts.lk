const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer"); // Import multer for handling file uploads

const app = express();
const PORT = 5002;

const productsFilePath = path.join(__dirname, "products.json");
const storeFilePath = path.join(__dirname, "store.json");

// Create a 'products' folder to store uploaded images if it doesn't exist
const productsFolderPath = path.join(__dirname, "products");
if (!fs.existsSync(productsFolderPath)) {
  fs.mkdirSync(productsFolderPath);
}

// Multer Storage Configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productsFolderPath); // Set the folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

// Initialize multer for handling multiple file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 512 * 1024 }, // 512KB file size limit
}).fields([
  { name: "mainImage", maxCount: 1 },
  { name: "productImages", maxCount: 4 },
]);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Read existing products from products.json
const getProducts = () => {
  try {
    return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  } catch (error) {
    return [];
  }
};

// Save products to products.json
const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
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
  const stores = getStoreData();

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
app.post("/add-product", upload, (req, res) => {
  const newProduct = req.body;

  // Check if product data is valid
  if (!newProduct || Object.keys(newProduct).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product data" });
  }

  // Retrieve uploaded file paths
  const mainImage = req.files["mainImage"]
    ? req.files["mainImage"][0].filename
    : null;
  const productImages = req.files["productImages"]
    ? req.files["productImages"].map((file) => file.filename)
    : [];

  // Add file paths to product data
  newProduct.mainImage = mainImage;
  newProduct.productImages = productImages;

  // Save the product data
  let products = getProducts();
  products.push(newProduct);
  saveProducts(products);

  res.json({
    success: true,
    message: "Product added successfully",
    data: newProduct,
  });
});

// Serve static images from the 'products' folder
app.use("/images", express.static(path.join(__dirname, "products")));

// Modify product routes to include the static image path
app.get("/products", (req, res) => {
  const products = getProducts();
  const updatedProducts = products.map((product) => {
    console.log(`Main Image Path: /${product.mainImage}`);
    console.log(
      `Product Images: /${product.productImages.join(", /")}`
    );

    return {
      ...product,
      mainImage: `/${product.mainImage}`,
      productImages: product.productImages.map((image) => `/${image}`),
    };
  });

  res.json({ success: true, data: updatedProducts });
});

// Serve static images from the 'products' folder
app.use("/", express.static(path.join(__dirname, "products")));

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
