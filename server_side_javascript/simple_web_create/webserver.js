const http = require('http'); //require는 이와같은 http가 아래의 코드가 실행이 되기 위해서는 반드시 필요하다.
//이 return값을 http에 담은 것이다. const는 상수를 의미한다. 상수인 이유는 한번 할당이 되면 값을 바꿀 수 없는 항상 같은 값이기에.
//모듈은 부품이며, 사용하기 위해서는 require('http')를 사용해야 한다.(중요!)

const hostname = '127.0.0.1';
const port = 1337;
//해당하는 port와 hostname을 전달

http.createServer((req, res) => { //해당하는 server를 만든다. (req, res) => 이 코드가 function(req, res)와 동일한 코드이다.
 res.writeHead(200, { 'Content-Type': 'text/plain' });
 res.end('Hello World\n');
}).listen(port, hostname, () => { //port와 hostname을 매개로 listen -> 들어라! // () => 이 코드가 function()와 동일한 코드이다.
 console.log(`Server running at http://${hostname}:${port}/`);
});
//Nodejs를 통해서 웹 서버를 만들어서 port를 1337로 hostname을 127.0.0.1로 요청하는 client에게 응답하라는 것이다.
//그 응답 결과는 res.end('Hello World\n'); 이부분이다.

//이와 같은 코드가 바로 Nodejs의 대표적인 특징이다.

//다음과 같은 코드는 웹 서버를 만드는 코드이다. 그리고 cmd에서 node webserver.js를 통해서 우리가 만든 웹 서버를 실행시킨 것이다.
//해당하는 결과의 주소를 브라우저를 통해 들어가면 Hello World라는 출력을 확인할 수 있다. (서버를 통한 것)
