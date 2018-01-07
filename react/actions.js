//https://scotch.io/tutorials/bookshop-with-react-redux-ii-async-requests-with-thunks
import Axios from 'axios';
import { push } from 'react-router-redux';
import store from './configureStore';
import { SubmissionError } from 'redux-form';
// import Notifications, { success } from 'react-notification-system-redux';
// import fetchJsonp from 'fetch-jsonp'


export const drawerToggleAction = (open) => {
  return {
    type: 'Drawer_Toggle',
    open,
  };
};
export const clubDialogAction = (book,open) => {
  return {
    type: 'Club_Dialog_Toggle',
    book,
    open,
  };
};
export const requestsDialogAction = (book,open) => {
  return {
    type: 'Requests_Dialog_Toggle',
    book,
    open,
  };
};
export const handelSnackbarAction = (open,message,autoHideDuration) => {
  return {
    type: 'Handel_Snackbar_Toggle',
    message,
    open,
    autoHideDuration,
  };
};
export const workingAction = (open) => {
  return {
    type: 'Working_Toggle',
    open
  };
};
export const paginationAction = (pager) => {
  return {
    type: 'Pagination_Action',
    pager,
  };
};
export const pageItemsAction = (pageOfItems) => {
  return {
    type: 'Page_Items_Action',
    pageOfItems,
  };
};
export const changeClubSearchAction = (input,clubBooksSearch) => {
  return {
    type: 'Change_Club_Search',
    input,
    clubBooksSearch,
  };
};
export const changeGoogleSearchAction = (input) => {
  return {
    type: 'Change_Google_Search',
    input,
  };
};
// Sync Action
export const getGoogleBooksAction = (books) => {
  return {
    type: 'Get_Google_Books',
    books,
  };
};
export const getClubBooksAction = (books) => {
  return {
    type: 'Get_Club_Books',
    books,
  };
};
export const getUesrBooksAction = (books) => {
  return {
    type: 'Get_User_Books',
    books,
  };
};
export const saveBookAction = (book) => {
  return {
    type: 'Save_Book_Action',
    book,
  };
};
export const exchangeBookAction = (book) => {
  return {
    type: 'Exchange_Book_Action',
    book,
  };
};

// auth actions
export const singUpSuccess = (user) => {
  return {
    type: 'Sing_Up_Success',
    user
  };
};
export const loginSuccess = (user) => {
  return {
    type: 'Login_Success',
    user,
  };
};
export const logoutSuccess = () => {
  return {
    type: 'logout_Success',
  };
};
export const getStatusSuccess = (data) => {
  return {
    type: 'get_Status_Success',
    user: data.user,
    isLogedin: data.isLogedin
  };
};
export const isLoadedAction = (ok) => {
  return {
    type: 'Is_Loaded',
    isLoaded: ok
  };
};


// action creators
//View actions
export const pagination = function (pager){
  return function(dispatch) {
      dispatch(paginationAction(pager));
  };
};
export const drawerToggle = function (open){
  return function(dispatch) {
      dispatch(drawerToggleAction(open));
  };
};
export const setPageItems = function (pageOfItems){
  return function(dispatch) {
      dispatch(pageItemsAction(pageOfItems));
  };
};
export const clubDialog = function (book,open){
  return function(dispatch) {
      dispatch(clubDialogAction(book,open));
  };
};
export const requestsDialog = function (book,open){
  return function(dispatch) {
      dispatch(requestsDialogAction(book,open));
  };
};
export const handelSnackbar = function (open,message,autoHideDuration){
  return function(dispatch) {
      dispatch(handelSnackbarAction(open,message,autoHideDuration));
  };
};
export const changeClubSearch = function (input){
  const clubBooks = store.getState().books.clubBooks;
  const clubBooksSearch = clubBooks && clubBooks.filter((book,index)=>(
        input ?
        book.title.toLowerCase().includes(input.toLowerCase()) && book : book
        ));
        
  return function(dispatch) {
      dispatch(changeClubSearchAction(input,clubBooksSearch));
  };
};
export const changeGoogleSearch = function (input){
  return function(dispatch) {
      dispatch(changeGoogleSearchAction(input));
  };
};
//Async Action
export const getGoogleBooks = function (books){
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     dispatch(workingAction(true));
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/api/googlebooks?books=' + books,
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        // setTimeout(()=> { 
        //   dispatch(getGoogleBooksAction(json.data)); 
        //   dispatch(workingAction(false))
        // }, 3000);
        dispatch(getGoogleBooksAction(json.data));
        dispatch(workingAction(false));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};
export const getClubBooks = function (working=true){
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     working && dispatch(workingAction(true));
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/api/clubbooks'
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        dispatch(getClubBooksAction(json.data.results));
       working && dispatch(workingAction(false));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
       working && dispatch(workingAction(false));
      });
  };
};
export const saveBook = function (book){
  // Returns a dispatcher function
  // that dispatches an action at a later time
   if(store.getState().authorization.isLogedin){
      console.log(book);
      let data ={
            googleId: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            googleRating: book.volumeInfo.averageRating,
            categories:book.volumeInfo.categories,
            infoLink: book.volumeInfo.infoLink,
            thumbnail:book.volumeInfo.imageLinks.thumbnail.replace(/&zoom=1/,''),
            pageCount: book.volumeInfo.pageCount,
            publishedDate: book.volumeInfo.publishedDate,
            owner: store.getState().authorization.user._id,
         };
      return function(dispatch){
         // Returns a promise
         console.log(data);
         return Axios({
           method: 'POST',
           url: '/api/savebook',
           data:data
         })
          .then(function Success (json) {
            // Dispatch another action
            // to consume data
            console.log(json);
            console.log("Success");
            // console.log(json.data);
            dispatch(getStatus());
          })
          .catch(function(error) {
            console.log("error");
            console.log(error.response);
            return Promise.reject();
          });
        };
   }else{
      store.dispatch(push('/login'));
   }
};
export const exchangeBook = function (book){
  if(store.getState().authorization.isLogedin){
  let data = {
    bookId: book._id,
    ownerId: book.owner,
    userId: store.getState().authorization.user._id,
    userName: store.getState().authorization.user.local && store.getState().authorization.user.local.name
  };  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'POST',
       url: '/api/exchange-book',
       data:data
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        
        // console.log(json.data);
        // dispatch(getClubBooksAction(json.data.results));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error.response);
        return Promise.reject();
      });
  };
  } else {
      store.dispatch(push('/login'));
  }
};
export const approveBook = function (book,req){
  if(store.getState().authorization.isLogedin){
  let data = {
    bookId: book._id,
    ownerId: book.owner,
    userId: req,
  };
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'POST',
       url: '/api/approve-book',
       data:data
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        // dispatch(getClubBooksAction(json.data.results));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error.response);
        return Promise.reject();
      });
  };
  } else {
      store.dispatch(push('/login'));
  }
};
export const deleteBook = function (book){
  // Returns a dispatcher function
  // that dispatches an action at a later time
   if(store.getState().authorization.isLogedin){
      // console.log(book)
      
      return function(dispatch){
         // Returns a promise
        // console.log(book)
         return Axios({
           method: 'DELETE',
           url: '/api/delete-book/' + book._id,
          // data:book
         })
          .then(function Success (json) {
            // Dispatch another action
            // to consume data
            console.log(json);
            console.log("Success");
            // console.log(json.data);
            // dispatch(getStatus());
          })
          .catch(function(error) {
            console.log("error");
            console.log(error.response);
            return Promise.reject();
          });
        };
   }else{
      store.dispatch(push('/login'));
   }
};
export const removeRequest = function (book){
  // Returns a dispatcher function
  // that dispatches an action at a later time
   if(store.getState().authorization.isLogedin){
      // console.log(book)
      let data = {
        bookId: book._id,
        userId: store.getState().authorization.user._id
      };
      return function(dispatch){
         // Returns a promise
        // console.log(book)
         return Axios({
           method: 'PUT',
           url: '/api/remove-request',
           data:data
         })
          .then(function Success (json) {
            // Dispatch another action
            // to consume data
            console.log(json);
            console.log("Success");
            // console.log(json.data);
            // dispatch(getStatus());
          })
          .catch(function(error) {
            console.log("error");
            console.log(error.response);
            return Promise.reject();
          });
        };
   } else {
      store.dispatch(push('/login'));
   }
};
export const likeBook = function (book){
  if(store.getState().authorization.isLogedin){
  let data = {
    bookId: book._id,
  };
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'PUT',
       url: '/api/like-book',
       data:data
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        dispatch(getClubBooks(false));
        dispatch(handelSnackbar(true,'Liked Successfully',3000));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error.response);
        dispatch(handelSnackbar(true,"Already done",3000));
      });
  };
  } else {
      store.dispatch(push('/login'));
  }
};
export const unlikeBook = function (book){
  if(store.getState().authorization.isLogedin){
  let data = {
    bookId: book._id,
  };
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'PUT',
       url: '/api/unlike-book',
       data:data
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        dispatch(getClubBooks(false));
        dispatch(handelSnackbar(true,'unLiked Successfully',3000));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error.response);
        dispatch(handelSnackbar(true,"Already done",3000));
      });
  };
  } else {
      store.dispatch(push('/login'));
  }
};
// auth actions
export const signUp = function (user){
  // let data = {
  //   email: user.email,
  //   password: user.password
  // }
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'POST',
       url: '/register',
       data:user
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success")
        dispatch(getStatus());
        dispatch(handelSnackbar(true,'Signed Up Successfull',3000));
        store.dispatch(push('/profile'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error);
       throw new SubmissionError({ _error: error.response.data.err.err });
      });
  };
};
export const changePassword = function (oldPassword,password){
  if(store.getState().authorization.isLogedin){
    let user = store.getState().authorization.user;
    let data = {
      id: user._id,
      email: user.local.email,
      oldPassword: oldPassword,
      password: password,
    };
    // Returns a dispatcher function
    // that dispatches an action at a later time
    return function(dispatch){
       // Returns a promise
       return Axios({
         method: 'PUT',
         url: '/change-password',
         data:data
       })
        .then(function Success (json) {
          // Dispatch another action
          // to consume data
          console.log(json);
          console.log("Success");
          dispatch(getStatus());
          dispatch(handelSnackbar(true,'Password Changed',3000));
          store.dispatch(push('/profile'));
        })
        .catch(function(error) {
         console.log("error");
         console.log(error.response);
         throw new SubmissionError({ _error: error.response.data.err });
        });
    };
  } else {
    store.dispatch(push('/login'));
  }
};
export const changeAddress = function (name,city,state){
  if(store.getState().authorization.isLogedin){
    let user = store.getState().authorization.user;
    let data = {
      id: user._id,
      name: name,
      city: city,
      state: state,
    };
    // Returns a dispatcher function
    // that dispatches an action at a later time
    return function(dispatch){
       // Returns a promise
       return Axios({
         method: 'PUT',
         url: '/change-address',
         data:data
       })
        .then(function Success (json) {
          // Dispatch another action
          // to consume data
          console.log(json);
          console.log("Success");
          dispatch(getStatus());
          dispatch(handelSnackbar(true,'Info Changed',3000));
          store.dispatch(push('/profile'));
        })
        .catch(function(error) {
         console.log("error");
         console.log(error.response);
         throw new SubmissionError({ _error: error.response.data.err });
        });
    };
  } else {
    store.dispatch(push('/login'));
  }
};
export const login = function (user){
  let data = {
    username: user.email,
    password: user.password
  };
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'PUT',
       url: '/login',
       data:data
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(loginSuccess(response.data.user));
        store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
       throw new SubmissionError({ _error: error.response.data.err.err });
      });
  };
};

export const unlinkLocal = function (){
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/unlink/local',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(getStatus());
        dispatch(handelSnackbar(true,'Unlink Successfull',3000));
        // store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};
export const unlinkGoogle = function (){
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/unlink/google',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(getStatus());
        dispatch(handelSnackbar(true,'Unlink Successfull',3000));
        // store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};
export const unlinkGithub = function (){
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/unlink/github',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(getStatus());
        dispatch(handelSnackbar(true,'Unlink Successfull',3000));
        // store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};
export const logout = function (){
 
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/logout',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(logoutSuccess());
        store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};

export const getStatus = function (user){
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     dispatch(isLoadedAction(false));
     return Axios({
       method: 'GET',
       url: '/status',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        
        console.log(response);
        console.log("Success");
        dispatch(getStatusSuccess(response.data));
        dispatch(isLoadedAction(true));
        // store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
       dispatch(isLoadedAction(true));
      });
  };
};




