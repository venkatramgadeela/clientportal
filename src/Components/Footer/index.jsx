import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => (
  <footer className="footer-bar fixed-bottom">
    <Container>
      <Row noGutters className="justify-content-center">
        <Col md="auto" className="align-self-center ml-3">
          <p className="text-muted">© 2018 AAA, All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
