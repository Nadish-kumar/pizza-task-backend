import mongoose from 'mongoose';

const adminschema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String,

})

export default mongoose.model('admin',adminschema)