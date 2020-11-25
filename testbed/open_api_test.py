import requests
import json

from urllib import parse

with open('config.json', 'r') as f:
    config = json.load(f)
'''
testKey = config['KOBIS_API_KEY']

keyArg = "key="
targetDtArg = "targetDt="
movieCodeArg = "movieCd="
movieNameArg = "movieNm="

# 일별 박스 오피스
url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
url += keyArg + testKey
url += "&" + targetDtArg + "20200605"    # 2020-06-05

responseData = requests.get(url).text
result = json.loads(responseData)

for boxOffice in result["boxOfficeResult"]["dailyBoxOfficeList"]:
    print(boxOffice["movieNm"] + " : " + boxOffice["movieCd"])

    url2 = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?"
    url2 += keyArg + testKey
    url2 += "&" + movieCodeArg + boxOffice["movieCd"]

    movieResponseData = requests.get(url2).text
    movieResult = json.loads(movieResponseData)

    movieInfo = movieResult["movieInfoResult"]["movieInfo"]

    print("\n영화제목")
    print(movieInfo["movieNm"])

    print("\n장르")
    for genres in movieInfo["genres"]:
        print(genres["genreNm"])

    print("\n감독")
    for directors in movieInfo["directors"]:
        print(directors["peopleNm"])

    print("\n배우")
    for actors in movieInfo["actors"]:
        print(actors["peopleNm"])

    break

url3 = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?"
url3 += keyArg + testKey
url3 += "&" + movieNameArg + "설국열차"

movieListResponseData = requests.get(url3).text
movieListResult = json.loads(movieListResponseData)

movieListInfos = movieListResult["movieListResult"]["movieList"]

for movieListInfo in movieListInfos:
    url4 = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?"
    url4 += keyArg + testKey
    url4 += "&" + movieCodeArg + movieListInfo["movieCd"]

    findResponseData = requests.get(url4).text
    findResult = json.loads(findResponseData)

    movieInfo = findResult["movieInfoResult"]["movieInfo"]

    print("\n영화제목")
    print(movieInfo["movieNm"])

    print("\n영화코드")
    print(movieListInfo["movieCd"])

    print("\n장르")
    for genres in movieInfo["genres"]:
        print(genres["genreNm"])

    print("\n감독")
    for directors in movieInfo["directors"]:
        print(directors["peopleNm"])

    print("\n배우")
    for actors in movieInfo["actors"]:
        print(actors["peopleNm"])

    break

"""
from movie_open_api import MovieOpenAPI

movieOpenAPI = MovieOpenAPI()
print(movieOpenAPI.getMovieGenres("명량"))
print(movieOpenAPI.getMovieDirectors("명량"))
for director in movieOpenAPI.getMovieDirectors("명량"):
    print("\n" + director + " 필모")
    print(movieOpenAPI.getPeopleFilmos(director, False, True))

print(movieOpenAPI.getMovieActors("명량"))
for actor in movieOpenAPI.getMovieActors("명량"):
    print("\n" + actor + " 필모")
    print(movieOpenAPI.getPeopleFilmos(actor, True, True))
"""
'''

testKey = config['TMDB_API_KEY']

'''
query = {
         'language' : 'ko-KR',
         'query' : '다만 악에서 구하소서 파이널컷',
         'page' : 1
        }

url = "https://api.themoviedb.org/3/search/movie?api_key=" + testKey + "&"
url += parse.urlencode(query, encoding='UTF-8', doseq=True)

print(url)

responseData = requests.get(url).text
result = json.loads(responseData)

print(result)

print(result["results"][0]["id"])
print(result["results"][0]["title"])
print(result["results"][0]["overview"])
print(result["results"][0]["poster_path"])
'''

'''
query = {
            'api_key' : testKey,
            'language' : 'ko-KR',
            'query' : '성동일',
            'page' : 1
        }

url = "https://api.themoviedb.org/3/search/person?"
url += parse.urlencode(query, encoding='UTF-8', doseq=True)

responseData = requests.get(url).text
result = json.loads(responseData)

print(result)


query = {
            'api_key' : testKey,
            'language' : 'ko-KR',
            'query' : '데이비드 맥기니스',
            'page' : 1
        }

url = "https://api.themoviedb.org/3/search/person?"
url += parse.urlencode(query, encoding='UTF-8', doseq=True)

responseData = requests.get(url).text
result = json.loads(responseData)

print(result)
'''