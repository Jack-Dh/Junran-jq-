$(function () {
    $('.login_but').click(function () {
 // console.log(JSON.stringify({username:$('#userName').val(),password:$('#passWord').val()}))

        var data = JSON.stringify({username: $('#userName').val(), password: $('#passWord').val()})
        console.log(data)
        $.ajax({
            async: false,
            type: "POST",
            url: "http://192.168.1.199:8080/junran/manage/login",
            data:data ,
            dataType: 'JSON',
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                console.log(data)
            }

        })

    })
})