const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_URI = "https://script.google.com/macros/s/AKfycbwiuIL-zSxn4SjDXaRp9Y0lT--e-Xsl0INTEyCQgUAyxcWxjjWxUTzaumIlJorBa-ZOuA/exec"

router.get('/',async (req,res)=>{
  res.render('index.ejs',{API_URI});
})

module.exports = router