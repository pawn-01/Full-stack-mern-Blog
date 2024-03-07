
const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb+srv://admi1:12Pawan2001@cluster0.o6i7hxp.mongodb.net/Blog');

const userschema = new Schema({
    username:{type:String ,required:true,min:4,unique:true},
    password:{type:String ,required:true}
});

const postschema = new Schema({
     title:String,
     summary:String,
     content:String,
     cover:String,
     author:{type:Schema.Types.ObjectId,ref:'user'}
},{
    timestamps:true
})

const Posts = mongoose.model('Posts',postschema);
const user = mongoose.model('user',userschema);

module.exports = {user,Posts};