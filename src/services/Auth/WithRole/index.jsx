import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../';

const withRole = allowedRoles => WrappedComponent =>
  class withRoleLogic extends Component {
    curUserRole = Auth.getUserRole();
    render() {
      return allowedRoles.includes(this.curUserRole) ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to="/" />
      );
    }
  };

export default withRole;

