let mongoClient = require('mongodb').MongoClient
let objectId = require('mongodb').ObjectID
let crypto = require('crypto')
// null 값에 대한 처리를 위해 불러온 모듈
// 최근 자바에서 사용되는 Optional과 유사하다고 생각합니다.
let assert = require('assert')
let url = 'mongodb://uikanghome.iptime.org:3003';
let mongodb = "test"
let mondb = ""

//Mongo mainDB명
// function connMongo (callback){
//     mongoClient.connect(url,(err,db)=>{
//         // assert.equal(null,err);
//         if(err){
//             console.log(err)
//         }
//         console.log("Connect Succes to Server")
//         db.close()
//     })
//
// }

// 변경해도 상관없습니다.
// 기본적으로
// 메소드명 : () =>{} 로 만들었지만
// 더 좋은 방식이 있으면 그 방향으로 따라 가겠습니다.
// 기본적으로 해당 부분에서는 (필요한 처리 정보값, res) 형태의 구조로 생성하였습니다
let mongo = {
    connectCheck :async ()=>{
        connMongo();
    },
    insertUser : (id,pwd,email,mobile,callback)=>{
        mongoClient.connect(url,(err,db)=>{
            mondb = db.db(mongodb)
            mondb.collection('users')
                .findOne({_id:id})
                .then((result) =>{
                    console.log("들어옴")
                    if(result!=null) {console.log(result);callback(1);return ;}
                    try{
                        let salt = Math.round((new Date().valueOf() * Math.random())) + "";
                        let hashPassword = crypto.createHash("sha512").update(pwd + salt).digest("hex");
                        mondb.collection('users')
                            .insertOne({_id:id,pwd:hashPassword,email:email,mobile:mobile,salt:salt})
                            .then(err=>{callback("ok")})
                    }catch (e) {
                        throw e
                        console.log(3);
                        callback(2)
                    }finally {
                        db.close();
                    }
                })
        })
    },
    loginCheck:(id,pwd,callback)=>{
        mongoClient.connect(url,(err,db)=>{
            mondb = db.db(mongodb)
            mondb.collection('users').findOne({_id:id}).then((result)=>{
                if(result==null){db.close();callback(1);return }
                let salt = result.salt;
                let hashPassword = crypto.createHash("sha512").update(pwd + salt).digest("hex");
                if(hashPassword != result.pwd){db.close(),callback(2);return }
                else {db.close();callback(3);return}
            })
        })
    }
}

module.exports = mongo;
