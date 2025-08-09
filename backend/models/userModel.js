import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  profilePic: { type: String, default:'default_rofile_pic.jpg' }
})

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return enteredPassword === this.password;  
// };

// userSchema.pre("save", async function (next) {
//   if(!this.isModified('password') ) {
//     next();
//     return;
//   }
//   next();
// });

const userModel = mongoose.model('userModel' , userSchema)

module.exports = userModel;


