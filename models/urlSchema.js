const mongoose = require("mongoose");


var Schema = mongoose.Schema;
/*Schema for URL,

| original_url(String) | short_url(String) |

*/
const url_schema = new Schema({
  original_url : String,
  short_url  : String
})



module.exports = mongoose.model('URL', url_schema);