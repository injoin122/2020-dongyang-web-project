////////////// 크롤링 시작
const axios = require("axios");
const cheerio = require("cheerio");
const requests = require("requests");
const log = console.log;
console.log("test");
var url = "https://www.lottecinema.co.kr/LCWS/Ticketing/TicketingData.aspx"
var parameters = {
    "MethodName":"GetPlaySequence",
    "channelType":"MA",
    "osType":"",
    "osVersion":"",
    "playDate":"2020-11-29",
    "cinemaID":"1|1|9010",
    "representationMovieCode":""
}

var parameters2 = {"paramList":parameters}
response2 = requests.post(url,data=parameters2).json();
movies_response2 = response2['PlaySeqs']['Items'];

console.log(movies_response2);