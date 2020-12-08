let express = require("express");
let router = express.Router();
let mongo = require("../module/moviemongo");
console.log("영화관 파싱");

// 영화관 전체에 대한 데이터
router.get("/theater", async (req, res) => {
  console.log("영화관 정보전달");
  await mongo.alltheaterfound((result) => {
    //theaters를 반환합니다
    res.send(result);
  });
});

// 특정 영화관에 대한 정보값 가지고 오기
router.get("/theater/:thseq", (req, res) => {
  let seq = req.params.thseq;
  mongo.searchTheater(seq, (result) => {
    // theaters 하나만 반환
    res.send(result);
  });
});

// 영화관 넘버를 통해 해당 극장 상영중인 영화리스트 전달
router.get("/theatermv/:thseq", (req, res) => {
  let seq = req.params.thseq;
  mongo.playonMovieth(seq, (result) => {
    // movie_play를 반환합니다.
    res.send(result);
  });
});

// 현재 상영중인 영화만 호출해서 보여주기
router.get("/playmv/", (req, res) => {
  mongo.playonMovie((result) => {
    // 해당 Reasult는 단순하게 영화제목 문자열 리스트를 반환합니다
    res.send(result);
  });
});

// 내부영화 코드로 현재 상영하고 있는 상영관 검색
router.get("/playmv/:mveq", (req, res) => {
  let seq = req.params.mveq;
  mongo.playonMovieTH(seq, (result) => {
    //theaters를 반환합니다.
    res.send(result);
  });
});

module.exports = router;
