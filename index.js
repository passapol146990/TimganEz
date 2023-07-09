const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/router')
const cookieParser = require('cookie-parser')


app.set('views',path.join(__dirname,'views'))
app.set('view engin','ejs')


app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(router)
app.use(express.static(path.join(__dirname,'/pubic')))

app.listen(8080,()=>{
    console.log('start web')
})

module.exports = app