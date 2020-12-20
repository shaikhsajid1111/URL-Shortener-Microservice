const express = require('express');

const URL = require("../models/urlSchema"); /*defined in models/urlSchema */ 


const connection = require("../models/connection")

const databaseConnection = connection.databaseConnection;

/*routes for domain/:shortID /:short_url?*/ 
const shortURLParse = async(req,res) => {
  try{
      /**try to make query to find if shortID exists in database*/  
      const url_params = await URL.findOne({short_url : req.params.short_url});
    
    if(url_params){
      /**if  it exists than fetch the original url of that shortID and redirect user to original url*/
      return res.redirect(url_params.original_url)
    }
    else{
      /**if it does not exists than send JSON response of failure */
      return res.json("No URL found")
    }
    
  }
  catch(err){
    /**if any unknown error ocuured,log that into console and send user that it is server error */
    console.log(err)
    res.json({
      error : "Server Error"
    })
  }
}


exports.shortURLParse = shortURLParse;
