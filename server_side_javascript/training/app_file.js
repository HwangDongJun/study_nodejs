//데이터베이스대신에 file에 저장을 하는 형태로 실습을 진행한다.
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({ extended : false }))

var fs = require('fs'); //파일 제어라르 위한 모듈사용

app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade'); //jade라는 template을 사용하겠다는 의미

app.get('/topic/new', function(req, res) {
  res.render('new');
})
app.get('/topic', function(req, res) {
  fs.readdir('data', function(err, files) { //err는 에러, files는 파일들의 목록을 가진 배열
    //readdir은 data디렉토리밑의 파일들을 전부 읽어서 배열에 넣는다. readFile과는 다르다.
    if(err) {
      res.status(500).send('Internal Server Error');
    }
    res.render('view', {topics:files}); //view.jade로 이동할때 {topics:files}로 인해 files의 값이 topics에 저장이 되어 전송된다.
  })
})

app.get('/topic/:id', function(req, res) {
  var id = req.params.id; //url에서 직접적으로 id부분을 접근하게 된다.
  //만약 /topic/:name이라면 req.params.name이어야한다.
  fs.readdir('data', function(err, files) { //이부분 구성 중요하다.
    if(err) {
      res.status(500).send('Internal Server Error');
    }
    fs.readFile('data/' + id, 'utf8', function(err, data) {
      if(err) {
        res.status(500).send('Internal Server Error');
      }
      //res.send(data)는 창이 바뀌면서 해당 data를 출력
      res.render('view', {topics:files, title:id, description:data});
      //view.jade로 이동할때 {topics:files}로 인해 files의 값이 topics에 저장이 되어 전송된다.
      //한번더 topics를 전달하는 이유는 이 부분도 view를 render하고 위에도 view를 render하기 때문에 topics도 전달이 되야지 화면에 그대로 출력이된다.
      //해당하는 설명은 직접 실행을 시켜보면 li로 넣었던 걸 클릭을 해도 li들은 남아있어야 하기에 topics가 전달이 되야한다고 생각하면 쉽다.
    })
  })
})

app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) { //file에 쓰게되며, 제목은 title을 사용하고 내용은 description을 사용한다.
    if(err) {
      res.status(500).send('Internal Server Error'); //상태가 500일 경우는 서버문제이므로, 해당하는 문장을 출력한다.
      //send의 특성상 return처럼 출력을 하고 바로 끝낸다.
    }
    res.send('Success!');
  });
}) //res.render('new')로 인해 jade파일로 이동을하여 입력된 내용값은 form태그로 인해 post로 전달을 하게 되면서 해당하는 정보를 fs.writeFile을 통해 저장을 하게 된다.

app.listen(2000, function() {
  console.log('Connected, 2000 port!');
})
