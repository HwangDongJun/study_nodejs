//데이터베이스대신에 file에 저장을 하는 형태로 실습을 진행한다.
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({ extended : false }))

var fs = require('fs'); //파일 제어라르 위한 모듈사용
var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',  //해당자료는 공개용이지만 원래는 비밀번호노출로 인해 해당 내용은 다른곳에 만들어야 한다.(주의!)
  database : 'tempone'
});

con.connect();

app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade'); //jade라는 template을 사용하겠다는 의미

app.get('/topic/add', function(req, res) {
  var sql = 'SELECT id,title FROM topic';

  con.query(sql, function(err, topics, fields) {
    if(err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.render('add', {topics:topics});s
    }
  });
});

app.post('/topic/add', function(req, res) { // /topic/add로 전송된 post방식 데이터를 받을 수 있다.
  var title = req.body.title;
  var description = req.body.description;
  var authorid = req.body.author_id;

  var sql = 'INSERT INTO topic (title, description, author_id) VALUES(?, ?, ?)';
  con.query(sql, [title, description, authorid], function(err, topics, fields) {
    if(err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/' + topics.insertId); //res.send(topics)로 확인이 가능하다. insertId가 얻어온 정보의 id에 해당한다.
    }
  });
})

app.get(['/topic/:id/edit'], function(req, res) { //[]를 사용함을써 복수의 주소를 지정가능하다.
  var sql = 'SELECT id,title FROM topic';

  con.query(sql, function(err, topics, fields) {
    var id = req.params.id; //url에서 직접적으로 id부분을 접근하게 된다.
    if(id) {
      var sql = 'SELECT * FROM topic WHERE id=?';
      con.query(sql, [id], function(err, topicid, fields) { //[id]는 자동으로 배열에 들어간다.
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.render('edit', {topics:topics, topicid:topicid[0]});
        }
      });
    } else { //id값이 없을 시 err를 출력
      console.log('There is no id.');
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get(['/topic', '/topic/:id'], function(req, res) { //[]를 사용함을써 복수의 주소를 지정가능하다.
  var sql = 'SELECT id,title FROM topic';

  con.query(sql, function(err, topics, fields) {
    var id = req.params.id; //url에서 직접적으로 id부분을 접근하게 된다.
    if(id) {
      var sql = 'SELECT * FROM topic WHERE id=?';
      con.query(sql, [id], function(err, topicid, fields) { //[id]는 자동으로 배열에 들어간다.
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.render('view', {topics:topics, topicid:topicid[0]});
        }
      });
    } else {
      res.render('view', {topics:topics}); //고유한 id, title은 jade 11줄에서 수정을 했습니다.
    }
  });
});

app.listen(2001, function() {
  console.log('Connected, 2001 port!');
})
