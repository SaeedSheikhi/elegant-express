module.exports = function resetPasswordRequestTemplate(user, token) {
  return (
    'سلام ' +
    user.profile.name.first +
    ' عزیز' +
    '\n' +
    'اخیرا شما برای بازنشانی رمز عبور خود درخواستی داده‌اید،' +
    '\n' +
    'کد شما: ' +
    token.code
  );
};
