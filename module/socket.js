//웹 소켓 IO
let sockIO = (server) => {
    
    let WebSocketServer = require('ws')
    
    // 서버가 생성 되었을때 
    // express로도 서버가 공유되고 해당서버 값을 받아와
    // 웹소켓 서비스를 진행할 서버도 생성했습니다.
    let wss = new WebSocketServer.Server({server})
    //
    wss.on('connection', (connetion) => {
        // 어떻게 될지 몰라 미리 만들어놓은 유저 객체입니다
        let user = new Object();
        let userlist = new Array();

        if(userlist)
        user['no'] = i++;
        user['conn'] = connetion;
        console.log('conectServer')
        userlist.push(user)
        console.log(userlist)
        connetion.on('message', (message) => {
            let data;
            // 데이터가 정상적으로 들어왔는지에 대한 점검
            try {
                data = JSON.parse(message)
            } catch (e) {
                data = {}
                console.log("데이터가 정상적인 형식으로 들어오지 않았습니다.")
            }


            let sendMessage = new ArrayBuffer()
            // 웹브라우저에서 클라이언트 소켓을 톻에 들어오는 정보값중
            // type을 분석하여 대처하고 해당하는 작업을 처리합니다.
            switch (data.type) {
                case "open" :
                    console.log("여기까지 들어옴")
                    sendMessage['type'] = 'resend'
                    sendMessage['message'] = 'Is This True????'
                    console.log(sendMessage)
                    connetion.send(JSON.stringify(sendMessage))
                    console.log("성공")
                case "chat":
                    for(var d = 0 ; d < userlist.length ; d++){
                        sendMessage['type'] = 'chat'
                        sendMessage['message'] = 'Chat Success?'
                        userlist[d].conn.send(JSON.stringify(sendMessage))
                    }
            }
        })
    })
}

module.exports = sockIO