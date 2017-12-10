import React from 'react';
import { connect } from 'react-redux';
import {signUp} from '../actions.js';
import SignUpForm from './SignUpForm.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Grid, Row, Col } from 'react-flexbox-grid';

class SignUpComp extends React.Component {
   
    submit = (values) => {
    // print the form values to the console
    console.log(values);
    let user = {
      name:values.name,
      email: values.email,
      password: values.password
    };
    return this.props.signUp(user);
  };
   
    render() {
      const initialValues = {
               name : this.props.user && this.props.user.local && this.props.user.local.name,
              };
      return (
        <Grid fluid>
          <Row  center="xs" >
            <Col xs={6} md={6}>
              <h1>Sign Up</h1>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12} md={6}>
              <SignUpForm initialValues={initialValues} onSubmit={this.submit} />
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12} md={12}>
              <h3 className="text-center">Or login with:</h3>
              <div className="text-center">
                <RaisedButton
                    href="/auth/google"
                    label="Google"
                    backgroundColor='#F44336'
                    labelColor ="#FFFFFF"
                    style={styles.button}
                    icon={<FontIcon className="fa fa-google-plus" />}
                    />
                <RaisedButton
                    href="/auth/github"
                    label="Github"
                    style={styles.button}
                    icon={<FontIcon className="fa fa-github" />}
                    />
              </div>
            </Col>
          </Row>
      </Grid>
      );
    }
}
const styles = {
        button: {
          margin: 12,
        },
};
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
   signUp: user => dispatch(signUp(user))
  }
};


// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(SignUpComp);