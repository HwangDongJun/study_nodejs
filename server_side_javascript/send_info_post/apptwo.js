//POST방식을 사용한 정보 전달입니다.

var exp = require('express');
var app = exp();

var bodyparser = require('body-parser'); //post방식으로 정보를 전달하기 위해 필요하다.
app.use(bodyparser.urlencoded({ extended : false })) //항상 대기를 하고 있다가 post방식 요청이 들어오면 바로 사용할 수 있도록 서비스한다.

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

app.get('/form', function(req, res) {
  res.render('form');
})

app.get('/form_receiver', function(req, res) {
  var title = req.query.title;
  var descri = req.query.description;
  res.send(title + ', ' + descri);
})

app.post('/form_receiver', function(req, res) { //해당하는 방식이 post로 전달하는 방식이다.
  var title = req.body.title;                  //대신에 form.jade파일에서 form태그의 methdod는 post여야 한다.
  var descri = req.body.description;           //추가적으로 post방식은 req.query가 아닌 req.body로 전달을 해야한다.
  res.send(title + ', ' + descri);             //위에서 추가한 bodyparser로 인해 req.body를 사용할 수 있게 된다.
})

app.listen(5000, function() {
  console.log('Connected 5000 port!');
});
