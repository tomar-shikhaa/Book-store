const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  Name: { type: String, required: true},
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
 Role: { type: String, enum: ['user', 'admin'], default: 'user' },
 otp: {type: String, },
 expiry: {type: Date, }
  //CreatedAt: { type: Date, default: Date.now }
});
const user = mongoose.model('User', AdminSchema)
module.exports = user;