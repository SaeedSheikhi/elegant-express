const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const requirements = require('../middlewares/requirements');
const validation = require('./pay.validation');
const controller = require('./pay.controller');

/* GET /pay - initialize new gateway and send back */
router.get('/', requirements.login, controller.getPay);

router
  .route('/currency')
  /* GET /pay/currency - get anareum currency */
  .get(controller.getCurrency)
  /* POST /pay/currency - update anareum currency */
  .post(
    requirements.login,
    requirements.agent,
    validate(validation.currency),
    controller.updateCurrency
  );

/* 
THIS IS NOT API CALL, SERVER IS IN CHARGE TO HANDLE ROUTING !!!
post web hook to verify transaction
*/
router.all('/verify', controller.postVerify);

module.exports = router;
