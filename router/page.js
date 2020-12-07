// view 대한 처리 렌더링을 담당하는 부분입니다.

module.exports = function (app) {
  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.get("/join", (req, res) => {
    res.render("join");
  });

  // 테스트용 파일을 하나 만들었습니다.
  // view->user -> login.ejs 만들고 해당 페이지를 렌더링 하게 되는데
  //
  /* login.ejs
  <div>
      테스트
  </div>
  해당 내용이 layout에 그대로 출력되는것을 확인할수 있습니다.
  해당 페이지를 만들고 페이지안에 내용을 넣고
  아래 res.render 부분과 url부분만 잘 매칭 시키면 알아서 해당부분에
  layout.ejs -> <%- body%>에 알아서 입력이 되어집니다.
  */
  app.get("/home", (req, res) => {
    let sess = req.session;
    res.render("./user/login", { logdata: sess, title: "임시" });
  });

  // router.get('/chat',((req, res) => {
  //     res.render('chatclient')
  // }))
};
