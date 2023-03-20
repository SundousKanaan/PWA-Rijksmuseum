const http = require('http');
// نستدعي مكتبة تدعى "http" لبدأ تشغيل الخادم
// نستخدم require لاستدعاء المكتبة

const hostname = '127.0.0.1';
const port = 3000;
//  متغير يخبر الكود الخاص بنا ماهو المنفذ الذي سيستمع له خادمنا لاحقا


// ننشئ متغير الخادم و نستخدم المكتبة http 
// .createServer لعمل سيرفر
// createServer داخل الفنكشن الخاص بـ  سنقوم بمعالجة الانشطة المختلفة على خادمنا
// function(req, res) كل مرة يطلب فيها المستخدم صفحة الى خادمنا سيتم استدعاء هذه الوظيفة

const server = http.createServer( (req, res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



// https://www.youtube.com/watch?v=SccSCuHhOw0