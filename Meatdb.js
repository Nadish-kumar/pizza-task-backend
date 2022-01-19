import mongoose from 'mongoose';


const meatschema = mongoose.Schema({
    name:String,
    des:String,
    url:String,
    price:Number
});

export default mongoose.model('meat',meatschema)