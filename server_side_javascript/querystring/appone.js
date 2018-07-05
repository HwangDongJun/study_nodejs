//query string와 관련된 자료입니다.

var exp = require('express');
var app = exp();

app.get('/topic', function(req, res) {
  //res.send(req.query.id); 해당하는 방식은 req.query로 요청을 한다. id의 값을 요청을 한다. localhost:4000/topic?id=1인 주소면 출력이 1이 된다.
  //res.send(req.query.name); 여기서는 localhost:4000/topic?name=egoing이라면 출력은 egoing이 된다.
  //res.send(req.query.id + ", " + req.query.name); localhost:4000/topic?id=2&name=egoing 해당하는 코드의 출력은 코드와 같다.
  var topics = ['Javascript is...', 'Nodejs is ...', 'Express is ...'];
  var output = `
    <a href='/topic?id=0'>Javascript</a><br>
    <a href='/topic?id=1'>Nodejs</a><br>
    <a href='/topic?id=2'>Express</a><br><br>
    ${topics[req.query.id]}
  `

  res.send(output);
})

app.get('/semantic/:id', function(req, res) { // /semantic/:id인 방식은 semantic URL이라 한다. semantic?id=1이 아니라 semantic/1으로 주소를 입력가능하게 한다.
  var topics = ['Javascript is...', 'Nodejs is ...', 'Express is ...'];
  var output = `
    <a href='/semantic/0'>Javascript</a><br>
    <a href='/semantic/1'>Nodejs</a><br>
    <a href='/semantic/2'>Express</a><br><br>
    ${topics[req.params.id]}
  `
  //semantic URL은 query가 아니라 params로 지정을 하면 인식을 한다.
  res.send(output);
})

app.get('/semantic/:id/:mode', function(req, res) {
  res.send(req.params.id + ", " + req.params.mode); // localhost:4000/semantic/2/edit를 입력하면 2, edit가 출력이 된다.
})

app.listen(4000, function() {
  console.log('Connected 4000 port!');
});
