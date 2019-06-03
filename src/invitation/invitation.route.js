const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const invitationCtrl = require('./invitation.controller');
const invitationValidation = require('./invitation.validation');
const requirements = require('../middlewares/requirements');

router
  .route('/')
  /* GET /invitations - Get list of invitations */
  .get(invitationCtrl.list)
  /* POST /invitations - Create new invitation */
  .post(validate(invitationValidation.create), invitationCtrl.create);

router
  .route('/lookup')
  /* GET /invitations/lookup - Get invitation */
  .get(invitationCtrl.lookup);

router
  .route('/:invitationId')
  /* GET /invitations/:invitationId - Get invitation */
  .get(invitationCtrl.get)
  /* PUT /invitations/:invitationId - Update invitation */
  .put(validate(invitationValidation.update), invitationCtrl.update)
  /* DELETE /invitations/:invitationId - Delete invitation */
  .delete(requirements.login, requirements.admin, invitationCtrl.remove);

/* Load invitation when API with invitationId route parameter is hit */
router.param('invitationId', invitationCtrl.load);

module.exports = router;
