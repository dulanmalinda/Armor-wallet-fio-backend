// routes/userRoutes.js
const express = require('express');
const { saveUser, getUserByWalletAddress,checkUsernameAvailability } = require('../controllers/usersController');
const router = express.Router();

router.get('/user/:walletAddress', getUserByWalletAddress);
router.post('/user/save', saveUser);
router.get('/checkUsernameAvailability/:fioUsername', checkUsernameAvailability);

module.exports = router;
