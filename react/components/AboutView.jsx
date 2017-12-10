import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { ReduxIcon, MongoIcon,PassportIcon } from './SvgIcons.jsx';
const AboutView = (props) => {
    return (
        
        <div>
        <Row center='xs'>
        <Col xs={12} md={12}>
          <h1>About</h1>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <h2>Description</h2>
          <p>Book Trading Club App is a full-stack project for freeCodeCamp.</p>
          <h2>Frontend Techniques</h2>
            <RaisedButton
                label="React"
                style={styles.button}
                icon={<FontIcon style={{color:'#3b5998',marginBottom: 5,}} className="fab fa-react" />}
                />
            <RaisedButton
                label="Redux"
                style={styles.button}
                icon ={<ReduxIcon color='#764ABC' style={{width:26, height:26,marginBottom:4}} />}
                />
          <h2>UI Techniques</h2>
              <RaisedButton
                    label="Matrial UI"
                    style={styles.button}
                    />
                <RaisedButton
                    label="Font Awesome 5"
                    style={styles.button}
                    icon={<FontIcon style={{color:'#228ae6',marginBottom: 5,}} className="fab fa-font-awesome" />}
                    />
          <h2>Backend Techniques</h2>
                <RaisedButton
                    label="NodeJs"
                    style={styles.button}
                    icon={<FontIcon style={{color:'#43853D',marginBottom: 5,}} className="fab fa-node-js" />}
                    />
                <RaisedButton
                    label="Express"
                    style={styles.button}
                    
                    />
                <RaisedButton
                    label="MongoDB"
                    style={styles.button}
                    icon={<MongoIcon style={{width:26, height:26,marginBottom:4}} />}
                    />
                <RaisedButton
                    label="PassportJs"
                    style={styles.button}
                    icon={<PassportIcon style={{width:30, height:30,marginTop:4}} />}
                    />
          <h2>APIs</h2>
          <RaisedButton
                    label="Google Book API"
                    style={styles.button}
                    icon={<FontIcon style={{color:'#F44336',marginBottom: 5,}} className="fab fa-google" />}
                    />
        </Col>
      </Row>
        </div>
        
        );
};
const styles = {
    button: {
      margin: 12,
    },
    fontIcon: {
        marginBottom: 5,
    },
};
export default AboutView;