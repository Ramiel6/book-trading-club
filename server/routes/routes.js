var axios = require('axios');
var apiKeys = require("./apiKeys.js");
module.exports = function (app,passport,book,Account) {


var path = process.cwd();
function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
		  //console.log(req.isAuthenticated());
			return next();
		} else {
			res.redirect('/');
		}
	}

app.get("/api/googlebooks", function (request, response) {
	let books = request.query.books;
	let apiUrl  = 'https://www.googleapis.com/books/v1/volumes';
	
	axios({
        method: 'GET',
        url: apiUrl,
        params: {
          key: apiKeys.googleKey,
          maxResults: 21,
          q: books,
        }
     })
      .then(function Success (res) {
        // console.log(res.data);
        response.json(res.data);
      })
      .catch(function(error) {
       console.log(error);
       response.end("server error");
      });
});
app.get("/api/clubbooks", function (request, response) {
// 	let books = request.query.books
	book.find({}).exec(function (err,results) {
	    if(err) throw err;
	   console.log("fund all");
	    response.status(200).json({results:results});
	    
	});
});
app.get("/api/userbooks",isLoggedIn, function (request, response) {
	let userId = request.query.userId;
	book.find({'owner': userId}).exec(function (err,results) {
	    if(err) throw err;
	    console.log("fund user");
	    response.status(200).json({results:results});
	    
	});
});
app.post("/api/savebook",isLoggedIn, function (request, response) {
	let userBook = request.body;
	console.log(userBook);
	 if (!userBook) return response.status(400).end("Please send vaild data!");
	 var new_book = new book(userBook);
        new_book.save(function (err) {
          if (err) throw err;
            //Book saved!
            Account.update({'_id': userBook.owner},{
                $push: { 'books': userBook.googleId } 
                },function (err,data) {
                if (err) throw err;
                console.log("book saved");
                response.status(200).end("successfully saved");
                });  
        });
});
app.post("/api/exchange-book",isLoggedIn, function (request, response) {
	let requestBook = request.body;
// 	console.log(requestBook);
	if (!requestBook) return response.status(400).end("Please send vaild data!");
	book.update({'_id': requestBook.bookId},{
    	$push: { 'requests': {id:requestBook.userId, name:requestBook.userName} } 
                    },function (err,data) {
                    if (err) throw err;
                    console.log("Request Successfull");
                    response.status(200).end("Request Successfull");
                    // Account.update({'_id': requestBook.userId},{
                    //     $push: { 'requested': requestBook.googleId } 
                    //     },function (err,data) {
                    //     if (err) throw err;
                    //     console.log("Request Successfull");
                    //     response.status(200).end("Request Successfull");
                    //     });  
            });
});
app.post("/api/approve-book",isLoggedIn, function (request, response) {
	let requestBook = request.body;
// 	console.log(requestBook);
	if (!requestBook) return response.status(400).end("Please send vaild data!");
	book.update({'_id': requestBook.bookId},{
    	$set: { 'requiredBy': requestBook.userId,
	            'requests':[] },
    // 	$set: {'requests':[]}
                    },function (err,data) {
                    if (err) throw err;
                    console.log("Request Successfull");
                    response.status(200).end("Request Successfull");
            });
});
app.delete("/api/delete-book/:bookId",isLoggedIn, function (request, response) {
	let bookId = request.params.bookId;
// 	console.log(bookId);
  if (!bookId) return response.status(400).end("Please send vaild data!");
  book.deleteOne({ "_id" : bookId}, function (err){
          if (err) throw err;
          console.log("Deleted Successfull");
          response.status(200).end("Deleted Successfull");
  });
});
app.put("/api/remove-request",isLoggedIn, function (request, response) {
	let removedReq = request.body;
// 	console.log(removedReq);
  if (!removedReq) return response.status(400).end("Please send vaild data!");
  book.update({'_id': removedReq.bookId},{
                        $pull: { 'requests': {id:removedReq.userId} } 
                        },function (err,data) {
                        if (err) throw err;
                        console.log("Request Removed Successfull");
                        response.status(200).end("Request Removed Successfull");
                        });  
});

app.put("/api/like-book",isLoggedIn, function (request, response) {
	let likedBook = request.body;
	let user = request.user;
// 	console.log(user._id);
   if (!likedBook) return response.status(400).end("Please send vaild data!");
   book.findOne({'_id': likedBook.bookId}, function(err, results) { 
      if (err) throw err;
      if( results.likes.includes(user._id.toString()) ){
        return response.status(401).end("Already Liked");
      } else {
      book.update({'_id': likedBook.bookId},{
                        $push: { 'likes': user._id } 
                        },function (err,data) {
                        if (err) throw err;
                        console.log("Like Successfull");
                        return  response.status(200).end("Like Successfull");
                        });  
      }
  });
  
});

app.put("/api/unlike-book",isLoggedIn, function (request, response) {
	let likedBook = request.body;
	let user = request.user;
// 	console.log(user._id);
   if (!likedBook) return response.status(400).end("Please send vaild data!");
   book.findOne({'_id': likedBook.bookId}, function(err, results) { 
      if (err) throw err;
      if (results.likes.includes(user._id.toString()) ){
        book.update({'_id': likedBook.bookId},{
                        $pull: { 'likes': user._id } 
                        },function (err,data) {
                        if (err) throw err;
                        console.log("unLike Successfull");
                        return  response.status(200).end("unLike Successfull");
                        });  
      } else {
        return response.status(401).end("Already done");
      }
  });
  
});


app.get("/", function (request, response) {
  response.sendFile(path + '/client/index.html');
});


app.get('*', function(request, response) {
  response.sendFile(path + '/client/index.html');
});

};


