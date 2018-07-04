해당하는 파일은 cmd에서 npm install underscore를 통해서 모듈을 설치한 결과이다.
이렇게 설치를 하는 것은 의존성이 결핍이 되어있다.

npm install underscore --save를 통해서 의존성을 붙일 수 있는데, 결과로 package-lock.json파일이 생성이 되었고,
dependencies의 부분이 추가가 되어 의존성을 붙이게 된 것이다.

★있는 것과 없는 것의 차이는 만약 있다면, package.json이라는 파일만 있으면
우리는 언제든지 underscore의 1.9.1version을 자신의 프로젝트에 포함을 시킬 수 있다.★
=> save는 필요하다면 넣는 것이고, 필요가 없다면 빼도 된다.
