const express = require('express');
const router = express.Router();
const requirements = require('./middlewares/requirements');

router.use('/auth', require('./auth/auth.route'));
router.use('/users', requirements.login, require('./user/user.route'));
router.use('/invitations', require('./invitation/invitation.route'));
router.use('/proxy', require('./proxy/proxy.route'));

module.exports = router;
