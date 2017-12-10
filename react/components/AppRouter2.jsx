import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter, push } from 'react-router-redux'
import { connect } from 'react-redux';
import history from '../history'
import  MainComp  from '../components/MainComp.jsx';
// import  LoginComp  from '../components/LoginComp.jsx';
// import  SignUpComp  from '../components/SignUpComp.jsx';
// import ProfileComp from '../components/ProfileComp.jsx'
// import {getStatus} from '../actions.js';



class AppRouter extends React.Component {
    
    
    render() {
      return (
         
           <ConnectedRouter history={history}>
        
        <Switch>
         <Route exact name="home" path="/" component={MainComp} />
        <Route  name="login" path="/signup" component={MainComp} />
        </Switch>
        
          </ConnectedRouter>
        
      );
    }
}

export default AppRouter;