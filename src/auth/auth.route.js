const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const authValidation = require('./auth.validation');
const controller = require('./auth.controller');
const requirements = require('../middlewares/requirements');

/* POST /auth/register - register user */
router.post(
  '/register',
  validate(authValidation.register),
  controller.register
);

/* POST /auth/login - login user */
router.post('/login', validate(authValidation.login), controller.login);

/* GET /auth/me - get user model of current provided token */
router.get('/me', requirements.login, controller.getUser);

/* GET /auth/exists - check existence of user */
router.get('/exists', controller.getUserExistence);

/* GET /auth/renew - generate new jwt for current user */
router.get('/renew', requirements.login, controller.getRandomJWT);

/* POST /auth/token:check - check token to be valid */
router.post(
  '/token([/:])check',
  validate(authValidation.token.check),
  controller.postCheckToken
);

/* POST /auth/token:verify - verify identity */
router.post(
  '/token([/:])verify',
  requirements.login,
  validate(authValidation.token.verify),
  controller.postVerifyToken
);

/* POST /auth/token:send - send identity verification token */
router.post(
  '/token([/:])send',
  validate(authValidation.token.send),
  controller.postSendToken
);

/* POST /auth/password:change- change account password */
router.post(
  '/password([/:])change',
  requirements.login,
  validate(authValidation.password.change),
  controller.postChangePassword
);

/* POST /auth/password:reset - reset account password */
router.post(
  '/password([/:])reset',
  validate(authValidation.password.reset),
  controller.postResetPassword
);

/* POST /auth/identifier:change - change identifier */
router.post(
  '/identifier([/:])change',
  requirements.login,
  validate(authValidation.identifier),
  controller.postChangeIdentifier
);

/* POST /auth/profile - change profile information */
router.post(
  '/profile',
  requirements.login,
  validate(authValidation.profile),
  controller.postUpdateProfile
);

module.exports = router;
