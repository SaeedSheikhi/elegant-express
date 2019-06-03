const User = require("../../user/user.model");
const Template = require("./Template");
const Kavenegar = require("kavenegar").KavenegarApi({
  apikey: process.env.KAVENEGAR_KEY
});
const Niksms = require("./Niksms").create(
  process.env.NIKSMS_USERNAME,
  process.env.NIKSMS_PASSWORD
);

class SMS {
  constructor(to, user) {
    this.to = to;
    this.user = user;
  }
  static async build(to) {
    if (to && to != "" && typeof to === "string") {
      const user = await User.lookup({ "mobile.number": to });
      return new SMS(to, user);
    } else {
      throw new Error(
        "You must pass a valid phone number to the class builder."
      );
    }
  }

  verificationRequest(token) {
    Kavenegar.VerifyLookup(
      {
        receptor: this.to,
        token: token.code,
        template: "verificationRequest"
      },
      (response, status) => {
        if (status !== 200) {
          Niksms.send({
            to: this.to,
            message: Template.verificationRequest(token)
          })
            .then(res => {
              //RecId or Error Number
            })
            .catch(err => {
              //
            });
        }
      }
    );
  }
  resetPasswordRequest(token) {
    Kavenegar.VerifyLookup(
      {
        receptor: this.to,
        token: token.code,
        template: "resetPasswordRequest"
      },
      (response, status) => {
        if (status !== 200) {
          Niksms.send({
            to:
              this.to,
            message: Template.resetPasswordRequest(this.user, token)
          })
            .then(res => {
              //RecId or Error Number
            })
            .catch(err => {
              //
            });
        }
      }
    );
  }
  chargeWasSuccessful(receipt) {
    Niksms.send({
      to: this.to,
      message: Template.successfulChargeTemplate(this.user, receipt)
    })
      .then(res => {
        //RecId or Error Number
      })
      .catch(err => {
        //
      });
  }
}

module.exports = SMS;
