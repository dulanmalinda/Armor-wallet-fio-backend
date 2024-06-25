const User = require('../models/User');

const getUserPromptCount = async (req, res) => {
  const { walletAddress } = req.query;

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({ walletAddress });
      await user.save();
    }

    res.json({ walletAddress: user.walletAddress, promptsCount: user.promptsCount, voteCount:user.voteCount });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

// Increment user's prompt count
const incrementPromptCount = async (req, res) => {
  const { walletAddress } = req.query;

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.promptsCount += 1;
    await user.save();

    res.json({ walletAddress: user.walletAddress, promptsCount: user.promptsCount });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Increment user's Vote count
const incrementVoteCount = async (req, res) => {
  const { walletAddress } = req.query;

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.voteCount += 1;
    await user.save();

    res.json({ walletAddress: user.walletAddress, promptsCount: user.promptsCount, voteCount: user.voteCount});
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Decrement user's Vote count
const decrementVoteCount = async (req, res) => {
  const { walletAddress } = req.query;

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.voteCount -= 1;
    await user.save();

    res.json({ walletAddress: user.walletAddress, promptsCount: user.promptsCount, voteCount: user.voteCount});
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getUserPromptCount,
  incrementPromptCount,
  incrementVoteCount,
  decrementVoteCount
};
