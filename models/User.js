const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fioUsername: {
    type: String,
    required: true,
    unique: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  tnxHash:{
    type: String,
    required: true,
  }
},{ collection: 'users' });

const User = mongoose.model('User', UserSchema);

module.exports = User;
