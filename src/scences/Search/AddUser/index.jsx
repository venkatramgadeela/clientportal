import React, { Component } from 'react';
import { Card, CardBody, Row, Col, Button, Container } from 'reactstrap';
import { Field, reduxForm, initialize, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import { fetchSelectFields, editUSER, saveUSER } from '../actions';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Auth from '../../../services/Auth';
import CancelDialog from '../../../components/Dialogs/cancelDialog';
import CustomField from '../../../components/CustomField';
import './index.css';


class AddUser extends Component {
  static defaultProps = {
    name: '',
    role: '',
    phoneNumber: '',
    clubList: '',
    roles: [],
  }

  constructor(props) {
    super(props);
    this.sendBack = this.sendBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchSelectFields();
  }

  componentDidMount() {
    const {
      result: {
        ...rest
      },

    } = this.props;
    if (rest.clubs) {
      const mergedValues = Object.assign({}, rest);
      mergedValues.clubList = mergedValues.clubs.available;
      this.props.initialize('users', mergedValues);
    } else {
      this.props.initialize('users', rest);
    }
  }

  sendBack() {
    this.props.history.push('/admin/users/');
  }


  handleSubmit() {
    if (this.props.history.location.pathname.indexOf('add') > -1) {
      let data = {};
      { data = this.props.field; }

      if (data && data.firstName &&
        data.phoneNumber && data.lastName && data.clubList && data.role) {
        data.email = this.props.params.email;
        if (data.clubList) {
          data.clubs = { available: data.clubList };
          delete data.clubList;
        } else {
          data.clubs = { available: [] };
        }
        // TODO: Remove this in Production.
        this.props.saveUSER(data).then(() => {
          this.props.history.push('/admin/users/');
        });
      }
    } else {
      let data = {};
      data = this.props.field;
      if (data.clubList) {
        data.clubs = { available: data.clubList };
        delete data.clubList;
      }
      this.props.editUSER(data).then(() => {
        this.props.history.push('/admin/users/');
      });
    }
  }

  /* eslint-disable */
  render() {
    const {
      params,
      result,
      name,
      role,
      email,
      roles,
      availableClubs,
      handleSubmit,
    } = this.props;
    return (
      <form className="form--users">
        <div className="result-top mb-4">
          <Container className="result py-4">
            <Breadcrumbs />
            <Row>
              <Col xs="12" className="form__label-group">
                <h2 className="result__title mb-0">{result.email || params.email}</h2>
                <small className="result__subtitle">SAE {params.email.slice(0, 3) || params.email.slice(0, 3)} / <strong>{result.dtc || params.dtc}</strong></small>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Card className="mb-4">
            <CardBody>
            <Row className="mb-4">
            <Col xs="auto" className="form__label-group">
              <Field
                label="Role"
                name="role"
                component={CustomField}
                type="text"
                field="select"
                className="form-control"
                value={result.role}
                disabled={Auth.isClubUser}
              >
                <option disabled value="">Select Roles...</option>
                {roles.map((role, index) => (
                  <option key={index} >{role}</option>
                ))}
              </Field>
              </Col>
              <Col xs="12" md="6" className="form__label-group">
              <label>Available Club</label>
              <Field
              name="clubList"
              component={CustomField}
              field="multiselect"
              data={availableClubs}
              />
                {/* <Field
                  name="clubList"
                  component={Multiselect}
                  defaultValue={result.clubList}
                  onBlur={() => props.onBlur()}
                  type="select"
                  field="input"
                  data={availableClubs}/> */}
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs="12" md="6" className="form__label-group">
                <Field
                  label="First Name"
                  name="firstName"
                  component={CustomField}
                  type="text"
                  field="input"
                  className="form-control"
                />
              </Col>
              <Col xs="12" md="6" className="form__label-group">
              <Field
                label="Last Name"
                name="lastName"
                component={CustomField}
                type="text"
                field="input"
                className="form-control"
              />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs="12" md="6" className="form__label-group">
                <Field
                  label="Phone Number"
                  name="phoneNumber"
                  component={CustomField}
                  type="text"
                  field="input"
                  className="form-control"
                />
              </Col>
              {/* <Col xs="12" md="6">
              <Field
                label="Clubs"
                name="clubList"
                component={CustomField}
                type="text"
                field="textarea"
                className="form-control"
              />
              <div className="note">
                <span><b>Note: </b></span>
                <span className="note_message">Please add club seprated by comma(,).</span>
                <div>
                  <span className="note_message">(Eg.123,456)</span>
                </div>
              </div>
                </Col> */}
              </Row>
            </CardBody>
          </Card>
          {typeof result === 'undefined' && result !== null && <VideoCard />}
          <Row className="justify-content-center mb-4">
            <Col xs="4">
              <Button
                color="primary"
                className="btn-block"
                onClick={handleSubmit(this.handleSubmit)}
              >
                Save
              </Button>
            </Col>
            <Col xs="4">
              <div className="m-auto text-center">
                <CancelDialog 
                entity="USER"
                callback={() => {
                  this.sendBack();
                }}>
                  Are you sure you want to delete this?
                </CancelDialog>
              </div>
            </Col>
          </Row>
        </Container>
        {}
      </form>
    );
  }
}

const selector = formValueSelector('users');

const mapStateToProps = state => ({
  ...state.search.options,
  field: selector(state, 'email', 'role','firstName','lastName','phoneNumber','clubList'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSelectFields,
  editUSER,
  saveUSER,
  initialize,
}, dispatch);

export default reduxForm({
  form: 'users',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(connect(mapStateToProps, mapDispatchToProps)(AddUser));


