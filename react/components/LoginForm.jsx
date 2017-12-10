import React from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const validate = values => {
  const errors = {};
  const requiredFields = [ 'email', 'password'];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
    else if (values[ field ].length > 100) {
      errors[ field ] = 'Value is too long';
    }
  });
  
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
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
let LoginForm = props => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form   name="form" onSubmit={handleSubmit} >

        <div>
         <Field name="email" component={renderTextField} type="email" label="Email" placeholder="Enter Eamil" />
        </div>
          <div>  
          <Field name="password" component={renderTextField} type="password" label="Password" placeholder="Enter Password"/>
          </div>
          
        {error && <span className="form-error">{error}</span>}
      <div><br />
        <RaisedButton
                type="submit"
                style={{float:'right'}}
                label={submitting ? 'Working..':'Login'}
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
// const styles = {
//   error: {
//     position: 'relative',
//     bottom: 15,
//     fontSize: 12,
//     lineHeight: 12,
//     color: '#f44336',
//     transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
//   }
// }


LoginForm = reduxForm({
  // a unique name for the form
  form: 'login',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(LoginForm);
export default LoginForm;