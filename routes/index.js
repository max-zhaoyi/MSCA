var express = require('express');
var router = express.Router();
const Redis = require('ioredis');
let socketapi = require("../socketapi");

const rconfig = require('../redisconfig.json');
var msglist = [];
var sid = "";

const redis = new Redis({
  //TODO: Store in env variables
  host: rconfig.host,
  port: rconfig.port,
  password: rconfig.password
})

/* GET home page. */
router.get('/', async (req, res, next) =>{
  msglist = []
  let result = await redis.xrevrange("mystream", "+", "-", "COUNT", 25)
  result.forEach(entry => {
    row = entry[1]
    insertRow(row[1], row[3], row[5])
  })

  //sid = result[result.length-1][0]
  res.render('index', { 
    title: 'Massively Scalable Chat App',
    items: msglist
  });
});

/*POST new message. */ 
router.post("/", async (req, res) => {
  let time = new Date().toLocaleTimeString()  
  redis.xadd("mystream", "*", "alias", req.body.uname, "date", time, "message", req.body.minput)  
  msglist = [];
  let result = await redis.xrevrange("mystream", "+", "-", "COUNT", 25)
  result.forEach(entry => {
    row = entry[1]
    insertRow(row[1], row[3], row[5])
  })
  // socketapi.io.emit('msglist update', msglist)
  // res.status(204).send()
  res.render('index', { 
    title: 'Massively Scalable Chat App',
    items: msglist
  });
});

function insertRow(uname, time, minput){
  msglist.unshift({
    "alias": uname,
    "time": time,
    "message": minput
  })
}

// const recursionRead = ({ stream, id }, res) => {
//   redis.xread('BLOCK', 0, 'STREAMS', stream, id, (err, str) => {
//     if (err) {
//       return console.error('error:', err);
//     }
//     str[0][1].forEach(message => {
//       insertRow(message[1], message[3], message[5])
//       // res.render('index', { 
//       //   title: 'Massively Scalable Chat App',
//       //   items: msglist 
//       // });
//       io.emit('msglist update', msglist)
//     });
//     let cid = str[0][1][0][0]
//     //console.log("cid: ", cid)

//     setTimeout(() => recursionRead({ stream, id: cid }, res), 0)
//   });
// }

module.exports = router;
