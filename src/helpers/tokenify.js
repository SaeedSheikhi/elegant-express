const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const randomstring = require('randomstring');

export default () => {
  return {
    code: randomstring.generate({
      length: 6,
      charset: 'numeric'
    }),
    query: crypto
      .randomBytes(Math.ceil((46 / 4) * 3))
      .toString('base64')
      .replace(/=+$/g, '')
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
      .substr(0, 46)
  };
};
