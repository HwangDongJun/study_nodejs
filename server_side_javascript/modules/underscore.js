var _ = require('underscore'); //underscore모듈을 사용해 보겠다.
//관습적으로 underscore는 _라는 변수에 저장을 하는 관습이 있다.

var arr = [3,6,9,1,12];

console.log(arr[0]);
console.log(_.first(arr)); //underscore가 제공하는 기능중에 first라는 기능
console.log(arr[arr.length-1]); //마지막의 원소 출력 -복잡
console.log(_.last(arr)); //간단하게 출력이 가능하다.
//underscore는 매우 유명한 module이므로, 알아두는것이 좋다.



//module의 마지막 파일이므로, 이곳에서 정리하겠습니다.
//해당하는 모듈을 설치하게 되면, -g를 통해서 전역에 사용이 가능하게 만들 수 있는 반면!
//--save를 통해서 의존성을 줄 수도 있습니다. 하지만 --save를 통해서 만들려면 이전에 했듯이 package를 따로 만들어서
//json파일을 만들어 의존을 하게 만들어 주어야 하는 주의점이 있습니다. (기억해 두시길.)
