// 크롤링전 기초작업으로 url을 호출하여 html 데이터 수집
let request = require('request')
let Axios = require('axios')

// nodejs에서의 크롤링 도구
// Jquery를 통해 지정하고 크롤링을 할수있게 해줌
let cheerio = require('cheerio')
let mongo  = require('./moviemongo')

// 현재 국내시간을 구하기 위해서 만든 변수
let datetime = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
//date format을 파이선 모델링에서 구축 되어져있는
// yyyy-mm-dd 의 형태로 구현하기 위해 분할처리
let dateformat = datetime.split(" ")[0]
const PROMISE = require('bluebird')





// 함수명 : Clolling
// 일  시 : [11.26]
// 수정일시 : [11.27]
// -CGV의 영화관 코드 관련 크롤링 처리 완료
// -크롤링 처리만 완료되었음 insert는 아직 미구현
// -C0001 데이터는 정상 실행 확인
//
// 문제
// - 현재 영화과 상영되지 않고 해당시간만있는 영화관 같은경우에
//   제목이 입력되지 않는 현상 발생
// - 데이터 Insert 시에 기존에 있던 파이선은 순차적으로 진행되지만
//   Node에서는 비동기 방식으로 인해 Movie_seq가 겹치는 현상 일어남
// [11-28] - 동기식 처리를 위해 코드 수정중
//           해결법 찾아야 됨
async function Clolling(){
    let p1 = Promise.resolve()
    let p2 = Promise.resolve()
    let movie_seq = 0;
    let add_seq = 0;
    let add_play_seq = 0;
    let title = ''
    let mongod = await mongo.mongConnect();
    let db = await mongod.db('test')
    let data = await db.collection('theaters').find({},{_id:'0',theaters_seq:'1'}).toArray();
    console.log(data);
    mongod.close()
    // BlueBird 모듈을 통해 하단의 코드를 PROMISE ALL을 통해
    // 순차적으로 처리를 하게 끔 만들 계획
    let array = new Array();
    var prom = data.map((item)=>{
        
    })

    

    // 동기처리 실패
    // 초기 동기 처리 모델 링
    // console.log(data)
    // 하단의 방식으로는 C-0001 첫번쨰 영화에 
    // 대해서만 정보값을 가지고는 문제가 생겼습니다.
    // 영화 및 현재 상영중인 영화에대한 인서트 코드도 일단은 존재합니다.
     for(let count = 0 ; count < data.length ; count++){
         console.log(count)
         let cgv = 'http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode='+data[count].theaters_seq.replace("C-","")+'&date=20201127'
         // console.log(cgv)
         let body = await Axios.get(cgv)
         // console.log(body)
         let $ =  cheerio.load(body.data)
         p1 = p1.then(()=>{
             let $movielist =  $('body').children('div').children('div.sect-showtimes').children('ul').children('li')
             return $movielist
         })
         p1.then(($movielist) =>{
             let tuples = new Array()
             $movielist.map( (i,elem)=>{
                 // p2 동기처리 위한 부분
                 p2 = p2.then(()=>{
                     let time =  new Object();
                     // 영화 제목 가져오기
                     if ($(elem).find('strong').text().trim()) {
                         title =  $(elem).find('strong').text().trim();
                         time['title'] = title
                     }
                     // 잔여 좌석수 / 시간 / 예약링크 등을 가지고오는 곳
                     let $timetables =  cheerio.load($(elem).html())
                     let $timetablelist =  $timetables('div').children('.type-hall').children('.info-timetable').children('ul').children('li')
                     for(let i = 0; i < $timetablelist.length;i++){
                         if($($timetablelist[i]).find('a').text()) time['link'] =  $($($timetablelist[i]).find('a')).attr('href')
                         else time['link'] = null
                         time['time'] =  $($timetablelist[i]).find('em').text()
                         time['seat'] =  $($timetablelist[i]).find('span').text()
                         tuples.push(time)
                     }
                     return tuples
                 })

             })
         })
     }
     
     // 리턴 처리
     p2.then((array)=>{
         console.log(array)
     })
    
}

Clolling()
