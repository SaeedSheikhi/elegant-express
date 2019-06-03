module.exports = function verificationRequestTemplate(token) {
  return 'كد فعالسازی اکانت شما: ' + token.code + '\n\n';
};
