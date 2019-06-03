const Receipt = require('./receipt.model');
const merge = require('lodash/merge');

/**
 * Load receipt and append to req.
 */
const load = (req, res, next, id) => {
  Receipt.get(id)
    .then(receipt => {
      req.receipt = receipt;
      return next();
    })
    .catch(e => next(e));
};

/**
 * Get receipt
 * @returns {Receipt}
 */
const get = (req, res) => {
  return res.json(req.receipt);
};

/**
 * Get receipt
 * @returns {Receipt}
 */
const lookup = (req, res, next) => {
  Receipt.lookup(req.query)
    .then(receipt => res.json(receipt))
    .catch(e => next(e));
};

/**
 * Create new receipt
 * @property {string} req.body.username - The username of receipt.
 * @property {string} req.body.mobileNumber - The mobileNumber of receipt.
 * @returns {Receipt}
 */
export const create = (req, res, next) => {
  const receipt = new Receipt(req.body);

  receipt
    .save()
    .then(savedReceipt => {
      savedReceipt.on('es-indexed', err => {
        if (err) return next(err);
        return res.json(savedReceipt);
      });
    })
    .catch(e => next(e));
};

/**
 * Update existing receipt
 * @property {string} req.body.username - The username of receipt.
 * @property {string} req.body.mobileNumber - The mobileNumber of receipt.
 * @returns {Receipt}
 */
const update = (req, res, next) => {
  let newReceipt = req.receipt;
  newReceipt = merge(newReceipt, req.body);
  newReceipt
    .save()
    .then(() => res.json('OK'))
    .catch(e => next(e));
};

/**
 * Get receipt list.
 * @property {number} req.query.skip - Number of receipts to be skipped.
 * @property {number} req.query.limit - Limit number of receipts to be returned.
 * @returns {Receipt[]}
 */
const list = (req, res, next) => {
  Receipt.list(req.query)
    .then(results => res.json(results))
    .catch(e => next(e));
};

/**
 * Delete receipt.
 * @returns {Receipt}
 */
const remove = function removeUser(req, res, next) {
  req.receipt
    .remove()
    .then(deletedReceipt => res.json(deletedReceipt))
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
