const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const authLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  message: "ERROR/AUTH_RATE_LIMITED"
  // message: "Too many request, please try again in 30 minutes"
});

const formLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "ERROR/FORM_RATE_LIMITED"
  // message: "Too many request, please try again in 5 minutes"
})

const fileLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: "Too many request, please try uploading your file(s) again in 5 minutes"
})

const speedLimiter = (minutes) => slowDown({
  windowMs: minutes * 60 * 1000,
  delayAfter: 1,
  delayMs: 500
});

module.exports = { authLimiter, fileLimiter, formLimiter, speedLimiter }