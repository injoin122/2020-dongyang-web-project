let axios = require("axios");
let cheerio = require("cheerio");
let mongo = require("./moviemongo");

const CGVcrawiling = require("./crawlingCGV");
const PROMISE = require("bluebird");

async function Clolling() {
  console.log("실행");
  let title = "";
  let mongod = await mongo.mongConnect();
  let db = await mongod.db("test");
  let data = await db.collection("theaters").find({}, { _id: "0", theaters_seq: "1" }).toArray();
  // console.log(data);

  let tuples = new Array();

  let prom = data.map(async (theaters) => {
    let theaters_seq = theaters.theaters_seq.replace("C-", "");
    let date = "20201127";
    let cgv = `http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=${theaters_seq}&date=${date}`;
    let body = await CGVcrawiling.getHtml(cgv);
    // console.log(body);
    CGVcrawiling.getMovieList(tuples,body, theaters);
    // console.log(tuples);
  });

  PROMISE.all(prom)
    .then(async (result) => {
      let logdata = 0;
      await mongo.insertCgvData(tuples, logdata, db, mongod);
    })
    .catch((err) => {
      console.log(err);

      throw err;
    });
}

Clolling();
