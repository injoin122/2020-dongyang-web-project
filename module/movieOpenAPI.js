const request = require("request");

const KOBIS_API_KEY = "5a616755c609136c99d80a46c29b66fc";
const TMDB_API_KEY = "4d3d61f7c0dea3ae87ef5c5d9cf996ee";


function getMoviePosterPath(movieName) {
    //영화 정보 가져오기
    var poster_path = "";
    var url = "https://api.themoviedb.org/3/search/movie?";
    url += "&api_key=" + TMDB_API_KEY;
    url += "&language=ko-KR";
    url += "&query=" + movieName;
    url += "&page=1";
    console.log(url);

    let options = {
        uri: url,
        method: 'GET',
        json: true //json으로 보낼경우 true로 해주어야 header값이 json으로 설정됩니다.
    };

    request(options, function (error, response, body) {
        console.log(response);
        var data = response;
    });
    return poster_path;
}

getMoviePosterPath("pass");