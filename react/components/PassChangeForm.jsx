import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


const validate = values => {
  const errors = {};
  const requiredFields = [ 'oldPasswordld', 'password','confirmPassword'];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  });
  
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
let PassChangeForm = props => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form   name="form" onSubmit={handleSubmit} >

        <div>
         <Field name="oldPassword" component={renderTextField} type="password" label="Old Password" placeholder="Enter Your Old Password"/>
        </div>
          <div>  
          <Field name="password" component={renderTextField} type="password" label="Password" placeholder="Enter New Password"/>
          </div>
          <div>  
          <Field name="confirmPassword" component={renderTextField} type="password" label="Confirm Password" placeholder="Confirm New Password"/>
          </div>
          
        {error && <span className="form-error">{error}</span>}
      <div><br />
        <RaisedButton
                type="submit"
                style={{float:'right'}}
                label={submitting ? 'Working..':'Change'}
                disabled={submitting}
                />
      </div>
  </form>
  )
}
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
}


PassChangeForm  = reduxForm({
  // a unique name for the form
  form: 'passChange',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(PassChangeForm );
export default PassChangeForm;