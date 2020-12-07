
$("#join-submit").click((e)=>{
    if (!document.getElementById('join').checkValidity()) {
    } else {
        e.preventDefault()
        if ($('#inputId').val() == '') {
            alert("아이디가 입력되지 않았습니다")
            $('#inputId').focus()
        } else if ($('#inputPassword').val() == '') {
            alert("비밀번호가 입력되지 않았습니다")
            $('#inputPassword').focus()
        } else if ($('#inputPasswordCheck').val() == '') {
            alert("비밀번호 체크가 입력되지 않았습니다")
            $('#inputPasswordCheck').focus()
        } else if ($('#inputEmail').val() == '') {
            alert("이메일이 입력되지 않았습니다")
            $('#inputEmail').focus()
        } else if ($('#inputMobile').val() == '') {
            alert("휴대폰입력이 되지 않았습니다")
            $('#inputMobile').focus()
        } else if ($('#inputPassword').val() != $('#inputPasswordCheck').val()) {
            alert("비밀번호 재확인 부탁드립니다")
        } else {
            let lastcheck = confirm("회원가입 하시겠습니까?")
            if (lastcheck) {
                $.ajax({
                    type: "POST",
                    url: "/user/join",
                    data: {
                        id: $('#inputId').val(),
                        pwd: $('#inputPassword').val(),
                        email: $('#inputEmail').val(),
                        mobile: $('#inputMobile').val()
                    },
                    success: function (result) {
                        console.log(result)
                        if (result == 1) {
                            alert("동일명의 유저가 존재합니다. 다시 입력해주세요")
                        } else if (result == 2) {
                            alert("DB Error")
                        } else {
                            console.log("여기야")
                            window.location.href = "/home"
                        }
                    },
                    error: function (e) {
                        console.log(e)
                    },
                    dataType: "text"
                })
            } else {
                return
            }
        }
    }
})