import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { shouldGetUsers, getUsers } from '../../../services/Users/actions';
import LoadingSpinner from '../../../components/LoadingSpinner';
import UsersTable from './components/UsersTable';

class UsersList extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      entities: PropTypes.object.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    if (this.props.users.loading) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        <div className="result-top mb-4">
          <Container className="result py-4">
            <Row>
              <Col xs="12">
                <h2 className="result__title mb-0">Users</h2>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <UsersTable users={this.props.users.entities} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers,
      shouldGetUsers
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
