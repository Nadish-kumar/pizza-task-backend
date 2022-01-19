import mongoose from 'mongoose';

const urlschema = mongoose.Schema({
      url:String
});

export default mongoose.model('url',urlschema)