import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React from 'react';

export default class UserTable extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}

const columns = [
  {
    dataField: 'email',
    text: 'Email',
    sort: true
  },
  {
    dataField: 'firstName',
    text: 'First Name',
    sort: true
  },
  {
    dataField: 'lastName',
    text: 'Last Name',
    sort: true
  },
  {
    dataField: 'role',
    text: 'Role',
    sort: true
  },
  {
    dataField: 'clubs',
    text: 'Clubs'
  }
];

const UsersTable = props => {
  // Remove indexes from user object
  const newUsers = Object.values(props.users);
  return <BootstrapTable keyField="email" data={newUsers} columns={columns} />;
};

UsersTable.propTypes = {
  users: PropTypes.objectOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired
    })
  ).isRequired
};

export default UsersTable;
