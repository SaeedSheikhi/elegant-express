const express = require('express');
const router = express.Router();
const requirements = require('../middlewares/requirements');
const controller = require('./pay.controller');

/* GET /pay - initialize new gateway and send back */
router.get('/', requirements.login, controller.getPay);

/* 
THIS IS NOT API CALL, SERVER IS IN CHARGE TO HANDLE ROUTING !!!
post web hook to verify transaction
*/
router.all('/verify', controller.postVerify);

module.exports = router;
