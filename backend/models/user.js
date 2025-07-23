const mongoose = require('mongoose'); // Import mongoose

// 👇 Use the 'saimanasa' database (automatically handled by your URI)
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  qualification: String,
  dob: String,
  gender: String,
  address: String
});

// 👇 Capitalized model name creates 'users' collection in MongoDB
const User = mongoose.model('User', userSchema);

module.exports = User;
