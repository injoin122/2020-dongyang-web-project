const axios = require("axios");
const cheerio = require("cheerio");

let CGVcrawiling = {
  getHtml: async (url) => {
    try {
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  },

  getMovieList: (body, theaters) => {
    var tuples = [];

    const $ = cheerio.load(body.data);

    const $movieList = $("body > div > div.sect-showtimes > ul > li");
    $movieList.map((i, elem) => {
      // 영화 제목 가져오기
      if ($(elem).find("strong").text()) {
        title = $(elem).find("div > div.info-movie > a > strong").text().trim();
      }
      // 잔여 좌석수 / 시간 / 예약링크 등을 가지고오는 곳
      let $timetables = cheerio.load($(elem).html());
      let $timetablelist = $timetables("div").children(".type-hall").children(".info-timetable").children("ul").children("li");
      for (let i = 0; i < $timetablelist.length; i++) {
        let time = new Object();
        time["title"] = title;
        if ($($timetablelist[i]).find("a").text()) time["href"] = $($($timetablelist[i]).find("a")).attr("href");
        else time["href"] = null;
        time["time"] = $($timetablelist[i]).find("em").text();
        time["seat"] = $($timetablelist[i]).find("span").text();
        time["theater"] = theaters.theaters_seq;
        // console.log(time);
        tuples.push(time);
      }
    });
    return tuples;
  },

  getTimetable: (movie) => {
    var tuples = [];
    const timetables = movie.find("div > div.type-hall > div.info-timetable > ul > li");

    timetables.each(function (i, elem) {
      tuples[i] = {
        link: timetables.find("a").attr("href"),
        time: timetables.find("a > em").text(),
        seat: timetables.find("a > span").text(),
      };
    });
    return tuples;
  },
};

module.exports = CGVcrawiling;
