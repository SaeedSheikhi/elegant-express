const nodemailer = require("nodemailer");
const User = require("../../user/user.model");
const Template = require("./Template");
var transporter = nodemailer.createTransport(
  {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // use TLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  },
  {
    from: "anardoni <no-reply@Anardoni.com>"
  }
);

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

class Email {
  constructor(to, user) {
    this.to = to;
    this.user = user;
  }
  static async build(to) {
    if (to && to != "" && typeof to === "string") {
      const user = await User.lookup({ "emails.primary.address": to });
      return new Email(to, user);
    } else {
      throw new Error(
        "You must pass a valid email address to the class builder."
      );
    }
  }

  verificationRequest(token) {
    transporter.sendMail(
      {
        to: this.to,
        subject: "verify your email address",
        html: Template.verificationRequest(this.user, token)
      },
      function(err) {
        if (err) console.log(err);
      }
    );
  }

  resetPasswordRequest(token) {
    transporter.sendMail(
      {
        to: this.to,
        subject: "reset your account",
        html: Template.resetPasswordRequest(this.user, token)
      },
      function(err) {
        if (err) console.log(err);
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

module.exports = Email;
