module.exports = function successfulCharge(user, receipt) {
  return (
    'سلام ' +
    user.profile.name.first +
    ' عزیز' +
    '\n' +
    'مبلغ ' +
    receipt.amount +
    ' ریال با موفقیت پرداخت شد.' +
    '\n' +
    'کد تراکنش شما:' +
    '\n' +
    receipt.id +
    '.' +
    receipt.transId +
    '\n' +
    'فاکتور و اطلاعات تکمیلی برای شما ایمیل شد.'
  );
};
