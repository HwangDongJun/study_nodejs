//동기와 비동기방식을 이용한 file system다루는 js파일입니다.
var fs = require('fs');

console.log(1);
var data = fs.readFileSync('text.txt', {encoding:'utf8'});
//해당하는 파일은 utf8으로 저장을 했기에 utf8방식으로 읽어온다.
//readFileSync은 동기방식으로 file을 불러오는 방식이다.
//동기방식에는 callback함수가 필요없으며, 계속적으로 물어보는 방식이므로, 크기가 큰 프로그램에서는 비추천한다.
//대부분 동기방식은 추천하지 않는 방식이다. 사용할 경우가 있기에 존재는 한다.
console.log(data);

console.log(2);
fs.readFile('text.txt', {encoding:'utf8'}, function(err, data) {
  console.log(3);
  console.log(data);
})
console.log(4);
//해당하는 방식은 비동기방식으로 callback함수로 function(err, data)가 존재한다.
//err과 data는 기존에 정해진 방식이며, 사용방법은 다음과 같다.
//만약 여기서 동기방식이 10분짜리 작업이었다면, 10분이 지나고나서야 2번인 비동기방식이 출력이 됬을 것이다.
//마지막으로 해당하는 번호의 순서는 2 4 3 순으로 나오는데, 그건 비동기방식은 readFile을 시키고 나서..
//바로 다음 코드를 실행시키고, 실행을 시켜놨던 readFile이 끝나고나서야 3이 나오는 것이다.
//비동기방식은 background로 실행이 된다는 것이다.

/* 출력결과
1
Hello Sync And ASync

2
4
3
Hello Sync And ASync
*/
