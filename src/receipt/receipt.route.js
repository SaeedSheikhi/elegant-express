const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const controller = require('./receipt.controller');
const validation = require('./receipt.validation');
const requirements = require('../middlewares/requirements');

router
  .route('/')
  /* GET /receipts - Get list of receipts */
  .get(controller.list)
  /* POST /receipts - Create new receipt */
  .post(validate(validation.create), controller.create);

router
  .route('/lookup')
  /* GET /receipts/lookup - Get receipt */
  .get(controller.lookup);

router
  .route('/:receiptId')
  /* GET /receipts/:receiptId - Get receipt */
  .get(controller.get)
  /* PUT /receipts/:receiptId - Update receipt */
  .put(validate(validation.update), controller.update)
  /* DELETE /receipts/:receiptId - Delete receipt */
  .delete(requirements.login, requirements.admin, controller.remove);

/* Load receipt when API with receiptId route parameter is hit */
router.param('receiptId', controller.load);

module.exports = router;
