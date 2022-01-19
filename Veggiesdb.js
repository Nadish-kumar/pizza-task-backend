import mongoose from 'mongoose';


const vegschema = mongoose.Schema({
    name:String,
    des:String,
    url:String,
    price:Number
});

export default mongoose.model('veg',vegschema)