import axios from "axios";

class Nextpay {
  /**
   * Get the API Key
   * @param {string} api_key Your gateway API Key.
   * @throws Will throw an err if the API isn't string.
   */
  constructor(api_key) {
    if (api_key != "" && typeof api_key === "string") {
      this.api_key = api_key;
      this.sendEndPoint = "http://api.nextpay.org/gateway/token.http";
      this.verifyEndPoint = "http://api.nextpay.org/gateway/verify.http";
      this.gateway = "http://api.nextpay.org/gateway/payment";
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
      axios
        .post(this.sendEndPoint, {
          api_key: this.api_key,
          ...argus
        })
        .then(res => {
          if (typeof res.data != "undefined" && res.data.code != -1)
            reject(res.data);
          else resolve(`${this.gateway}/${res.data.trans_id}`);
        })
        .catch(err => {
          reject(err);
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

      axios
        .post(this.verifyEndPoint, { api_key: this.api_key, ...argus })
        .then(res => {
          if (typeof res.data != "undefined" && res.data.code != 0)
            reject(res.data);
          resolve({
            ...argus,
            code: res.data.code
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = Nextpay;
