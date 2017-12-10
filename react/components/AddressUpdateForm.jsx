import React from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'city', 'state'];
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
  if (!/(^\w+|\s)$/gi.test(values.city)) {
    errors.city = 'Only letters allowed!';
  }
  if (!/(^\w+|\s)$/gi.test(values.state)) {
    errors.state = 'Only letters allowed!';
  }
  // if (values.password !== values.confirmPassword){
  //   errors.confirmPassword = 'Password did not match!'
  // }
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
let AddressUpdateForm = props => {
  const { error, handleSubmit, submitting} = props;
  return (
    <form   name="form" onSubmit={handleSubmit} >
        <div>
         <Field name="name"  component={renderTextField}  type="text" label="Name" placeholder="Enter Your Name" />
        </div>
        <div>
         <Field name="city" component={renderTextField}  type="text" label="City" placeholder="Enter Your City" />
        </div>
          <div>  
          <Field name="state" component={renderTextField}  type="text" label="State" placeholder="Enter Your State"/>
          </div>
          
        {error && <span className="form-error">{error}</span>}
      <div><br />
        <RaisedButton
                type="submit"
                style={{float:'right'}}
                label={submitting ? 'Working..':'Update Info'}
                disabled={submitting}
                />
      </div>
  </form>
  );
};
//Styles
const textFieldStyle = {
  
  focusUnderLine: {
    borderColor: '#9E9D24'
  }
};


AddressUpdateForm  = reduxForm({
  // a unique name for the form
  form: 'addressUpdate',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(AddressUpdateForm);
export default AddressUpdateForm;