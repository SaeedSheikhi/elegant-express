const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosequery = require('../plugins/mongoosequery');
const shortid = require('shortid');
const mongoosastic = require('mongoosastic');
const autopopulate = require('mongoose-autopopulate');
import { esClient } from '../index';

const receiptSchema = new Schema(
  {
    id: {
      type: String,
      default: shortid.generate
    },
    transId: {
      type: String,
      required: true
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'failed', 'done', 'canceled', 'mismatch'],
      default: 'pending'
    },
    gateway: String,
    description: String,
    cardNumber: String,
    traceNumber: String,
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

receiptSchema.plugin(mongoosequery, { model: 'receipt' });
receiptSchema.plugin(autopopulate);
receiptSchema.plugin(mongoosastic, {
  esClient: esClient,
  populate: [{ path: '_user' }]
});

/**
 * @typedef Receipt
 */

const Receipt = mongoose.model('Receipt', receiptSchema);
module.exports = Receipt;

/* sync with elastic */
const stream = Receipt.synchronize();
let count = 0;

stream.on('data', function(err, doc) {
  count++;
});
stream.on('close', function() {
  console.log('indexed ' + count + ' receipt documents!');
});
stream.on('error', function(err) {
  console.log(err);
});
