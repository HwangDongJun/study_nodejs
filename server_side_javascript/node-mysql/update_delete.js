var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',  //해당자료는 공개용이지만 원래는 비밀번호노출로 인해 해당 내용은 다른곳에 만들어야 한다.(주의!)
  database : 'tempone'
});

con.connect(); //해당 코드로 mysql과 연결을 시킬 수 있다.
/*
var sql = 'UPDATE topic SET title=?, author_id=? WHERE id=?';
var params = ['ORACLE', '2', 2];
con.query(sql, params, function(err, rows, fields) {
  if(err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});
/* update일때 rows의 출력은 이와 같이 된다.
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1 }
*/
var sql = 'DELETE FROM topic WHERE id=?';
var params = [8];
con.query(sql, params, function(err, rows, fields) {
  if(err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});
/* 해당 출력이 된다.
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
*/
con.end(); //해당 코드로 mysql과 연결을 끊을 수 있다.
