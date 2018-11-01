$(function () {
    var id
    var imgarr = []
    var menuarr = []
    var e
    $.ajax({
        async: false,
        type: 'GET',
        url: interfaceUrl + wxfigureList,
        headers: {'token': token},
        dataType: 'JSON',
        success: function (data) {
            if (data.code==0){
                console.log(data)
                id = data.rs.id
                //获取每个图片的地址
                var oneImg = $('.one').attr('src');
                var twoImg = $('.two').attr('src');
                var threeImg = $('.three').attr('src');
                var fourImg = $('.four').attr('src');
                var fiveImg = $('.five').attr('src')
                e = data.rs.menus
                if (data.rs.bannerImages[0] != undefined) {
                    $('.one').attr('src', data.rs.bannerImages[0]);
                    var time = data.rs.bannerImages[0].substring(23, 31);
                    console.log(time)
                    $('.timeone').text('更新于：' + time)
                }
                if (data.rs.bannerImages[1] != undefined) {
                    $('.two').attr('src', data.rs.bannerImages[1]);
                    var time = data.rs.bannerImages[1].substring(23, 31);
                    $('.timetwo').text('更新于：' + time)
                }
                if (data.rs.bannerImages[2] != undefined) {
                    $('.three').attr('src', data.rs.bannerImages[2]);
                    var time = data.rs.bannerImages[2].substring(23, 31);
                    $('.timethree').text('更新于：' + time)
                }
                if (data.rs.bannerImages[3] != undefined) {
                    $('.four').attr('src', data.rs.bannerImages[3]);
                    var time = data.rs.bannerImages[3].substring(23, 31);
                    $('.timefour').text('更新于：' + time)
                }
                if (data.rs.bannerImages[4] != undefined) {
                    $('.five').attr('src', data.rs.bannerImages[4]);
                    var time = data.rs.bannerImages[4].substring(23, 31);
                    $('.timefive').text('更新于：' + time)
                }

                for (i = 0; i < data.rs.menus.length; i++) {
                    var p = '<ul class="' + i + '">' + '<li>' +
                        '<label>' + '菜单名称(一级)：' + '</label>' + '<input flag="onename" class="onename" value="' + data.rs.menus[i].menFirTitle + '">' +
                        '<br>' +
                        '<label>' + '跳转地址(一级)：' + '</label>' + '<input flag="oneurl" class="oneurl" l value="' + data.rs.menus[i].menFirUrl + '">' +
                        '</li>' + '</ul>'
                    $('.menu').append(p)
                    if (data.rs.menus[i].menuSeconds != undefined) {
                        for (j = 0; j < data.rs.menus[i].menuSeconds.length; j++) {
                            console.log(data.rs.menus[i].menuSeconds[j])
                            var twomen = '<li>' +
                                '<label>' + '菜单名称(二级)：' + '</label>' + '<input flag="twoname" class="twoname" value="' + data.rs.menus[i].menuSeconds[j].menSecTitle + '">' +
                                '<br>' +
                                '<label>' + '跳转地址(二级)：' + '</label>' + '<input flag="twourl" class="twourl" value="' + data.rs.menus[i].menuSeconds[j].menSecUrl + '">' +
                                '</li>'
                            var mendata = {
                                'menFirTitle': data.rs.menus[i].menFirTitle,
                                'menFirUrl': data.rs.menus[i].menFirUrl,
                                'menuSeconds': [{
                                    'menSecTitle': data.rs.menus[i].menuSeconds[j].menSecTitle,
                                    'menSecUrl': data.rs.menus[i].menuSeconds[j].menSecUrl
                                }]
                            }
                            menuarr.push(mendata)
                            $('.' + i).prepend(twomen)
                        }
                    }


                }

            }else if (data.code==103){
                alert('身份验证过期，请重新登录')
                window.parent.location.href = '../login/login.html'
            }


//             //获取所有文本框*****************************
//             var arr = []//一级菜单名称
//             var brr = []//一级菜单地址
//             var crr = []//二级菜单名称
//             var drr = []//二级菜单地址
//
//             $(".menu input").blur(function () {
//                 arr.length = 0;
//                 brr.length = 0;
//                 crr.length = 0;
//                 drr.length = 0;
//                 //遍历一级菜单
//                 $(".onename").each(function () {
//                     arr.push({'menFirTitle': $(this).val()});
//                 });
//                 //遍历一级菜单地址
//                 $(".oneurl").each(function () {
//                     brr.push({'menFirUrl': $(this).val()});
//                 });
//                 //遍历二级菜单
//                 $(".twoname").each(function () {
//                     crr.push({'menuSeconds': [{'menSecTitle': $(this).val()}]});
//                 });
//                 //遍历二级菜单地址
//                 $(".twourl").each(function () {
//                     drr.push({'menuSeconds': [{'menSecUrl': $(this).val()}]});
//                 });
//
//
//                 var c = $.extend(true, arr, brr)  //合并一级菜单与一级菜单地址
//
//                 var d = $.extend(true, crr, drr) //合并二级菜单与二级菜单地址
//
//                 e = $.extend(true, c, d)//将一级菜单与二级整合
// console.log(e)
//
//             })


        }
    })


    //添加一级菜单
    $('#addmenu').click(function () {
        if ($('.menu ul').length > 2) {
            alert('最多只能有三个一级菜单')
        } else {
            var p = '<ul class="' + i + '">' + '<li>' +
                '<label>' + '菜单名称(一级)：' + '</label>' + '<input flag="onename" class="onename">' +
                '<br>' +
                '<label>' + '跳转地址(一级)：' + '</label>' + '<input flag="oneurl" class="oneurl"' +
                '</li>' + '</ul>'
            $('.menu').append(p)

            //获取所有文本框*****************************
            var arr = []//一级菜单名称
            var brr = []//一级菜单地址
            var crr = []//二级菜单名称
            var drr = []//二级菜单地址
            $(".menu input").blur(function () {
                arr.length = 0;
                brr.length = 0;
                crr.length = 0;
                drr.length = 0;
                //遍历一级菜单
                $(".onename").each(function () {
                    arr.push({'menFirTitle': $(this).val()});
                });
                //遍历一级菜单地址
                $(".oneurl").each(function () {
                    brr.push({'menFirUrl': $(this).val()});
                });
                //遍历二级菜单
                $(".twoname").each(function () {
                    crr.push({'menuSeconds': [{'menSecTitle': $(this).val()}]});
                });
                //遍历二级菜单地址
                $(".twourl").each(function () {
                    drr.push({'menuSeconds': [{'menSecUrl': $(this).val()}]});
                });


                var c = $.extend(true, arr, brr)  //合并一级菜单与一级菜单地址

                var d = $.extend(true, crr, drr) //合并二级菜单与二级菜单地址

                e = $.extend(true, c, d)//将一级菜单与二级整合
                console.log(e)

            })
        }
        //
        //     $('.addtwo').click(function () {
        //         if ($(this).parent().parent().find('li').length>=6){
        //             alert('一个一级菜单最多只能有五个二级菜单')
        //         }else {
        //             var twomen = '<li>' +
        //                 '<label>' + '菜单名称(二级)：' + '</label>' + '<input flag="twoname" class="twoname">' +
        //                 '<br>' +
        //                 '<label>' + '跳转地址(二级)：' + '</label>' + '<input flag="twourl" class="twourl">' +
        //                 '</li>'
        //             $(this).parent().prepend(twomen)
        //         }
        //
        //         console.log($(this).parent().parent().find('li').length)
        //     })
        //
    })

    //鼠标经过事件
    $('.SoncontainerImg').mousemove(function () {
        if ($(this).find('label').find('img').attr('src') != '../../img/addImgFigure.png') {
            $(this).find('img').show()
        }

    })
    $('.SoncontainerImg').mouseleave(function () {
        $(this).find('.ImgDel').hide()
    })
    //删除图片事件1
    $('#ImgDelone').click(function () {
        $(this).prevAll().find('img').attr('src', '../../img/addImgFigure.png')
        $(this).prev().remove()
        $(this).hide()
    })
    //删除图片事件2
    $('#ImgDeltwo').click(function () {
        $(this).prevAll().find('img').attr('src', '../../img/addImgFigure.png')
        $(this).prev().remove()
        $(this).hide()
    })
    //删除图片事件3
    $('#ImgDelthree').click(function () {
        $(this).prevAll().find('img').attr('src', '../../img/addImgFigure.png')
        $(this).prev().remove()
        $(this).hide()
    })
    //删除图片事件4
    $('#ImgDelfour').click(function () {
        $(this).prevAll().find('img').attr('src', '../../img/addImgFigure.png')
        $(this).prev().remove()
        $(this).hide()
    })
    //删除图片事件5
    $('#ImgDelfive').click(function () {
        $(this).prevAll().find('img').attr('src', '../../img/addImgFigure.png')
        $(this).prev().remove()
        $(this).hide()
    })
    // 选择图片
    // document.querySelector('img').onclick = function () {
    //     document.querySelector('input[type=file]').click();
    // }
    //第一张轮播图
    $('#addImgFile_one').change(function () {

        var value = $(this).val();
        value = value.split("\\")[2];
        var a = value.substring(value.length - 4)
        if (a != '.jpg' && a != '.png' && a != 'jpeg' && a != '.bmp') {
            alert('选择图片格式不正确')
        } else {
            var formData = new FormData($('#addUploadForm_one')[0]);
            console.log(formData)
            var fileleng = document.querySelector("input[type=file]").files.length

            $.ajax({
                type: 'POST',
                url: interfaceUrl + uploadImg,
                data: formData,
                headers: {'token': token},
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    $('.one').attr('src', 'http://' + data.url)
                    var time = data.url.substring(16, 24)
                    $('.timeone').text('更新于：' + time)
                }
            })
        }


    })

    //第二张轮播图
    $('#addImgFile_two').change(function () {
        var value = $(this).val();
        value = value.split("\\")[2];
        var a = value.substring(value.length - 4)
        if (a != '.jpg' && a != '.png' && a != 'jpeg' && a != '.bmp') {
            alert('选择图片格式不正确')
        } else {
            var formData = new FormData($('#addUploadForm_two')[0]);
            console.log(formData)
            var fileleng = document.querySelector("input[type=file]").files.length

            $.ajax({
                type: 'POST',
                url: interfaceUrl + uploadImg,
                data: formData,
                headers: {'token': token},
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    $('.two').attr('src', 'http://' + data.url)
                    var time = data.url.substring(16, 24)
                    $('.timetwo').text('更新于：' + time)
                }
            })
        }


    })

    //第三张轮播图
    $('#addImgFile_three').change(function () {
        var value = $(this).val();
        value = value.split("\\")[2];
        var a = value.substring(value.length - 4)
        if (a != '.jpg' && a != '.png' && a != 'jpeg' && a != '.bmp') {
            alert('选择图片格式不正确')
        } else {
            var formData = new FormData($('#addUploadForm_three')[0]);
            console.log(formData)
            var fileleng = document.querySelector("input[type=file]").files.length
            console.log(fileleng)
            $.ajax({
                type: 'POST',
                url: interfaceUrl + uploadImg,
                data: formData,
                headers: {'token': token},
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data)
                    $('.three').attr('src', 'http://' + data.url)
                    var time = data.url.substring(16, 24)
                    $('.timethree').text('更新于：' + time)
                }
            })
        }

    })

    //第四张轮播图
    $('#addImgFile_four').change(function () {
        var value = $(this).val();
        value = value.split("\\")[2];
        var a = value.substring(value.length - 4)
        if (a != '.jpg' && a != '.png' && a != 'jpeg' && a != '.bmp') {
            alert('选择图片格式不正确')
        } else {
            var formData = new FormData($('#addUploadForm_four')[0]);

            $.ajax({
                type: 'POST',
                url: interfaceUrl + uploadImg,
                data: formData,
                headers: {'token': token},
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data)
                    $('.four').attr('src', 'http://' + data.url)
                    var time = data.url.substring(16, 24)
                    $('.timefour').text('更新于：' + time)
                }
            })
        }

    })

    //第五张轮播图
    $('#addImgFile_five').change(function () {
        var value = $(this).val();
        value = value.split("\\")[2];
        var a = value.substring(value.length - 4)
        if (a != '.jpg' && a != '.png' && a != 'jpeg' && a != '.bmp') {
            alert('选择图片格式不正确')
        } else {
            var formData = new FormData($('#addUploadForm_five')[0]);

            $.ajax({
                type: 'POST',
                url: interfaceUrl + uploadImg,
                data: formData,
                headers: {'token': token},
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data)
                    $('.five').attr('src', 'http://' + data.url)
                    var time = data.url.substring(16, 24)
                    $('.timefive').text('更新于：' + time)
                }
            })
        }

    })


//获取所有文本框*****************************
    var arr = []//一级菜单名称
    var brr = []//一级菜单地址
    var crr = []//二级菜单名称
    var drr = []//二级菜单地址
    $(".menu input").blur(function () {
        //先清空数组，以免重复添加
        arr.length = 0;
        brr.length = 0;
        crr.length = 0;
        drr.length = 0;


        //遍历一级菜单
        $(".onename").each(function () {
            if ($(this).val() != '') {
                arr.push({'menFirTitle': $(this).val()});
            }
        });
        //遍历一级菜单地址
        $(".oneurl").each(function () {
            if ($(this).val() != '') {
                brr.push({'menFirUrl': $(this).val()});
            }

        });
        //遍历二级菜单
        $(".twoname").each(function () {
            if ($(this).val() != '') {
                crr.push({'menuSeconds': [{'menSecTitle': $(this).val()}]});
            }

        });
        //遍历二级菜单地址
        $(".twourl").each(function () {
            if ($(this).val() != '') {
                drr.push({'menuSeconds': [{'menSecUrl': $(this).val()}]});
            }


        });


        var c = $.extend(true, arr, brr)  //合并一级菜单与一级菜单地址

        var d = $.extend(true, crr, drr) //合并二级菜单与二级菜单地址

        e = $.extend(true, c, d)//将一级菜单与二级整合
        console.log(e)

    })

    //保存按钮
    $('.save').click(function () {
        imgarr.length = 0//先清空数组，再保存。防止重复添加
        //获取每个图片的地址
        var oneImg = $('.one').attr('src');
        var twoImg = $('.two').attr('src');
        var threeImg = $('.three').attr('src');
        var fourImg = $('.four').attr('src');
        var fiveImg = $('.five').attr('src')
        console.log(e)
        if (oneImg != '../../img/addImgFigure.png') {
            imgarr.push(oneImg)
            console.log(oneImg)
        }
        if (twoImg != '../../img/addImgFigure.png') {
            imgarr.push(twoImg)
        }
        if (threeImg != '../../img/addImgFigure.png') {
            imgarr.push(threeImg)
        }
        if (fourImg != '../../img/addImgFigure.png') {
            imgarr.push(fourImg)
        }
        if (fiveImg != '../../img/addImgFigure.png') {
            imgarr.push(fiveImg)
        }
        console.log(imgarr)
        var wxdata = JSON.stringify({
            'id': id,
            bannerImages: imgarr,
            menus: e
        })
        console.log(e)

        $.ajax({
            type: 'POST',
            url: interfaceUrl + wxSet,
            data: wxdata,
            headers: {'token': token},
            dataType: 'JSON',
            contentType: "application/JSON;charset=UTF-8",
            success: function (data) {
                console.log(data)
                if (data.code == 0) {
                    alert('保存成功')
                    var wx=ajaxrequest(refreshSet,'GET')
                    // console.log(wx)
                } else if (data.code == 103) {
                    alert('身份过期，请重新登录');
                    window.parent.location.href = '../login/login.html'
                } else {
                    var messag = data.message
                    console.log(messag)
                    var state = messag.indexOf('.') + 1//开始位置
                    var end = messag.indexOf('=')//结束位置
                    var err = messag.substring(state, end)//错误类型
                    var errdel = messag.substring(end + 1)//具体错误值
                    if (err == 'menFirUrl'||err == 'menFirTitle') {
                        alert('菜单名称应在0-4个字符之间，或者菜单地址不能为空')
                    }


                }

            }

        })


    })
})