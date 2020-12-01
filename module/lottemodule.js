// 크롤링전 기초작업으로 url을 호출하여 html 데이터 수집
let request = require('request')
let Axios = require('axios')

// nodejs에서의 크롤링 도구
// Jquery를 통해 지정하고 크롤링을 할수있게 해줌
let cheerio = require('cheerio')
let mongo  = require('./moviemongo')




