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
      res.render('add', {topics:topics});
    }
  });
});

app.post('/topic/add', function(req, res) { // /topic/add로 전송된 post방식 데이터를 받을 수 있다.
  var title = req.body.title;
  var description = req.body.description;
  var created = req.body.created;
  var authorid = req.body.author_id;

  var sql = 'INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, ?, ?)';
  con.query(sql, [title, description, created, authorid], function(err, topics, fields) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/' + topics.insertId); //res.send(topics)로 확인이 가능하다. insertId가 얻어온 정보의 id에 해당한다.
    }
  });
})
//------------수정(UPDATE)---------------------------------------------------------------------
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

app.post('/topic/:id/edit', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var authorid = req.body.author_id;
  var id = req.params.id;
  var sql = 'UPDATE topic SET title=?, description=?, author_id=? WHERE id=?';

  con.query(sql, [title, description, authorid, id], function(err, result, fields) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/' + id);
    }
  });
});
//------------수정(UPDATE)---------------------------------------------------------------------
//수정이나 삭제나 전체적인 동작은 app.get으로 jade파일로 SELECT한 데이터베이스 정보를 넘겨주고, jade파일에서는 다시 post로 주는걸
//app.post로 받는 과정이다. 교육목적상 데이터베이스의 목차를 계속 유지해야 했기에 topics를 중복으로 사용했습니다.
//------------삭제(DELETE)---------------------------------------------------------------------
app.get(['/topic/:id/delete'], function(req, res) {
  var sql = 'SELECT id,title FROM topic'; //이거 왜 쓸까? => topics를 delete.jade에서 사용을하며 정보를 넘겨줘야 하기에.
  var id = req.params.id;

  con.query(sql, function(err, topics, fields) {
    var sql = 'SELECT * FROM topic WHERE id=?';
    con.query(sql, [id], function(err, topic, fields) {
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        if(topic.length == 0) { //실제로 그 정보가 존재하는지 안하는지 검사
          console.log('There is no record.');
        } else {
          res.render('delete', {topics:topics, topic:topic[0]});
        }
      }
    });
  });
});

app.post('/topic/:id/delete', function(req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM topic WHERE id=?';

  con.query(sql, [id], function(err, result, fields) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/');
    }
  });
});
//------------삭제(DELETE)---------------------------------------------------------------------
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
          res.render('view', {topics:topics, topicid:topicid[0]}); //topicid자체는 배열이기에 0으로 접근
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
