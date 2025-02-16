import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Layouts/NavBar";
import cart from "../Assets/cart.png";

export default function ProductDetail() {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // New state for popup image

  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/order", { state: { product } });
  };

  useEffect(() => {
    fetch("http://localhost:5002/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const selectedProduct = data.data.find(
            (p) =>
              p.ProductName.toLowerCase() ===
              decodeURIComponent(productName).toLowerCase()
          );
          if (selectedProduct) {
            setProduct(selectedProduct);

            fetch("http://localhost:5002/store")
              .then((res) => res.json())
              .then((storeData) => {
                if (storeData.success) {
                  const store = storeData.data.find(
                    (s) => s.storeId.toString() === selectedProduct.StoreID
                  );
                  setStoreName(store ? store.storename : "Unknown Store");
                }
              })
              .catch((err) => console.error("Error fetching store data:", err));
          }
        }
      })
      .catch((err) => console.error("Error fetching product data:", err));
  }, [productName]);

  if (!product) return <p className="text-center mt-4">Loading...</p>;

  const contentItems = Array.isArray(product.Content)
    ? product.Content
    : product.Content.split(",");

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <Link to={`/`} style={{ textDecoration: "none", color: "#ffffff" }}>
              <button className="btn btn-primary2 mb-5 mt-5">
                Back to Product Page
              </button>
            </Link>
          </div>
          <div className="col-md-5">
            {/* Main Image - Clickable */}
            <img
              src={`http://localhost:5002/images/${product.mainImage}`}
              alt={product.ProductName}
              className="img-fluid mb-3 w-100"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedImage(
                  `http://localhost:5002/images/${product.mainImage}`
                )
              }
            />
            <div className="row">
              {product.productImages &&
                product.productImages.map((image, index) => (
                  <div className="col-3 p-1" key={index}>
                    <img
                      src={`http://localhost:5002/images/${image}`}
                      alt={`product-${index}`}
                      className="img-fluid"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelectedImage(
                          `http://localhost:5002/images/${image}`
                        )
                      }
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="col-md-1"></div>
          <div className="col-md-6 single-product-page">
            <h1 className="mb-3 ProductName">{product.ProductName}</h1>
            <p className="Productcatogery">{product.Category}</p>
            <p className="store">
              Store Name:{" "}
              <Link
                to={`/store/${product.StoreID}`}
                style={{ textDecoration: "none", color: "#000" }}
                title="Visit Store"
              >
                {storeName}
              </Link>
            </p>
            <p className="mt-3">
              <strong>Product Description</strong> <br />
              {product.Description}
            </p>
            <button
              className="btn btn-primary mt-4 mb-5"
              onClick={handleBuyNow}
            >
              <div className="d-flex px-3 py-1">
                <div style={{ marginRight: "15px" }}>
                  <img src={cart} style={{ height: "26px" }} alt="cart" />
                </div>
                <div>
                  <span
                    className="pl-5"
                    style={{ fontSize: "20px", fontWeight: "600" }}
                  >
                    Buy Now - Rs.{product.Price}.00
                  </span>
                </div>
              </div>
            </button>

            <Link
              to={`/store/${product.StoreID}`}
              style={{ textDecoration: "none", color: "#ffffff" }}
            >
              <button className="btn btn-primary mt-4 mb-5">
                <div className="d-flex px-3 py-1">
                  <div style={{ marginRight: "15px" }}>
                    <img src={cart} style={{ height: "26px" }} />
                  </div>
                  <div>
                    <span
                      className="pl-5"
                      style={{ fontSize: "20px", fontWeight: "600" }}
                    >
                      Buy Now - Rs.{product.Price}.00
                    </span>
                  </div>
                </div>
              </button>
            </Link>
            <p className="mt-3">
              <strong>Product Contents</strong> <br />
              <ul>
                {contentItems.length > 0 ? (
                  contentItems.map((item, index) => <li key={index}>{item}</li>)
                ) : (
                  <p>No content available.</p>
                )}
              </ul>
            </p>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Popup */}
      {selectedImage && (
        <div
          className="popup-overlay"
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(255, 255, 255, 0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
}
