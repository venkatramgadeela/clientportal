import React from 'react';
import { Container, Col, Row, Jumbotron, Button } from 'reactstrap';

const Login = () => (
  <Container>
    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">Oops!</h1>
          <p className="lead">Something went wrong.</p>
          <hr className="my-2" />
          <p>Use the button below to go back to the previous page.</p>
          <p className="lead">
            <Button color="danger">Go Back!</Button>
          </p>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default Login;

