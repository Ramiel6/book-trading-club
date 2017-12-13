import React from 'react';
const FeaturesView = (props) => {
   if ( window.innerWidth >= 400 ){
    return (
        <div className="features-circle">
            <div className="features-inner-circle">
                <i style={props.iconStyle} className = {props.iconClassName + ' features-circle-icon'} ></i>
            </div>
           
            <div className="features-span">
                {props.cardText}
            </div>
        </div>
        );
       
   } else {
        return (
            <div className="features-circle">
                <div className="features-span">
                    <i style={props.iconStyle} className = {props.iconClassName  + ' features-circle-icon'} ></i> 
                    <br />
                    {props.cardText}
                </div>
        </div>
        );
   }
        
        
};
export default FeaturesView;