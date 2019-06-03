const express = require('express');
const router = express.Router();
const requirements = require('../middlewares/requirements');
const middleware = require('./user.middleware');
const controller = require('./user.controller');

router
  .route('/')
  /* GET /users - Get list of users */
  .get(requirements.admin, controller.list);

router
  .route('/lookup')
  /* GET /users/lookup - Get user */
  .get(requirements.admin, controller.lookup);

router
  .route('/:userId')
  /* GET /users/:userId - Get user */
  .get(middleware.get, controller.get)
  /* PUT /users/:userId - Update user */
  .put(requirements.admin, controller.update)
  /* DELETE /users/:userId - Delete user */
  .delete(requirements.admin, controller.remove);

/* Load user when API with userId route parameter is hit */
router.param('userId', controller.load);

module.exports = router;
