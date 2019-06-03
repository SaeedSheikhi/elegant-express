const MongoQS = require('mongo-querystring');

const qs = function() {
  const parser = new MongoQS({
    string: {
      toNumber: false
    },
    custom: {
      /* remove next query param if it not valid */
      next: function(query, input) {
        if (!input || input == 0) return;
        else query['next'] = input;
      },
      previous: function(query, input) {
        if (!input || input == 0) return;
        else query['previous'] = input;
      }
    }
  });
  return (req, res, next) => {
    // console.log('before', req.query);
    req.query = parser.parse(req.query);
    // console.log('after', req.query);
    next();
  };
};

module.exports = qs;
