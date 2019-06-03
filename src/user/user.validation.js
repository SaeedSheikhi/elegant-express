const Joi = require('joi');

module.exports = {
  /* POST /users */
  create: {
    body: {
      email: Joi.object().keys({
        primary: Joi.string()
          .email()
          .required()
      }),
      mobile: Joi.object().keys({
        number: Joi.string().regex(/^[0][9][0-9]{9,9}$/)
      }),
      profile: Joi.object().keys({
        name: Joi.object().keys({
          first: Joi.string().required(),
          last: Joi.string().required()
        })
      }),
      password: Joi.object()
        .keys({
          hash: Joi.string().required(),
          confirmation: Joi.string().required
        })
        .assert('hash', Joi.ref('confirmation'), 'equal to confirmation')
    }
  },

  /* PUT /users/:userId */
  update: {
    params: {
      userId: Joi.string()
        .hex()
        .required()
    }
  }
};
