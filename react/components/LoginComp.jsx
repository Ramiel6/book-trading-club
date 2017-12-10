import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import {login} from '../actions.js';
import LoginForm from './LoginForm.jsx'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Grid, Row, Col } from 'react-flexbox-grid';


class LoginComp extends React.Component {
   
   submit = (values) => {
    // print the form values to the console
    // console.log(values)
    return this.props.login(values)
  }
  
    render() {
      return (
         <Grid fluid>
          <Row  center="xs" >
            <Col xs={6} md={6}>
               <h1>Login</h1>
            </Col>
          </Row>
            <Row center="xs">
              <Col xs={12} md={6}>
              <LoginForm onSubmit={this.submit} />
            </Col>
          </Row>
          <Row center="xs">
          <Col xs={12} md={12}>
          
          <h3>Or login with:</h3>
          <div>
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
  // console.log({results: JSON.stringify(state)})
  return {
    // You can now say this.props.books
    user: state.authorization.user,
    isLogedin : state.authorization.isLogedin
  }
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
   login: user => dispatch(login(user))
  }
};

LoginComp = Radium(LoginComp) // Trying Radium :D
// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(LoginComp);