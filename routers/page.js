// view 대한 처리 렌더링을 담당하는 부분입니다.

module.exports = function (app) {
    app.get('/login',((req, res) => {
        res.render('login')
    }))
    app.get('/join',((req, res) => {
        res.render('join')
    }))

    app.get('/home',((req, res) => {
        let sess = req.session

        res.render('home',{logdata : sess})
    }))

    // router.get('/chat',((req, res) => {
    //     res.render('chatclient')
    // }))
}



