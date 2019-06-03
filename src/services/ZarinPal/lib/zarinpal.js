import axios from 'axios';
const config = require('./config');

/**
 * Constructor for ZarinPal object.
 * @param {String} MerchantID
 * @param {bool} sandbox
 */
function ZarinPal(MerchantID, sandbox) {
  if (
    typeof MerchantID === 'string' &&
    MerchantID.length === config.merchantIDLength
  ) {
    this.merchant = MerchantID;
  } else {
    console.error(
      'The MerchantID must be ' + config.merchantIDLength + ' Characters.'
    );
    return false;
  }
  this.sandbox = sandbox || false;

  this.url = sandbox === true ? config.sandbox : config.https;
}

/**
 * Get Authority from ZarinPal
 * @param  {number} Amount [Amount on Tomans.]
 * @param  {String} CallbackURL
 * @param  {String} Description
 * @param  {String} Email
 * @param  {String} Mobile
 */
ZarinPal.prototype.PaymentRequest = function(input) {
  var self = this;

  var params = {
    MerchantID: self.merchant,
    Amount: input.Amount,
    CallbackURL: input.CallbackURL,
    Description: input.Description,
    Email: input.Email,
    Mobile: input.Mobile
  };

  var promise = new Promise(function(resolve, reject) {
    axios
      .post(self.url + config.API.PR, params)
      .then(function({ data }) {
        resolve({
          status: data.Status,
          authority: data.Authority,
          url: config.PG(self.sandbox) + data.Authority
        });
      })
      .catch(function(err) {
        reject(err.message);
      });
  });

  return promise;
};

/**
 * Validate Payment from Authority.
 * @param  {number} Amount
 * @param  {String} Authority
 */
ZarinPal.prototype.PaymentVerification = function(input) {
  var self = this;
  var params = {
    MerchantID: self.merchant,
    Amount: input.Amount,
    Authority: input.Authority
  };

  var promise = new Promise(function(resolve, reject) {
    axios
      .post(self.url + config.API.PV, params)
      .then(function({ data }) {
        resolve({
          status: data.Status,
          RefID: data.RefID
        });
      })
      .catch(function(err) {
        reject(err.message);
      });
  });

  return promise;
};

/**
 * Get Unverified Transactions
 * @param  {number} Amount
 * @param  {String} Authority
 */
ZarinPal.prototype.UnverifiedTransactions = function() {
  var self = this;
  var params = {
    MerchantID: self.merchant
  };

  var promise = new Promise(function(resolve, reject) {
    axios
      .post(self.url + config.API.UT, params)
      .then(function({ data }) {
        resolve({
          status: data.Status,
          authorities: data.Authorities
        });
      })
      .catch(function(err) {
        reject(err.message);
      });
  });

  return promise;
};

/**
 * Refresh Authority
 * @param  {number} Amount
 * @param  {String} Authority
 */
ZarinPal.prototype.RefreshAuthority = function(input) {
  var self = this;
  var params = {
    MerchantID: self.merchant,
    Authority: input.Authority,
    ExpireIn: input.Expire
  };

  var promise = new Promise(function(resolve, reject) {
    axios
      .post(self.url + config.API.RA, params)
      .then(function({ data }) {
        resolve({
          status: data.Status
        });
      })
      .catch(function(err) {
        reject(err.message);
      });
  });

  return promise;
};

/**
 * Remove EXTRA ooooo!
 * @param {number} token [API response Authority]
 */
ZarinPal.prototype.TokenBeautifier = function(token) {
  return token.split(/\b0+/g);
};

/**
 * Create ZarinPal object. Wrapper around constructor.
 */
exports.create = function(MerchantID, sandbox) {
  return new ZarinPal(MerchantID, sandbox);
};
