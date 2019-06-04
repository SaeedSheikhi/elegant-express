const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const mongoosastic = require('mongoosastic');
const shortid = require('shortid');
const httpStatus = require('http-status');
const mongoosequery = require('../plugins/mongoosequery');
const fileSchema = require('../models/file');
const APIError = require('../helpers/APIError');
import tokenify from '../helpers/tokenify';
import { redisClient } from '../index';
import { esClient } from '../index';

const userSchema = new Schema(
  {
    id: {
      type: String,
      default: shortid.generate,
      unique: true
    },
    emails: {
      primary: {
        address: {
          type: String,
          required: true,
          lowercase: true,
          unique: true
        },
        isVerified: { type: Boolean, default: false }
      },
      secondary: {
        address: {
          type: String,
          lowercase: true
        }
      }
    },
    mobile: {
      number: {
        type: String,
        match: [
          /^[0][9][0-9]{9,9}$/,
          'The value of path {PATH} ({VALUE}) is not a valid phone number.'
        ],
        required: true,
        unique: true
      },
      isVerified: { type: Boolean, default: false }
    },
    password: {
      hash: { type: String, select: false },
      lastModified: Date,
      es_indexed: false
    },
    balance: { type: Number, default: 0 },
    profile: {
      name: {
        first: { type: String, max: 50 },
        last: { type: String, max: 50 }
      },
      birthday: Date,
      gender: String,
      location: String,
      website: String,
      avatar: fileSchema,
      header: fileSchema
    },
    isActive: { type: Boolean, default: true },
    role: { type: String, lowercase: true, enum: ['agent', 'admin', 'member'] }
  },
  { timestamps: true }
);

/* Password hash middleware */
userSchema.pre('save', function(next) {
  if (!this.isModified('password.hash')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password.hash, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password.hash = hash;
      this.password.lastModified = Date.now();
      next();
    });
  });
});

/* round balance middleware */
userSchema.pre('save', function(next) {
  if (!this.isModified('balance')) {
    return next();
  }
  if (this.balance < 0)
    return next(new APIError('not enough balance', httpStatus.FORBIDDEN));

  const factor = Math.pow(10, 2);
  this.balance = Math.round(this.balance * factor) / factor;
  next();
});

/* send primary email verification token middleware */
userSchema.pre('save', function(next) {
  if (!this.isModified('email.primary.address')) {
    return next();
  }
  const token = tokenify();
  redisClient.hmset(this.email.primary.address, [
    'code',
    token.code,
    'query',
    token.query
  ]);
  redisClient.expire(this.email.primary.address, 3600);
  sendVerificationMail(this.email.primary.address, this, token);
  next();
});

/* send secondary email verification token middleware */
userSchema.pre('save', function(next) {
  if (!this.isModified('email.secondary.address')) {
    return next();
  }
  const token = tokenify();
  redisClient.hmset(this.email.secondary.address, [
    'code',
    token.code,
    'query',
    token.query
  ]);
  redisClient.expire(this.email.secondary.address, 3600);
  sendVerificationMail(this.email.secondary.address, this, token);
  next();
});

/* send mobile verification middleware */
userSchema.pre('save', function(next) {
  if (!this.isModified('mobile.number')) {
    return next();
  }
  const token = tokenify();
  redisClient.hmset(this.mobile.number, [
    'code',
    token.code,
    'query',
    token.query
  ]);
  redisClient.expire(this.mobile.number, 3600);
  sendVerificationSms(this.mobile.number, this, token);
  next();
});

/* check password */
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password.hash);
};

/*  this will add paginate function. */
userSchema.plugin(mongoosequery, { model: 'user' });
userSchema.plugin(mongoosastic, {
  esClient: esClient,
  populate: [{ path: '_favorites' }]
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);
module.exports = User;

/* sync with elastic */
const stream = User.synchronize();
let count = 0;

stream.on('data', function(err, doc) {
  count++;
});
stream.on('close', function() {
  console.log('indexed ' + count + ' user documents!');
});
stream.on('error', function(err) {
  console.log(err);
});
