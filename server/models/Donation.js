const mongoose = require('mongoose');

const DonationSchema = mongoose.Schema({
  amount: Number,
  created: {
    type: Date,
    default: Date.now
  },
  issuedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    username: String
  }
});

module.exports = mongoose.model('donation', DonationSchema);