import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import FeaturesView from './FeaturesView.jsx';

class MainComp extends React.Component {
  render() {
    return (
      <div>
      <Row center='xs'>
        <Col xs>
          <h1>Features</h1>
        </Col>
      </Row>
      <Row center='xs'>
      
        <Col xs>
          <FeaturesView
            iconClassName='fas fa-plus'
            iconStyle={{color:'steelblue'}}
            cardText='Add your books to our club collection.' 
            />
          
          <FeaturesView
            iconClassName='fab fa-google'
            iconStyle={{color:'#F44336'}}
            cardText='Search Google Books for a book.' 
            />
          
           <FeaturesView
            iconClassName='fas fa-exchange-alt'
            iconStyle={{color:'#111111'}}
            cardText='Trade books with other users.' 
            />
    
        </Col>
        <Col xs={6} md={6}>
           <FeaturesView
            iconClassName='fas fa-user'
            iconStyle={{color:'#111111'}}
            cardText='Regsiter with your social media accounts and link them.' 
            />
            <FeaturesView
            iconClassName='fas fa-heart'
            iconStyle={{color:'#fc4cce'}}
            cardText='Like our Club Books.' 
            />
        </Col>
      </Row>
      </div>
      );
  }
}

export default MainComp;