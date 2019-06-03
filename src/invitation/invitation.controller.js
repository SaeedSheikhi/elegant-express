const Invitation = require('./invitation.model');
const merge = require('lodash/merge');

/**
 * Load invitation and append to req.
 */
const load = (req, res, next, id) => {
  Invitation.get(id)
    .then(invitation => {
      req.invitation = invitation;
      return next();
    })
    .catch(e => next(e));
};

/**
 * Get invitation
 * @returns {Invitation}
 */
const get = (req, res) => {
  return res.json(req.invitation);
};

/**
 * Get invitation
 * @returns {Invitation}
 */
const lookup = (req, res, next) => {
  Invitation.lookup(req.query)
    .then(invitation => res.json(invitation))
    .catch(e => next(e));
};

/**
 * Create new invitation
 * @property {string} req.body.username - The username of invitation.
 * @property {string} req.body.mobileNumber - The mobileNumber of invitation.
 * @returns {Invitation}
 */
export const create = (req, res, next) => {
  const invitation = new Invitation(req.body);

  invitation
    .save()
    .then(savedInvitation => {
      invitation.on('es-indexed', err => {
        if (err) return next(err);
        return res.json(savedInvitation);
      });
    })
    .catch(e => next(e));
};

/**
 * Update existing invitation
 * @property {string} req.body.username - The username of invitation.
 * @property {string} req.body.mobileNumber - The mobileNumber of invitation.
 * @returns {Invitation}
 */
const update = (req, res, next) => {
  let newinvItation = req.invitation;
  newinvItation = merge(newinvItation, req.body);
  newinvItation
    .save()
    .then(() => res.json('OK'))
    .catch(e => next(e));
};

/**
 * Get invitation list.
 * @property {number} req.query.skip - Number of invitations to be skipped.
 * @property {number} req.query.limit - Limit number of invitations to be returned.
 * @returns {Invitation[]}
 */
const list = (req, res, next) => {
  Invitation.list(req.query)
    .then(results => res.json(results))
    .catch(e => next(e));
};

/**
 * Delete invitation.
 * @returns {Invitation}
 */
const remove = function removeUser(req, res, next) {
  req.invitation
    .remove()
    .then(deletedInvitation => res.json(deletedInvitation))
    .catch(e => next(e));
};

module.exports = {
  load,
  get,
  create,
  lookup,
  list,
  update,
  remove
};
