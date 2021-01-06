const express = require('express');
const validUrl = require("valid-url");  /*external library to check if the url is valid*/ 
const shortId = require("shortid");   /*external library to generate unique shortID */ 

const URL = require("../models/urlSchema"); /*defined in models/urlSchema */ 




const connection = require("../models/connection")

const databaseConnection = connection.databaseConnection;





/*POST request route for /new*/ 
const postURL = async (req,res) =>{

  const url = req.body.url    /*parse the body of the request and fetch URL attribute from that*/ 
    
  /**check if the passed url is valid */
  if (!validUrl.isWebUri(url)) {
    /**if it is not valid than just send the invalid URL json response */
    res.json({
      error: 'Invalid URL'
    })
  } else {
      
    try {
      // check if its already in the database
      let findOne = await URL.findOne({
        original_url: url
      })
      /**if its already there in database than just fetch the shortID and url from the database and send the JSON request */
      if (findOne) {
        res.json({
          original_url: findOne.original_url,
          short_url: `elfinsurl.tk/${findOne.short_url}`
        })
      } else {
        /**if URL is valid and does not exists in database */
        const urlCode = shortId.generate()    /**generate a shortID for that URL */
        /**create a new instance of URL model*/
        let newOne = new URL({
          original_url: url,
          short_url: `elfinsurl.tk/${urlCode}`
        })
        /**save it to database */
        await newOne.save()
        
        /**send the shortID and the original URL to the user */
        res.json({
          original_url: newOne.original_url,
          short_url: `elfinsurl.tk/${newOne.short_url}`
        })
      }
      
    } catch (err) {
      /**if any unknown error occured than show the log and send the server  */
      console.error(err)
      res.json({
      error : "Server Error"
    })
    }
  }  
}


exports.postURL = postURL;