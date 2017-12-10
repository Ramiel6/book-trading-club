import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


const validate = values => {
  const errors = {};
  const requiredFields = ['name','email', 'password','confirmPassword'];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
    else if (values[ field ].length > 100) {
      errors[ field ] = 'Value is too long';
    }
  });
  
  if (!/^[^\s](\s?[\w\d])*$/gi.test(values.name)) {
    errors.name = 'Only letters and numbers allowed!';
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!';
  }
  if (values.password !== values.confirmPassword){
    errors.confirmPassword = 'Password did not match!';
  }
  return errors;
};


const renderTextField = ({ input, label, placeholder, meta: { touched, error }, ...custom }) => (
  <TextField hintText={placeholder}
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth= {true}
    underlineFocusStyle={textFieldStyle.focusUnderLine}
    {...input}
    {...custom}
  />
);
let SignUpForm = props => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form   name="form" onSubmit={handleSubmit} >
        <div>
         <Field name="name" component={renderTextField} type="text" label="Name" placeholder="Enter Your Name" />
        </div>
        <div>
         <Field name="email" component={renderTextField} type="email" label="Email" placeholder="Enter Eamil" />
        </div>
          <div>  
          <Field name="password" component={renderTextField} type="password" label="Password" placeholder="Enter Password"/>
          </div>
          <div>  
          <Field name="confirmPassword" component={renderTextField} type="password" label="Confirm Password" placeholder="Confirm Password"/>
          </div>
          
        {error && <span className="form-error">{error}</span>}
      <div><br />
        <RaisedButton
                type="submit"
                style={{float:'right'}}
                label={submitting ? 'Working..':'Sign Up'}
                disabled={submitting}
                />
      </div>
  </form>
  );
};
//Styles
const textFieldStyle = {
  inputStyle:{
    color: "#FFFFFF"
  },
  hintStyle:{
    color: "#BDBDBD"
  },
  floatingLabelStyle: {
    color: "#BDBDBD"
  },
  focusUnderLine: {
    borderColor: '#9E9D24'
  }
};


SignUpForm  = reduxForm({
  // a unique name for the form
  form: 'signup',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(SignUpForm );
export default SignUpForm;