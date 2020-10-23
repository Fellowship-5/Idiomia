const express = require('express');
const adminController = require('../controllers/admin-controllers');

const router = express.Router();

router.get('/deleteProverb', adminController.deleteProverb);

module.exports = router;
