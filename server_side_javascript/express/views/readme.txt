사용하기에 앞서 가장먼저 app.js에서 app.set('view engine', 'jade'); 을 통해서 연결을 해준다.
template가 view engine이다.(정해진 약속) 그리고 우리가 사용할 방법은 jade이기때문에 jade를 작성하여 준다.
app.set('views', './views'); 이것도 정해진 약속으로 앞으로 jade파일을 views폴더에 넣어야지 인식을 한다.

물론 ./views가 ./templates이면 폴더의 이름은 templates여야 한다. 정하기 나름이다.
