import mongoose from 'mongoose';


const cheeseschema = mongoose.Schema({
    name:String,
    des:String,
    url:String,
    price:Number
});

export default mongoose.model('cheese',cheeseschema)