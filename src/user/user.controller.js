const User = require('./user.model');
const lodash = require('lodash');
const customizer = require('../helpers/customizer');


/**
 * Load user and append to req.
 */
const load = (req, res, next, id) => {
  User.get(id)
    .then(user => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));
};

/**
 * Get user
 * @returns {User}
 */
const get = (req, res) => {
  return res.json(req.user);
};

/**
 * Get user
 * @returns {User}
 */
const lookup = (req, res, next) => {
  User.lookup(req.query)
    .then(user => res.json(user))
    .catch(e => next(e));
};

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
const update = (req, res, next) => {
  let user = req.user;
  user.set(lodash.mergeWith(user.toObject(), req.body, customizer));
  user
    .save()
    .then(() => res.json('OK'))
    .catch(e => next(e));
};

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
const list = (req, res, next) => {
  User.list(req.query)
    .then(results => res.json(results))
    .catch(e => next(e));
};

/**
 * Delete user.
 * @returns {User}
 */
const remove = function removeUser(req, res, next) {
  req.user
    .remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
};

module.exports = {
  load,
  get,
  lookup,
  list,
  update,
  remove
};
