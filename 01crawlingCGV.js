////////////// 크롤링 시작
const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
console.log("test");
const getHtml = async () => {
  try {
    return await axios.get("http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=0001");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $movieList = $("body > div > div.sect-showtimes > ul > li");

    $movieList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('div > div.info-movie > a > strong').text(),
          url: $(this).find('div > div.type-hall > div.info-timetable > ul > li > a').attr('href'),
          time : $(this).find('div > div.type-hall > div.info-timetable > ul > li > em').text(),
          seat : $(this).find('div > div.type-hall > div.info-timetable > ul > li > span').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
