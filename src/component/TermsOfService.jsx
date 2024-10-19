// src/components/TermsOfService.jsx
import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

const TermsOfService = () => {
  return (
    <Container fluid className="bg-light py-5">
      <Container className="py-5 mb-4 text-center">
        <Row>
          <Col>
            <div className="bg-primary text-white rounded p-4 p-md-5">
              <h1 className="display-4">Terms of Service</h1>
              <p className="lead">Please read these terms carefully before using our services.</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={12} lg={10} className="mx-auto">
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <Card.Title className="text-primary mb-4">Welcome to EVENT BOOKINGS</Card.Title>
                <Card.Text className="text-muted mb-4">
                  These Terms of Service outline the rules and regulations for using our website. By accessing or using our services, you agree to comply with these terms and conditions. If you do not agree with any part of these terms, please do not use our services.
                </Card.Text>

                <ListGroup variant="flush">
                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> Introduction</h5>
                    <p>
                      Welcome to EVENT BOOKINGS. These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to comply with these terms and conditions.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> User Responsibilities</h5>
                    <p>
                      Users are responsible for maintaining the confidentiality of their account and password. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. You also agree to use our services only for lawful purposes.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> Intellectual Property</h5>
                    <p>
                      All content on the EVENT BOOKINGS website, including text, graphics, logos, and images, is the property of EVENT BOOKINGS or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> Limitation of Liability</h5>
                    <p>
                      EVENT BOOKINGS will not be liable for any damages arising from the use of our website or services. We do not guarantee that our services will be uninterrupted or error-free. In no event shall our liability exceed the amount paid by you for the services in question.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> Changes to Terms</h5>
                    <p>
                      We may update these Terms of Service from time to time. We will notify you of any changes by posting the new terms on our website. Your continued use of our services after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> Privacy Policy</h5>
                    <p>
                      Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> Termination</h5>
                    <p>
                      We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without prior notice or liability, for any reason, including if you breach these terms.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> Governing Law</h5>
                    <p>
                      These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which EVENT BOOKINGS operates. Any disputes arising from these terms shall be resolved in the courts of that jurisdiction.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0">
                    <h5 className="text-primary"><FaCheckCircle className="me-2" /> Contact Us</h5>
                    <p>
                      If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@example.com" className="text-primary">support@example.com</a>.
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

export default TermsOfService;
