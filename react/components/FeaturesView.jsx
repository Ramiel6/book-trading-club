import React from 'react';
const FeaturesView = (props) => {
    return (
        
        <div className="features-circle">
            <div className="features-inner-circle">
                <i style={props.iconStyle} className = {props.iconClassName + ' features-circle-icon'} aria-hidden="true"></i>
            </div>
            
            <div className="features-span">
                {props.cardText}
            </div>
        </div>
        
        );
};
export default FeaturesView;