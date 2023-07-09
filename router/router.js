const express = require('express')
const router = express.Router()

const admin = require('firebase-admin');
const serviceAccount = require('../mywebez-3f338-firebase-adminsdk-warup-6727451858.json');

let datapass = {}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
let sessions = {
  title:'',
  data:'',
  name:'',
  username:'',
  inout:''
}
router.get('/',async (req,res)=>{
    // snapshot = await db.collection('data').get();
    // data = snapshot.docs.map(doc => doc.data());
    // data.forEach((e)=>{
    //   datapass[e.username] = {password:e.password,name:e.name}
    // })
    if(req.cookies.login){
      sessions.data = data
      sessions.name = datapass[req.cookies.username].name
      sessions.username = req.cookies.username
      sessions.inout = '<a class="btn btn-outline-danger" href="/logout">ออกจากระบบ</a>'
    }else{
      sessions.name = ''
      sessions.username = ''
      sessions.data = ''
      sessions.inout = '<a class="btn btn-outline-light" href="/loginform">เข้าสู่ระบบ</a>'
    }
    res.render('index.ejs',{sessions:sessions})
})

router.get('/loginform',(req,res)=>{
  sessions.title = ''
  res.render('loginform.ejs',{sessions:sessions})
})

router.get('/logout',(req,res)=>{
  sessions.name = ''
  sessions.username = ''
  sessions.data = ''
  res.clearCookie('login')
  res.clearCookie('username')
  res.redirect('/')
})

router.post('/login',async (req,res)=>{
  snapshot = await db.collection('data').get();
  data = snapshot.docs.map(doc => doc.data());
  data.forEach((e)=>{
    datapass[e.username] = {password:e.password,name:e.name}
  })
  const user1 = req.body.username
  const pass1 = req.body.password
  const timeExpires = 250000

  if(user1.length > 0 && pass1.length > 0){
   let user2 = datapass[user1]
   if (user2 === undefined){
    res.render('err.ejs',{err:"พบไม่บัญชีของท่านในระบบ กรุณาสมัครบัญชี"})
   }else{
    console.log(pass1,user2.password)
    if(pass1 === user2.password){
      sessions.title = '<li class="mx-3 text-success">เข้าสู่ระบบเรียบร้อย</li>'
      res.cookie('username',user1,{maxAge:timeExpires})
      res.cookie('login',true,{maxAge:timeExpires})
      res.redirect('/')
    }else{
      sessions.inout = '<a class="btn btn-outline-light" href="/loginform">เข้าสู่ระบบ</a>'
      sessions.title = '<li class="mx-3 text-danger">รหัสผ่านของท่านไม่ถูกต้อง</li>'
      res.render('loginform.ejs',{sessions:sessions})    
    }
   }
  }else{
    res.redirect('/loginform')
  }
})

module.exports = router