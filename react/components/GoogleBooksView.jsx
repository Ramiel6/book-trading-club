import React from 'react';
// import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Row, Col } from 'react-flexbox-grid';
import WorkingView from './WorkingView.jsx';
import SearchBar from './SearchBar.jsx';
// const GoogleBooksView = (props) => { 
class GoogleBooksView extends React.Component {
 
 handleKeyPress = (e) => {
      if(e.key === 'Enter'){
      const input = e.target.value;
      this.props.handleGoogle(input);
      
      }
    }
    handleIconClick = (e) => {
          this.props.handleGoogle(this.props.googleSearchInput);
        }
    handleChange = (e) => {
          const input = e.target.value;
          this.props.handleGoogleInput(input);
        }
  render()  {
    
 return (
     <div>
     <Row center="xs">
     <Col xs={12} md={6}>
         
            <SearchBar 
                name="GoogleBookSearch"
                hintText="Search Google For a Book"
                onKeyPress={this.handleKeyPress}
                onIconClick={this.handleIconClick}
                onChange={this.handleChange}
                fullWidth={true}
                underlineFocusStyle={styles.focusUnderLine}
                />
            </Col>
            </Row>
        {this.props.isWorking ?
            <Row center="xs">
                <Col xs={12} md={12}>
                    <WorkingView />
                </Col>
            </Row> :
            <Row>
             {this.props.bookList && this.props.bookList.map((tile,index)=>(
              <Col xs key={index}>
               
                  <div className="card">
                    <div className="card-header">
                      <span className="card-title">{tile.volumeInfo.title}</span><br />
                      <span className="card-subtitle">{(tile.volumeInfo.authors && 
                                                        tile.volumeInfo.authors.map((author) => (author +', ') )) || ''}</span>
                    </div>
                      <div className="card-img-col">
                       {tile.volumeInfo.imageLinks ?  <img 
                        className="card-img"
                        src={tile.volumeInfo.imageLinks.thumbnail.replace(/&zoom=1/,'')} 
                        alt={tile.volumeInfo.title + " cover"}
                        />:
                       <img 
                        className="card-img"
                        src='./imgs/noImage.png' 
                        alt={tile.volumeInfo.title + " cover"}
                        />    
                       }
                      </div>
                      
                    <div className="card-bottom">
                      <IconButton iconStyle ={styles.pink} iconClassName ="fa fa-heart" tooltip="Ligature" />
                      { this.props.user && this.props.user.books.includes(tile.id) ?  
                            <IconButton iconStyle={{color:'#8BC34A'}} iconClassName ="fa fa-check-square-o" tooltip="Owen book" />:
                            <IconButton iconStyle={{color:'#2196F3'}} iconClassName ="fa fa-plus" tooltip="Add Book" onClick={() => this.props.onUserClick(tile)}/>}
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
                              href={this.props.clubBook.volumeInfo.infoLink}
                            />,
                            <FlatButton
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
                            {this.props.clubBook.volumeInfo.imageLinks ? 
                                <img class="card-img" 
                                    src={this.props.clubBook.volumeInfo.imageLinks.thumbnail.replace(/&zoom=1/,'')} 
                                    alt={this.props.clubBook.volumeInfo.title + " cover"}
                                    />:
                                <img 
                                    className="card-img"
                                    src='./imgs/noImage.png' 
                                    alt={this.props.clubBook.volumeInfo.title + " cover"}
                                    />}
                        </Col>
                      <Col xs={8} md={8}>
                          <strong>Title:</strong> {this.props.clubBook.volumeInfo.title}<br />
                          <strong>Auther:</strong> {(this.props.clubBook.volumeInfo.authors &&
                                                    this.props.clubBook.volumeInfo.authors.map((author) => (author +', ') )) || ''}<br />
                          <strong>Publish Date:</strong> {this.props.clubBook.volumeInfo.publishedDate}<br />
                          <strong>Page Count:</strong> {this.props.clubBook.volumeInfo.pageCount}<br />
                          <strong>Google Rating:</strong> {this.props.clubBook.volumeInfo.averageRating}<br />
                          <strong>Description:</strong> {this.props.clubBook.volumeInfo.description}<br />
                          
                      </Col>
                  </Row>
                  </div>
                 </Dialog>}
              </div>
)}}
const styles = {
            pink:{
              color: '#FFC0CB'
            },
            focusUnderLine:{
              borderColor: '#9E9D24'
            }
          };
export default GoogleBooksView;