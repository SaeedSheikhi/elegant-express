const Joi = require('joi');

module.exports = {
  /* POST /invitations */
  create: {
    body: {
      invitee: Joi.object().keys({
        id: Joi.string(),
        _user: Joi.string().hex()
      }),

      referrer: Joi.object().keys({
        id: Joi.string().required(),
        _user: Joi.string().hex()
      })
    }
  },

  /* PUT /invitations/:invitationId */
  update: {
    params: {
      invitationId: Joi.string()
        .hex()
        .required()
    },

    body: {
      invitee: Joi.object().keys({
        id: Joi.string(),
        _user: Joi.string().hex()
      }),

      referrer: Joi.object().keys({
        id: Joi.string(),
        _user: Joi.string().hex()
      })
    }
  }
};
