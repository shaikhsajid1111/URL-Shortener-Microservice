const mongoose = require("mongoose");

const URI = process.env.DB_URI;  /*.env file contains a variable name DB_URI which is the URL for database*/ 
/*connecting the database*/
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }); 

const connection = mongoose.connection;
/**if connection is failed*/
connection.on("error",() =>{
  console.log("Connection error")
})

/**if connection is successfully opened */
connection.on("open",() =>{
  console.log("Connection established!")
})


exports.databaseConnection = connection;