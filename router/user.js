// 유저의 처리 부분인 로그인 / 수정 / 삭제 등을
// 작업하는 부분으로 생각하고 만들게 되었습니다.

let express = require('express');
let router = express.Router()
console.log("user 라우팅 파싱")
router.use(express.json())
let mongo = require('../module/mongodb')


router.post('/join',(async (req, res) => {
    let userdata = req.body
    await mongo.insertUser(userdata.id,userdata.pwd,userdata.email,userdata.mobile,(result)=> {
        console.log(result)
        if (result == 1) {
            res.send('1')
        }else if(result==2){
            res.send('2')
        }else{
            res.send("ok")
        }
    })
}))
router.post('/login',((req, res) => {
    let sess = req.session
    let userdata = req.body
    mongo.loginCheck(userdata.id,userdata.pwd,(result)=>{
        console.log(result)
        if(result==1)res.send('1')
        else if(result==2)res.send('2')
        else {
            sess.userId = userdata.id
            res.redirect("/home")
        }
    })
}))
router.delete('/delete',((req, res) => {

}))

router.get('/logout',(((req, res) => {
    req.session.destroy()
    res.redirect('/home')
})))

module.exports = router