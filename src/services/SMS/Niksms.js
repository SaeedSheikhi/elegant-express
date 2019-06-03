const soap = require("soap");

class Niksms {
  /**
   * Get the API Key
   * @param {string} api_key Your gateway API Key.
   * @throws Will throw an err if the API isn't string.
   */
  constructor(username, password) {
    if (
      username != "" &&
      typeof username === "string" &&
      password != "" &&
      typeof password === "string"
    ) {
      this.username = username;
      this.password = password;
      this.url = "http://niksms.com:1370/NiksmsWebservice.svc?wsdl";
    } else
      throw new Error(
        "You must pass your niksms.ir username and password to the constructor."
      );
  }

  /**
   * Build and prepare transaction URL
   * @param {number} amount Transaction's Amount
   * @param {string} callback_uri User will callback_uri to this URL to check transaction code
   * @param {string} order_id order_id Order ID or Invoice Number
   * @throws Will throw an err if URL building isn't successful.
   */
  send(argus) {
    const { to, message, flash = false } = argus;
    return new Promise((resolve, reject) => {
      const payload = {
        security: {
          Username: this.username,
          Password: this.password
        },
        model: {
          Message: [{ string: message }],
          SenderNumber: "blacklist",
          Numbers: [
            {
              string:
                process.env.NODE_ENV === "development" ? "09021210902" : to
            }
          ],
          SendType: flash ? "Flash" : "Normal"
        }
      };
      soap.createClient(this.url, (err, client) => {
        client.PtpSms(payload, (err, result) => {
          if (err) {
            reject(err);
          } else if (result.PtpSmsResult.Status == "Successful") {
            resolve(result.PtpSmsResult);
          } else {
            reject("Err: " + result.PtpSmsResult.Status);
          }
        });
      });
    });
  }

  /**
   * verify transaction
   * @param {number} amount Transaction's Amount
   * @param {string} order_id User will callback_uri to this URL to check transaction code
   * @param {string} trans_id order_id Order ID or Invoice Number
   * @throws Will throw an err if URL building isn't successful.
   */
  verify(argus) {
    let { trans_id, order_id } = argus;
    return new Promise((resolve, reject) => {
      if (!trans_id) throw new Error("Transaction ID is not valid.");
      if (!order_id) throw new Error("Order ID is not valid.");

      // trans_id and order_id will POST to callback_uri
      var payload = {
        api_key: this.api_key,
        ...argus
      };
      soap.createClient(this.verifyEndPoint, (err, client) => {
        console.log(err, "line 75");
        client.PaymentVerification(payload, (err, result) => {
          console.log(err, "line 77");
          if (result.PaymentVerificationResult.code == 0) {
            resolve({
              ...argus,
              code: result.PaymentVerificationResult.code
            });
          } else {
            reject({ ...argus, code: result.PaymentVerificationResult.code });
          }
        });
      });
    });
  }
}

exports.create = function(username, password) {
  return new Niksms(username, password);
};
