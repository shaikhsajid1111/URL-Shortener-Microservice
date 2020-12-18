// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const route = require("./routes/index");
const cors = require("cors");



app.use(bodyParser.json());
app.use(cors());

/*middleware for GET request*/
app.use("/",route)


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
