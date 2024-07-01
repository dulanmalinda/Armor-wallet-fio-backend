const User = require('../models/User');

const saveUser = async (req, res) => {
  const { fioUsername, walletAddress } = req.body;

  try {
    let user = await User.findOne({ fioUsername });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      fioUsername,
      walletAddress,
    });

    await user.save();

    res.status(201).json({ msg: 'User saved successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getUserByWalletAddress = async (req, res) => {
  const { walletAddress } = req.params;

  try {
    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  saveUser,
  getUserByWalletAddress
};
