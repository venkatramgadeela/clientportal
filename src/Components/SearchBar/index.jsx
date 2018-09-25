import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { Row, Col, Container } from 'reactstrap';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSignOutAlt,
  faCircle
} from '@fortawesome/fontawesome-free-solid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logOutAction } from '../../services/Auth/actions';

import './index.css';

fontawesome.library.add(faHome, faSignOutAlt, faCircle);

const SearchBar = props => {
  const logOut = () => {
    props.logOutAction();
  };

  const submit = () => {
    // TODO: Submit should redirect to DCT.
  };

  const { handleSubmit } = props;

  return (
    <div className="py-3 search-bar">
      <Container>
        <Row>
          <Col xs="auto">
            <Link to="/dashboard" href="/dashboard">
              <div className="search-bar__icons">
                <FontAwesomeIcon icon="circle" size="3x" color="white" />
                <FontAwesomeIcon icon="home" size="2x" color="black" />
              </div>
            </Link>
          </Col>
          <Col xs="6" md="8" className="text-center m-auto">
            <form className="my-1" onSubmit={handleSubmit(submit)}>
              <Row noGutters className="justify-content-center">
                <Col xs="12" md="8">
                  <Field
                    name="dtc"
                    component="input"
                    normalize={value => value.toUpperCase()}
                    className="form-control mr-2 input input--full-inline search-bar__input"
                    type="search"
                    placeholder="Search for a DTC (i.e. P0300)"
                    autoComplete="off"
                    required
                  />
                </Col>
                <Col xs="12" md="2">
                  <button
                    className="btn btn--inline my-2 my-sm-0 search-bar__button"
                    type="submit"
                    disabled
                  >
                    Search
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
          <Col xs="auto" className="text-right">
            <Link to="/login" href="/login" onClick={logOut}>
              <div className="search-bar__icons">
                <FontAwesomeIcon icon="circle" size="3x" color="white" />
                <FontAwesomeIcon icon="sign-out-alt" size="2x" color="black" />
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  logOutAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOutAction
    },
    dispatch
  );

const ConnectedSearchBar = connect(
  null,
  mapDispatchToProps
)(SearchBar);

export default reduxForm({
  form: 'search'
})(ConnectedSearchBar);