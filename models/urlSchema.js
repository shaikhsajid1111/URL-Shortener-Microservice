const mongoose = require("mongoose");


var Schema = mongoose.Schema;

const url_schema = new Schema({
  original_url : String,
  short_url  : String
})



module.exports = mongoose.model('URL', url_schema);