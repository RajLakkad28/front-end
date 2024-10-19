// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link
import './Footer.css'; // Ensure this CSS file is correctly set up

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="text-uppercase mb-3">About Us</h5>
            <p>
              EVENT BOOKINGS provides the latest updates on events around the world. Discover exciting events, from concerts to conferences, and book your tickets with ease.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/event" className="text-white">Explore Events</Link></li>
              <li><Link to="/help" className="text-white">Help</Link></li>
              <li><Link to="/help" className="text-white">Contact Us</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://www.facebook.com/raj.lakkad.336?mibextid=ZbWKwL" className="btn btn-outline-light btn-social mx-2" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://x.com/RajLakkad28?t=TA-BWrhPP06Z5gVR7Ig98A&s=09" className="btn btn-outline-light btn-social mx-2" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/raj_lakkad28?igsh=d2JrZWs4czYwNWtt" className="btn btn-outline-light btn-social mx-2" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mb-1">© {new Date().getFullYear()} EVENT BOOKINGS. All rights reserved.</p>
            <p className="mb-1">
              <Link to="/PrivacyPolicy" className="text-white">Privacy Policy</Link> | <Link to="/TermsOfService" className="text-white">Terms of Service</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
