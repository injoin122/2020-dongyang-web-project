let axios = require("axios");
let cheerio = require("cheerio");
let mongo = require("./moviemongo");
import { CgvCrawling } from "./crawlingCGV";
// const CgvCrawling = require("./crawlingCGV");
const PROMISE = require("bluebird");
let add_seq = 0;

async function Clolling() {
  let title = "";
  let mongod = await mongo.mongConnect();
  let db = await mongod.db("test");
  let data = await db.collection("theaters").find({}, { _id: "0", theaters_seq: "1" }).toArray();
  // console.log(data);

  let tuples = new Array();

  let prom = data.map(async (data) => {
    let theaters_seq = data.theaters_seq.replace("C-", "");
    let date = "20201127";

    let cgv = `http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=${theaters_seq}&date=${date}`;
    let body = await CgvCrawling.getHtml(cgv);
    console.log(body);
    tuples = CgvCrawling.getMovieList(body);
    // let body = await axios.get(cgv);

    // let $ = cheerio.load(body.data);
    // let $movielist = $("body").children("div").children("div.sect-showtimes").children("ul").children("li");
    // $movielist.map((i, elem) => {
    //   if (true) {
    //     // 영화 제목 가져오기
    //     if ($(elem).find("strong").text().trim()) {
    //       title = $(elem).find("strong").text().trim();
    //     }
    //     // 잔여 좌석수 / 시간 / 예약링크 등을 가지고오는 곳
    //     let $timetables = cheerio.load($(elem).html());
    //     let $timetablelist = $timetables("div").children(".type-hall").children(".info-timetable").children("ul").children("li");
    //     for (let i = 0; i < $timetablelist.length; i++) {
    //       let time = new Object();
    //       time["title"] = title;
    //       if ($($timetablelist[i]).find("a").text()) time["href"] = $($($timetablelist[i]).find("a")).attr("href");
    //       else time["href"] = null;
    //       time["time"] = $($timetablelist[i]).find("em").text();
    //       time["seat"] = $($timetablelist[i]).find("span").text();
    //       time["theater"] = data.theaters_seq;
    //       console.log(time);
    //       tuples.push(time);
    //     }
    //   }
    // });
  });

  PROMISE.all(prom)
    .then(async (result) => {
      let logdata = 0;

      // await promiseProcessing(tuples, logdata, db, mongod);
      await mongo.insertCgvData(tuples, logdata, db, mongod);
    })
    .catch((err) => {
      console.log(err);

      throw err;
    });
}

//moviemongo.js의 insertCgvData로 옮김
// let promiseProcessing = async (data, count, db, mongod) => {
//   // console.log(data.length)
//   if (count == data.length) {
//     console.log("데이터 없음");
//     mongod.close();
//     return "end";
//   }
//   db.collection("movie")
//     .find({ SUBJECT: data[count].title }, {})
//     .toArray()
//     .then((result) => {
//       if (result.length == 0) {
//         db.collection("movie")
//           .find({}, {})
//           .toArray()
//           .then((result) => {
//             db.collection("movie")
//               .insertOne({
//                 _id: ++add_seq,
//                 SUBJECT: data[count].title,
//                 COUNTRY: "대한민국",
//                 GENRE: "",
//                 DIRECTOR: "",
//                 SUMMARY: "",
//                 GRADE: "",
//               })
//               .then(() => {
//                 db.collection("movie_play")
//                   .insertOne({
//                     MOVIE_SEQ: add_seq,
//                     THEATERS_SEQ: data[count].theater,
//                     START_TIME: data[count].time,
//                     RUNNING_TIME: "",
//                     SEATS: "100",
//                     SEATS_LEFT: data[count].seat.replace("잔여좌석", "").replace("석", "").replace("마감", "0").replace("매진", "0").replace("준비중", "0"),
//                     LINK: data[count].href,
//                   })
//                   .then(() => {
//                     promiseProcessing(data, count + 1, db, mongod);
//                     return;
//                   });
//               });
//           });
//       } else {
//         db.collection("movie_play")
//           .insertOne({
//             MOVIE_SEQ: result[0]._id,
//             THEATERS_SEQ: data[count].theater,
//             START_TIME: data[count].time,
//             RUNNING_TIME: "",
//             SEATS: "100",
//             SEATS_LEFT: data[count].seat.replace("잔여좌석", "").replace("석", "").replace("마감", "0").replace("매진", "0").replace("준비중", "0"),
//             LINK: data[count].href,
//           })
//           .then(() => {
//             promiseProcessing(data, count + 1, db, mongod);
//             return;
//           });
//       }
//     });
// };

Clolling();
