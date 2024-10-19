// src/components/PrivacyPolicy.jsx
import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { FaLock, FaShieldAlt, FaRegClock, FaUserShield } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <Container fluid className="bg-light py-5">
      <Container className="py-5 mb-4 text-center">
        <Row>
          <Col>
            <div className="bg-primary text-white rounded p-4 p-md-5">
              <h1 className="display-4">Privacy Policy</h1>
              <p className="lead">Your privacy is important to us. Please review our policy to understand how we handle your data.</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={12} lg={10} className="mx-auto">
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <Card.Title className="text-primary mb-4">Privacy Policy Overview</Card.Title>
                <Card.Text className="text-muted mb-4">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully.
                </Card.Text>

                <ListGroup variant="flush">
                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaShieldAlt className="me-2" /> Information Collection</h5>
                    <p>
                      We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include personal details such as your name, email address, and payment information.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaLock className="me-2" /> How We Use Your Information</h5>
                    <p>
                      We use the information we collect to provide and improve our services, process transactions, communicate with you, and ensure the security of our website.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaRegClock className="me-2" /> Data Retention</h5>
                    <p>
                      We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law. We may also retain some information for analytics and operational purposes.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaUserShield className="me-2" /> Data Protection</h5>
                    <p>
                      We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaRegClock className="me-2" /> Changes to This Policy</h5>
                    <p>
                      We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. Your continued use of our services after any changes constitutes your acceptance of the updated policy.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaUserShield className="me-2" /> Contact Us</h5>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@example.com" className="text-primary">support@example.com</a>.
                    </p>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="primary" href="/" className="btn-lg text-light">Return to Home</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default PrivacyPolicy;
