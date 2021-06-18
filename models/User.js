const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
