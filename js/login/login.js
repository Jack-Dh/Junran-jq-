$(function () {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            /// 当点击浏览器的 后退和前进按钮 时才会被触发，
            window.history.pushState('forward', null, '');
            window.history.forward(1);
        });
    }
    //
    window.history.pushState('forward', null, '');  //在IE中必须得有这两行
    window.history.forward(1);


    $('.login_but').click(function () {
        $('.loding').show()
        var userName = $('#userName').val();
        var passWord = $('#passWord').val()
        if ((userName == '') || (passWord == '')) {        //校验用户名或者密码是否为空
            alert('用户名或者密码不能为空')
            $('.loding').hide()
        } else {
            var data = JSON.stringify({username: $('#userName').val(), password: $('#passWord').val()})    //获取用户输入的用户名与密码
            // console.log(data)
            $.ajax({
                async: true,
                type: "POST",
                url: login,
                data: data,
                dataType: 'JSON',
                contentType: "application/JSON;charset=UTF-8",
                success: function (data) {
                    $('.loding').hide()
                    if (data.code != 0) {         //登录异常
                        alert(data.message)
                    } else {

                        var code = data.code   //获取后端返回的状态码
                        var username = data.rs.operator.username //获取后端返回登录账号
                        var loginname = data.rs.operator.name//获取用户的昵称
                        var message = data.message  //获取返回状态
                        var token = data.rs.token   //登录后获取token
                        var id = data.rs.operator.id   //获取到用户唯一标识ID
                        var pass = data.rs.operator.password  //获取用户的密码
                        var createTime = data.rs.operator.createTime//获取用户注册的时间


                        // $.cookie('token', token);      //储存token到cookie中
                        $.cookie('token', token, {path: '/'});//储存token到cookie中
                        $.cookie('id', id, {path: '/'})    //将用户id存到cookie
                        $.cookie('pass', pass, {path: '/'}) //将用户的密码存到cookie
                        $.cookie('username', username, {path: '/'}) //将用户账号存到cookie
                        $.cookie('createTime', createTime, {path: '/'})//将用户注册的时间存到cookie
                        $.cookie('loginname', loginname, {path: '/'})//将用户昵称存到cookie

                        window.location.href = '../HonePage/HonePage.html' //?name=' + username + ''用户名密码验证成功后传递参数到下个页面


                    }


                }
            });
        }


        // var data = JSON.stringify({username: $('#userName').val(), password: $('#passWord').val()})
        // // console.log(data)
        // $.ajax({
        //     async: false,
        //     type: "POST",
        //     url: "http://192.168.1.199:8080/junran/manage/login",
        //     data: data,
        //     dataType: 'JSON',
        //     contentType: "application/JSON;charset=UTF-8",
        //     success: function (data) {
        //         console.log(data);
        //
        //
        //         var code=data.code   //获取后端返回的状态码
        //         var username=data.rs.operator.name //获取后端返回登录昵称
        //
        //         // console.log(username);
        //         // if (code=)
        //        console.log(code)
        //
        //     }
        // });

    })
})