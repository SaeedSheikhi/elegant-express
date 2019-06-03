const Joi = require('joi');
import { mobileRegExp } from '../utils/regexp';

module.exports = {
  register: {
    /* POST /auth/register */
    body: {
      emails: Joi.object()
        .keys({
          primary: Joi.object()
            .keys({
              address: Joi.string()
                .lowercase()
                .email()
                .required()
            })
            .required()
        })
        .required(),
      mobile: Joi.object()
        .keys({
          number: Joi.string()
            .regex(mobileRegExp)
            .required()
        })
        .required(),
      profile: Joi.object()
        .keys({
          name: Joi.object()
            .keys({
              first: Joi.string().required(),
              last: Joi.string().required()
            })
            .required()
        })
        .required(),
      password: Joi.object()
        .keys({
          hash: Joi.string().required(),
          confirmation: Joi.string()
            .valid(Joi.ref('hash'))
            .strip()
            .required()
        })
        .required()
    }
  },

  /* POST /auth/login */
  login: {
    body: {
      identifier: Joi.string()
        .lowercase()
        .required(),
      password: Joi.string().required()
    }
  },

  token: {
    /* POST /auth/token:verify */
    verify: {
      body: {
        identifier: Joi.string()
          .lowercase()
          .required(),
        token: Joi.string().required()
      }
    },
    /* POST /auth/token:send */
    send: {
      body: {
        identifier: Joi.string()
          .lowercase()
          .required()
      }
    },
    /* POST /auth/token:check */
    check: {
      body: {
        identifier: Joi.string()
          .lowercase()
          .required(),
        token: Joi.string().required()
      }
    }
  },

  password: {
    /* POST /auth/password:reset */
    reset: {
      body: {
        identifier: Joi.string().required(),
        token: Joi.string().required(),
        password: Joi.object().keys({
          hash: Joi.string().required(),
          confirmation: Joi.string()
            .valid(Joi.ref('hash'))
            .required()
            .strip()
        })
      }
    },
    /* POST /auth/forgot:change */
    change: {
      body: {
        current: Joi.string().required(),
        hash: Joi.string().required(),
        confirmation: Joi.string()
          .valid(Joi.ref('hash'))
          .strip()
          .required()
      }
    }
  },

  /* POST /auth/identifier:change */
  identifier: {
    body: {
      email: Joi.string()
        .lowercase()
        .email(),
      mobile: Joi.string().regex(mobileRegExp),
      token: Joi.string()
    }
  },

  /* POST /auth/profile */
  profile: {
    body: {
      avatar: Joi.object(),
      header: Joi.object()
    }
  },

  /* GET /auth/beta/activation/:email */
  beta: {
    params: {
      email: Joi.string()
        .email()
        .required()
    }
  }
};
