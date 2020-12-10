let mongo = require("../module/moviemongo");
module.exports = function (app) {
  app.get("/join", (req, res) => {
    let sess = req.session;
    res.render("user/join", { title: "임시", auth: sess });
  });

  app.get("/login", (req, res) => {
    let sess = req.session;
    res.render("user/login", { title: "임시", auth: sess });
  });

  app.get("/home", async (req, res) => {
    let sess = req.session;
    await mongo.alltheaterfound((result) => {
      // console.log(result);
      res.render("movie/movielist", { cgvData: result, auth: sess });
    });
  });

  app.get("/vodSearch", async (req, res) => {
    let sess = req.session;
    res.render("movie/movieSearch", { auth: sess });
  });

};
