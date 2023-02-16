import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light footer">
      <Container className="text-center py-4">
        <Row>
          <Col>
            <h6 className="fw-bold text-muted">
              Get The Latest News Sent Right To Your Inbox
            </h6>
          </Col>
        </Row>
        <Row>
          <Col className="text-muted text-start">
            <span>Copyright &copy; Work-Genius 2023. All rights reserved.</span>
            <br />
            <p style={{ fontSize: '14px' }} className="py-2">
              Lorem ipsum dolor sit amet, officia excepteur ex fugiat
              reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
              ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
              Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
              voluptate voluptate dolor minim nulla est proident. Nostrud
            </p>
            <p style={{ fontSize: '14px' }}>
              0000 W State St #000, Boise, ID 000000 USA 0-000-000-0000
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
