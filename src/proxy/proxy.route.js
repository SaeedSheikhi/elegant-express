const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const proxyCtrl = require('./proxy.controller');
const proxyValidation = require('./proxy.validation');

/* GET /proxy/ip - ip information */
router.get('/ip', proxyCtrl.getIp);

/* POST /proxy/reverse - proxy the request and bypass CORS */
router.post(
  '/reverse',
  validate(proxyValidation.reverse),
  proxyCtrl.postReverse
);

module.exports = router;
