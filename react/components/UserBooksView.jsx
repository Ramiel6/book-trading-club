import React from 'react';
// import TextField from 'material-ui/TextField';
// import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import Dialog from 'material-ui/Dialog';
import {Row, Col } from 'react-flexbox-grid';
import WorkingView from './WorkingView.jsx';
// const GoogleBooksView = (props) => { 
class UserBooksView extends React.Component {

  handleExchange = () =>{
    const {handleClub} = this.props;
      handleClub();
    
  }
  componentDidMount(){
      const {handleClub} = this.props;
      handleClub();
    }
  render()  {
    
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
                      <Badge 
                          style={{padding: 0}} 
                          badgeContent={tile.likes.length} 
                          badgeStyle={{width:18, height:18}} 
                          primary={true}
                          >
                          {this.props.user && tile.likes.includes(this.props.user._id) ?
                          <IconButton iconStyle ={styles.pink} iconClassName ="fa fa-heart" tooltip="Unlike this book"  onClick={() => this.props.handleUnlikeBook(tile)}/>
                          :<IconButton iconStyle ={styles.purple} iconClassName ="fa fa-heart" tooltip="Like this book" onClick={() => this.props.handleLikeBook(tile)} />}
                      </Badge>
                      <Badge 
                          style={{padding: 0}} 
                          badgeContent={tile.requests.length} 
                          badgeStyle={{width:18, height:18}} 
                          primary={true}
                          >
                        <IconButton iconClassName ="fa fa-retweet" tooltip="Trade Requests for this book" onClick={() => this.props.handleReqDialog(tile,true)}/>
                      </Badge>
                      <IconButton iconClassName ="fa fa-info" tooltip="Details" onClick={() => this.props.handleClubDialog(tile,true)}/>
                      <IconButton iconClassName ="fa fa-trash" iconStyle ={styles.red} tooltip="Delete this book" onClick={() => this.props.handelDeleteBook(tile)}/>
                    </div>
                     
                  </div>
             
              </Col>
             ))
              }</Row>}
              <Dialog
                title="Requests From"
                actions={<FlatButton
                          label="Done"
                          primary={true}
                          onClick={() => this.props.handleReqDialog(null,false)}
                        />}
                modal={false}
                open={this.props.reqDialogOpen}
                onRequestClose={() => this.props.handleReqDialog(null,false)}
                autoScrollBodyContent={true}
              >
                {this.props.clubBook &&
                  (this.props.clubBook.requests.length > 0 ?
                    this.props.clubBook.requests.map((req,index) =>(
                    <div key={index}>
                    <div>{req.name ? req.name:'anonymous'} 
                    <IconButton iconStyle={{color:'#8BC34A'}} iconClassName ="fa fa-check" tooltip="Approve" onClick={() => this.props.handleApprove(this.props.clubBook,req.id)}/></div>
                    </div>
                    )) : 'no requests')
                }
             </Dialog>
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
const styles = {
            pink:{
              color: '#fc4cce',
              textShadow: '2px 2px 5px #fc4cce'
            },
            purple:{
              color: '#8d4cb0',
              textShadow: '2px 2px 5px #8d4cb0'
            },
            likeRed:{
              color: '#ff002d',
              textShadow: '2px 2px 5px red'
            },
            red :{
              color: 'red'
            }
          };
export default UserBooksView;