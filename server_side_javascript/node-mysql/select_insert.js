var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',  //해당자료는 공개용이지만 원래는 비밀번호노출로 인해 해당 내용은 다른곳에 만들어야 한다.(주의!)
  database : 'tempone'
});

con.connect(); //해당 코드로 mysql과 연결을 시킬 수 있다.
/*
var sql = 'SELECT * FROM topic'; //따로 변수를 만들지 않고 con.query(여기!) 직접 추가해도 상관은 없다.
con.query(sql, function(err, rows, fields) { //우리가 전달한 sql문이 서버로 전달이 되고나서 그에 맞는 정보를 받은것이 rows랑 fields이다.
  if(err) {
    console.log(err);
  } else {
    for(var i = 0; i < rows.length; i++) {
      console.log(rows[i].title); //rows는 행을 의미하며, title로 인해 각 행의 title의 값이 출력이 된다.
      console.log(rows[i].author);
      console.log(rows[i].description);
    }
  }
});
기존의 select문은 필요가 없다. */
/*
var sql = 'INSERT INTO topic (title, description, created, author_id) VALUES("Nodejs", "Server side javascript", "2018-07-12 22:25:46", "1")';
//새로운 sql은 값을 넣는 부분이다.
con.query(sql, function(err, rows, fields) {
  if(err) {
    console.log(err);
  } else {
    console.log(rows);
    console.log(rows.insertId); //아래의 insertId를 입력함으로써 알아낼 수가 있다.
  }
});
/* 위의 console.log(rows)로 인한 출력결과이다.
OkPacket {
  fieldCount: 0,
  affectedRows: 1, -> 하나의 행에 영향을 주었다.
  insertId: 6, -> 6번째 id로 들어갔다.
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
----------------------------------------------------------------------------------------*/
var sql = 'INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, ?, ?)'; //기존의 값을 입력하는 것은 해당 언어의 목적과 맞지 않으므로 ?로 처리
var params = ['Supervisor', 'Watcher', '2018-07-12 22:31:46', '1']; //여기서 우리는 sql문을 바꾸지 않았으며, params를 전달함으로써 치환시켜서 값을 대입시켰다. 실제 보완과도 직접적으로 연관이 있다.
con.query(sql, params, function(err, rows, fields) { //2번째 인자값으로 params를 준다.
  if(err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});
con.end(); //해당 코드로 mysql과 연결을 끊을 수 있다.
