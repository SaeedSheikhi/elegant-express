const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const Application = require("../application/application.model");
const User = require("../user/user.model");
import to from "../utils/to";

module.exports = {
  login(req, res, next) {
    const authorizationHeader = req.headers["authorization"];

    let token;
    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        let user;
        if (err) return next(err);

        [err, user] = await to(User.findOne({ id: decoded.id }));
        if (err) return next(err);
        if (!user)
          return next(
            new APIError("No such user exists!", httpStatus.NOT_FOUND)
          );

        req.user = user;
        next();
      });
    } else {
      return next(new APIError("No token Provided", httpStatus.FORBIDDEN));
    }
  },

  agent(req, res, next) {
    if (["agent"].includes(req.user.role)) {
      return next();
    }
    return next(new APIError("not allowed to access", httpStatus.FORBIDDEN));
  },

  admin(req, res, next) {
    if (["agent", "admin"].includes(req.user.role)) {
      return next();
    }
    return next(new APIError("not allowed to access", httpStatus.FORBIDDEN));
  },

  member(req, res, next) {
    if (["agent", "admin", "member"].includes(req.user.role)) {
      return next();
    }
    return next(new APIError("not allowed to access", httpStatus.FORBIDDEN));
  },

  balance(req, res, next) {
    if (req.user.balance < req.body.amount) {
      return next(new APIError("Not enough balance!", httpStatus.FORBIDDEN));
    }
    next();
  }
};
