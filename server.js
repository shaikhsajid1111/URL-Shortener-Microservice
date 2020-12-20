const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const getMethod = require("./controller/get");
const postMethod = require("./controller/post")
const cors = require("cors");

const limiter = require("./validators/postLimiter"); 

const jsonParser = bodyParser.json()

app.use(jsonParser);
app.use(cors());

/*middleware for GET request*/
app.get("/:short_url?",jsonParser,getMethod.shortURLParse)

/*middleware for POST request*/
app.post("/new",jsonParser,limiter.postLimiter,postMethod.postURL)


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
