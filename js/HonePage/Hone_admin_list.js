$(function () {
    var token = $.cookie('token')           //获取到存在cookie中的token
    var username = $.cookie('username') //获取存在cookie中的用户账号
    var loginname = $.cookie('loginname')//获取存在cookie中的用户昵称
    var idpass = $.cookie('pass')            //获取存在cookie中的用户登录密码
    var createTime = $.cookie('createTime') //获取存在cookie中的用户注册时间
    var id = $.cookie('id');               //获取存在cookie中的用户标识id

    console.log(token)
    //显示管理员添加面板
    $('.admin_add_but').click(function (event) {
        event.stopPropagation();
        $('.add_admin').show();
        $('.mask').show()
        return false
    })
    //关闭管理员添加模块面板
    $('.add_admin_shut').click(function () {
        $('.add_admin').hide()
        $('.mask').hide()
    })



    //添加管理员
    $('#Home_addbtn').click(function () {
        var username = $('#username').val(); //登录账号
        var name = $('#name').val();//登录名称
        var pass = $('#addpassword').val();//登录密码
        var passs = $('#addpasswords').val();//确认密码
        var data = JSON.stringify({username: username, name: name, password: pass})                   //转为JSON字符串

        if (name == '' || pass == '' || passs == '' || username == '') {
            alert('用户名或者密码不能为空')
        } else if (pass != passs) {
            alert('两次密码输入不一致')
        } else {
            $.ajax({
                async: true,
                type: 'POST',
                url: interfaceUrl+addAdmin,
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


    if (username != 'admin') {
        $('#Hone_admin_fenpage').remove()
        $('.text').remove()

    }

    //第一次请求接口加载接口中的参数
    $.ajax({
        async: false,
        type:'GET',
        url: interfaceUrl+adminList,
        data: {'size': 15},
        dataType: 'JSON',
        headers: {'token': token},
        success: function (data) {
            console.log(data)
            if (data.code == 103) {          //判断身份是否过期
                alert('身份过期，请重新登录')
                window.parent.location.href = '../login/login.html'        //身份过期重新登录
                // window.parent.location.href = '../login/login.html'        //身份过期重新登录
            } else if (data.code == 0) {
                console.log(data.data.length);
                if (data.data.length!=0){
                    $('#Hone_admin_fenpage').jqPaginator({
                        totalPages: data.pageCount,
                        pageSize: data.size,
                        visiblePages: 5,
                        currentPage: 1,
                        first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                        prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                        next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                        last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                        page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                        onPageChange: function (num) {

                            $('.text').html('当前第' + num + '页' + ',' + '共' + data.pageCount + '页')

                            //第二次请求接口并渲染页面
                            $.ajax({
                                async: false,
                                headers: {'token': token},
                                url: interfaceUrl+adminList,
                                data: {'size': 15, 'page': num - 1},
                                dataType: 'JSON',
                                success: function (data) {
                                    console.log(data)
                                    $('#Hone_admin_table .for_admin_list').remove()

                                    if (username == 'admin') {
                                        for (i = 0; i < data.data.length; i++) {               //拿到信息后遍历并渲染到页面
                                            var tr
                                            // tr = '<td>' + data.data[i].username + '<td>'
                                            var time
                                            time = '<tr class="for_admin_list">' +
                                                '<td>' + data.data[i].username + '</td>' +
                                                '<td>' + data.data[i].name + '</td>' +
                                                '<td>' + data.data[i].createTime + '</td>' +
                                                '<td>' + '<input flag="' + data.data[i].id + '" flagpassword="' + data.data[i].password + '" class="admin_updata_btn" type="button" value="修改">' + '</td>' + '</tr>'  //循环输出td并带上数据

                                            $('#Hone_admin_table').append(time)            //添加带数据的节点到表格中
                                        }
                                    } else if (username != 'admin') {
                                        $('.admin_add_but').remove()//判断如果登录的用户不是admin，则不允许添加管理员
                                        $('.admin_search').remove()//判断如果登录的用户不是admin，则不需要查询
                                        var time
                                        time = '<tr class="for_admin_list">' + '<td>' + username + '</td>' + '<td>' + loginname + '</td>' + '<td>' + createTime + '</td>' + '<td>' + '<input flag="' + id + '" flagpassword="' + idpass + '" class="admin_updata_btn" type="button" value="修改">' + '</td>' + '</tr>'  //循环输出td并带上数据
                                        $('#Hone_admin_table').append(time)            //添加带数据的节点到表格中

                                    }


                                    $(".for_admin_list:even").css("background-color", "#fff8f3");//为双数行表格设置背颜色素

                                    //修改管理员信息
                                    $('.admin_updata_btn').click(function (event) {
                                        event.stopPropagation();
                                        $('.mask').show()
                                        var flagid = $(this).attr('flag')
                                        var flagpassword = $(this).attr('flagpassword')
                                        var adminupdata =
                                            '<div class="updata_admin">' +
                                            '<p>' + '修改管理员' +
                                            '<img src="../../img/guanbi.png" class="updata_admin_shut">' +
                                            '</p>' +
                                            '<label>' + '用户账号' + '</label>' + '<input class="Home_updatainput" id="updateusername" placeholder="请输入账号" readonly  unselectable="on">'+  '<br>' +
                                            '<label>' + '用户昵称' + '</label>' + '<input class="Home_updatainput" id="updatename" placeholder="请输修改的昵称">' +  '<br>' +
                                            '<label>' + '用户密码' + '</label>' + '<input class="Home_updatainput" id="updatepassword" placeholder="请输入原密码" type="password">' +'<br>' +
                                            '<label>' + '新的密码' + '</label>' + '<input class="Home_updatainput" id="updatepasswordnew" placeholder="请输入新密码" type="password">' +'<br>' +
                                            '<label>' + '确认密码' + '</label>' + '<input class="Home_updatainput" id="updatepasswords" placeholder="请再次输入密码" type="password">' +'<br>' +
                                            '<button style="margin-bottom: 0.1rem" class="admin_updata_btn" id="Home_updatbtn" flag="' + flagid + '" flagpassword="' + flagpassword + '">' + '修改' + '</button>' +
                                            '</div>'
                                        $('.admin').append(adminupdata)
                                        var name = $(this).parent().prev().prev().prev().text() //获取用户登录账号
                                        var username = $(this).parent().prev().prev().text() //获取用户登录昵称

                                        $('#updateusername').val(name)
                                        $('#updatename').val(username)
                                        //关闭修改密码模块
                                        $('.updata_admin_shut').click(function () {
                                            $('.updata_admin').remove()

                                        })

                                        //确认修改按钮
                                        //修改管理员
                                        $('#Home_updatbtn').click(function () {
                                            var username = $('#updateusername').val();//用户账号
                                            var name = $('#updatename').val();//用户昵称
                                            var pass = $('#updatepassword').val();//用户密码
                                            var passs = $('#updatepasswords').val();//新的密码
                                            var passnew = $('#updatepasswordnew').val()//确认密码
                                            var updataid = $(this).attr('flag')
                                            var flagpassword = $(this).attr('flagpassword')
                                            console.log(updataid)
                                            var data = JSON.stringify({
                                                username: username,
                                                name: name,
                                                password: passnew,
                                                id: updataid
                                            })
                                            if (username == '' || name == '' || pass == '' || passs == '' || passnew == '') {
                                                alert('用户名或者密码不能为空')
                                            } else if (pass != flagpassword) {
                                                alert('密码错误')
                                                $('#updatepassword').val('');//用户密码
                                                $('#updatepasswords').val('');//新的密码
                                                $('#updatepasswordnew').val('')//确认密码
                                            } else if (passs != passnew) {
                                                alert('两次密码输入不一致')
                                            } else {
                                                $.ajax({
                                                    async: false,
                                                    url: interfaceUrl+updataAdmin,
                                                    type: 'POST',
                                                    data: data,
                                                    dataType: 'JSON',
                                                    contentType: 'application/JSON;charset=UTF-8',
                                                    headers: {'token': token},
                                                    success: function (data) {
                                                        console.log(data)
                                                        if (data.code == 0) {
                                                            console.log(data)
                                                            alert('修改成功');
                                                            $.cookie('pass', passnew, {path: '/'})
                                                            $.cookie('loginname', name, {path: '/'})
                                                            location.reload();             //修改完成后重新加载页面
                                                        } else {
                                                            alert('修改失败')
                                                        }
                                                    }
                                                })
                                            }
                                            return false
                                        })
                                        return false
                                    })


                                }

                            })

                        }
                    })
                }else {
                    var time
                    time = '<tr class="for_admin_list">' +
                        '<td>' + '暂无数据'+ '</td>' +
                        '<td>' +  '</td>' +
                        '<td>' + '</td>' +
                        '<td>' +  '</td>'+'</tr>'  //循环输出td并带上数据

                    $('#Hone_admin_table').append(time)
                }

            } else {
                alert('加载错误！')
            }

        }

    })
    //根据用户名搜索
    $(".admin_search").bind('input propertychange', function () {
        var name = $('.admin_search').val()

        if (name != '') {
            $.ajax({
                async: false,
                type: 'GET',
                url: interfaceUrl+adminList,
                headers: {'token': token},
                data: {'username': name, 'size': 15},
                success: function (data) {
                    $('.for_admin_list').remove()
                    $('#Hone_admin_fenpage').jqPaginator({
                        totalPages: data.pageCount,
                        pageSize: data.size,
                        visiblePages: 5,
                        currentPage: 1,
                        first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                        prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                        next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                        last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                        page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                        onPageChange: function (num) {
                            $('.text').html('当前第' + num + '页' + ',' + '共' + data.pageCount + '页')
                            //第二次请求接口，渲染根据关键字查询到的值
                            $.ajax({
                                async: false,
                                type: 'GET',
                                url: interfaceUrl+adminList,
                                data: {'username': name, 'page': num - 1, 'size': 15},
                                headers: {'token': token},
                                dataType: 'JSON',
                                success: function (data) {
                                    console.log(data)
                                    if (data.code == 103) {
                                        alert('身份验证过期，请重新登录');
                                        window.parent.location.href = '../login/login.html'
                                    } else if (data.code == 0) {
                                        $('.for_admin_list').remove()
                                        if (username == 'admin') {
                                            for (i = 0; i < data.data.length; i++) {               //拿到信息后遍历并渲染到页面
                                                var tr
                                                // tr = '<td>' + data.data[i].username + '<td>'
                                                var time
                                                time = '<tr class="for_admin_list">' + '<td>' + data.data[i].username + '</td>' + '<td>' + data.data[i].name + '</td>' + '<td>' + data.data[i].createTime + '</td>' + '<td>' + '<input flag="' + data.data[i].id + '" flagpassword="' + data.data[i].password + '" class="admin_updata_btn" type="button" value="修改">' + '</td>' + '</tr>'  //循环输出td并带上数据

                                                $('#Hone_admin_table').append(time)            //添加带数据的节点到表格中
                                            }


                                        } else if (username != 'admin') {
                                            $('.admin_add_but').remove()//判断如果登录的用户不是admin，则不允许添加管理员
                                            var time
                                            time = '<tr class="for_admin_list">' + '<td>' + username + '</td>' + '<td>' + loginname + '</td>' + '<td>' + createTime + '</td>' + '<td>' + '<input flag="' + id + '" flagpassword="' + idpass + '" class="admin_updata_btn" type="button" value="修改">' + '</td>' + '</tr>'  //循环输出td并带上数据
                                            $('#Hone_admin_table').append(time)            //添加带数据的节点到表格中

                                        }
                                    }


                                    $(".for_admin_list:even").css("background-color", "#fff8f3");//为双数行表格设置背颜色素
                                    //修改管理员信息
                                    $('.admin_updata_btn').click(function (event) {
                                        event.stopPropagation();
                                        $('.mask').show()
                                        var flagid = $(this).attr('flag')
                                        var flagpassword = $(this).attr('flagpassword')
                                        var adminupdata =
                                            '<div class="updata_admin">' +
                                            '<p>' + '修改管理员' +
                                            '<img src="../../img/guanbi.png" class="updata_admin_shut">' +
                                            '</p>' +
                                            '<label>' + '用户账号' + '</label>' + '<input class="Home_updatainput" id="updateusername" placeholder="请输入账号" readonly  unselectable="on">'+ '<br>' +
                                            '<label>' + '用户昵称' + '</label>' + '<input class="Home_updatainput" id="updatename" placeholder="请输修改的昵称">'+ '<br>' +
                                            '<label>' + '用户密码' + '</label>' + '<input class="Home_updatainput" id="updatepassword" placeholder="请输入原密码" type="password">'+ '<br>' +
                                            '<label>' + '新的密码' + '</label>' + '<input class="Home_updatainput" id="updatepasswordnew" placeholder="请输入新密码" type="password">' + '<br>' +
                                            '<label>' + '确认密码' + '</label>' + '<input class="Home_updatainput" id="updatepasswords" placeholder="请再次输入密码" type="password">' +'<br>' +
                                            '<button style="margin-bottom: 0.1rem" class="admin_updata_btn" id="Home_updatbtn" flag="' + flagid + '" flagpassword="' + flagpassword + '">' + '修改' + '</button>' +
                                            '</div>'
                                        $('.admin').append(adminupdata)
                                        var name = $(this).parent().prev().prev().prev().text() //获取用户登录账号
                                        var username = $(this).parent().prev().prev().text() //获取用户登录昵称

                                        $('#updateusername').val(name)
                                        $('#updatename').val(username)
                                        //关闭修改密码模块
                                        $('.updata_admin_shut').click(function () {
                                            $('.updata_admin').remove()

                                        })

                                        //确认修改按钮
                                        //修改管理员
                                        $('#Home_updatbtn').click(function () {
                                            var username = $('#updateusername').val();//用户账号
                                            var name = $('#updatename').val();//用户昵称
                                            var pass = $('#updatepassword').val();//用户密码
                                            var passs = $('#updatepasswords').val();//新的密码
                                            var passnew = $('#updatepasswordnew').val()//确认密码
                                            var updataid = $(this).attr('flag')
                                            var flagpassword = $(this).attr('flagpassword')
                                            console.log(updataid)
                                            var data = JSON.stringify({
                                                username: username,
                                                name: name,
                                                password: passnew,
                                                id: updataid
                                            })
                                            if (username == '' || name == '' || pass == '' || passs == '' || passnew == '') {
                                                alert('用户名或者密码不能为空')
                                            } else if (pass != flagpassword) {
                                                alert('密码错误')
                                                $('#updatepassword').val('');//用户密码
                                                $('#updatepasswords').val('');//新的密码
                                                $('#updatepasswordnew').val('')//确认密码
                                            } else if (passs != passnew) {
                                                alert('两次密码输入不一致')
                                            } else {
                                                $.ajax({
                                                    async: false,
                                                    url: interfaceUrl+updataAdmin,
                                                    type: 'POST',
                                                    data: data,
                                                    dataType: 'JSON',
                                                    contentType: 'application/JSON;charset=UTF-8',
                                                    headers: {'token': token},
                                                    success: function (data) {
                                                        console.log(data)
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
                                        return false
                                    })

                                }
                            })

                        }
                    })
                }

            })

        } else if (name == '') {
            $.ajax({
                async: false,
                type: 'GET',
                url: interfaceUrl+adminList,
                headers: {'token': token},
                data: {'username': name, 'size': 5},
                success: function (data) {
                    console.log(data)
                    $('.for_admin_list').remove()
                    $('#Hone_admin_fenpage').jqPaginator({
                        totalPages: data.pageCount,
                        pageSize: data.size,
                        visiblePages: 5,
                        currentPage: 1,
                        first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                        prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                        next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                        last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                        page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                        onPageChange: function (num) {
                            $('.text').html('当前第' + num + '页' + ',' + '共' + data.pageCount + '页')
                            //第二次请求接口，渲染根据关键字查询到的值
                            $.ajax({
                                async: false,
                                type: 'GET',
                                url: interfaceUrl+adminList,
                                data: {'username': name, 'page': num - 1, 'size': 5},
                                headers: {'token': token},
                                dataType: 'JSON',
                                success: function (data) {
                                    console.log(data)
                                    $('.for_admin_list').remove()
                                    for (i = 0; i < data.data.length; i++) {               //拿到信息后遍历并渲染到页面
                                        var tr
                                        // tr = '<td>' + data.data[i].username + '<td>'
                                        var time
                                        time = '<tr class="for_admin_list">' + '<td>' + data.data[i].username + '</td>' + '<td>' + data.data[i].name + '</td>' + '<td>' + data.data[i].createTime + '</td>' + '<td>' + '<input flag="' + data.data[i].id + '" class="admin_updata_btn" type="button" value="修改">' + '</td>' + '</tr>'  //循环输出td并带上数据
                                        $('#Hone_admin_table').append(time)            //添加带数据的节点到表格中
                                    }
                                    $(".for_admin_list:even").css("background-color", "#fff8f3");//为双数行表格设置背颜色素


                                }

                            })

                        }


                    })


                }


            })


        }


    })

    // 点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
    $(document).click(function (event) {
        var _con = $('.add_admin');  // 设置目标区域
        var _cons = $('.updata_admin');  // 设置目标区域
        if ((!_con.is(event.target) && _con.has(event.target).length === 0)&&(!_cons.is(event.target) && _cons.has(event.target).length === 0)) { // Mark 1
            $('.add_admin').hide();     //消失
            $('.updata_admin').remove(); //消失
            $('.mask').hide()
        }
    });

})