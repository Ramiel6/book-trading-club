import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
const SideNavView = (props) => { 
    
    return(
        <Drawer 
            containerClassName="drawer top-margin" 
            open={props.open} 
            onRequestChange={window.innerWidth >= 400 ? null:(open) => props.drawerToggle(open)}
            zDepth={1}
            docked={window.innerWidth >= 400 ? true:false}
          >
              <Link to="/google-books" >
                <MenuItem onClick={window.innerWidth >= 400 ? null: () =>props.drawerToggle(false)}>Google Books</MenuItem>
                </Link>
              <Link to="/club-books" >
                <MenuItem onClick={window.innerWidth >= 400 ? null: () =>props.drawerToggle(false)}>Browse Club Books</MenuItem>
                </Link>
              <br />
              <span className="side-nav-title"><li className="far fa-user-circle fa-lg" ></li> User Actions</span>
              <Divider className="nav-divider" />
              <Link to="/mybooks" >
              <MenuItem onClick={window.innerWidth >= 400 ? null: () => props.drawerToggle(false)}>User Books</MenuItem>
              </Link>
              <Link to="/Required-Books" >
              <MenuItem onClick={window.innerWidth >= 400 ? null: () => props.drawerToggle(false)}>Required Books</MenuItem>
              </Link>
              <Link to="/Requested-Books" >
              <MenuItem onClick={window.innerWidth >= 400 ? null: () => props.drawerToggle(false)}>Requested Books</MenuItem>
              </Link>
              <Link to="/google-books" >
                <MenuItem onClick={window.innerWidth >= 400 ? null: () => props.drawerToggle(false)}>Add New Book</MenuItem>
                </Link>
        </Drawer>
        
        )
    
    
}
export default SideNavView


// const styles ={
//     divider:{
//       backgroundColor:'#7D7C1D',
//       margin:'-1px 26px 12px 0px' 
//     },
//     title:{
//         color:'#A1A066',
//         // padding:'0px 4px 5px 0px'
//     }
// }