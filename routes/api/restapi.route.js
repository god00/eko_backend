var express = require('express');
const deliverCtrl = require('../../controllers/deliver.controller');
const config = require('../../config');

var router = express.Router();

router.post('/input', deliverCtrl.addNewRoutes);

router.post('/calculateCost', deliverCtrl.calculateCost);

router.post('/possibleRoute', deliverCtrl.possibleRoute);


module.exports = router;