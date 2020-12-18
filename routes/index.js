const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const shortId = require("shortid");

const URL = require("../models/urlSchema");

const rateLimiter = require("express-rate-limit");

const URI = process.env.DB_URI;
/*connecting the database*/
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }); 

const connection = mongoose.connection;
connection.on("error",() =>{
  console.log("Connection error")
})

connection.on("open",() =>{
  console.log("Connection established!")
})


router.get("/:short_url?",async (req,res,next) =>{
  try{
      
      const url_params = await URL.findOne({short_url : req.params.short_url});
    
    if(url_params){
      return res.redirect(url_params.original_url)
    }
    else{
      return res.json("No URL found")
    }
    
  }
  catch(err){
    console.log(err)
    res.json({
      error : "Server Error"
    })
  }
})




/*if gets more than 5 request in a single minute*/
const postLimiter = rateLimiter({
  windowMs : 1 * 60 * 1000,   /*one minute*/
  max : 10,
  message : "Only 10 post request per minute is allowed!"
})

router.post("/new", postLimiter,async (req,res,next) =>{
  console.log(req.body)
  console.log("reached")
  const url = req.body.url
  const urlCode = shortId.generate()
  
  if (!validUrl.isWebUri(url)) {
    res.json({
      error: 'Invalid URL'
    })
  } else {
    try {
      // check if its already in the database
      let findOne = await URL.findOne({
        original_url: url
      })
      if (findOne) {
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url
        })
      } else {
        
        let newOne = new URL({
          original_url: url,
          short_url: urlCode
        })
        await newOne.save()
        res.json({
          original_url: newOne.original_url,
          short_url: newOne.short_url
        })
      }
    } catch (err) {
      console.error(err)
      res.json('Server erorr...')
    }
  }  
})


module.exports = router;