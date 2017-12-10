import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {unlinkLocal,unlinkGoogle,unlinkGithub} from '../actions';
import {Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
// import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Accordion, AccordionItem } from 'react-sanfona';


class ProfileComp extends React.Component {
    
  
    render() {
        const user = this.props.user;
      return (
          <div>
        <Row center="xs">
        <Col xs={12} md={12}>
            <h1><i className="far fa-address-card fa-lg" aria-hidden="true"></i> Profile</h1>
        </Col>
    </Row>
    <Row>
        <Col xs={12} md={12}>
            <Accordion allowMultiple={true}>
            {user.local && <AccordionItem 
                                title={<span className="react-sanfona-item-title"><i className="far fa-save fa-lg local-color" aria-hidden="true"></i> Local Profile</span>} 
                                expanded={true}
                                >
                 <p>
                    { user.local.name && <span><strong>Name</strong>: { user.local.name}<br /></span>}
                    { user.state && <span><strong>State</strong>: { user.state}<br /></span>}
                    { user.city && <span><strong>City</strong>: { user.city}<br /></span>}
                    { user.local.email && <span><strong>Email:</strong> {user.local.email}</span>}
                 
                </p>
                <div>
                 <Link to="/profile-update"><RaisedButton
                        label="Edit"
                        style={styles.button}
                        icon={<FontIcon style={styles.fontIcon} className="far fa-edit" />}
                        /></Link>
                 {!user.local.email && <Link to="/signup"><RaisedButton
                        label="Add Local Account"
                        style={styles.button}
                        icon={<FontIcon style={styles.fontIcon} className="fas fa-link" />}
                        /></Link>}
                    {user.local.email  && <RaisedButton
                        onClick={()=> this.props.unlinkLocal()}
                        label="Remove"
                        style={styles.button}
                        icon={<FontIcon style={styles.fontIcon} className="fas fa-unlink" />}
                        />}
                </div>
            </AccordionItem>}
            {user.google && user.google.token && <AccordionItem 
                                title={<span className="react-sanfona-item-title"><i className="fab fa-google-plus-square fa-lg google-color" aria-hidden="true"></i> Google+</span>} 
                                
                                >
            
                <p>
                    <strong>Name</strong>: { user.google.name}<br />
                    <strong>Email</strong>: { user.google.email}<br />
                    <strong>ID</strong>: { user.google.id}<br />
                    <strong>Token</strong><span className="token-max">: { user.google.token}</span><br />
                </p>
               <div>
                 
                    {user.google.token  && <RaisedButton
                        onClick={()=> this.props.unlinkGoogle()}
                        label="Remove"
                        style={styles.button}
                        icon={<FontIcon style={styles.fontIcon} className="fas fa-unlink" />}
                        />}
                </div>
           </AccordionItem>}
            
            {user.github && user.github.token && <AccordionItem 
                                title={<span className="react-sanfona-item-title"><i className="fab fa-github fa-lg github-color" aria-hidden="true"></i> Github</span>}
                                >
                <p>
                    <strong>Name</strong>: { user.github.name}<br />
                    <strong>Email</strong>: { user.github.email}<br />
                    <strong>ID</strong>: { user.github.id}<br />
                    <strong>Token</strong>: { user.github.token}<br />
                </p>
                <div>
                 
                    {user.github.token  && <RaisedButton
                        onClick={()=> this.props.unlinkGithub()}
                        label="Remove"
                        style={styles.button}
                        icon={<FontIcon style={styles.fontIcon} className="fas fa-unlink" />}
                        />}
                </div>
            </AccordionItem>}
            </Accordion>
        </Col>
    </Row>
    <Row center="xs">
        <Col xs={12} md={12}>
        {(!user.github || !user.google) && <h3>Connect with soical account:</h3>}
        <div>
         {(!user.google || !user.google.token) && <RaisedButton
                href="/connect/google"
                label="Google"
                backgroundColor='#F44336'
                labelColor ="#FFFFFF"
                style={styles.button}
                icon={<FontIcon style={styles.fontIcon} className="fab fa-google-plus-g" />}
                />}
            {(!user.github || !user.github.token) && <RaisedButton
                href="/connect/github"
                label="Github"
                style={styles.button}
                icon={<FontIcon style={styles.fontIcon} className="fab fa-github" />}
                />}
          </div>
        </Col>
    </Row>
</div>

      );
    }
  }
  
const styles = {
    button: {
      margin: 12,
    },
    fontIcon: {
        marginBottom: 5,
    },
};
// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
//   console.log({results: JSON.stringify(state)})
  return {
    // You can now say this.props.books
    user : state.authorization.user
  };
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
    unlinkLocal: () => dispatch(unlinkLocal()),
    unlinkGoogle: () => dispatch(unlinkGoogle()),
    unlinkGithub: () => dispatch(unlinkGithub()),
  };
};

// Use connect to put them together
export default connect(mapStateToProps,mapDispatchToProps)(ProfileComp);