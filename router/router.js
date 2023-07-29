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
  await fetch('apiwebphol.pholdatap.repl.co')
  // .then(response=>response.json())
  // .then(data=>{
  //   sessions.dataAPI = data;
  // })

  // let views = await db.collection('views').get()
  // let view = views.docs.map(view => view.data())
  // view = view[0].view + 1
  // await db.collection('views').doc('flh2FpufkN7oSjsEmTVU').update({view:view})
  // sessions.views = view
  res.render('index.ejs',{sessions:sessions})
})

module.exports = router