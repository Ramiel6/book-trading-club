import React from 'react';
// import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Badge from 'material-ui/Badge';
import {Row, Col } from 'react-flexbox-grid';
import WorkingView from './WorkingView.jsx';
import SearchBar from './SearchBar.jsx';
// const GoogleBooksView = (props) => { 
class ClubBooksView extends React.Component {
 
  componentDidMount(){
      const {handleClub} = this.props;
      handleClub();
    }
  handleKeyPress = (e) => {
      if(e.key === 'Enter'){
      const input = e.target.value;
      this.props.handleClubSearch(input);
      }
    }
  handleChange = (e) => {
          const input = e.target.value;
          this.props.handleClubSearch(input);
        }
  render()  {
 return (
     <div>
      <Row center="xs">
        <Col xs={12} md={6}>
            <SearchBar 
                name=" clubBook"
                hintText="Search For a Club Book" 
                onKeyPress={this.handleKeyPress} 
                onChange={this.handleChange}
                fullWidth={true}
                underlineFocusStyle={styles.focusUnderLine}
                defaultValue={this.props.clubSearchInput}
                />
            </Col>
            </Row>
            {this.props.isWorking ?
            <Row center="xs">
                <Col xs={12} md={12}>
                    <WorkingView />
                </Col>
            </Row> :
            <Row center="xs">
            {this.props.bookList && this.props.bookList.map((tile,index)=>(
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
                          <IconButton iconStyle ={styles.likeRed} iconClassName ="fa fa-heart" tooltip="Unlike this book"  onClick={() => this.props.handleUnlikeBook(tile)}/>
                          :<IconButton iconStyle ={styles.pink} iconClassName ="fa fa-heart" tooltip="Like this book" onClick={() => this.props.handleLikeBook(tile)} />}
                      </Badge>
                    {this.props.user && this.props.user._id === tile.owner ?  
                            <IconButton iconStyle={{color:'#8BC34A'}} iconClassName ="fa fa-check-square-o" tooltip="Owen book" />:
                          (this.props.user && tile.requests.some(user => user.id === this.props.user._id) ?
                              <IconButton iconStyle={{color:'orange'}} iconClassName ="fa fa-retweet" tooltip="Requested book"/>:
                              <IconButton iconClassName ="fa fa-exchange" tooltip="Request this book" onClick={() => this.props.onUserClick(tile)}/>
                            )
                      
                      
                    }
                      <IconButton iconClassName ="fa fa-info" tooltip="Detils" onClick={() => this.props.handleClubDialog(tile,true)}/>
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
                        <strong>Auther:</strong> {(this.props.clubBook.authors && 
                                                    this.props.clubBook.authors.map((author) => (author +', ') )) || ''}<br />
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
            focusUnderLine:{
              borderColor: '#9E9D24'
            },
          };
export default ClubBooksView;