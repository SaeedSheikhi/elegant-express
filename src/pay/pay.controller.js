const shortid = require("shortid");
const User = require("../user/user.model");
const Receipt = require("../receipt/receipt.model");
const gateways = require("../config/gateways");
import to from "../utils/to";

const failed = async (receipt, res, next) => {
  receipt.status = "failed";
  let err;
  [err] = await to(receipt.save());
  if (err) return next(err);


  res.redirect(process.env.FAILED_PAYMENT_ENDPOINT);
};
const mismatch = async (receipt, res, next) => {
  receipt.status = "mismatch";
  let err;
  [err] = await to(receipt.save());
  if (err) return next(err);

  res.redirect(process.env.MISMATCH_PAYMENT_ENDPOINT);
};
const canceled = async (receipt, res, next) => {
  receipt.status = "canceled";
  let err;
  [err] = await to(receipt.save());
  if (err) return next(err);

  res.redirect(process.env.CANCELED_PAYMENT_ENDPOINT);
};
const done = async (receipt, res, next) => {
  receipt.status = "done";
  let err;
  let user;
  [err] = await to(receipt.save());
  if (err) return next(err);

  [err, user] = await to(User.get(receipt._user))
  if (err) return next(err)

  user.balance += receipt.amount;
  [err] = await to(user.save())
  if (err) return next(err)

  res.redirect(process.env.DONE_PAYMENT_ENDPOINT);
};

const initialization = {
  async payir(req, res, next) {
    const amount = Number(req.query.amount);
    let err;
    let link;
    let transId;

    /* add new receipt to user document */
    let receipt = {
      id: shortid.generate(),
      amount: amount,
      description: req.query.description,
      _user: (req.user && req.user._id) || req.query._user,
      gateway: "payir",
      status: "pending"
    };

    /* request new gateway */
    [err, link] = await to(
      gateways.payir.send({
        amount,
        redirect: `${process.env.API_URL}/pay/verify?gateway=payir`,
        factorNumber: receipt.id
      })
    );
    if (err) return next(err);

    /* add transId to receipt */
    transId = link.slice(link.lastIndexOf("/") + 1);
    receipt.transId = Number(transId);
    receipt = new Receipt(receipt);
    [err] = await to(receipt.save());
    if (err) return next(err);

    res.status(200).send(link);
  },
  async zarinpal(req, res, next) {
    const amount = Number(req.query.amount);
    let err;
    let transId;
    let result;

    /* add new receipt to user document */
    let receipt = {
      id: shortid.generate(),
      amount: amount,
      description: req.query.description,
      _user: (req.user && req.user._id) || req.query._user,
      gateway: "zarinpal",
      status: "pending"
    };

    /* request new gateway */
    [err, result] = await to(
      gateways.zarinpal.PaymentRequest({
        Amount: amount,
        CallbackURL: `${process.env.API_URL}/pay/verify?gateway=zarinpal`,
        Description: req.query.description
      })
    );
    if (err) return next(err);
    const link = result.url;

    /* add transId to receipt */
    transId = link.slice(link.lastIndexOf("/") + 1);
    receipt.transId = transId;
    receipt = new Receipt(receipt);
    [err] = await to(receipt.save());
    if (err) return next(err);

    res.status(200).send(link);
  },
  async nextpay(req, res, next) {
    const amount = Number(req.query.amount);
    let err;
    let link;
    let transId;

    /* add new receipt to user document */
    let receipt = {
      id: shortid.generate(),
      amount: amount,
      description: req.query.description,
      _user: (req.user && req.user._id) || req.query._user,
      gateway: "nextpay",
      status: "pending"
    };

    /* request new gateway */
    [err, link] = await to(
      gateways.nextpay.send({
        amount,
        callback_uri: `${process.env.API_URL}/pay/verify?gateway=nextpay`,
        order_id: receipt.id
      })
    );
    if (err) return next(err);

    /* add transId to receipt */
    transId = link.slice(link.lastIndexOf("/") + 1);
    receipt.transId = transId;
    receipt = new Receipt(receipt);

    [err] = await to(receipt.save());
    if (err) return next(err);

    res.status(200).send(link);
  }
};
const verification = {
  async payir(req, res, next) {
    let err;
    let result;
    let receipt;
    let user;

    [err, receipt] = await to(
      Receipt.lookup({
        id: req.body.factorNumber,
        lean: false,
        population: "_user"
      })
    );
    if (err) next(err);

    /* check whether user paid money or not */
    if (Number(req.body.status) !== 1) return canceled(receipt, res, next);

    /* verify transaction, results schema is {...req.body, transId, amount } */
    [err, result] = await to(gateways.payir.verify(req.body));
    /* money will be backed to user within 30 minutes */
    if (err) return mismatch(receipt, res, next);

    /* payment was successful */
    [err, user] = await to(User.get(receipt._user));
    if (err) return failed(receipt, res, next);

    receipt.cardNumber = req.body.cardNumber;
    receipt.traceNumber = req.body.traceNumber;
    return done(receipt, res, next);
  },
  async zarinpal(req, res, next) {
    let err;
    let receipt;
    let result;
    let user;

    [err, receipt] = await to(
      Receipt.lookup({
        transId: req.query.Authority,
        lean: false,
        population: "_user"
      })
    );
    if (err) next(err);

    /* check whether user paid money or not */
    if (req.query.Status === "NOK") return canceled(receipt, res, next);

    /* verify transaction, results schema is {status: data.Status, RefID: data.RefID } */
    [err, result] = await to(
      gateways.zarinpal.PaymentVerification({
        Amount: receipt.amount,
        Authority: req.query.Authority
      })
    );
    if (result.status == -21) return canceled(receipt, res, next);
    /* money will be backed to user within 30 minutes */
    if (err || result.status !== 100) return mismatch(receipt, res, next);

    /* payment was successful */
    [err, user] = await to(User.get(receipt._user));
    if (err) return failed(receipt, res, next);

    receipt.traceNumber = req.body.refId;
    return done(receipt, res, next);
  },
  async nextpay(req, res, next) {
    const { order_id, trans_id } = req.body;

    let err;
    let result;
    let receipt;
    let user;

    [err, receipt] = await to(
      Receipt.lookup({
        id: order_id,
        transId: trans_id,
        lean: false,
        population: "_user"
      })
    );
    if (err) next(err);

    /* verify transaction, results schema is {...req.body, transId, amount } */
    [err, result] = await to(
      gateways.nextpay.verify({ ...req.body, amount: receipt.amount })
    );
    /* check whether user paid money or not */
    if (err && Number(err.code) != 0) return canceled(receipt, res, next);
    /* money will be backed to user within 30 minutes */
    if (err) return mismatch(receipt, res, next);

    /* payment was successful */
    [err, user] = await to(User.get(receipt._user));
    if (err) return failed(receipt, res, next);

    receipt.cardNumber = req.body.cardHolder;
    return done(receipt, res, next);
  }
};

const getPay = async (req, res, next) => {
  const { gateway = "zarinpal" } = req.query;
  return initialization[gateway](req, res, next);
};

const postVerify = async (req, res, next) => {
  const { gateway = "zarinpal" } = req.query;
  return verification[gateway](req, res, next);
};

module.exports = {
  getPay,
  postVerify
};
