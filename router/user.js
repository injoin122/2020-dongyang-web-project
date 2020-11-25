// 유저의 처리 부분인 로그인 / 수정 / 삭제 등을
// 작업하는 부분으로 생각하고 만들게 되었습니다.

let express = require('express');
let router = express.Router()
console.log("user 라우팅 파싱")
router.use(express.json())
let mongo = require('../module/mongodb')


router.post('/join',((req, res) => {
    // console.log(JSON.parse(req.body.data))
    let userdata = JSON.parse(req.body.data)
    // console.log(userdata[0].id);
    // console.log()
    mongo.insertUser(userdata[0].id,userdata[0].pwd,userdata[0].name,userdata[0].email,userdata[0].address,userdata[0].check,userdata[0].option,res)
    let data = {data : '성공',sys:'실패'}

    // res.send(data)
}))

router.post('/idcheck',((req, res) => {
    console.log(req.body.data)
    mongo.checkUser(req.body.data,res)
}))

router.post('/login',((req, res) => {
    console.log(req.body.data)
    let sess = req.session
    let userdata = JSON.parse(req.body.data)
    mongo.loginCheck(userdata[0].id,userdata[0].pwd,res,sess)
}))

router.delete('/delete',((req, res) => {


}))

router.get('/logout',(((req, res) => {
    req.session.destroy()
    res.redirect('/home')
})))

module.exports = router