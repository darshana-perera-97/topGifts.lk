import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import ProductModal from "../Components/ProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
  }, []);

  useEffect(() => {
    // Get storeId from localStorage
    const storeId = localStorage.getItem("storeId");

    if (storeId) {
      // Filter the products based on the storeId
      const filtered = products.filter(
        (product) => product.StoreID === storeId
      );
      setFilteredProducts(filtered); // Set the filtered products
    }
  }, [products]); // This will run when the products data is updated

  return (
    <div className="container mt-5">
      <h3 className="pb-3 pt-3">Products</h3>
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={3} className="mb-4">
              <Card className="pt-5 pb-3 px-4 admin-card-view">
                <div className="d-flex justify-content-center align-items-center text-center">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5002/images/${product.mainImage}`}
                    alt={product.ProductName}
                    style={{ height: "100px", width: "auto" }}
                  />
                </div>

                <Card.Body>
                  <Card.Title className="product-name">
                    {product.ProductName}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted ">
                    <div className="product-catogery">
                      <p>{product.Category}</p>
                    </div>
                  </Card.Subtitle>
                  {/* <Card.Text>{product.Description}</Card.Text> */}
                  <Card.Text>Price: Rs.{product.Price}</Card.Text>
                  <Card.Text>Product Id : {product.productId}</Card.Text>
                  <button className="btn close-btn" onClick={handleShow}>
                    View More
                  </button>
                  {/* <Card.Text>StoreID: {product.StoreID}</Card.Text> */}
                  {/* <div>
                    {product.productImages.map((img, idx) => (
                      //   <p>{img}</p>
                      <img
                        key={idx}
                        src={`http://localhost:5002/images/${img}`}
                        alt={`Product Image ${idx + 1}`}
                        className="img-fluid"
                        style={{ width: "100px", margin: "5px" }}
                      />
                    ))}
                  </div> */}
                </Card.Body>
              </Card>
              <ProductModal
                show={showModal}
                handleClose={handleClose}
                product={product}
              />
            </Col>
          ))
        ) : (
          <p>No products found for this store.</p>
        )}
      </Row>
    </div>
  );
};

export default Products;
