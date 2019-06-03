require("babel-polyfill");
require("./config/dotenv").config();
require("./config/cron");
require("./services/Email");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const APIError = require("./helpers/APIError");
const qs = require("./config/MongoQS");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const expressWinston = require("express-winston");
const expressValidation = require("express-validation");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const helmet = require("helmet");
const redis = require("redis");
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
const elasticsearch = require("elasticsearch");
const esClient = new elasticsearch.Client({
  host: process.env.ELASTIC_URL,
  pingTimeout: 30000,
  requestTimeout: 30000,
  log: "trace"
});
const lodash = require("lodash");
const { promisify } = require("util");
const assert = require("assert");
const winstonInstance = require("./config/winston");

import to from "./utils/to";

const MongoURL = process.env.MONGO_URL;
mongoose.Promise = Promise;

/* config mongo */
mongoClient.connect(MongoURL, { useNewUrlParser: true }, (err, database) => {
  assert.equal(null, err);
  console.log("mongodb connected...");
  exports.db = database;
});

/* config redis */
redisClient.on("connect", async () => {
  console.log("redis connected...");

  exports.redisClient = redisClient;
  exports.redisHMGETAsync = promisify(redisClient.hmget).bind(redisClient);
  exports.redisHMGETALLAsync = promisify(redisClient.hgetall).bind(redisClient);
  exports.redisSetAsync = promisify(redisClient.set).bind(redisClient);
  exports.redisGetAsync = promisify(redisClient.get).bind(redisClient);
  exports.redisScan = promisify(redisClient.scan).bind(redisClient);

  let cursor = "0",
    err = null,
    result = null;
  const redisScan = promisify(redisClient.scan).bind(redisClient);

  do {
    [err, result] = await to(redisScan(cursor));
    if (err) console.log(err);
    cursor = result[0];
    console.log(result[1]);
  } while (cursor !== "0");
  redisClient.scan(cursor, (err, res) => {
    console.log(err, res);
  });
});

esClient.ping({}, function(error) {
  if (error) {
    console.log(error);
    console.log("elasticsearch cluster is down!");
  } else {
    console.log("elasticsearch is well");
    exports.esClient = esClient;
  }
});

/* config mongoose */
mongoose.connect(MongoURL, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// models initialization
require("./user/user.model");
require("./invitation/invitation.model");
require("./receipt/receipt.model");

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
/* secure apps by setting various HTTP headers */
app.use(helmet());
/* enable CORS - Cross Origin Resource Sharing */
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(qs());
app.use(expressValidator());

/* enable detailed API logging in dev env */
if (process.env.NODE_ENV === "development") {
  expressWinston.requestWhitelist.push("body");
  expressWinston.responseWhitelist.push("body");

  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: false, // optional: log meta data about request (defaults to true)
      msg:
        "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
      colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  );
}

app.use("/", require("./index.route"));

/* if error is not an instanceOf APIError, convert it. */
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    /* validation error contains errors which is an array of error each containing message[] */
    const unifiedErrorMessage = err.errors
      .map(error => error.messages.join(". "))
      .join(" and ");
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

/* catch 404 and forward to error handler */
app.use((req, res, next) => {
  const err = new APIError("API not found", httpStatus.NOT_FOUND);
  return next(err);
});

/* log error in winston transports except when executing test suite */
if (process.env.NODE_ENV !== "test") {
  app.use(
    expressWinston.errorLogger({
      winstonInstance
    })
  );
}

/* error handler, send stacktrace only during development */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: process.env.NODE_ENV === "development" ? err.stack : {}
  });
});

app.listen(process.env.PORT || 5000);
module.exports = app;
