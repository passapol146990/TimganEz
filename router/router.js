const express = require('express')
const router = express.Router()

const admin = require('firebase-admin');
const serviceAccount = require('../mywebez-3f338-firebase-adminsdk-warup-6727451858.json');
// const { render } = require('ejs');

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
  inout:'',
  reg_show:'',
  views:''
}
router.get('/',async (req,res)=>{
  views = await db.collection('views').get()
  view = views.docs.map(view => view.data())
  sessions.views = view[0].views + 1
  await db.collection('views').add({views:sessions.views})

    if(req.cookies.login){
      sessions.data = data
      sessions.name = datapass[req.cookies.username].name
      sessions.username = req.cookies.username
      sessions.reg_show = ''
      sessions.inout = '<a class="btn btn-outline-danger" href="/logout">ออกจากระบบ</a>'
    }else{
      sessions.name = ''
      sessions.username = ''
      sessions.data = ''
      sessions.reg_show = '<p>ทำตามเงื่อนไขหากยังไม่มีบัญชี <a href="/regform">สร้างบัญชี</a></p>'
      sessions.inout = '<a class="btn btn-outline-light" href="/loginform">เข้าสู่ระบบ</a>'
    }
    res.render('index.ejs',{sessions:sessions})
})

let form_err =[
  {
    name:'',
    username:'',
    password:'',
    gmail:'',
    phone:''
  },
  {
    name:'',
    username:'',
    password:'',
    gmail:'',
    phone:''
  },
  {
    alert_success:''
  }
]
var check_reg_gmail = {}
var check_reg_phone = {}
router.get('/regform',(req,res)=>{
  form_err[2].alert_success = ''
  res.render('regform.ejs',{form_err:form_err})
})

router.post('/saveregform',async (req,res)=>{
  snapshot = await db.collection('data').get();
  data = snapshot.docs.map(doc => doc.data());
  data.forEach((e)=>{
    datapass[e.username] = {password:e.password,name:e.name}
    check_reg_gmail[e.gmail] = 1
    check_reg_phone[e.phone] = 1
  })
  let checkform = 0
  const name = req.body.name
  const username = req.body.username
  const password = req.body.password
  const gmail = req.body.gmail
  const phone = req.body.phone
  
  form_err[0].name = (name.length >= 2) ? '':'<a class="text-danger">!ต้องมีมากว่า 2 ตัวอักษร</a>'
  form_err[0].username = (username.length >= 6) ? '':'<a class="text-danger">!ต้องมีมากว่า 6 ตัวอักษร</a>'
  form_err[0].password = (password.length >= 6) ? '':'<a class="text-danger">!ต้องมีมากว่า 6 ตัวอักษร</a>' 
  form_err[0].gmail = (gmail.length >= 10) ? '':'<a class="text-danger">!ต้องมีมากว่า 9 ตัวอักษร</a>'
  form_err[0].phone = (phone.length === 10) ? '':'<a class="text-danger">!ไม่อยู่ในรูปเบอร์มือถือ</a>'
  // เช็คความถูกต้องของความยาวข้อความ 1
  checkform = (form_err[0].name ==='') ? checkform+1:checkform-1
  checkform = (form_err[0].username ==='') ? checkform+1:checkform-1
  checkform = (form_err[0].password ==='') ? checkform+1:checkform-1
  checkform = (form_err[0].gmail ==='') ? checkform+1:checkform-1
  checkform = (form_err[0].phone ==='') ? checkform+1:checkform-1
  // ถ้าคะแนนครบ จะให้บันทึกข้อมูลได้
  if(checkform === 5){
    // เช็คว่ารหัสซ้ำกันกับคนอื่นไหม
    if(datapass[username] === undefined){
      checkform+=1
      form_err[0].gmail = ''
    }else{
      checkform-=1
      form_err[0].username = '<a class="text-warning">!มี usernamer นี้ในระบบแล้ว ไม่สามารถใช้ username นี้ได้ </a>'//ถ้ามี ให้ -1
    }
    if(check_reg_gmail[gmail] != 1){
      checkform+=1
      form_err[0].gmail =''
    }else{
      checkform-=1
      form_err[0].gmail = '<a class="text-warning">!มี gmail นี้ในระบบแล้ว ไม่สามารถใช้ gmail นี้ได้ </a>' //ถ้ามี ให้ -1
    }
    if(check_reg_phone[phone] != 1){
      checkform+=1
      form_err[0].gmail =''
    }else{
      checkform-=1
      form_err[0].phone = '<a class="text-warning">!มี เบอร์โทร นี้ในระบบแล้ว ไม่สามารถใช้ เบอร์โทร นี้ได้ </a>'//ถ้ามี ให้ -1
    }
    if(checkform === 8){
      await db.collection('data').add({name,username,password,gmail,phone})
      form_err[1].name = ''
      form_err[1].username = ''
      form_err[1].password = ''
      form_err[1].gmail = ''
      form_err[1].phone = ''
      form_err[2].alert_success = '<div class="card text-center text-bg-success mb-3 p-3"> <h3>สร้างบัญชีเสร็จเรียบร้อยแล้ว</h3> </div>'
      res.render('regform.ejs',{form_err:form_err})
    }else{
      form_err[1].name = name
      form_err[1].username = username
      form_err[1].password = password
      form_err[1].gmail = gmail
      form_err[1].phone = phone
      res.redirect('/regform')
    }
  }else{
    form_err[1].name = name
    form_err[1].username = username
    form_err[1].password = password
    form_err[1].gmail = gmail
    form_err[1].phone = phone
    res.redirect('/regform')
  }
})

router.get('/loginform',(req,res)=>{
  sessions.title = ''
  sessions.reg_show = ''
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