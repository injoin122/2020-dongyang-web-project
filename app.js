let express = require("express");
let app = express();
var path = require("path");

let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

let page = require("./router/page");

let user = require("./router/user");
let board = require("./router/board");
let movie = require("./router/movie");

let logger = require("morgan");

// http & https
let http = require("http");
let https = require("https");
let server = http.createServer(app).listen(3000, "localhost", () => {
  console.log("server is on");
});

//세션 모듈 설정
var session = require("express-session");
app.use(
  session({
    secret: "@#@$MYSIGN#@$#$",
    resave: false,
    saveUninitialized: true,
  })
);

//몽고 DB
//mariadb 10.13 version
//연결 테스트를 위해 불러왔습니다.
let mongo = require("./module/mongodb");
let mariadb = require("./module/mariadb");

//MiddleWare 연결부
app.use(logger("dev"));
app.use(express.json()); //
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 교수님이 설명하신 Layout 연동부분입니다.
// 기본적으로 파일명이 layout <- 동작하기 떄문에 index를
// 변경하게 되었습니다.
// 사용법은 /route/page.js 파일 확인 부탁드립니다.
app.set("views", path.join(__dirname, "view"))
    .set("view engine", "ejs")
    .use(require('express-ejs-layouts'))
    .set('layout','layout');


app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html;charset=utf8");
  // let sess = req.session
  // if(sess.userId != null){
  //     res.send(`로그인 정보 확인 ${sess.userId} / ${sess.userName}`)
  //
  // }else{
  //     res.send("this page")
  // }
  mongo.connectCheck();
  mariadb.getConn();
  res.redirect("/home");
});

// 파일 절대경로 관리
app.use("/data", express.static("public"));
app.use("/user", user);
app.use("/board", board);
app.use("/movie", movie);
app.use(express.static(path.join(__dirname, "public")));

let router = require("./router/page")(app);

// 소켓 통신을 할수도 있을것 같아서
// HTML에서 사용되는 wss(Web Socket Service) 방식으로 구현하였습니다
let sockio = require("./module/socket");
sockio(server);
