import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProducts = () => {
  const [productData, setProductData] = useState({
    ProductName: "",
    Category: "",
    StoreID: "",
    Description: "",
    Price: "",
    Content: [],
    mainImage: null,
    productImages: [], // Array to hold multiple images
  });

  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Toys",
    "Sports",
    "Beauty",
  ];

  useEffect(() => {
    const storedStoreId = localStorage.getItem("storeId") || "";
    setProductData((prevData) => ({ ...prevData, StoreID: storedStoreId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleArrayChange = (e) => {
    setProductData({ ...productData, Content: e.target.value.split(",") });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) return;

    const maxSize = 512 * 1024; // 512KB limit

    // Handling main image
    if (name === "mainImage") {
      if (files[0].size > maxSize) {
        alert("Main image must be less than 512KB");
        return;
      }
      setProductData({ ...productData, mainImage: files[0] });
    }

    // Handling product images
    if (name === "productImages") {
      if (productData.productImages.length >= 4) {
        alert("You can upload a maximum of 4 product images.");
        return;
      }

      const validFiles = Array.from(files).filter(
        (file) => file.size <= maxSize
      );
      if (validFiles.length !== files.length) {
        alert("Each product image must be less than 512KB.");
        return;
      }

      // Append new images to existing ones if the limit is not reached
      setProductData((prevData) => ({
        ...prevData,
        productImages: [...prevData.productImages, ...validFiles],
      }));
    }
  };

  const removeImage = (index) => {
    const updatedImages = productData.productImages.filter(
      (_, idx) => idx !== index
    );
    setProductData({ ...productData, productImages: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append the fields to the formData
    Object.keys(productData).forEach((key) => {
      if (key === "productImages") {
        productData[key].forEach((image) =>
          formData.append("productImages", image)
        );
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await fetch("http://localhost:5002/add-product", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setPopupData(data.data);
      setShowPopup(true);
      setProductData({
        ProductName: "",
        Category: "",
        StoreID: localStorage.getItem("storeId") || "",
        Description: "",
        Price: "",
        Content: [],
        mainImage: null,
        productImages: [],
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Product</h2>
      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="ProductName"
            value={productData.ProductName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="Category"
            value={productData.Category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="Description"
            value={productData.Description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="Price"
            value={productData.Price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content (comma separated)</label>
          <input
            type="text"
            className="form-control"
            name="Content"
            value={productData.Content.join(",")}
            onChange={handleArrayChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Main Image (Max 512KB)</label>
          <input
            type="file"
            className="form-control"
            name="mainImage"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Product Images (Max 4, each 512KB)
          </label>
          <input
            type="file"
            className="form-control"
            name="productImages"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            required
          />
        </div>

        {/* Display uploaded product images */}
        {productData.productImages.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Uploaded Product Images</label>
            <div className="d-flex flex-wrap gap-2">
              {productData.productImages.map((image, idx) => (
                <div key={idx} className="position-relative">
                  <img
                    src={URL.createObjectURL(image)}
                    // alt={Product Image ${idx + 1}}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger position-absolute top-0 end-0"
                    style={{ fontSize: "12px" }}
                    onClick={() => removeImage(idx)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
