//어떤 프로젝트를 만들게 되면, 많은 프로젝트가 만들어지는데 실행을 시키는 파일이 있는데 그게 main파일이라 하는데 관습적으로 app이라는 이름으로 설정한다.
//해당하는 모든 정보는 expressjs.com에 설명이 되어있다.

var exp = require('express'); //모듈 생성
var app = exp(); //위에 생성한 exp는 함수라서 이렇게 선언을 해서 app에 저장을 한다.
//이 2줄은 형식적으로 제작자에 의해서 정해진 약속이기에 알아두기만 해도 좋다.

//template사용부분
app.locals.pretty = true; //코드와는 관련이 없지만 jade파일로 인해 만들어지는 코드는 ugly한데, 이 코드로 인해 보기 편하게 pretty해진다.
app.set('view engine', 'jade'); //jade는 확장자 => jade문법이 편하다.
app.set('views', './views'); //정해진 약속으로 앞으로 우리는 jade파일을 views파일에 넣어야 한다.
//views는 관습적으로 사용을 하기 때문에 다른 이름이 아니라면 이 코드는 생략을 해도 자동으로 인식을 한다.
app.get('/template', function(req, res) {
  res.render('temp', {time:Date(), _title:'Welcome Jade'});  //변수를 넘겨주고 싶을때 두번째 인자같은 방식으로 전달을 하는 것이다.
  //다른 코드를 가져와서 랜더링한다. 라고 해서 render이다. 코드를 가져와서 해석을 하는 것이라고 생각하면 된다.
  //temp라는 이름의 파일을 rendering해서 전달을 한다는 의미이다. (temp.jade파일은 views폴더에 있다.)
}); //해당 방법은 get으로 동적으로 파일을 수정하는 방법이기에 정적이 아니어서 수정을 할 때마다 서버를 재시작 해야한다.
//---------------
//★★★★★★★★★★★정적 파일 서비스★★★★★★★★★★★★
app.use(exp.static('public')); //exp는 express가 아니라 모듈을 받아온 변수의 이름에 해당한다.(주의!)
//해당하는 한 줄의 코드는 정적 파일을 서비스 하는 법인데, 관습적이고, 정해진 명령으로 알아두자.
//이렇게 만들고 나서 public이라는 파일안에 만약 png파일(사진)이 1개 있다면 node app.js로 실행을 시키고 localhost:3000/사진.png이라고 치면 그 사진을 보여준다.
//test.txt는 localhost:3000/test.txt라고 입력을하면 안의 값의 출력을 볼 수 있다.

app.get('/naver', function(req, res) {
  res.send('Hello, <img src=\'/naver.png\'>');
}) //이와같은 방법으로도 이용이 가능하다.
//★★★★★★★★★★★정적 파일 서비스★★★★★★★★★★★★
//★★★★★★★★★★★동적 파일 서비스★★★★★★★★★★★★
app.get('/dynamic', function(req, res) {
  var simple_example = 1;
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      ${simple_example} <!-- java코드의 변수를 html코드 안에 적용을 시키는 방법 -->
    </body>
  </html>` //해당하는 코드는 여러줄을 입력가능하게 만들었다. 기본 ''와 ""는 제공을 하지 않으며, Esc와 Tab사이에 `` 이것으로 인해 여러줄 코드 입력이 가능해진다.
  res.send(output);
  //동적파일의 장점은 html파일과 java코드를 같이 적용을 시켜서 사용이 가능한 것이다.
  //for문이라던가...
});
//해당하는 방식이 동적파일로 서비스를 제공하는 방법이다. 서버가 켜진 상태에서 수정을 하면 적용이 되지 않습니다. 서버를 재시작하여야 적용이 됩니다.
//★★★★★★★★★★★동적 파일 서비스★★★★★★★★★★★★
app.get('/', function(req, res) { // '/'는 사용자가 홈으로 접속을 했을때, 성공을 했다면 function을 실행한다.
//callback함수에서 매개변수는 request와 response로 약속이 되어있다.
  res.send('Hello home page');
}); //get방식과 post방식중에 get방식으로 접속한 사용자를 받기 위해 get()을 사용한다.
app.get('/login', function(req, res) {
  res.send('Login please'); //해당하는 방법으로 사용자가 /가 아닌 /login으로 접근을 했을 경우 출력 결과를 결정한다.
  //res.send('<h1>Login please</h1>'); h1태그로 감싸져서 전송이 되기 때문에 h1의 기능을 수행한다.
});
app.listen(3000, function() {
  console.log('Connected 3000 port!');
}); //port번호 지정

//cmd에서 node app.js로 실행을 시켜서 localhost:3000/으로 접속을 하게 되면 /로 인해 홈으로 접속이 되기 때문에
//res.send를 통해서 'Hello home page'가 출력이 된다.
