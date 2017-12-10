var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookModelSchema = new Schema({
    googleId: String,
    title: String,
    subtitle: String,
    authors: [String],
    description: String,
    googleRating: Number,
    categories:[String],
    infoLink: String,
    thumbnail: String,
    pageCount: Number,
    publishedDate: String,
    owner: String,
    likes: [String],
    requests: [{id:String, name:String}],
    requiredBy:String,
    createdAt:{type: Date, default: Date.now}
});
module.exports = mongoose.model('book', bookModelSchema);