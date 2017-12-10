import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import {drawerToggle,logout} from '../actions.js';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const NavBig  = (props) => (

      props.isLogedin  ?
      <div>
      <Link to="/profile"><FlatButton style={props.style}><i className="fa fa-user" aria-hidden="true"></i> Profile</FlatButton></Link>
      <FlatButton  style={props.style} onClick={props.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</FlatButton>
      </div>
      :
      <div>
      <Link to="/login"><FlatButton style={props.style}><i className="fa fa fa-sign-in" aria-hidden="true"></i> Login</FlatButton></Link>
      <Link to="/signup"><FlatButton style={props.style}><i className="fa fa-sign-in" aria-hidden="true"></i> Sign Up</FlatButton></Link>
      </div>
    );
NavBig.muiName = 'FlatButton';  


const NavSmall = (props) => (
   props.isLogedin ?
  <IconMenu
    style={props.style}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/profile"><MenuItem ><i className="fa fa-user" aria-hidden="true"></i> Profile</MenuItem></Link>
    <MenuItem onClick={props.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</MenuItem>
  </IconMenu>:
  
  <IconMenu
        style={props.style}
        iconButtonElement={
          <IconButton iconStyle={{color:'#ffffff'}}><MoreVertIcon /></IconButton>
        }
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <Link to="/login"><MenuItem ><i className="fa fa-sign-in" aria-hidden="true"></i> Login</MenuItem></Link>
        <Link to="/signup"><MenuItem ><i className="fa fa-sign-in" aria-hidden="true"></i> Sign Up</MenuItem></Link>
      </IconMenu>
);

NavSmall.muiName = 'IconMenu';
const styles = {
  title: {
    cursor: 'pointer',
  },
};
class NavComp extends React.Component {

  handleToggle = () => {
  
    console.log(this.props.drawer);
    return this.props.drawerToggle(!this.props.drawer);
      
  }
    handleTouchTap = () => this.props.push('/')
     
     render(){
     return (
         <div>
            
            <AppBar 
              title={<span style={styles.title}>Book Trading Club</span>}
              onTitleTouchTap={this.handleTouchTap}
              onLeftIconButtonTouchTap = {this.handleToggle}
              className="app-bar"
              iconElementRight={window.innerWidth >= 400 ? 
                              <NavBig isLogedin={this.props.isLogedin} logout={this.props.logout}/> : 
                              <NavSmall isLogedin={this.props.isLogedin} logout={this.props.logout} />}
              />
        </div>
                )}
    
}
const mapStateToProps = (state, ownProps) => {
//   console.log({results: JSON.stringify(state)})
  return {
    // You can now say this.props.books
    isLogedin : state.authorization.isLogedin,
    drawer: state.viewHandler.drawer
  }
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
  drawerToggle: open => dispatch(drawerToggle(open)),
  push: path => dispatch(push(path)),
  logout: () => dispatch(logout())
     
  }
};
// Use connect to put them together
export default connect(mapStateToProps,mapDispatchToProps)(NavComp);