// routes/userRoutes.js
const express = require('express');
const { createPrompt, getPrompts,updateVoteCount,checkWalletAddress } = require('../controllers/propmtController');
const router = express.Router();

router.post('/createPrompt', createPrompt);
router.get('/getPrompts', getPrompts);
router.patch('/prompts/:id/vote', updateVoteCount);
router.get('/check-wallet',checkWalletAddress)

module.exports = router;
