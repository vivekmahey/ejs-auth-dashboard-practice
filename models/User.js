const mongoose=require('mongoose');
const userSchema=new mangoose.Schema({
    username: String,
    email:String,
    password: String,
});

module.exports=mongoose.model("User",userSchema);