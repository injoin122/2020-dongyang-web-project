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

let mongo = require("./module/mongodb");
let mariadb = require("./module/mariadb");

//MiddleWare
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("views", path.join(__dirname, "view")).set("view engine", "ejs").use(require("express-ejs-layouts")).set("layout", "layout");

app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html;charset=utf8");

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

let sockio = require("./module/socket");
sockio(server);
