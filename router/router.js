const express = require('express')
const router = express.Router()

const admin = require('firebase-admin');
const serviceAccount = require('../mywebez-3f338-firebase-adminsdk-warup-6727451858.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
let sessions = {
  login:false,
  title:'',
  // data:'',
  name:'',
  username:'',
  user1:'',
  inout:'',
  reg_show:'',
  views:'',
  dataAPI:[]
}
router.get('/',async (req,res)=>{
  await fetch('https://ez-api-olive.vercel.app/data')
  .then(response=>response.json())
  .then(data=>{
    // console.log(111,data)
    let eid= []
    data.forEach(element => {
      eid.push(element)
      element['eid'] =  element['title'].replace(/\s+/g, '').toLowerCase()
    });
    sessions.dataAPI = eid;
  })
  let views = await db.collection('views').get()
  let view = views.docs.map(view => view.data())
  view = view[0].view + 1
  await db.collection('views').doc('flh2FpufkN7oSjsEmTVU').update({view:view})
  sessions.views = view

  console.log(sessions.views)
  res.render('index.ejs',{sessions:sessions})
})

module.exports = router