// 영화관 정보값을 DB로부터 받아오는 API 부분입니다
// [12.04] : 영화관 정보 불러오는 API
/*
각 테이블에서 정보값들에 대한 정보입니다.
theaters:{
 _id : 극장 내부코드
 theaters : 극장 대표 회사 (ex CGV , LOTTE , MEGABOX)
 theaters_seq : 극장 실제코드
 th_name : 극장 이름
}

movie_play{
"_id": "5fc9e6e2c229464e94678be2",
"MOVIE_SEQ": 내부 영화코드
"THEATERS_SEQ": 영화관 코드
"START_TIME": 상영시간
"RUNNING_TIME": "",
"SEATS": 100으로 고정값 사용할 의미가 없습니다
"SEATS_LEFT": 남은 좌석수 ( 0 이면 마감or매진 으로 처리되어져있습니다)
"LINK": 티켓 끊는 주소
}
movie{
_id : 내부영화코드 == MOVIE_SEQ 와 같습니다
SUBJECT : 영화 제목
}
각 데이터들은 대부분 Array로 반환되며 접근했을때 for each문으로 프론트에서
꾸미게 되면 각 지정된 이름을 통해 정보를 호출할수 있습니다.

호출법 예시
호출명.th_name -> 극장이름 호출

*/


let express = require('express');
let router = express.Router()
let mongo  = require('../module/moviemongo')
console.log("영화관 파싱")


// 영화관 전체에 대한 데이터
router.get('/theater',(async (req, res) => {
    console.log("영화관 정보전달")
    await mongo.alltheaterfound((result)=>{
        //theaters를 반환합니다
        res.send(result)
    })
}))


// 특정 영화관에 대한 정보값 가지고 오기
router.get('/theater/:thseq',((req, res) => {
    let seq = req.params.thseq;
    mongo.searchTheater(seq,(result)=>{
        // theaters 하나만 반환
        res.send(result)
    })
}))


// 영화관 넘버를 통해 해당 극장 상영중인 영화리스트 전달
router.get('/theatermv/:thseq',((req, res) => {
    let seq = req.params.thseq;
    mongo.playonMovieth(seq,(result)=>{
        // movie_play를 반환합니다.
        res.send(result)
    })
}))


// 현재 상영중인 영화만 호출해서 보여주기
router.get('/playmv/',((req, res) => {
    mongo.playonMovie((result)=>{
        // 해당 Reasult는 단순하게 영화제목 문자열 리스트를 반환합니다
        res.send(result)
    })
}))


// 내부영화 코드로 현재 상영하고 있는 상영관 검색
router.get('/playmv/:mveq',((req, res) => {
    let seq = req.params.mveq;
    mongo.playonMovieTH(seq,(result)=>{
        //theaters를 반환합니다.
        res.send(result)
    })
}))


module.exports = router