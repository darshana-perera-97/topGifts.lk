const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

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

// Load environment variables from `.env`
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL } = process.env;

// **Configure Nodemailer Transporter**
const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE, // Example: "gmail"
  auth: {
    user: EMAIL_USER, // Your email
    pass: EMAIL_PASS, // Your email password or App Password (for Gmail)
  },
});

// **API Endpoint to Receive Order and Send Email**
app.post("/place-order", (req, res) => {
  const { name, email, phone, address, productName, productPrice } = req.body;

  if (!name || !email || !phone || !address || !productName || !productPrice) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  // **Email Content**
  const mailOptions = {
    from: EMAIL_USER,
    to: ADMIN_EMAIL, // Admin's email where orders should be sent
    subject: `New Order Received - ${productName}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Product:</strong> ${productName}</p>
      <p><strong>Price:</strong> Rs.${productPrice}.00</p>
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
    `,
  };

  // **Send Email**
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send email!" });
    }
    res.json({ success: true, message: "Order placed successfully!" });
  });
});

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

app.post("/add-store", (req, res) => {
  let stores = getStoreData();

  // Get last storeId and increment it
  let lastStoreId =
    stores.length > 0 ? stores[stores.length - 1].storeId : "000000";
  let newStoreId = (parseInt(lastStoreId, 10) + 1).toString().padStart(6, "0");

  const newStore = {
    storeId: newStoreId, // Incremental storeId
    storename: req.body.storename,
    email: req.body.email,
    password: req.body.password,
    contactnumber: req.body.contactnumber,
    description: req.body.description,
  };

  // Check if email already exists
  const emailExists = stores.some((store) => store.email === newStore.email);
  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: "Email already exists!",
    });
  }

  // Check if store name already exists
  const storeNameExists = stores.some(
    (store) => store.storename === newStore.storename
  );
  if (storeNameExists) {
    return res.status(400).json({
      success: false,
      message: "Store name already exists!",
    });
  }

  stores.push(newStore);
  saveStore(stores);

  res.json({
    success: true,
    message: "Store added successfully",
    data: newStore,
  });
});
// API to edit an existing store
app.put("/edit-store/:storeId", (req, res) => {
  const storeId = parseInt(req.params.storeId);
  const updatedStore = req.body;
  let stores = getStoreData();

  const storeIndex = stores.findIndex((store) => store.storeId === storeId);

  if (storeIndex === -1) {
    return res.status(404).json({ success: false, message: "Store not found" });
  }

  // Update store details
  stores[storeIndex] = { ...stores[storeIndex], ...updatedStore };
  saveStore(stores);

  res.json({
    success: true,
    message: "Store updated successfully",
    data: stores[storeIndex],
  });
});

// Serve static images from the 'products' folder
app.use("/images", express.static(path.join(__dirname, "products")));

// Modify product routes to include the static image path
app.get("/products", (req, res) => {
  const products = getProducts();
  const updatedProducts = products.map((product) => {
    console.log(`Main Image Path: /${product.mainImage}`);
    console.log(`Product Images: /${product.productImages.join(", /")}`);

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

const STORES_FILE = "store.json"; // Your local JSON file storing store data

app.post("/update-store/:storeId", (req, res) => {
  const { storeId } = req.params;
  const { contactnumber, password, description } = req.body;

  fs.readFile(STORES_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading stores:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error reading stores." });
    }

    let stores;
    try {
      stores = JSON.parse(data);
    } catch (parseErr) {
      console.error("JSON Parse Error:", parseErr);
      return res
        .status(500)
        .json({ success: false, message: "Invalid stores file format." });
    }

    // ✅ Ensure storeId is always treated as a string
    const storeIndex = stores.findIndex(
      (s) => String(s.storeId) === String(storeId)
    );

    if (storeIndex === -1) {
      console.error("Store not found:", storeId);
      return res
        .status(404)
        .json({ success: false, message: "Store not found." });
    }

    // ✅ Update only allowed fields
    stores[storeIndex].contactnumber =
      contactnumber || stores[storeIndex].contactnumber;
    stores[storeIndex].password = password || stores[storeIndex].password;
    stores[storeIndex].description =
      description || stores[storeIndex].description;

    // ✅ Write updated data to stores.json
    fs.writeFile(STORES_FILE, JSON.stringify(stores, null, 2), (err) => {
      if (err) {
        console.error("Error saving store update:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error saving store update." });
      }

      console.log("Store updated successfully:", stores[storeIndex]);
      res.json({
        success: true,
        message: "Store updated successfully.",
        data: stores[storeIndex],
      });
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
