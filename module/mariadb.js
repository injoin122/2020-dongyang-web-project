let mysqlc = require('mysql');

let mysqlconfig = require('../database')

let pool  = mysqlc.createPool(mysqlconfig)

let mysql = {
    getConn : ()=>{
        pool.getConnection((err,conn)=>{
            console.log("-----------입장-----------")
            if(err) {
                console.log(err)
                throw err
            }else{
                console.log("정상연결 확인")
            }
            console.log("----------------------")
            console.log("릴리즈 실행")
            conn.release()
            console.log("릴리즈 성공")
            console.log("----------------------")
        })

    }
}
module.exports = mysql
