// routes/userRoutes.js
const express = require('express');
const { saveUser, getUserByWalletAddress} = require('../controllers/usersController');
const router = express.Router();

router.get('/user/:walletAddress', getUserByWalletAddress);
router.post('/user/save', saveUser);

module.exports = router;
