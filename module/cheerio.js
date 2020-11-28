let request = require("request");
let cheerio = require("cheerio");
let axios = require("axios");

let mongo = require("./moviemongo");

let datetime = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
let dateformat = datetime.split(" ")[0];

let movieSearch = (data) => {
  for (let count = 0; count < data.length; count++) {
    console.log(data[count].theaters_seq);
    let cgv = "http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=" + data[count].theaters_seq.replace("C-", "") + "&date=20200529";

    request.get({ url: cgv }, (err, res, body) => {
      let $ = cheerio.load(body);
      let $testlist = $("body").children("div").children("div.sect-showtimes").children("ul").children("li");
      $testlist.each((i, elem) => {
        let title;
        let tuples = [];
        // 영화 제목 가져오기
        if ($(elem).find("strong").text().trim()) title = $(elem).find("strong").text().trim();

        // 잔여 좌석수 / 시간 / 예약링크 등을 가지고오는 곳
        let $timetables = cheerio.load($(elem).html());
        let $timetablelist = $timetables("div").children(".type-hall").children(".info-timetable").children("ul").children("li");
        for (let i = 0; i < $timetablelist.length; i++) {
          let time = new Object();
          if ($($timetablelist[i]).find("a").text()) time["link"] = $($($timetablelist[i]).find("a")).attr("href");
          time["time"] = $($timetablelist[i]).find("em").text();
          time["seat"] = $($timetablelist[i]).find(".txt-lightblue").text();
          tuples.push(time);
        }

        console.log(tuples);
      });
    });
  }
};

function movieCroll() {
  let moviecode = mongo.gettheaters(movieSearch);
  console.log(datetime.split(" ")[0]);
}

let lotteMovieSearch = () => {
  let dic = {
    MethodName: "GetInvisibleMoviePlayInfo",
    channelType: "HO",
    osType: "Chrome",
    osVersion: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36",
    cinemaList: "1|1|1017",
    movieCd: "",
    playDt: "2020-11-28",
  };
  let params = { paramList: JSON.stringify(dic) };
  let lotte = "https://www.lottecinema.co.kr/LCWS/Ticketing/TicketingData.aspx";

  request.post({ url: lotte, form: params }, (err, res, body) => {
    let $ = cheerio.load(body);
    let tuples = [];
    let $testlist = $("body").children("li");
    $testlist.each((i, elem) => {
      console.log(elem);
    });
  });
};

// movieCroll();
lotteMovieSearch();
