import React from 'react';
import PropTypes from 'prop-types';

import { Col, Card, CardBody } from 'reactstrap';

import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const DashboardCard = props => (
  <Col xs="12" md="4">
    <Card className="admin-card">
      <Link to={props.link} href={props.link} className="admin-card__link">
        <CardBody className="text-center">
          <FontAwesomeIcon
            icon={props.icon}
            size="4x"
            color="black"
            className="admin-card__icon"
          />
          <br />
          <div className="mt-2 admin-card__title">{props.title}</div>
        </CardBody>
      </Link>
    </Card>
  </Col>
);

DashboardCard.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DashboardCard;
