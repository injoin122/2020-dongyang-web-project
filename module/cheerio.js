// 크롤링전 기초작업으로 url을 호출하여 html 데이터 수집
let request = require('request')

// nodejs에서의 크롤링 도구
// Jquery를 통해 지정하고 크롤링을 할수있게 해줌
let cheerio = require('cheerio')


let mongo  = require('./moviemongo')

// 현재 국내시간을 구하기 위해서 만든 변수
let datetime = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
//date format을 파이선 모델링에서 구축 되어져있는
// yyyy-mm-dd 의 형태로 구현하기 위해 분할처리
let dateformat = datetime.split(" ")[0]


// 함수명 : movieSearch
// 일  시 : [11.26]
// 수정일시 :
// -CGV의 영화관 코드 관련 크롤링 처리 완료
// -크롤링 처리만 완료되었음 insert는 아직 미구현
// -데이터는 정상 실행 확인
let movieSearch = (data) =>{
    for(let count = 0 ; count < data.length;count++){
        console.log(data[count].theaters_seq)
        let cgv = 'http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode='+data[count].theaters_seq.replace("C-","")+'&date=20200529'
        // request 요청으로 데이터 처리중
        request.get({url:cgv},(err,res,body)=>{
            let $ = cheerio.load(body)
            let $testlist = $('body').children('div').children('div.sect-showtimes').children('ul').children('li')
            $testlist.each((i,elem)=>{
                let title
                let tuples = []
                // 영화 제목 가져오기
                if ($(elem).find('strong').text().trim()) title = $(elem).find('strong').text().trim()
                //
                // 잔여 좌석수 / 시간 / 예약링크 등을 가지고오는 곳
                let $timetables = cheerio.load($(elem).html())
                let $timetablelist = $timetables('div').children('.type-hall').children('.info-timetable').children('ul').children('li')
                for(let i = 0; i < $timetablelist.length;i++){
                    let time = new Object();
                    if($($timetablelist[i]).find('a').text()) time['link'] = $($($timetablelist[i]).find('a')).attr('href')
                    time['time'] = $($timetablelist[i]).find('em').text()
                    time['seat'] = $($timetablelist[i]).find('.txt-lightblue').text()
                    tuples.push(time)
                }
                ///////
                console.log(tuples)
            })
        })
    }
}

// 함수명 : movieCroll
// 일  시 : 11:26
// 수정일시 :
// 몽고 DB에서 영화관 코드를 불러오기 위해 설정하고
// 콜백 함수를 통해 위에 만들어놓은 크롤링 함수를 전달하여
// url 파싱 작업을 원활히 수행할수 있게 함
function movieCroll(){
    let moviecode = mongo.gettheaters(movieSearch)
    console.log(datetime.split(" ")[0])
}


movieCroll()