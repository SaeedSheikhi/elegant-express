const lodash = require('lodash');

const customizer = (oldValue, newValue) => {
  if (lodash.isArray(oldValue)) return newValue;
};


module.exports = customizer;