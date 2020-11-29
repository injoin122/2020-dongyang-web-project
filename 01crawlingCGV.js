////////////// 크롤링 시작
const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
console.log("test");
const getHtml = async () => {
  try {
    return await axios.get("http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=0001&date=20201130");
  } catch (error) {
    console.error(error);
  }
};

getHtml().then(html => {
    let timetables = [];
    const $ = cheerio.load(html.data);
    const $movieList = $("body > div > div.sect-showtimes > ul > li");

    $movieList.each(function(i, elem) {
      timetables[i] = {
          title : $(this).find('div > div.info-movie > a > strong').text(),
          timetable : getTimetable($(this))
      };
    });

    const data = timetables.filter(n => n.title);

    console.log("test1231313 ",data[0].timetable);
    return data;
  });

  function getTimetable (movie){
    var tuples = []
    const timetables = movie.find('div > div.type-hall > div.info-timetable > ul > li')
    
    timetables.each(function(i,elem){
      tuples[i] = {
        link : timetables.find('a').attr('href'),
        time : timetables.find('a > em').text(),
        seat : timetables.find('a > span').text()
      }
    })
    return tuples;
  }