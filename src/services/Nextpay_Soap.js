const soap = require("soap");

class Nextpay_Soap {
  /**
   * Get the API Key
   * @param {string} api_key Your gateway API Key.
   * @throws Will throw an err if the API isn't string.
   */
  constructor(api_key) {
    if (api_key != "" && typeof api_key === "string") {
      this.api_key = api_key;
      this.sendEndPoint = "https://api.nextpay.org/gateway/token.wsdl";
      this.verifyEndPoint = "https://api.nextpay.org/gateway/verify.wsdl";
      this.gateway = "https://api.nextpay.org/gateway/payment";
    } else
      throw new Error(
        "You must pass your Nextpay.ir API Key to the constructor."
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
    const { amount, callback_uri } = argus;
    return new Promise((resolve, reject) => {
      if (typeof amount !== "number" || amount < 100)
        throw new Error(
          "Transaction's amount must be a number and equal/greater than 100"
        );
      else if (typeof callback_uri !== "string" || callback_uri.length < 5)
        throw new Error("Callback (callback_uri) URL must be a string.");
      else if (callback_uri.slice(0, 4) != "http")
        throw new Error("Callback URL must start with http/https");

      var payload = {
        api_key: this.api_key,
        ...argus
      };
      soap.createClient(this.sendEndPoint, (err, client) => {
        client.TokenGenerator(payload, (err, result) => {
          if (result.TokenGeneratorResult.code == -1) {
            resolve(`${this.gateway}/${result.TokenGeneratorResult.trans_id}`);
          } else {
            reject("Err: " + result.TokenGeneratorResult.code);
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

module.exports = Nextpay_Soap;
