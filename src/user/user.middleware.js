const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

module.exports = {
  get(req, res, next) {
    if (['agent', 'admin'].includes(req.user.role)) {
      return next();
    }

    if (req.params.userId == req.user.id || req.params.userId == req.user._id)
      return next();

    next(new APIError('not allowed to access', httpStatus.FORBIDDEN));
  }
};
