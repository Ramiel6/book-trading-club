import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { ConnectedRouter, push } from 'react-router-redux';

import {getStatus,getGoogleBooks,getClubBooks, saveBook, exchangeBook, approveBook, 
        requestsDialog,clubDialog,handelSnackbar,drawerToggle,changeClubSearch,changeGoogleSearch,
        deleteBook,removeRequest,likeBook,unlikeBook} from '../actions.js';

import Snackbar from 'material-ui/Snackbar';
import { fadeIn } from 'react-animations';
import { Grid, Row, Col } from 'react-flexbox-grid';

import NavComp from './NavComp.jsx';
import  MainComp  from './MainComp.jsx';
import  LoginComp  from './LoginComp.jsx';
import  SignUpComp  from './SignUpComp.jsx';
import GoogleBooksView from './GoogleBooksView.jsx';
import ClubBooksView from './ClubBooksView.jsx';
import UserBooksView from './UserBooksView.jsx';
import RequiredBooksView from './RequiredBooksView.jsx';
import RequestedBooksView from './RequestedBooksView.jsx';
import SideNavView from './SideNavView.jsx';
import ProfileComp from './ProfileComp.jsx';
import ProfileUpdateComp from './ProfileUpdateComp.jsx';
import AboutView from './AboutView.jsx';
// const renderMergedProps = (component, ...rest) => {
// https://github.com/ReactTraining/react-router/issues/4105
//   const finalProps = Object.assign({}, ...rest);
//   return (
//     React.createElement(component, finalProps)
//   );
// }
// const PropsRoute = ({ component, ...rest }) => {
//   return (
//     <Route {...rest} render={routeProps => {
//       return renderMergedProps(component, routeProps, rest);
//     }}/>
//   );
// }

const PrivateRoute = ({component: Component, authed,isLoaded, name, path, ...rest}) => {
  //https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
  return (
    <Route
      name ={name}
      path ={path}
      render={isLoaded && ((props) => authed 
        ? <Component {...props} {...rest}/>
        : <Redirect to={{pathname: '/login'}} />)}
    />
  )
}
function PropsRoute ({component: Component, name, path, ...rest}) {
  return (
    <Route
      name ={name}
      path ={path}
      render={(props) => (<Component {...rest}  {...props} />)}
    />
  )
}
// const FadingRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     <FadeIn>
//       <Component {...props}/>
//     </FadeIn>
//   )}/>
// )
class AppRouter extends React.Component {
  componentDidMount(){
        const {getStatus} = this.props
        getStatus();
      }
  
  saveClick = (book) =>{
   this.props.saveBook(book)
    .then(()=> this.props.handelSnackbar(true,'Book Saved',4000)).catch((error)=>{console.log('save error')});
  
  }
  exchangeClick = (book) => {
    this.props.exchangeBook(book)
      .then( ()=> {
        this.props.handelSnackbar(true,'Exchange Requested',4000);
        this.props.getClubBooks(false);
        }).catch((error)=>{console.log('exchange error')});
      
   
  }
  handleGoogle = (input) => {
        this.props.getGoogleBooks(input);
      }
  handleClub = () => {
        this.props.getClubBooks();
      }
  handleApprove = (book,req) => {
        this.props.approveBook(book,req)
          .then( ()=> this.props.handelSnackbar(true,'Exchange Approved',4000)).catch((error)=>{console.log('approve error')});
        this.props.requestsDialog(null,false);
        
      }
  handelDeleteBook= (book) => { 
      this.props.deleteBook(book)
        .then( ()=> {
          this.props.handelSnackbar(true,'Book Deleted',4000);
          this.props.getClubBooks();
          }).catch((error)=>{console.log('delete error')});
      }
  handelRemoveRequest= (book) => { 
      this.props.removeRequest(book)
        .then( ()=> {
                this.props.handelSnackbar(true,'Request Removed',4000);
                this.props.getClubBooks(false);
                }).catch((error)=>{console.log('Request Remove error')});
      }
      
  handleReqDialog = (book,open) => {
        this.props.requestsDialog(book,open);
      }
  handleClubDialog = (book,open) => {
        this.props.clubDialog(book,open);
      }
  handleClubSearch = (input) => {
      this.props.changeClubSearch(input);
      }
  handleGoogleInput = (input) => {
      this.props.changeGoogleSearch(input);
      }
  handleLikeBook = (book) => {
      this.props.likeBook(book);
      }
  handleUnlikeBook = (book) => {
      this.props.unlikeBook(book);
      }
  
    render() {
      const googleBooks = this.props.googleBooks && this.props.googleBooks.items;
      const ClubBooks = this.props.clubBooks.filter((book,index)=>(
        this.props.clubSearchInput ?
         book.title.toLowerCase().includes(this.props.clubSearchInput.toLowerCase()) && book : book
         ));
      const userBooks = this.props.user && this.props.clubBooks.filter((book,index)=>(
         book.owner === this.props.user._id && book
         ));
      const requiredBooks = this.props.user && this.props.clubBooks.filter((book,index)=>(
         book.requiredBy === this.props.user._id && book
         ));
      const requestedBooks = this.props.user && this.props.clubBooks.filter((book,index)=>(
         book.requests.some(user => user.id === this.props.user._id) && book
         ));
        // console.log(this.props.user._id)
        // console.log(requiredBooks);
      return (
         
        <ConnectedRouter history={history}>
          <div>
            <NavComp />
            <div className="content">
            {this.props.location && this.props.location.pathname == '/' && <div className="banner">
      
            </div>}
            <Grid fluid>
              <Row>
              
                {this.props.drawer && <Col xs={3} md={3}>
                  <SideNavView open={this.props.drawer} drawerToggle={(open) => this.props.drawerToggle(open)} />
                </Col>}
                <Col xs={this.props.drawer ? 9:12} md={this.props.drawer ? 9:12}>
                  <Switch>
                    <Route exact name="home" path="/" component={MainComp} />
                    
                    <Route  name="login" path="/login" component={LoginComp} />
                    <Route  name="login" path="/signup" component={SignUpComp} />
                    {/*<Route  name="googlebooks"
                            path="/google-books"
                            render={(props) => (<GoogleBooksView {...props} 
                                                  bookList = {googleBooks}  
                                                  onUserClick={this.saveClick}
                                                  handleGoogle={this.handleGoogle}
                                                  clubDialogOpen ={this.props.clubDialogOpen}
                                                  handleClubDialog={this.handleClubDialog}
                                                  clubBook = {this.props.clubBook}
                                                  user={this.props.user}
                                                />)}/> */}
                    <PropsRoute  name="googlebooks" path="/google-books" 
                                component={GoogleBooksView}
                                bookList = {googleBooks}  
                                onUserClick={this.saveClick}
                                handleGoogle={this.handleGoogle}
                                handleGoogleInput={this.handleGoogleInput}
                                googleSearchInput={this.props.googleSearchInput}
                                clubDialogOpen ={this.props.clubDialogOpen}
                                handleClubDialog={this.handleClubDialog}
                                clubBook = {this.props.clubBook}
                                isWorking = {this.props.isWorking}
                                user={this.props.user}
                          />
                    <PropsRoute  name="clubbooks" path="/club-books" 
                                component={ClubBooksView}
                                bookList = {ClubBooks}  
                                onUserClick={this.exchangeClick}
                                handleClub={this.handleClub}
                                handleClubSearch ={this.handleClubSearch}
                                clubSearchInput = {this.props.clubSearchInput}
                                user={this.props.user}
                                clubDialogOpen ={this.props.clubDialogOpen}
                                handleClubDialog={this.handleClubDialog}
                                clubBook = {this.props.clubBook}
                                isWorking = {this.props.isWorking}
                                handleLikeBook ={this.handleLikeBook}
                                handleUnlikeBook ={this.handleUnlikeBook}
                                
                          />
                    <PrivateRoute   name="Userbooks" path="/mybooks" 
                                    component={UserBooksView}
                                    authed={this.props.isLogedin}
                                    isLoaded={this.props.isLoaded}
                                    bookList = {userBooks}  
                                    onUserClick={this.saveClick}
                                    handleClub={this.handleClub}
                                    handleApprove={this.handleApprove}
                                    handelDeleteBook ={this.handelDeleteBook}
                                    reqDialogOpen = {this.props.reqDialogOpen}
                                    clubDialogOpen ={this.props.clubDialogOpen}
                                    handleReqDialog={this.handleReqDialog}
                                    handleClubDialog={this.handleClubDialog}
                                    clubBook = {this.props.clubBook}
                                    isWorking = {this.props.isWorking}
                                    handleLikeBook ={this.handleLikeBook}
                                    handleUnlikeBook ={this.handleUnlikeBook}
                                    user={this.props.user}
                                    
                          />
                    <PrivateRoute   name="RequiredBooks" path="/Required-Books" 
                                    component={RequiredBooksView}
                                    authed={this.props.isLogedin}
                                    isLoaded={this.props.isLoaded}
                                    bookList = {requiredBooks}  
                                    handleClub={this.handleClub}
                                    clubDialogOpen ={this.props.clubDialogOpen}
                                    handleReqDialog={this.handleReqDialog}
                                    handleClubDialog={this.handleClubDialog}
                                    clubBook = {this.props.clubBook}
                                    isWorking = {this.props.isWorking}
                          />
                    <PrivateRoute   name="RequestedBooks" path="/Requested-Books" 
                                    component={RequestedBooksView}
                                    authed={this.props.isLogedin}
                                    isLoaded={this.props.isLoaded}
                                    bookList = {requestedBooks}  
                                    handleClub={this.handleClub}
                                    handelRemoveRequest={this.handelRemoveRequest}
                                    clubDialogOpen ={this.props.clubDialogOpen}
                                    handleReqDialog={this.handleReqDialog}
                                    handleClubDialog={this.handleClubDialog}
                                    clubBook = {this.props.clubBook}
                                    isWorking = {this.props.isWorking}
                          />
                  <PrivateRoute path='/profile' 
                                component={ProfileComp}
                                authed={this.props.isLogedin} 
                                isLoaded={this.props.isLoaded}
                                /> 
                  <PrivateRoute path='/profile-update' 
                                component={ProfileUpdateComp}
                                authed={this.props.isLogedin} 
                                isLoaded={this.props.isLoaded}
                                />
                  <Route path='/about' component={AboutView} /> 
                 </Switch>
              
              </Col>
              </Row>
            </Grid>
            </div>
            <footer className="footer">
                  <p>Copyright &copy; 2017. All Rights Reserved</p>
                </footer>
          <Snackbar
              open={this.props.snackbarOpen}
              message={this.props.snackbarMsg}
              action="Close"
              autoHideDuration={this.props.snackbarDuration}
              onActionTouchTap={() => this.props.handelSnackbar(false, '')}
              onRequestClose={() => this.props.handelSnackbar(false, '')}
            />
          </div>
        </ConnectedRouter>
        
      );
    }
}
const mapStateToProps = (state, ownProps) => {
//   console.log({results: JSON.stringify(state)})
  return {
    // You can now say this.props.books
    googleBooks: state.books.googleBooks,
    googleSearchInput:state.books.googleSearchInput,
    clubBooks: state.books.clubBooks,
    clubSearchInput:state.books.clubSearchInput,
    drawer: state.viewHandler.drawer,
    clubDialog: state.viewHandler.clubDialog,
    reqDialogOpen: state.viewHandler.reqDialogOpen,
    clubDialogOpen: state.viewHandler.clubDialogOpen,
    clubBook: state.viewHandler.clubBook,
    snackbarOpen: state.viewHandler.snackbarOpen,
    snackbarMsg: state.viewHandler.snackbarMsg,
    snackbarDuration: state.viewHandler.snackbarDuration,
    isWorking: state.viewHandler.isWorking,
    isLogedin : state.authorization.isLogedin,
    isLoaded : state.authorization.isLoaded,
    user : state.authorization.user,
    location: state.router.location,
   
  };
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
  getGoogleBooks: input => dispatch(getGoogleBooks(input)),
  getClubBooks: () => dispatch(getClubBooks()),
  saveBook: book => dispatch(saveBook(book)),
  exchangeBook: book => dispatch(exchangeBook(book)),
  deleteBook: book => dispatch(deleteBook(book)),
  removeRequest: book => dispatch(removeRequest(book)),
  approveBook: (book,req) => dispatch(approveBook(book,req)),
  getStatus:() => dispatch(getStatus()),
  requestsDialog: (book,open) => dispatch(requestsDialog(book,open)),
  clubDialog : (book,open) => dispatch(clubDialog(book,open)),
  handelSnackbar : (open,message,autoHideDuration) => dispatch(handelSnackbar(open,message,autoHideDuration)),
  drawerToggle: open => dispatch(drawerToggle(open)),
  changeClubSearch: input => dispatch(changeClubSearch(input)),
  changeGoogleSearch: input => dispatch(changeGoogleSearch(input)),
  likeBook: (book) => dispatch(likeBook(book)),
  unlikeBook: (book) => dispatch(unlikeBook(book)),
     
  };
};
// Use connect to put them together
export default connect(mapStateToProps,mapDispatchToProps)(AppRouter);