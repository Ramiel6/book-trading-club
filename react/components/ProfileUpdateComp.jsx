import React from 'react';
import { connect } from 'react-redux';
import {changePassword,changeAddress} from '../actions.js';
import PassChangeForm from './PassChangeForm.jsx';
import AddressUpdateForm from './AddressUpdateForm.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Grid, Row, Col } from 'react-flexbox-grid';

class ProfileUpdateComp extends React.Component {
   
    submitPassword = (values) => {
    // print the form values to the console
    // console.log(values);
    return this.props.changePassword(values.oldPassword, values.password);
    }
    submitAddress = (values) => {
    // print the form values to the console
    console.log(values);
    return this.props.changeAddress(values.name, values.city, values.state);
  }
   
    render() {
      const initialValues = {
               name : this.props.user && this.props.user.local && this.props.user.local.name,
               city: this.props.user.city == 'Unknown' ? '' : this.props.user.city,
               state: this.props.user.state == 'Unknown' ? '' : this.props.user.state,
              };
      return (
        <Grid fluid>
          <Row  center="xs" >
            <Col xs={6} md={6}>
              <h1>Profile Update</h1>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12} md={6}>
              <AddressUpdateForm onSubmit={this.submitAddress} initialValues={initialValues} />
             {this.props.user.local.email && <PassChangeForm onSubmit={this.submitPassword} />}
            </Col>
          </Row>
      </Grid>
      );
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  // console.log({state: JSON.stringify(state)});
  return {
    // You can now say this.props.books
    user: state.authorization.user
  };
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
   changePassword: (oldPassword,password) => dispatch(changePassword(oldPassword,password)),
   changeAddress: (name,city,state) => dispatch(changeAddress(name,city,state))
  };
};


// Use connect to put them together
export default connect(mapStateToProps,mapDispatchToProps)(ProfileUpdateComp);