import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-white border-top">
      <Container>
        <Row className="py-4">
          {/* Logo and Description */}
          <Col md={3} className="mb-4 mb-md-0">
            <h2 className="logo">
            <Image src="/assets/images/logo.png" alt="logo" className="me-2 nav-logo" />
            </h2>
            <p className="text-muted">
              Contact us today to explore our tailored packages and discover how we can help you succeed! tempor incididunt.
            </p>
          </Col>

          {/* Useful Links */}
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Useful Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-muted">Terms and Conditions</a>
              </li>
              <li>
                <a href="#" className="text-muted">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted">Support</a>
              </li>
            </ul>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-muted">About Us</a>
              </li>
              <li>
                <a href="#" className="text-muted">Services</a>
              </li>
              <li>
                <a href="#" className="text-muted">Pricing</a>
              </li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col md={3}>
            <h5 className="mb-3">Newsletter</h5>
            <p className="text-muted">
              Perfect for websites, business cards, and marketing materials.
            </p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Your Email Address"
                className="me-2"
              />
              <Button variant="secondary">Send</Button>
            </Form>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row className="border-top pt-3 pb-3 text-center">
          <Col className="d-flex justify-content-between ps-3 pe-3">
            <span className="text-muted mb-0">My Virtual Office by Virtual Development Team</span>
            <span className="text-muted mb-0">Copyright © 2024. All rights reserved.</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
