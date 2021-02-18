const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required: true
    },
    imgUrl:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
},
{timestapms:true});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;