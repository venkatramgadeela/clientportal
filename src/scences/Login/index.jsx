import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Container, Col, Row, Jumbotron, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logInAction } from '../../services/Auth/actions';
import Auth from '../../services/Auth';
import LoadingSpinner from '../../components/LoadingSpinner';

class Login extends Component {
  static propTypes = {
    logInAction: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      loading: PropTypes.bool.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string
      })
    }).isRequired
  };

  componentDidMount() {
    if (this.props.match.params.email) {
      this.props.logInAction(this.props.match.params.email);
    }
  }

  render() {
    if (Auth.isUserAuthenticated()) {
      return <Redirect to="/dashboard" />;
    }

    if (this.props.auth.loading) {
      return <LoadingSpinner />;
    }

    return (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">Not Logged In</h1>
              <p className="lead">You do not seem to be logged in!</p>
              <hr className="my-2" />
              <p>Use the button below to redirect to AICWeb.</p>
              <p className="lead">
                <Button color="primary">Go!</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logInAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
