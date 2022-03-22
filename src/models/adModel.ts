import mongoose from 'mongoose';

var Ad = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    user : {
        type : String,
        required : true
    },
    
})

export default mongoose.model("Advertisement",Ad)