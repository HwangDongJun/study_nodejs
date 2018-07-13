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

app.get('/topic/new', function(req, res) {
  fs.readdir('data', function(err, files) { //이부분 구성 중요하다.
    if(err) {
      res.status(500).send('Internal Server Error');
    }
    res.render('new_upgrade', {topics:files});
  }); //기존의 new.jade가 아닌 new_upgrade.jade파일은 내용이 바뀌었기 때문에 해당 코드도 수정을 한다.
})

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

app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) { //file에 쓰게되며, 제목은 title을 사용하고 내용은 description을 사용한다.
    if(err) {
      res.status(500).send('Internal Server Error'); //상태가 500일 경우는 서버문제이므로, 해당하는 문장을 출력한다.
      //send의 특성상 return처럼 출력을 하고 바로 끝낸다.
    }
    //res.send('Success!'); 그냥 출력문이 아닌 페이지 이동을 할 수 있게 진행한다.
    res.redirect('/tipic/' + title); //해당 주소로 이동한다.
  });
}) //res.render('new')로 인해 jade파일로 이동을하여 입력된 내용값은 form태그로 인해 post로 전달을 하게 되면서 해당하는 정보를 fs.writeFile을 통해 저장을 하게 된다.

app.listen(2001, function() {
  console.log('Connected, 2001 port!');
})
