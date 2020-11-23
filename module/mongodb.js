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
    connectCheck :async ()=>{
        connMongo();
    },
    insertUser : (id,pwd,name,email,address,check,option,res)=>{
        mongoClient.connect(url,(err,db)=>{
            // assert.equal(null,err);
            // console.log("Connect Succes to Server")
            if(err){
                db.close()
                res.send(err)
            }
            mondb = db.db(mongodb);
            mondb.collection('users').insertOne({
              id : id,
              pwd : pwd,
              name: name,
              email : email,
              address : address,
              check : check,
                // check부분은 프론트에서의 체크박스 폼 부분에 데이터를 받아오는 부분입니다.
                // [ ] <= 배열 형태로 데이터가 들어가는 것을 확인하였습니다.
              option : option
            },(err)=>{
                if(err){
                    console.log(err)
                    throw err
                    db.close()
                    res.send(err)
                }
                db.close()
                res.send("1")
            })
        })
    },

    checkUser:(id,res)=>{
        mongoClient.connect(url,(err,db)=>{
            // assert.equal(null,err);
            // console.log("Connect Succes to Server")
            if(err){
                res.send(err)
            }
            mondb = db.db(mongodb);
            let data = mondb.collection('users').count({
                id : id,
            },(err,result)=>{
                if(err){
                    console.log(err)
                    throw err
                    res.send("database error")
                }
                if(result!=0) {
                    db.close()
                    res.send('0')
                }else{
                    db.close()
                    res.send("1")
                }
            })
        })
    },

    loginCheck:(id,pwd,res,sess)=>{
        mongoClient.connect(url,(err,db)=>{
            assert.equal(null,err);
            // console.log("Connect Succes to Server")
            if(err){
                res.send(err)
            }
            mondb = db.db(mongodb);
            let data = mondb.collection('users').findOne({
                id : id,
                pwd : pwd
            },(err,result)=>{
                console.log(result)
                if(err){
                    console.log(err)
                    throw err
                    res.send("database error")
                }
                if(result==null) {
                    db.close()
                    res.send('로그인에 대한 정보값이 잘못됬습니다.')
                }else{
                    sess.userId = result.id;
                    sess.userName = result.name;
                    db.close()
                    res.send("1")
                }
            })
        })
    }


}

module.exports = mongo;
