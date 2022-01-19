import mongoose from 'mongoose';


const sauceschema = mongoose.Schema({
    name:String,
    des:String,
    url:String,
    price:Number
});

export default mongoose.model('sauce',sauceschema)