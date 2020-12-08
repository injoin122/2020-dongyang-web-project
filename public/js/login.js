const login = ()=>{
    console.log($('#userId').val())
    if($('#userId').val() ==''){
        alert("Id입력해주세요")
        $('#userId').focus()
    }else if($('#userPwd').val() == ''){
        alert("패스워드 입력해주세요")
        $('#userPwd').focus()
    }else{
        $.ajax({
            url:"/user/login",
            type:"POST",
            data:{id:$('#userId').val(),pwd:$('#userPwd').val()},
            success:(result)=>{
                console.log(result)
                if(result=='1'){
                    alert('해당하는 유저가 존재하지 않습니다')
                }else if(result=='2'){
                    alert('비밀번호를 재확인해주세요')
                }else{
                    window.location.href="/home"
                }
            },
            dataType:"text"
        })
    }
}

let gojoin = ()=>{
    window.location.href = "/join"
}