function hello(name) {
  console.log('Hi' + name);
}

hello('egoing'); //cmd에 uglifyjs pretty.js를 입력한다.

//해당하는 코드가 function hello(name){console.log("Hi"+name)}hello("egoing");로 바뀌게 된다.
//줄 바꿈같은걸 없애주는 기능인 것이다. (줄바꿈같은 것이 전부 데이터이기 때문에 코드의 내용이 많아지면 비싸지고 느려지기에..)
//uglifyjs는 필수적인 코드를 제외한 코드가 나오게 되는 것이다. 매우 유용하다!

//uglifyjs pretty.js -m이렇게 쓰면 -m은 그다지 필요없는 이름을 가장 최소로 가지는 값으로 바꿔주는 기능이 된다.
//해당하는 결과값 -> function hello(o){console.log("Hi"+o)}hello("egoing");

//uglifyjs pretty.js -o uglified.js -m 해당하는 pretty.js의 코드를 최소화 시켜서 uglified.js파일에 저장을 하게 된다.
//해당하는 방법은 최소화 즉, min시킨 것이기 때문에 관습적으로 파일의 이름은 pretty.min.js로 만들기도 한다.
