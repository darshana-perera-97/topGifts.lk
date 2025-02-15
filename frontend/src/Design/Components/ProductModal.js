import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProductModal = ({ show, handleClose, product, handleDelete }) => {
  if (!product) return null; // Ensure that product is defined before rendering

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="popup-header">
        <Modal.Title>{product.ProductName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-4">
        <div className="d-flex justify-content-center align-items-center text-center mt-3 mb-5">
          <img
            src={`http://localhost:5002/images/${product.mainImage}`}
            alt={product.ProductName}
            style={{ width: "200px", marginRight: "10px" }}
          />
        </div>
        <p>
          <strong>Category:</strong> {product.Category}
        </p>
        <p>
          <strong>Price:</strong> Rs. {product.Price}.00
        </p>
        <p>
          <strong>Content:</strong> {product.Content}
        </p>
        <p>
          <strong>Description:</strong> {product.Description}
        </p>

        <div>
          <strong>Product Images:</strong>
          <div>
            {product.productImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5002/images/${image}`}
                alt={`${product.ProductName}-${index}`}
                style={{ width: "100px", marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn close-btn" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
