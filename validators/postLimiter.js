const rateLimiter = require("express-rate-limit");  /*external library to rate limits number of requests,
to avoid DDoS */

const postLimiter = rateLimiter({
  /**if 
   * request exceed 10 times within a single minute than, restrict the user to stop
   */
  windowMs : 1 * 60 * 1000,   /*one minute*/
  max : 10,     /**number of request per windowMs i.e in 1 minute */
  message : "Only 10 post request per minute is allowed!"
})



exports.postLimiter = postLimiter;