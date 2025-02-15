import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cart from "../Assets/cart.png";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5002/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data); // Set the products data
      });
  }, []); // Fetch products only once when component mounts

  return (
    <div className="container mt-5">
      <h3 className="pb-3 pt-3">Products</h3>
      <Row>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={3} className="mb-4">
              <Card className="pt-5 pb-3 admin-card-view">
                <div className="d-flex justify-content-center align-items-center text-center">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5002/images/${product.mainImage}`}
                    alt={product.ProductName}
                    style={{ height: "160px", width: "auto" }}
                  />
                </div>

                <Card.Body>
                  <Card.Title className="product-name">
                    {product.ProductName}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted ">
                    <div className="product-category">
                      <p>{product.Category}</p>
                    </div>
                  </Card.Subtitle>
                  <Card.Text>Price: Rs.{product.Price}</Card.Text>
                  <Card.Text>Product Id : {product.productId}</Card.Text>
                  <button className="btn btn-primary">
                    <Link
                      to={`/product/${encodeURIComponent(product.ProductName)}`}
                      style={{ textDecoration: "none", color: "#ffffff" }}
                    >
                      <div className="d-flex">
                        <div style={{ marginRight: "15px" }}>
                          <img src={cart} style={{ height: "22px" }} />
                        </div>
                        <div>
                          <span className="pt-1 pl-5">
                            Buy Now - Rs.{product.Price}.00
                          </span>
                        </div>
                      </div>
                    </Link>
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Row>
    </div>
  );
};

export default Products;
