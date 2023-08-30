const express = require('express')
const router = express.Router()

const admin = require('firebase-admin');
const serviceAccount = require('../mywebez-3f338-firebase-adminsdk-warup-6727451858.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
let sessions = {
  views:'',
}
const bambam = [
  'โจทย์ที่ 1: คำนวณเกรด ให้นักเรียนเขียนโปรแกรมเพื่อคำนวณเกรดของนักเรียนจากคะแนนที่ได้รับ โดยให้ใช้เกณฑ์ดังนี้: คะแนน 90 ขึ้นไป: เกรด A คะแนน 80 - 89: เกรด B คะแนน 70 - 79: เกรด C คะแนน 60 - 69: เกรด D คะแนนต่ำกว่า 60: เกรด F',
  'โจทย์ที่ 2: สูตรคูณแม่ 2-12เขียนโปรแกรมเพื่อแสดงสูตรคูณแม่ตั้งแต่ 2 ถึง 12 โดยใช้ลูป for หรือ while.',
  'โจทย์ที่ 3: การหาผลรวมและค่าเฉลี่ย เขียนโปรแกรมเพื่อรับจำนวนเต็มบวกจากผู้ใช้จนกว่าผู้ใช้จะป้อนค่า 0 และแสดงผลรวมและค่าเฉลี่ยของจำนวนที่ผู้ใช้ป้อนมา.',
  'โจทย์ที่ 4: การหาจำนวนเลขคู่และเลขคี่ เขียนโปรแกรมที่รับจำนวนเต็มบวกจากผู้ใช้ จนกว่าผู้ใช้จะป้อนค่า 0 และนับจำนวนเลขคู่และเลขคี่ที่ผู้ใช้ป้อนมา',
  'โจทย์ที่ 5: การคำนวณค่าซ้ำหลายครั้ง (Looping) เขียนโปรแกรมที่ให้ผู้ใช้ป้อนคะแนนของนักเรียนหลายคน จากนั้นโปรแกรมควรจะคำนวณและแสดงค่าเฉลี่ยของคะแนนทั้งหมด',
  'โจทย์ที่ 6: การหาตัวเลขที่มากที่สุด เขียนโปรแกรมที่ให้ผู้ใช้ป้อนตัวเลขจำนวนเต็มบวกตามต้องการ และโปรแกรมควรแสดงตัวเลขที่มากที่สุดที่ผู้ใช้ป้อนมา',
  'โจทย์ที่ 7: การสร้างรูปสามเหลี่ยมด้วยเครื่องหมาย * เขียนโปรแกรมที่ให้ผู้ใช้ป้อนความสูงของรูปสามเหลี่ยมแล้วให้โปรแกรมแสดงรูปสามเหลี่ยมที่มีความสูงตามที่ผู้ใช้ป้อนมา โดยใช้เครื่องหมาย * ในการวาดรูป',
  'โจทย์ที่ 8: การหาจำนวนเลขซ้ำ เขียนโปรแกรมที่ให้ผู้ใช้ป้อนจำนวนเต็มบวกตามต้องการ และโปรแกรมควรนับและแสดงจำนวนของตัวเลขที่ป้อนมาซ้ำกัน',
  'โจทย์ที่ 9: การบวกเมทริกซ์ เขียนโปรแกรมที่รับข้อมูลเมทริกซ์ 2 มิติขนาดเท่ากันจากผู้ใช้ แล้วโปรแกรมควรทำการบวกเมทริกซ์เหล่านี้และแสดงผลลัพธ์',
  'โจทย์ที่ 10: การหาตัวเลขเลขคู่ระหว่าง 1 ถึง n เขียนโปรแกรมที่รับจำนวนเต็มบวก n จากผู้ใช้ แล้วแสดงตัวเลขที่เป็นเลขคู่ตั้งแต่ 1 ถึง n',
]
// const answer = [
//   `#include <stdio.h>\n\nint main() {\nint score;\nprintf("Enter the score: ");\nscanf("%d", &score);\n\nif (score >= 90) {\n\tprintf("Grade: A");\n} else if (score >= 80) {\n\tprintf("Grade: B");\n} else if (score >= 70) {\n\tprintf("Grade: C");\n} else if (score >= 60) {\n\tprintf("Grade: D");\n} else {\n\tprintf("Grade: F");\n}\nreturn 0;\n}`,
//   `#include <stdio.h>\n\nint main() {\nfor (int i = 2; i <= 12; i++) {\n\tfor (int j = 1; j <= 12; j++) {\n\t\tprintf("%d x %d = %d", i, j, i * j);\n\t}\n\n}\n\nreturn 0;\n}`,
//   `#include <stdio.h>\n\nint main() { \tint num, sum = 0, count = 0; \tdo { \t\tprintf("Enter a positive integer (0 to exit): "); \t\tscanf("%d", &num); \t\tif (num != 0) { \t\t\tsum += num; \t\t\tcount++; \t\t} \t} while (num != 0); \tif (count > 0) { \t\tfloat average = (float)sum / count; \t\tprintf("Sum: %d\n", sum); \t\tprintf("Average: %.2f\n", average); \t} else { \t\tprintf("No numbers entered.\n"); \t} \treturn 0; }`,
// ]
router.get('/',async (req,res)=>{
  await fetch('https://ez-api-olive.vercel.app/data/myweb')
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


router.get('/ProBlem_Solving_C_Language',(req,res)=>{
  res.render('ProBlem_Solving_C_Language.ejs',{sessions:0,Bam:bambam})
})
module.exports = router