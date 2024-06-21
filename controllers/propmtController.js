const Prompt = require('../models/prompt');

exports.createPrompt = async (req, res) => {
  const { walletAddress, prompt, upVoteCount, downVoteCount, votedWallets } = req.body;

  try {
    const newPrompt = new Prompt({ walletAddress, prompt, upVoteCount,downVoteCount,votedWallets});
    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ upVoteCount: -1 });
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVoteCount = async (req, res) => {
  const { id } = req.params; // Prompt ID from the URL parameters
  const { voteType,votedWalletAddress } = req.body; // Type of vote: 'upvote' or 'downvote'

  if (!['upvote', 'downvote'].includes(voteType)) {
    return res.status(400).json({ message: 'Invalid vote type.' });
  }

  try {
    const update = {
      $inc: voteType === 'upvote' ? { upVoteCount: 1 } : { downVoteCount: 1 },
      $push: { votedWallets: votedWalletAddress },
    };
    const updatedPrompt = await Prompt.findByIdAndUpdate(id, update, { new: true });

    if (!updatedPrompt) {
      return res.status(404).json({ message: 'Prompt not found.' });
    }

    res.status(200).json(updatedPrompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkWalletAddress = async (req, res) => {
  const {walletAddress} = req.query;

  if (!walletAddress ) {
    return res.status(400).json({ msg: 'Wallet Address is required' });
  }

  try {
    const user = await Prompt.findOne({walletAddress});

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// Other controllers (getUser, updateUser, deleteUser) can be added here.
