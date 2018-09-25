import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import classNames from 'classnames';
import logo from '../../assets/logo.png';
import './index.css';

const Banner = () => {
  const bannerWhite = classNames({
    banner: true,
    'py-4': true,
    'banner--white': true
  });
  const homeRoute = '/dashboard';
  return (
    <header className={bannerWhite}>
      <Container>
        <Link to={homeRoute} href={homeRoute}>
          <Row noGutters className="justify-content-center">
            <Col xs="12" md="auto" className="text-center">
              <img className="banner__logo" src={logo} alt="AAA" />
            </Col>
            <Col xs="12" md="auto" className="align-self-center ml-3">
              <h1 className="banner__title d-none d-md-block">
                DCT Maintenance
              </h1>
            </Col>
          </Row>
        </Link>
      </Container>
    </header>
  );
};

export default withRouter(Banner);