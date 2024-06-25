const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
   walletAddress: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  upVoteCount: {
    type: Number,
    required: true,
  },
  downVoteCount: {
    type: Number,
    required: true,
  },
  upVotedWallets: {
    type : Array,
    required: true
  },
  downVotedWallets: {
    type : Array,
    required: true
  }
},{ collection: 'armorVoteCollection' });

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
