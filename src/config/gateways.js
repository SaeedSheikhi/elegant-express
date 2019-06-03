const Payir = require('../services/Payir');
const Nextpay_Soap = require('../services/Nextpay_Soap');
const Zarinpal = require('../services/ZarinPal');

module.exports = {
  payir: new Payir(process.env.PAYIR_KEY),
  nextpay: new Nextpay_Soap(process.env.NEXTPAY_KEY),
  zarinpal: Zarinpal.create(
    process.env.ZARINPAL_KEY,
    process.env.NODE_ENV === 'development'
  )
};
