import axios from "axios";

class Payir {
  /**
   * Get the API Key
   * @param {string} api Your gateway API Key.
   * @throws Will throw an error if the API isn't string.
   */
  constructor(api) {
    if (api != "" && typeof api === "string") {
      this.api = api;
      this.sendEndPoint = "https://pay.ir/payment/send";
      this.verifyEndPoint = "https://pay.ir/payment/verify";
      this.gateway = "https://pay.ir/payment/gateway";
    } else
      throw new Error("You must pass your Pay.ir API Key to the constructor.");
  }

  /**
   * Build and prepare transaction URL
   * @param {number} amount Transaction's Amount
   * @param {string} redirect User will redirect to this URL to check transaction status
   * @param {string} [factorNumber] factorNumber Order ID or Invoice Number
   * @param {string} [mobileNumber] phone number
   * @throws Will throw an error if URL building isn't successfull.
   */
  send(argu) {
    const { amount, redirect } = argu;
    return new Promise((resolve, reject) => {
      if (typeof amount !== "number" || amount < 1000)
        throw new Error(
          "Transaction's amount must be a number and equal/greater than 1000"
        );
      else if (typeof redirect !== "string" || redirect.length < 5)
        throw new Error("Callback (redirect) URL must be a string.");
      else if (redirect.slice(0, 4) != "http")
        throw new Error("Callback URL must start with http/https");
      axios
        .post(this.sendEndPoint, { api: this.api, ...argu })
        .then(response => {
          if (typeof response.data != "undefined" && response.data.status != 1)
            reject(response.data);
          else resolve(`${this.gateway}/${response.data.transId}`);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   *
   * @param {Object} req Your webframework POST body/payload
   */
  verify(requestBody) {
    let transId = parseInt(requestBody.transId);
    return new Promise((resolve, reject) => {
      if (!transId || typeof transId !== "number")
        throw new Error("Transaction ID is not valid.");
      axios
        .post(this.verifyEndPoint, { api: this.api, transId })
        .then(response => {
          if (typeof response.data != "undefined" && response.data.status != 1)
            reject(response.data);
          resolve({
            ...requestBody,
            amount: response.data.amount,
            transId
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

module.exports = Payir;
