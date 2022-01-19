import mongoose from 'mongoose';


const breadschema = mongoose.Schema({
    name:String,
    des:String,
    url:String,
    price:Number
});

export default mongoose.model('bread',breadschema)