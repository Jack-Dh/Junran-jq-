$(function () {

    var token = $.cookie('token');          //获取存在cookie中的token
    var pagurl = window.location.href
    // $.ajax({
    //     async: false,
    //     url: 'http://jie.nat300.top/junran/client/wxJsapiSignature?url=4531sdf',
    //     type: 'GET',
    //     dataType: 'JSON',
    //     data: {'url': pagurl},
    //     success: function (data) {
    //         console.log(data)
    //         var appid = data.rs.appid;
    //         var noncestr = data.rs.noncestr;
    //         var signature = data.rs.signature;
    //         var timestamp = data.rs.timestamp;
    //         wx.config({
    //             debug: true,
    //             appId: appid,
    //             timestamp: timestamp,
    //             nonceStr: noncestr,
    //             signature:signature,
    //             jsApiList: ['uploadImage','chooseImage']
    //
    //         })
    //
    //     }
    // })
    //图片文件读取
    // $('#Hone_addCtivity_But').click(function () {
    //     //读取文件
    //     var file = $('#imgform').find('input')[0].files[0]
    //
    //     var x = document.getElementById('Hone_addCtivity_file').value;
    //     var fileType = file.type;
    //     console.log(fileType)
    //
    //
    //     if (x == '') {
    //         alert('请先选中图片后再预览上传')
    //     } else if (fileType != "image/gif" && fileType != "image/bmp" && fileType != "image/png" && fileType != "image/jpeg" && fileType != "image/jpg") {
    //         alert('图片格式错误，仅支持bmp/png/jpeg/jpg/gif格式')
    //     } else {
    //         //创建文件对象
    //         var reader = new FileReader();
    //         //创建变量接受文件信息
    //         var fileimg
    //
    //         //设置调用成功后的回调
    //         reader.onload = function (e) {
    //
    //             fileimg = e.target.result;
    //             console.log(fileimg)
    //
    //             $('#add_Cti_img').attr('src', fileimg)
    //         }
    //         reader.readAsDataURL(file)
    //
    //         $.ajax({
    //             async: false,
    //             type: 'POST',
    //             url: 'http://jie.nat300.top/junran/manage/keUpload',
    //             // data: {'imgFile':},
    //             headers: {'token': token},
    //             success: function (data) {
    //                 console.log(data)
    //
    //             }
    //
    //         })
    //
    //
    //     }
    //
    // })

    //上传图片文件
    var shopIcon
    $('#upload').click(function () {
        var formData = new FormData($('#uploadForm')[0]);
        var fileleng = document.querySelector("input[type=file]").files.length
        if (fileleng == 0) {
            alert('请先选择店铺图片')
        } else {
            $.ajax({
                type: 'POST',
                url: 'http://jie.nat300.top/junran/manage/keUpload',
                data: formData,
                headers: {'token': token},
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data.url)
                    shopIcon = data.url
                    console.log(shopIcon)
                    $('#add_Cti_img').attr('src', 'http://' + shopIcon + '')
                }
            })
        }


    })


    //红包下拉列表选择
    $.ajax({
        async: false,
        url: 'http://jie.nat300.top/junran/manage/redpack/list?state=01',
        type: 'GET',
        // data:{'state':'01'},
        headers: {'token': token},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)

            for (i = 0; i < data.rs.length; i++) {
                var select = '<option id="' + data.rs[i].id + '">' + data.rs[i].name + '</option>'

                $('#add_Cti_option').append(select)
            }
            $('#add_Cti_option').val(" ");
            $("#add_Cti_option")[0].selectedIndex = -1;
        }
    })


    // lay('#version').html('-v' + laydate.v);

    //执行一个laydate实例
    //开始时间
    laydate.render({
        elem: '#add_Cti_start_time'
        , type: 'datetime'

    });
//结束时间
    laydate.render({
        elem: '#add_Cti_end_time'
        , type: 'datetime'

    });

    //创建活动
    $('#add_Cti_button').click(function () {
        //活动奖励
        var Cti_reward = $('#add_Cti_reward').val();
        //活动店铺
        var Cti_store = $('#add_Cti_store').val()
        //参与条件
        var Cti_conditions = $('#add_Cti_conditions').val();
        // //面向粉丝
        // var Cti_Forfans = $('#add_Cti_Forfans').val();
        //活动红包ID
        var Cti_red_opId = $("#add_Cti_option option:selected").attr('id');
        //活动名称
        var Cti_name = $('#add_Cti_name').val();
        //最大参与人数
        var participate_num = $('#Cti_participate_num').val();
        //活动说明
        var Cti_instructions = $('#add_Cti_instructions').val();
        //活动开始时间
        var start_time = $('#add_Cti_start_time').val();
        //活动结束时间
        var end_time = $('#add_Cti_end_time').val();

        if (Cti_name == '' ||participate_num == '' || start_time == '' || end_time == '' || Cti_red_opId == undefined || Cti_store == '') {
            alert('信息填写不完全')
        } else {
            //将这些json数组转换为json字符串
            var data = JSON.stringify({
                'activityName': Cti_name,
                'remark': Cti_instructions,
                'max': participate_num,
                'startTime': start_time,
                'endTime': end_time,
                'award': Cti_reward,
                'participationCondition': Cti_conditions,
                // 'fans': Cti_Forfans,
                'redPackId': Cti_red_opId,
                'shop': Cti_store,
                'shopIcon': shopIcon,

            })
            console.log(data)
            $.ajax({
                url: 'http://jie.nat300.top/junran/manage/activity/upsert',
                type: 'POST',
                dataType: 'JSON',
                headers: {'token': token},
                data: data,
                contentType: "application/JSON;charset=UTF-8",
                success: function (data) {
                    console.log(data)
                    if (data.code == 0) {
                        alert('创建成功');

                        $('#add_Cti_name').val('');
                        $('#Cti_participate_num').val('');
                        $('#add_Cti_instructions').val('');
                        $('#add_Cti_start_time').val('');
                        $('#add_Cti_end_time').val('');
                        $('#add_Cti_reward').val('');
                        $('#add_Cti_conditions').val('');
                        // $('#add_Cti_Forfans').val('');

                    } else if (data.code == 1005) {
                        alert('创建失败,' + data.message)
                    } else if (data.code == 103) {
                        alert('身份过期，请重新登录')
                        window.parent.location.href = '../login/login.html'        //身份过期重新登录
                    } else {
                       alert('信息不全')
                    }

                }


            })

        }


    })


})

