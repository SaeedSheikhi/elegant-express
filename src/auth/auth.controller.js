const httpStatus = require("http-status");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const axios = require("axios");
//
const User = require("../user/user.model");
const Invitation = require("../invitation/invitation.model");
const SMS = require("../services/SMS");
const Email = require("../services/Email");
const APIError = require("../helpers/APIError");
import { redisClient, redisHMGETAsync } from "../index";
import to from "../utils/to";
import tokenify from "../helpers/tokenify";

const randomJWT = async user => {
  const token = jwt.sign(
    {
      _id: user._id,
      id: user.id,
      emails: user.emails,
      profile: user.profile,
      balance: user.balance,
      role: user.role,
      isActive: user.isActive
    },
    process.env.JWT_SECRET
  );
  return token;
};

const register = async (req, res, next) => {
  let err;
  let user;
  let invitation;
  let result;
  let reply;
  let body = req.body;

  /* check to be unique */
  [err, user] = await to(
    User.findOne({
      $or: [
        { "mobile.number": body.mobile.number },
        { "emails.primary.address": body.emails.primary.address }
      ]
    })
  );

  if (err) return next(err);
  if (user) {
    const errMsg =
      body.emails.primary.address === user.emails.primary.address
        ? "duplicate email address, already is taken"
        : "duplicate mobile number, already is taken";
    err = new APIError(errMsg, httpStatus.BAD_REQUEST, true);
    return next(err);
  }

  if (body.token) {
    [err, reply] = await to(redisHMGETAsync(body.mobile.number, "code"));
    if (err) return next(err);
    else if (!reply || reply[0] !== body.token) {
      err = new APIError(
        "token is invalid or has expired",
        httpStatus.UNAUTHORIZED,
        true
      );
      return next(err);
    } else {
      body = _.merge(body, { mobile: { isVerified: true } });
    }
  }

  user = new User(body);
  [err, user] = await to(user.save());
  if (err) return next(err);

  res.status(httpStatus.CREATED).json(user);


  /* consume invitation */
  const { invitationId } = body;
  if (invitationId) {
    [err, invitation] = await to(Invitation.get(invitationId));
    if (err) return console.log(err);

    invitation.invitee.id = user.id;
    invitation.invitee._user = user._id;
    invitation.status = "consumed";

    invitation.save().catch(err => console.log(err));

    // giveaway 1 ANA to referrer
    invitation = new Invitation({
      invitee: {
        id: user.id,
        _user: user._id
      },
      referrer: invitation.referrer,
      amount: 1,
      status: "ready-to-claim"
    });

    invitation.save().catch(err => console.log(err));
  }
};

const getUserExistence = async (req, res, next) => {
  const [err, user] = await to(
    User.lookup({ projection: "_id", ...req.query })
  );
  if (err) return next(err);

  return res.json({ existence: !_.isEmpty(user) });
};

const getUser = (req, res, next) => {
  res.json(req.user);
};

const getRandomJWT = async (req, res, next) => {
  const token = await randomJWT(req.user);
  res.json(token);
};

const login = async (req, res, next) => {
  const { identifier, password } = req.body;
  let err, user;
  const query = isNaN(identifier)
    ? { "emails.primary.address": identifier }
    : { "mobile.number": identifier };

  [err, user] = await to(
    User.lookup({
      projection: "+password.hash",
      lean: false,
      ...query
    })
  );
  if (err) return next(err);

  if (user) {
    if (user.validPassword(password)) {
      const token = await randomJWT(user);
      return res.json(token);
    }
  }
  err = new APIError("invalid credentials", httpStatus.FORBIDDEN);
  return next(err);
};

const postSendToken = async (req, res, next) => {
  const { identifier } = req.body;
  let token;
  const query = isNaN(identifier)
    ? { "emails.primary.address": identifier }
    : { "mobile.number": identifier };

  const [err, user] = await to(User.findOne(query));
  if (err) return next(err);

  redisClient.hgetall(identifier, (err, reply) => {
    if (err) return next(err);
    else if (_.isEmpty(reply)) {
      token = tokenify();
      redisClient.hmset(identifier, ["code", token.code, "query", token.query]);
    } else token = reply;

    /* Set TTL */
    redisClient.expire(identifier, 3600);
    if (user) {
      /* Distinguish to send reset or verify token */
      _.at(
        user,
        _.keys(query)[0]
          .slice(0, _.keys(query)[0].lastIndexOf("."))
          .concat(".isVerified")
      )[0]
        ? sendResetToken(identifier, token, user)
        : sendVerificationToken(identifier, token, user);
    } else {
      sendVerificationToken(identifier, token, user);
    }

    return res.status(httpStatus.NO_CONTENT).json("OK");
  });
};

const postVerifyToken = async (req, res, next) => {
  const { identifier, token } = req.body;
  let err, reply;

  if (token.length > 6) {
    [err, reply] = await to(redisHMGETAsync(identifier, "query"));
  } else {
    [err, reply] = await to(redisHMGETAsync(identifier, "code"));
  }
  if (err) return next(err);
  else if (!reply || reply[0] !== token) {
    err = new APIError(
      "token is invalid or has expired",
      httpStatus.UNAUTHORIZED,
      true
    );
    return next(err);
  }

  if (isNaN(identifier)) {
    [err] = await to(
      User.findOneAndUpdate(
        { "emails.primary.address": identifier },
        { "emails.primary.isVerified": true }
      ).exec()
    );
  } else {
    [err] = await to(
      User.findOneAndUpdate(
        { "mobile.number": identifier },
        { "mobile.isVerified": true }
      ).exec()
    );
  }
  if (err) return next(err);
  return res.status(httpStatus.NO_CONTENT).json("OK");
};

const postCheckToken = async (req, res) => {
  const { identifier, token } = req.body;

  let err, reply;
  [err, reply] = await to(redisHMGETAsync(identifier, "code"));
  if (err) return next(err);

  const validity = !_.isEmpty(reply) && reply[0] === token;
  return res.json({ validity });
};

const postChangePassword = async (req, res, next) => {
  const { current, hash } = req.body;
  let err;
  let user;

  [err, user] = await to(
    User.lookup({
      projection: "+password.hash",
      lean: false,
      _id: req.user._id
    })
  );
  if (err) return next(err);

  if (!user.validPassword(current)) {
    err = new APIError("current password is not valid", httpStatus.FORBIDDEN);
    return next(err);
  }

  user.password.hash = hash;
  [err] = await to(user.save());
  if (err) return next(err);

  res.status(httpStatus.NO_CONTENT).json("OK");
};

/** reset forgotten password
 * @property {string} req.body.identifier - The primary email or mobile of the user
 * @property {string} req.body.token - The provided token to reset password
 * @property {string} req.body.password.hash - New password
 * @property {string} req.body.password.confirmation - Confirmation of new password
 * @returns {User}
 */
const postResetPassword = async (req, res, next) => {
  const { identifier, token, password } = req.body;
  const query = isNaN(identifier)
    ? { "emails.primary.address": identifier }
    : { "mobile.number": identifier };
  let err;
  let reply;
  let user;

  [err, reply] = await to(redisHMGETAsync(identifier, "code"));
  if (err) return next(err);
  if (_.isEmpty(reply) || reply[0] !== token)
    return next(
      new APIError("token is invalid or has expired", httpStatus.UNAUTHORIZED)
    );

  [err, user] = await to(User.lookup({ ...query, lean: false }));
  if (err) return next(err);

  user.password.hash = password.hash;
  [err] = await to(user.save());
  if (err) return next(err);
  res.json("OK");
};

const postChangeIdentifier = async (req, res, next) => {
  const {
    body: { email, mobile, token },
    user
  } = req;
  let err;

  // for better ux, token validation removed
  // let reply;
  // if (
  //   _.at(
  //     user,
  //     _.keys(query)[0]
  //       .slice(0, _.keys(query)[0].lastIndexOf("."))
  //       .concat(".isVerified")
  //   )[0]
  // ) {
  //   /* token validation is needed */
  //   [err, reply] = await to(redisHMGETAsync(identifier, "code"));
  //   if (err) return next(err);
  //   else if (!_.isEmpty(reply) || reply[0] !== token) {
  //     err = new APIError(
  //       "token is invalid or has expired",
  //       httpStatus.UNAUTHORIZED,
  //       true
  //     );
  //     return next(err);
  //   }
  // }

  if (email) {
    [err] = await to(
      User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            "emails.primary.address": email,
            "emails.primary.isVerified": false
          }
        }
      ).exec()
    );
  } else {
    [err] = await to(
      User.findOneAndUpdate(
        { _id: user._id },

        { $set: { "mobile.number": mobile, "mobile.isVerified": false } }
      ).exec()
    );
  }
  if (err) return next(err);
  return res.status(httpStatus.NO_CONTENT).json("OK");
};

export const postUpdateProfile = (req, res, next) => {
  req.user.set({ profile: { ...req.user.profile, ...req.body } });
  req.user
    .save()
    .then(() => res.json("OK"))
    .catch(e => {
      console.log(e);
      next(e);
    });
};

function sendVerificationToken(to, token, user) {
  if (isNaN(to)) {
    try {
      // TODO: will crash app for being null profile section
      const EmailBridge = new Email(to, user);
      EmailBridge.verificationRequest(token);
    } catch (err) {
      console.log(err);
    }
  } else {
    const SMSBridge = new SMS(to, user);
    SMSBridge.verificationRequest(token);
  }
}

function sendResetToken(to, token, user) {
  if (isNaN(to)) {
    try {
      const EmailBridge = new Email(to, user);
      EmailBridge.resetPasswordRequest(token);
    } catch (err) {
      console.log(err);
    }
  } else {
    const SMSBridge = new SMS(to, user);
    SMSBridge.resetPasswordRequest(token);
  }
}

module.exports = {
  register,
  login,
  getRandomJWT,
  getUserExistence,
  getUser,
  postCheckToken,
  postSendToken,
  postVerifyToken,
  postChangePassword,
  postResetPassword,
  postChangeIdentifier,
  postUpdateProfile
};
