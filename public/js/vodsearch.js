let sc = document.getElementById('sc_data')
let search = ()=>{
    if($('#search').val()==""){alert("데이터 입력부탁드립니다");return ;}
    $('#sc_data').empty()
    $('#shbtn').attr("disabled",true)
    $('#shbtn').empty()
    $('#shbtn').html('<div class="spinner-border text-light" style="height: 25px;width: 25px;"></div>')
    console.log($('#search').val())
    $.ajax({
        url:"/movie/search",
        type:"POST",
        data:{search:$('#search').val()},
        success:(result)=>{
            console.log(result)
            if(result==""){
                sc.innerHTML = "<p>영화가 존재하지 않습니다.</p>"
            }else{
                sc.innerHTML = result;
            }
            $('#shbtn').empty()
            $('#shbtn').text('검색')
            $('#shbtn').removeAttr("disabled")

        },
        dataType:"html"
    })
}