//https://themeteorchef.com/tutorials/getting-started-with-react-router-v4
import 'babel-polyfill';
import React from 'react';
// import { Provider } from 'react-redux';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import  AppRouter  from './components/AppRouter.jsx';
import  MainComp  from './components/MainComp.jsx';

import store from './configureStore';

render(
 <MuiThemeProvider>
 <MainComp />
 </MuiThemeProvider>,
  document.getElementById('root')
);
