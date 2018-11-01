$(function () {

    var token = $.cookie('token');          //获取存在cookie中的token
    var id = $.cookie('id');               //获取存在cookie中的用户标识id
    var username = $.cookie('username') //获取存在cookie中的用户名
    var idpass = $.cookie('pass')            //获取存在cookie中的用户登录密码


    // $('#updatename').attr('placeholder',username) //修改密码时，将用户名直接填入文本框，用户名禁止修改

    console.log(id + '-----' + idpass)
    //添加管理员
    $('#Home_addbtn').click(function () {

        var name = $('#addname').val();
        var pass = $('#addpassword').val();
        var passs = $('#addpasswords').val();
        var data = JSON.stringify({username: name, password: pass})                   //转为JSON字符串

        if (name == '' || pass == '' || passs == '') {
            alert('用户名或者密码不能为空')
        } else if (pass != passs) {
            alert('两次密码输入不一致')
        } else {
            $.ajax({
                async: true,
                type: 'POST',
                url: 'http://jie.nat300.top/junran/manage/operator/upsert',
                data: data,
                dataType: 'JSON',
                contentType: "application/JSON;charset=UTF-8",
                headers: {"token": token},
                success: function (data) {
                    console.log(data)
                    var code = data.code;
                    if (code == 103) {                                  //判断身份是否过期
                        alert('身份过期，请重新登录')
                        window.parent.location.href = '../login/login.html'        //身份过期重新登录
                    } else if (code == 0) {
                        alert('添加成功');
                        $('#addname').val('');           //添加成功后清除文本框
                        $('#addpassword').val('');
                        $('#addpasswords').val('');
                        location.reload();    //添加完成后刷新页面


                    } else if (code == 1003) {
                        alert('账号已存在')
                    }
                }
            })
        }

    })

    //修改管理员
    $('#Home_updatbtn').click(function () {
        var name = $('#updatename').val();
        var pass = $('#updatepassword').val();
        var passs = $('#updatepasswords').val();
        var passnew = $('#updatepasswordnew').val()
        var data = JSON.stringify({username: name, password: passnew, id: id})
        if (name == '' || pass == '' || passs == '' || passnew == '') {
            alert('用户名或者密码不能为空')
        } else if (passs != passnew) {
            alert('两次密码输入不一致')
        } else if (username != name) {
            alert('您没有权限修改他人信息！')
        } else if (pass != idpass) {
            alert('密码错误')
        } else {
            $.ajax({
                async: false,
                url: 'http://jie.nat300.top/junran/manage/operator/upsert',
                type: 'POST',
                data: data,
                dataType: 'JSON',
                contentType: 'application/JSON;charset=UTF-8',
                headers: {'token': token},
                success: function (data) {

                    if (data.code == 0) {
                        console.log(data)
                        alert('修改成功');
                        $.cookie('pass', passnew, {path: '/'})
                        location.reload();             //修改完成后重新加载页面
                    } else {
                        alert('修改失败')
                    }
                }
            })
        }
    })


})