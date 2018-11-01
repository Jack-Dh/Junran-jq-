$(function () {


    var token = $.cookie('token')    //获取储存到cookie中的token
    var username = $.cookie('username') //获取存在cookie中的用户名
    $('.Home_top_exit').click(function () {       //点击退出
                                                  // $.cookie('token',null)    //清除cookie
        window.parent.location.href = '../login/login.html'  //返回登录界面
        // console.log(token)
    })

    //点击粉丝管理后跳转到粉丝页面
    // $('#Hone_wechat_fans').click(function () {
    //     $('.Hone_iframe').attr('src','Hone_wechat_fans.html')

    // })

    $('#hone_admin').click(function () {         //点击管理员管理，请求接口 判断身份是否过期
        $.ajax({

            url: ''+interfaceUrl+'/manage/operator/upsert',
            type: 'POST',
            headers: {'token': token},
            dataType: 'JSON',
            contentType: "application/JSON;charset=UTF-8",
            success: function (data) {
                console.log(data)
                var code = data.code;
                console.log(code);
                if (code == 1001) {
                    $('.Hone_iframe').attr('src', 'Hone_admin.html')
                } else {
                    alert('身份过期，请重新登录')
                    window.parent.location.href = '../login/login.html'        //身份过期重新登录
                }
            }
        })

    })


    //点击微信粉丝管理判断身份是否过期
    $('#Hone_wechat_fans').click(function () {
        $.ajax({

            url: wxfansList,
            type: 'GET',
            headers: {'token': token},
            dataType: 'JSON',
            contentType: "application/JSON;charset=UTF-8",
            success: function (data) {
                console.log(data)
                var code = data.code;
                console.log(code);
                if (code == 0) {
                    $('.Hone_iframe').attr('src', 'Hone_wechat_fans.html')
                } else {
                    alert('身份过期，请重新登录')
                    window.parent.location.href = '../login/login.html'        //身份过期重新登录
                }
            }
        })


    })

    //微信端轮播图
    $('#Hone_wechat_figure').click(function () {

        $('.Hone_iframe').attr('src', 'Hone_wechat_figure.html')
    })
//管理员列表
    $('#hone_admin_List').click(function () {

        $('.Hone_iframe').attr('src', 'Hone_admin_liest.html')
    })

//添加活动
    $('#Hone_addCti').click(function () {

        $('.Hone_iframe').attr('src', 'Hone_addaCtivity.html')
    })
//所有活动列表
    $('#Hone_addCtiList').click(function () {
        $('.Hone_iframe').attr('src', 'Hone_CtiList.html')
    })

//创建红包
    $('#Hone_addred_envelope').click(function () {
        $('.Hone_iframe').attr('src', 'add_red_envelope.html')
    })
    //红包列表
    $("#Hone_redEbvelope_lispage").click(function () {
        $('.Hone_iframe').attr('src', 'Hone_redEbvelope_list.html')

    })
    //活动审核
    $('#Hone_Rev_activities').click(function () {
        $('.Hone_iframe').attr('src', 'Hone_Review_activities.html')
    })
    //红包发放
    $('#Hone_red_envelope_issue').click(function () {
        $('.Hone_iframe').attr('src', 'Hone_red_envelope_issue.html')

    })
//操作日志
    $('#hone_operationLog').click(function () {
        $('.Hone_iframe').attr('src', 'Hone_operationLog.html')

    })
   


    // var url = window.location.href;
    // var ind = url.indexOf('?');                      //截取url地址中的用户名参数
    // var top_name = url.substr(ind + 6)

    $('.Home_top_name').text(username)

    //一级菜单鼠标经过事件
    $('.Home_left_li').mousemove(function () {
        $(this).addClass('after')
        $(this).siblings().removeClass('after')
    })
    //一级菜单鼠标离开事件
    $('.Home_left_li').mouseleave(function () {
        $(this).removeClass('after');
    })


      //添加鼠标点击一级菜单下拉事件
    $('.Home_left_li').click(function () {
        $(this).addClass('after') //鼠标点击一级菜单添加背景颜色
        $(this).siblings().removeClass('after')
        $(this).siblings().children('ul').children('li').removeClass('add');  //点击当前的隐藏元素给其添加样式，并把其他兄弟的子元素移除样式
        $(this).siblings().children('ul').hide()
        $(this).children('ul').slideToggle()
    })




    // $('.Home_left_li').mouseleave(function () {
    //     $(this).removeClass('add');
    //     $(this).children('ul').stop().slideUp()     //鼠标离开时的事件
    //
    // })

    // $('.Home_left_son li').mousemove(function () {             //二级菜单鼠标经过事件
    //     $(this).addClass('twoafter').siblings().removeClass('twoafter');
    //     return false     //阻止事件向上冒泡
    // })

    $('.Home_left_son li').click(function () {             //二级菜单鼠标点击事件
        $(this).addClass('add').siblings().removeClass('add');
        return false     //阻止事件向上冒泡
    })


    // $('.Home_left_son li').mouseleave(function () {            //二级菜单鼠标离开事件
    //     $(this).removeClass('add');
    // })


})