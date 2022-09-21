import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  });


export default mongoose.model("User", User);