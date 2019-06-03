const APIError = require("../helpers/APIError");
const httpStatus = require("http-status");
const axios = require("axios");
import to from "../utils/to";
import { ipRegex, localhostRegex } from "../utils/regexp";

const getIp = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (!ipRegex.test(ip) || localhostRegex.test(ip))
    return next(
      new APIError("Ip address is not valid", httpStatus.BAD_REQUEST)
    );

  let [err, result] = await to(
    axios.get(`https://ip.briantafoya.com/${ip}/json`)
  );

  if (err) return res.status(400).send(err.response.data);
  res.status(200).send(result.data);
};

const postReverse = async (req, res) => {
  let [err, result] = await to(axios(req.body));
  if (err) return res.status(400).send(err.response.data);

  res.status(200).send(result.data);
};

module.exports = {
  getIp,
  postReverse
};
