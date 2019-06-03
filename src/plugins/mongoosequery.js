const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const shortid = require("shortid");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

module.exports = function mongoosequery(schema, options) {
  const { model } = options;
  schema.statics = {
    /**
     * Get model
     * @param {ObjectId, ShortId} id - The objectId or shortId of model.
     * @returns {Promise<Model, APIError>}
     */
    get(id) {
      let query;
      if (ObjectId.isValid(id)) query = { _id: id };
      else if (shortid.isValid(id)) query = { id };
      else if (model === "voucher") query = { id };
      else if (model === "application") query = { bundleId: id };

      return this.findOne(query)
        .exec()
        .then(doc => {
          if (doc) {
            return doc;
          }
          const err = new APIError(
            `No such ${model} exists!`,
            httpStatus.NOT_FOUND
          );
          return Promise.reject(err);
        });
    },

    /**
     * Get model
     * @param {string} projection - Fields to be projected.
     * @param {object} query - Rest of URI query string passed as criteria.
     * @returns {Promise<Model, APIError>}
     */
    lookup({ projection = "", population = "", lean = true, ...query } = {}) {
      return this.findOne(query)
        .select(projection)
        .lean(lean)
        .populate(population)
        .exec()
        .then(doc => {
          if (doc) {
            return doc;
          }
          const err = new APIError(
            `No such ${model} exists!`,
            httpStatus.NOT_FOUND
          );
          return Promise.reject(err);
        });
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @param {string} projection - Fields to be projected.
     * @param {string} search - String of search query
     * @param {object} query - Rest of URI query string passed as criteria.
     * @returns {Promise<Model[]>}
     */

    list({
      skip = 0,
      limit = 50,
      population = "",
      projection = "",
      sort = "desc",
      ...query
    } = {}) {
      return this.find(query)
        .sort({ createdAt: sort === "desc" ? -1 : 1 })
        .populate(population)
        .select(projection)
        .skip(+skip)
        .limit(+limit)
        .exec();
    }
  };
};
