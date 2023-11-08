const express = require('express');
const router = express.Router();
const confirmDelivery = require('../controllers/orderController');
router.post('/confirm-delivery', confirmDelivery);

module.exports = router;
