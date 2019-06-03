const Joi = require('joi');

module.exports = {
  /* POST /proxy/reverse */
  reverse: {
    body: {
      url: Joi.string().required()
    }
  }
};
