import React from 'react';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';



const SearchBar = ({onIconClick, ...rest}) => {
  //https://github.com/mui-org/material-ui/issues/2932
  return (
    <div style={{position: 'relative', display: 'inline-block', width:'100%'}}>
        <SearchIcon 
            onClick={()=> onIconClick() || null}
            style={{position: 'absolute', cursor: 'pointer',zIndex: 2, right: 0, top: 15, width: 20, height: 20}}/>
        <TextField {...rest} />
    </div>
  );
};
export default SearchBar;