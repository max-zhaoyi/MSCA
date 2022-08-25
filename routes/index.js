var express = require('express');
var router = express.Router();
const Redis = require('ioredis')
var msglist = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Massively Scalable Chat App',
    items: msglist 
  });
});

router.post("/", function(req, res, next){
  let time = new Date().toLocaleTimeString()
  insertRow(req.body.uname, time, req.body.minput)
  res.render('index', { 
    title: 'Massively Scalable Chat App',
    items: msglist 
  });
  //res.status(204).send()
});

function insertRow(uname, time, minput){
  msglist.push({
    "alias": uname,
    "time": time,
    "message": minput
  })
}

module.exports = router;
