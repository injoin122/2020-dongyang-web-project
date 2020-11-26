exports.test = () => {
  console.log("tesadfasfdst");

  //   for (let count = 0; count < data.length; count++) {
  //     console.log(data[count].theaters_seq);
  //     let cgv = "http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=" + data[count].theaters_seq.replace("C-", "") + "&date=20200529";
  //     // request 요청으로 데이터 처리중
  //     request.get({ url: cgv }, (err, res, body) => {
  //       let $ = cheerio.load(body);
  //       let $testlist = $("body").children("div").children("div.sect-showtimes").children("ul").children("li");
  //       $testlist.each((i, elem) => {
  //         let title;
  //         let tuples = [];
  //         // 영화 제목 가져오기
  //         if ($(elem).find("strong").text().trim()) title = $(elem).find("strong").text().trim();
  //         //
  //         // 잔여 좌석수 / 시간 / 예약링크 등을 가지고오는 곳
  //         let $timetables = cheerio.load($(elem).html());
  //         let $timetablelist = $timetables("div").children(".type-hall").children(".info-timetable").children("ul").children("li");
  //         for (let i = 0; i < $timetablelist.length; i++) {
  //           let time = new Object();
  //           if ($($timetablelist[i]).find("a").text()) time["link"] = $($($timetablelist[i]).find("a")).attr("href");
  //           time["time"] = $($timetablelist[i]).find("em").text();
  //           time["seat"] = $($timetablelist[i]).find(".txt-lightblue").text();
  //           tuples.push(time);
  //         }
  //         ///////
  //         console.log(tuples);
  //       });
  //     });
  //   }
};
