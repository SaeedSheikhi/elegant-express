const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../user/user.model");
const shortid = require("shortid");
const mongoosequery = require("../plugins/mongoosequery");
const mongoosastic = require("mongoosastic");
const autopopulate = require("mongoose-autopopulate");
const MongoPaging = require("mongo-cursor-pagination");
import to from "../utils/to";
import { esClient } from "../index";

const invitationSchema = new Schema(
  {
    invitee: {
      id: {
        type: String,
        default: shortid.generate
      },
      _user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true,
        required: function() {
          return this.status === "consumed";
        }
      }
    },
    referrer: {
      id: {
        type: String,
        required: true
      },
      _user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true
      }
    },

    amount: {
      type: Number,
      required: function() {
        return this.status === "ready-to-claim" || this.status === "claimed";
      }
    },
    status: {
      type: String,
      enum: ["pending", "consumed", "ready-to-claim", "claimed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

invitationSchema.pre("save", async function(next) {
  if (this.isModified("referrer.id")) {
    const [err, user] = await to(User.get(this.referrer.id));
    if (err) return next(err);
    this.referrer._user = user._id;
  }

  return next();
});

invitationSchema.pre("save", async function(next) {
  if (!this.isModified("amount")) {
    return next();
  }
  const factor = Math.pow(10, 2);
  this.amount = Math.round(this.amount * factor) / factor;
  next();
});

invitationSchema.pre("save", async function(next) {
  if (!this.isModified("status")) {
    return next();
  }
  if (this.status === "claimed") {
    let [err, user] = await to(User.get(this.referrer.id));
    if (err) return next(err);

    user.balance += this.amount;
    [err] = await to(user.save());
    if (err) return next(err);
  }

  next();
});

invitationSchema.plugin(mongoosequery, { model: "invitation" });
invitationSchema.plugin(autopopulate);
invitationSchema.plugin(mongoosastic, {
  esClient: esClient,
  populate: [{ path: "referrer._user" }, { path: "invitee._user" }]
});

const Invitation = mongoose.model("Invitation", invitationSchema);
module.exports = Invitation;

/* sync with elastic */
const stream = Invitation.synchronize();
let count = 0;

stream.on("data", function(err, doc) {
  count++;
});
stream.on("close", function() {
  console.log("indexed " + count + " invitation documents!");
});
stream.on("error", function(err) {
  console.log(err);
});
