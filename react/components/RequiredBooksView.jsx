import React from 'react';
// import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Row, Col } from 'react-flexbox-grid';
import WorkingView from './WorkingView.jsx';
// const GoogleBooksView = (props) => { 
class RequiredBooksView extends React.Component {

  handleExchange = () =>{
    const {handleClub} = this.props;
      handleClub();
    
  }
  componentDidMount(){
      const {handleClub} = this.props;
      handleClub();
    }
  render()  {
    const styles = {
            pink:{
              color: '#FFC0CB'
            },
          };
 return (
     <div>
        {this.props.isWorking ?
            <Row center="xs">
                <Col xs={12} md={12}>
                    <WorkingView />
                </Col>
            </Row> :
            <Row>
            {this.props.bookList.length > 0 && this.props.bookList.map((tile,index)=>(
              <Col xs key={index}>
               
                  <div className="card">
                    <div className="card-header">
                      <span className="card-title">{tile.title}</span><br />
                      <span className="card-subtitle">{(tile.authors && tile.authors.map((author) => (author +', ') )) || ''}</span>
                    </div>
                      <div className="card-img-col">
                       <img 
                        className="card-img"
                        src={tile.thumbnail ? tile.thumbnail : './imgs/noImage.png'} 
                        alt={tile.title + " cover"}
                        />
                      </div>
                    <div className="card-bottom">
                      <IconButton iconStyle ={styles.pink} iconClassName ="fa fa-heart" tooltip="Ligature" />
                      <IconButton iconClassName ="fa fa-info" tooltip="Details" onClick={() => this.props.handleClubDialog(tile,true)}/>
                    </div>
                  
                  </div>
             
              </Col>
             ))
              }</Row>}
              
             {this.props.clubBook && <Dialog
                title="Book Details"
                actions={[<FlatButton
                          label="More Details"
                          secondary={true}
                          target="_blank"
                          href={this.props.clubBook.infoLink}
                        />,<FlatButton
                          label="Done"
                          primary={true}
                          onClick={() => this.props.handleClubDialog(null,false)}
                        />]}
                modal={false}
                open={this.props.clubDialogOpen}
                onRequestClose={() => this.props.handleClubDialog(null,false)}
                autoDetectWindowHeight={false}
                autoScrollBodyContent={true}
              >
             
             <div> <Row>
              <Col xs={4} md={4}>
                <img 
                  className="card-img"
                  src={this.props.clubBook.thumbnail ? this.props.clubBook.thumbnail : './imgs/noImage.png'} 
                  alt={this.props.clubBook.title + " cover"}
                  />
              </Col>
              <Col xs={8} md={8}>
                  <strong>Title:</strong> {this.props.clubBook.title}<br />
                  <strong>Auther:</strong>{(this.props.clubBook.authors && 
                                                this.props.clubBook.authors.map((author) => (author +', ') )) || ''}<br /><br />
                  <strong>Publish Date:</strong> {this.props.clubBook.publishedDate}<br />
                  <strong>Page Count:</strong> {this.props.clubBook.pageCount}<br />
                  <strong>Google Rating:</strong> {this.props.clubBook.googleRating}<br />
                  <strong>Description:</strong> {this.props.clubBook.description}<br />
                  
              </Col>
              </Row>
              </div>
             </Dialog>}
              </div>
)}}
export default RequiredBooksView;