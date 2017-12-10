import { combineReducers} from 'redux';
import { routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {reducer as notifications} from 'react-notification-system-redux';


function BooksReducer (state = { clubBooks:[]} , action) {
  switch (action.type){
    case 'Get_Google_Books':
        return Object.assign({}, state,  
         { googleBooks: action.books}
        );
    case 'Get_Club_Books':
        return Object.assign({}, state,  
         { clubBooks: action.books}
        );
    case 'Change_Club_Search':
        return Object.assign({}, state,  
         { clubSearchInput: action.input }
        );
    case 'Change_Google_Search':
        return Object.assign({}, state,  
         { googleSearchInput: action.input }
        );
    default:
          return state;
  }
}


function viewHandlerReducer (state = {
                drawer:false,
                clubDialogOpen:false,
                reqDialogOpen:false,
                snackbarOpen: false,
                snackbarMsg: '',
                snackbarDuration: 4000,
                isWorking:false
                } , action) {
  switch (action.type){
    case 'Drawer_Toggle':
        return Object.assign({}, state,  
         { drawer: action.open}
        );
    case 'Club_Dialog_Toggle':
        return Object.assign({}, state,  
         { 
            clubDialogOpen: action.open,
            clubBook: action.book
         }
        );
    case 'Requests_Dialog_Toggle':
        return Object.assign({}, state,  
         { 
            reqDialogOpen: action.open,
            clubBook: action.book
         }
        );
        case 'Handel_Snackbar_Toggle':
        return Object.assign({}, state,  
         { 
             snackbarOpen: action.open,
             snackbarMsg: action.message,
             snackbarDuration: action.autoHideDuration
         }
        );
        case 'Working_Toggle':
        return Object.assign({}, state,  
         { 
            isWorking: action.open,
         }
        );
    default:
          return state;
  }
}
function paginationReducer (state = {pager: {} , pageOfItems: []} , action) {
  switch (action.type){
    case 'Pagination_Action':
        return Object.assign({}, state,  
          action.pager
        );
    case 'Page_Items_Action':
        return Object.assign({}, state,  
          action.pageOfItems
        );
    default:
          return state;
  }
}
function authReducer (state = {isLogedin: false} , action) {
  switch (action.type){
        case 'Sing_Up_Success':
        return Object.assign({}, state, { 
          
          user: action.user
          
        });
        case 'Login_Success':
        return Object.assign({}, state, { 
          
          user: action.user,
          isLogedin: true
          
        });
        case 'logout_Success':
        return Object.assign({}, state, { 
          
          isLogedin:false
          
        });
        case 'get_Status_Success':
        return Object.assign({}, state, { 
          
          user: action.user,
          isLogedin: action.isLogedin
          
        });
         case 'Is_Loaded':
        return Object.assign({}, state, { 

          isLoaded: action.isLoaded
          
        });

    default:
          return state;
  }
}

 const rootReducer = combineReducers({
  books: BooksReducer,
  viewHandler:  viewHandlerReducer,
  router: routerReducer,
  form: formReducer,
  authorization: authReducer,
  pagination: paginationReducer,
  notifications
  // More reducers if there are
  // can go here
});
export default rootReducer;
