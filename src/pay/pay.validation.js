const Joi = require('joi');

module.exports = {
  /* POST /pay/purchase */
  purchase: {
    body: {
      amount: Joi.number().required(),
      identifier: Joi.string().required()
    }
  },
  /* POST /pay/currency */
  currency: {
    body: {
      currency: Joi.number(),
      automaticUpdateCurrency: Joi.boolean(),
      needToBeEqualize: Joi.boolean()
    }
  }
};
