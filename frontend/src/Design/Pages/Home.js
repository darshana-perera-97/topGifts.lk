import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap's JavaScript

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5 text-center">
        <h1>Welcome to Our Website</h1>
        <p>Your one-stop destination for amazing products and services!</p>
      </section>

      {/* About Section */}
      <section className="about py-5">
        <div className="container">
          <h2 className="text-center mb-4">About Us</h2>
          <p className="lead text-center">
            We are a company that offers a wide range of products to suit your
            needs. From fashion to electronics, we have something for everyone!
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="service-card p-4 bg-white shadow-sm">
                <h4>Product Delivery</h4>
                <p>Fast and reliable delivery to your doorstep.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card p-4 bg-white shadow-sm">
                <h4>Customer Support</h4>
                <p>
                  We are here to assist you 24/7 with any questions or issues.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card p-4 bg-white shadow-sm">
                <h4>Custom Orders</h4>
                <p>Get custom products tailored to your preferences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5">
        <div className="container">
          <h2 className="text-center mb-4">Customer Testimonials</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="testimonial bg-light p-4">
                <p>
                  "I love shopping here! The customer service is fantastic, and
                  the products are always top-notch!"
                </p>
                <footer>- Jane Doe</footer>
              </div>
            </div>
            <div className="col-md-6">
              <div className="testimonial bg-light p-4">
                <p>
                  "Fast delivery and great prices! I'll definitely be back to
                  shop more."
                </p>
                <footer>- John Smith</footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact bg-dark text-white py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="accordion-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  What products do you offer?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  We offer a variety of products, including fashion,
                  electronics, home goods, and custom-made items.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How can I track my order?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You can track your order through the "Track My Order" section
                  on our website using the tracking number sent via email.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Can I return a product?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, we have a 30-day return policy for unused and unopened
                  products. Please refer to our return policy for more details.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Do you offer international shipping?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, we offer international shipping to several countries.
                  Please check the shipping information page for the complete
                  list.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
