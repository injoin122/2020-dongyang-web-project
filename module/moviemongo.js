// 이름 : movieMongo
// 일시 : 11.26
// 영화 크롤링 관련된 몽고DB 처리를 담당하는 곳입니다.
// 일반 몽고DB에 너무 많은 처리데이터가 생길것 같아 한쪽으로 뺴놓았습니다.

let mongoClient = require('mongodb').MongoClient
let objectId = require('mongodb').ObjectID

// null 값에 대한 처리를 위해 불러온 모듈
// 최근 자바에서 사용되는 Optional과 유사하다고 생각합니다.
let assert = require('assert')
let url = 'mongodb://uikanghome.iptime.org:3001';
let mongodb = "test"
let mondb = ""

//Mongo mainDB명
function connMongo (callback){
    mongoClient.connect(url,(err,db)=>{
        // assert.equal(null,err);
        if(err){
            console.log(err)
        }
        console.log("Connect Succes to Server")
        db.close()
    })

}

// 변경해도 상관없습니다.
// 기본적으로
// 메소드명 : () =>{} 로 만들었지만
// 더 좋은 방식이 있으면 그 방향으로 따라 가겠습니다.
// 기본적으로 해당 부분에서는 (필요한 처리 정보값, res) 형태의 구조로 생성하였습니다
let mongo = {
    // theaters : 영화관 코드를 불러오는 몽고구문
    // 영화관 크롤링 작업을 앞서 해당 영화관에 대한 정보값들을 가지고오는 구문이다.
    gettheaters : (callback)=>{
        mongoClient.connect(url, (err,db)=>{
            console.log("호출")
            if(err){
                db.close()
                console.log(err)
                throw err
                return
            }
            mondb = db.db(mongodb)
            mondb.collection('theaters').find({},{'_id':'0','theaters_seq':'1'}).toArray((err,result)=>{
                if(err){
                    console.log(err)
                    throw  err
                    return
                }
                let data = result
                db.close()
                callback(data)
            })
        })
    }

}

module.exports = mongo;
