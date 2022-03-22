import mongoose from 'mongoose';

var User = new mongoose.Schema({
    name : {
        firstName : {
            type : String,
            required : true
        },
        lastName  :{
            type : String,
            required : true
        }
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type :String,
        required : true
    }
})

export default mongoose.model("User",User)