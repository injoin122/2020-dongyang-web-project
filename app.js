let express = require('express') 
// Express 웹서버 관리
let app = express()
let port = 3000
var path = require('path');
let host = '0.0.0.0'
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')

let page = require('./router/page')
let user = require('./router/user')
let board = require('./router/board')

// http & https
let http = require('http')
// 혹시 사용하게 될수도 있을거 같아서
// 모듈 자체는 설치하였습니다
let https = require('https')
let server = http.createServer(app).listen(3000,'localhost',()=>{
    console.log("server is on")
})
//세션 모듈 설정
var session = require('express-session');
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));



//몽고 DB
//mariadb 10.13 version
//연결 테스트를 위해 불러왔습니다.
let mongo = require('./module/mongodb')
let mariadb = require('./module/mariadb')



//MiddleWare 연결부

app.use(express.json()) //
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// 뷰 템플릿 엔진과 현재 view를 담을 path 지정
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');


// 초기 테스트용으로 만들어 놓은 장치입니다
// 별의미 없었고 초기 MongoDB 커네팅을 체크하기 이용을 하였습니다.
// 2020.11.22 mysql 테스트용 데이터 생성
app.get('/', ((req, res) => {
    res.setHeader("Content-type","text/html;charset=utf8")
    // let sess = req.session
    // if(sess.userId != null){
    //     res.send(`로그인 정보 확인 ${sess.userId} / ${sess.userName}`)
    //
    // }else{
    //     res.send("this page")
    // }
    mongo.connectCheck();
    mariadb.getConn();
    res.redirect('/home')


}))


// 파일 절대경로 관리
app.use('/data',express.static('public'))

// 해당부분은 페이지 라우팅이 아닌 ajax.post get or form action 처리를 위해 만들어진 
// 라우팅 그룹입니다.
app.use('/user',user)
app.use('/board',board)

// 실제 view가 렌더링 되고 처리되는 부분
// app.use('/page', page)
let router = require('./router/page')(app)


// 소켓 통신을 할수도 있을것 같아서
// HTML에서 사용되는 wss(Web Socket Service) 방식으로 구현하였습니다
let sockio = require('./module/socket')
sockio(server)



