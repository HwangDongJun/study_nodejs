var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',  //해당자료는 공개용이지만 원래는 비밀번호노출로 인해 해당 내용은 다른곳에 만들어야 한다.(주의!)
  database : 'tempone'
});

con.connect(); //해당 코드로 mysql과 연결을 시킬 수 있다.

var sql = 'SELECT * FROM topic'; //따로 변수를 만들지 않고 con.query(여기!) 직접 추가해도 상관은 없다.
con.query(sql, function(err, rows, fields) { //우리가 전달한 sql문이 서버로 전달이 되고나서 그에 맞는 정보를 받은것이 rows랑 fields이다.
  if(err) {
    console.log(err);
  } else {
    console.log('rows', rows); //RowDataPacket를 기준으로 table의 data가 전부 보여진다.
    console.log('fields', fields); //FieldPacket를 기준으로 상세한 정보들이 전부 보여진다.
  }
});
con.end(); //해당 코드로 mysql과 연결을 끊을 수 있다.
