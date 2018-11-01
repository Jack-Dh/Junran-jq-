$(function () {
    var token = $.cookie('token')

    //显示添加活动模块
    $('#addctibut').click(function (event) {
        event.stopPropagation();
        $('#Cti_details_page').hide()
        $('.add_cti').toggle();
        $('.mask').show()
        return false
    })


//关闭添加活动模块
    $('#shut_cti').click(function () {
        $('.add_cti').hide()
        $('.mask').hide()

    })

    //上传图片文件
    var shopIcon
    $('#file').change(function () {
        var formData = new FormData($('#uploadForm')[0]);

        var fileleng = document.querySelector("input[type=file]").files.length

        if (fileleng == 0) {
            alert('请先选择店铺图片')
        } else {
            $.ajax({
                type: 'POST',
                url: interfaceUrl+uploadImg,
                data: formData,
                headers: {'token': token},
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data.url)
                    shopIcon = data.url
                    console.log(data)
                    $('#add_Cti_img').attr('src', 'http://' + shopIcon + '')
                }
            })
        }


    })
    //红包下拉列表选择
    $.ajax({
        async: false,
        url: interfaceUrl+redEnvelopeList,
        type: 'GET',
        data:{'state':'01'},
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

        if (Cti_name == '' || participate_num == '' || start_time == '' || end_time == '') {
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
                url:interfaceUrl+addCti,
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
                        $('#Cti_participate_num').val('')
                        $('#add_Cti_store').val('')
                        // $('#add_Cti_Forfans').val('');

                    } else if (data.code == 1005) {
                        alert('创建失败,' + data.message)
                    } else if (data.code == 103) {
                        alert('身份过期，请重新登录')
                        window.parent.location.href = '../login/login.html'        //身份过期重新登录
                    } else {
                        alert(data.message)
                    }

                }
            })
        }
    })

//活动列表
    $.ajax({
        async: false,
        url:interfaceUrl+CtiList,
        type: 'GET',
        dataType: 'JSON',
        headers: {'token': token},
        success: function (data) {
            console.log(data + '---------------')
            if (data.code == 103) {
                alert('身份过期，请重新登录');
                window.parent.location.href = '../login/login.html'        //身份过期重新登录
            } else {
                console.log(data.pageCount)
                $('#Hone_addCti_fenpage').jqPaginator({
                    totalPages: data.pageCount,
                    pageSize: data.size,
                    visiblePages: 7,
                    currentPage: 1,
                    first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                    prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                    next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                    last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                    page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                    onPageChange: function (num) {
                        $('.text').text('当前第' + num + '页,' + '共' + data.pageCount + '页')

                        $.ajax({
                            async: false,
                            url:interfaceUrl+CtiList,
                            type: 'GET',
                            data:{page: num - 1},
                            dataType: 'JSON',
                            headers: {'token': token},
                            success: function (data) {


                                console.log(data)
                                $('#Ctivityt_list .truuu').remove()
                                for (i = 0; i < data.data.length; i++) {
                                    var Ctiname = data.data[i].activityName   //活动名称
                                    var startTime = data.data[i].startTime    //活动开始时间
                                    var endTime = data.data[i].endTime    //活动结束时间
                                    var max = data.data[i].maxNumber //活动参加人数
                                    var passNumber = data.data[i].passNumber//活动审核通过人数
                                    var state = data.data[i].state //活动状态
                                    var award = data.data[i].award//活动奖励
                                    var number = i + 1;


                                    if (state == '01') {
                                        var Citydate = '<tr class="truuu">' +
                                            '<td flag="' + data.data[i].id + '" title="点击查看详情">' + '<input type="checkbox" id="' + data.data[i].id + '" name="checkname">' + number + '</td>' +
                                            '<td class="cticlick"  flag="' + data.data[i].id + '" title="点击查看详情">' + Ctiname + '</td>' +
                                            '<td class="cticlick"  flag="' + data.data[i].id + '" title="点击查看详情">' + award + '</td>' +
                                            '<td class="cticlick"  flag="' + data.data[i].id + '" title="点击查看详情">' + max + '/' + passNumber + '</td>' +
                                            '<td class="cticlick"  flag="' + data.data[i].id + '" title="点击查看详情">' + startTime + '</td>' +
                                            '<td class="cticlick"  flag="' + data.data[i].id + '" title="点击查看详情">' + endTime + '</td>' +
                                            '<td  title="点击停用启用">' + '<button class="Cti_enabled_but">停用启用</button>' +
                                            // '<input class="Cti_details_but" type="button" value="详情">' +
                                            '<span class="Cti_stop_id">' + data.data[i].id + '</span>' + '</td>' +
                                            '</tr>'

                                        $('#Ctivityt_list').append(Citydate)
                                    } else if (state == '02') {
                                        var Citydate = '<tr class="truuu Cti_enabled_color">' +
                                            '<td flag="' + data.data[i].id + '" title="点击查看详情">' + '<input type="checkbox" id="' + data.data[i].id + '" name="checkname">' + number + '</td>' +
                                            '<td class="cticlick"  flag="' + data.data[i].id + '" title="点击查看详情">' + Ctiname + '</td>' +
                                            '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + award + '</td>' +
                                            '<td class="cticlick"  flag="' + data.data[i].id + '" title="点击查看详情">' + max + '/' + passNumber + '</td>' +
                                            '<td class="cticlick"  flag="' + data.data[i].id + '" title="点击查看详情">' + startTime + '</td>' +
                                            '<td  class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + endTime + '</td>' +
                                            '<td title="点击停用启用">' + '<button class="Cti_enabled_but">停用启用</button>' +
                                            // '<input class="Cti_details_but" type="button" value="详情">' +
                                            '<span class="Cti_stop_id">' + data.data[i].id + '</span>' + '</td>' +
                                            '</tr>'

                                        $('#Ctivityt_list').append(Citydate)
                                    }

                                    // var Citydate = '<tr class="truuu">' + '<td>' + '<input type="checkbox" id="Cti_checkbox' + i + ' " name="checkname">' + Ctiname + '</td>' + '<td>' + max + '</td>' + '<td>' + startTime + '</td>' + '<td>' + endTime + '</td>' + '<td>' + '<button class="Cti_enabled_but">停用启用</button>' +
                                    //     '<span>' + data.data[i].id + '</span>' + '</td>' +
                                    //     '</tr>'
                                    //
                                    // $('#Ctivityt_list').append(Citydate)


                                }

                                //活动详情按钮
                                $('.truuu .cticlick').click(function (event) {
                                    event.stopPropagation();
                                    var id = $(this).attr('flag');//获取到每条点击数据的id
                                    // $('#Cti_details_page').show()
                                    $('.add_cti').hide();
                                    $('#Cti_details_page').show()
                                    $('.mask').show()
                                    // $('#Cti_details_page').animate({"left": "-=50px"}, "slow")


                                    $.ajax({
                                        async: false,
                                        url: interfaceUrl+EventDetails,
                                        data: {'id': id},
                                        type: 'GET',
                                        headers: {'token': token},
                                        dataType: 'JSON',
                                        success: function (data) {
                                            console.log(data)
                                            console.log(data.rs.activityName)

                                            var states
                                            if (data.rs.state == '01') {
                                                states = '启用'
                                            } else if (data.rs.state == '02') {
                                                states = '停用'
                                            } else {
                                                alert('访问错误')
                                            }


                                            var details = '<ul class="a">' +
                                                '<li>' + '<img class="add_Cti_shopIcon" src="http://' + data.rs.shopIcon + '">' + '</li>' +
                                                '<li>' + '活动名称：' + data.rs.activityName + '</li>' +
                                                '<li>' + '活动店铺：' + data.rs.shop + '</li>' +
                                                '<li>' + '活动开始时间：' + data.rs.startTime + '</li>' +
                                                // '<li>' + '面向粉丝：' + data.rs.fans + '</li>' +
                                                '<li>' + '最大活动人数：' + data.rs.maxNumber + '</li>' +
                                                '<li>' + '活动参与人数：' + data.rs.count + '</li>' +
                                                '<li>' + '审核通过人数：' + data.rs.passNumber + '</li>' +
                                                '<li>' + '活动结束时间：' + data.rs.endTime + '</li>' +
                                                '<li>' + '参与条件：' + data.rs.participationCondition + '</li>' +
                                                '<li>' + '活动奖励：' + data.rs.award + '</li>' +
                                                '<li>' + '活动说明：' + data.rs.remark + '</li>' +
                                                '<li>' + '状态：' + states + '</li>'
                                                + '</ul>'
                                            $('#Cti_details_page ul').remove()
                                            $('#Cti_details_page').append(details)

                                        }
                                    })

                                    return false
                                })


                                //活动详情页关闭
                                $('#Cti_deta_img').click(function () {
                                    // $('#Cti_details_page').hide()

                                    $('#Cti_details_page').hide()
                                    $('.mask').hide();


                                })
                                //单条停用启用
                                $('.Cti_enabled_but').click(function () {

                                    var that = this
                                    var statenum;

                                    var cla = $(this).parent().parent().attr('class')

                                    if (cla == 'truuu') {
                                        statenum = '02'
                                    } else if (cla == 'truuu Cti_enabled_color') {
                                        statenum = '01'
                                    } else {
                                        alert('修改失败')
                                    }

                                    var id = $(this).next().text();//获取到每条点击数据的id
                                    // //01为启用，02为停用,默认为启用
                                    var data = JSON.stringify({"ids": [id], "state": statenum});

                                    $.ajax({
                                        async: false,
                                        type: 'POST',
                                        url: interfaceUrl+CtiStartEnd,
                                        data: data,
                                        dataType: 'JSON',
                                        contentType: "application/JSON;charset=UTF-8",
                                        headers: {'token': token},
                                        success: function (data) {

                                            if (data.rs == '02') {
                                                $(that).parent().parent().addClass('Cti_enabled_color');
                                            } else if (data.rs == '01') {
                                                $(that).parent().parent().removeClass('Cti_enabled_color');
                                            }
                                        }
                                    })

                                    return false
                                })


                                //全选按钮
                                $("#Cti_checkbox_title").bind("click", function () {
                                    $("[name=checkname]:checkbox").prop("checked", this.checked);
                                });

                                $("input[name='checkname']").click(function () {
                                    var $subs = $("input[name='checkname']");
                                    $("#Cti_checkbox_title").prop("checked", $subs.length == $subs.filter(":checked").length ? true : false);
                                });


                            }
                        })

                    }


                })


            }


        }

    })

    //搜索模块
    $('#search').click(function () {
        var cti_down = $('#cti_down').val(); //下拉选择
        var admin_search = $('.admin_search').val() //输入选择
        $('#Ctivityt_list .truuu').remove()
        // //01为启用，02为停用,默认为启用
        if (cti_down == '启用') {
            cti_down = '01'
        } else if (cti_down == '停用') {
            cti_down = '02'
        } else if (cti_down == '全部活动') {
            cti_down = ''
        }
        $.ajax({
            async: false,
            url: interfaceUrl+CtiList,
            type: 'GET',
            data: {'state': cti_down, 'activityName': admin_search},
            dataType: 'JSON',
            headers: {'token': token},
            success: function (data) {
                if (data.code == 103) {
                    alert('身份过期，请重新登录');
                    window.parent.location.href = '../login/login.html'        //身份过期重新登录
                } else if (data.data.length == 0) {
                    var Citydate = '<tr class="truuu">' + '<td>' + '暂无数据！' + '</td>' +
                        +'<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>'
                    '</tr>'
                    $('#Ctivityt_list').append(Citydate)
                } else {
                    if (data.code == 0) {
                        $('#Hone_addCti_fenpage').jqPaginator({
                            totalPages: data.pageCount,
                            pageSize: data.size,
                            visiblePages: 7,
                            currentPage: 1,
                            first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                            prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                            next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                            last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                            page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                            onPageChange: function (num) {
                                $('.text').text('当前第' + num + '页,' + '共' + data.pageCount + '页')

                                $.ajax({
                                    async: false,
                                    url: interfaceUrl+CtiList,
                                    type: 'GET',
                                    data: {page: num - 1, 'state': cti_down, 'activityName': admin_search},
                                    dataType: 'JSON',
                                    headers: {'token': token},
                                    success: function (data) {

                                        $('.admin_search').val('')
                                        console.log(data)
                                        $('#Ctivityt_list .truuu').remove()
                                        for (i = 0; i < data.data.length; i++) {
                                            var Ctiname = data.data[i].activityName   //活动名称
                                            var startTime = data.data[i].startTime    //活动开始时间
                                            var endTime = data.data[i].endTime    //活动结束时间
                                            var max = data.data[i].maxNumber //活动参加人数
                                            var passNumber = data.data[i].passNumber//活动审核通过人数
                                            var state = data.data[i].state //活动状态
                                            var award = data.data[i].award//活动奖励
                                            var number = i + 1;


                                            if (state == '01') {
                                                var Citydate = '<tr class="truuu">' +
                                                    '<td  flag="' + data.data[i].id + '" title="点击查看详情">' + '<input type="checkbox" id="' + data.data[i].id + '" name="checkname">' + number + '</td>' +
                                                    '<td  flag="' + data.data[i].id + '" title="点击查看详情">' + Ctiname + '</td>' +
                                                    '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + award + '</td>' +
                                                    '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + max + '/' + passNumber + '</td>' +
                                                    '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + startTime + '</td>' +
                                                    '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + endTime + '</td>' +
                                                    '<td  title="点击停用启用">' + '<button class="Cti_enabled_but">停用启用</button>' +
                                                    // '<input class="Cti_details_but" type="button" value="详情">' +
                                                    '<span class="Cti_stop_id">' + data.data[i].id + '</span>' + '</td>' +
                                                    '</tr>'

                                                $('#Ctivityt_list').append(Citydate)
                                            } else if (state == '02') {
                                                var Citydate = '<tr class="truuu Cti_enabled_color">' +
                                                    '<td  flag="' + data.data[i].id + '" title="点击查看详情">' + '<input type="checkbox" id="' + data.data[i].id + '" name="checkname">' + number + '</td>' +
                                                    '<td  flag="' + data.data[i].id + '" title="点击查看详情">' + Ctiname + '</td>' +
                                                    '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + award + '</td>' +
                                                    '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + max + '/' + passNumber + '</td>' +
                                                    '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + startTime + '</td>' +
                                                    '<td class="cticlick" flag="' + data.data[i].id + '" title="点击查看详情">' + endTime + '</td>' +
                                                    '<td title="点击停用启用">' + '<button class="Cti_enabled_but">停用启用</button>' +
                                                    // '<input class="Cti_details_but" type="button" value="详情">' +
                                                    '<span class="Cti_stop_id">' + data.data[i].id + '</span>' + '</td>' +
                                                    '</tr>'

                                                $('#Ctivityt_list').append(Citydate)
                                            }

                                            // var Citydate = '<tr class="truuu">' + '<td>' + '<input type="checkbox" id="Cti_checkbox' + i + ' " name="checkname">' + Ctiname + '</td>' + '<td>' + max + '</td>' + '<td>' + startTime + '</td>' + '<td>' + endTime + '</td>' + '<td>' + '<button class="Cti_enabled_but">停用启用</button>' +
                                            //     '<span>' + data.data[i].id + '</span>' + '</td>' +
                                            //     '</tr>'
                                            //
                                            // $('#Ctivityt_list').append(Citydate)


                                        }

                                        //活动详情按钮
                                        $('.truuu .cticlick').click(function (event) {
                                            event.stopPropagation();
                                            var id = $(this).attr('flag');//获取到每条点击数据的id
                                            $('.mask').show()
                                            $('.add_cti').hide();
                                            $('#Cti_details_page').show()
                                            // $('#Cti_details_page').animate({"left": "-=50px"}, "slow")


                                            $.ajax({
                                                async: false,
                                                url: interfaceUrl+EventDetails,
                                                data: {'id': id},
                                                type: 'GET',
                                                headers: {'token': token},
                                                dataType: 'JSON',
                                                success: function (data) {
                                                    console.log(data)
                                                    console.log(data.rs.activityName)

                                                    var states
                                                    if (data.rs.state == '01') {
                                                        states = '启用'
                                                    } else if (data.rs.state == '02') {
                                                        states = '停用'
                                                    } else {
                                                        alert('访问错误')
                                                    }


                                                    var details = '<ul class="a">' +
                                                        '<li>' + '<img class="add_Cti_shopIcon" src="http://' + data.rs.shopIcon + '">' + '</li>' +
                                                        '<li>' + '活动名称：' + data.rs.activityName + '</li>' +
                                                        '<li>' + '活动店铺：' + data.rs.shop + '</li>' +
                                                        '<li>' + '活动开始时间：' + data.rs.startTime + '</li>' +
                                                        // '<li>' + '面向粉丝：' + data.rs.fans + '</li>' +
                                                        '<li>' + '最大活动人数：' + data.rs.maxNumber + '</li>' +
                                                        '<li>' + '活动参与人数：' + data.rs.count + '</li>' +
                                                        '<li>' + '审核通过人数：' + data.rs.passNumber + '</li>' +
                                                        '<li>' + '活动结束时间：' + data.rs.endTime + '</li>' +
                                                        '<li>' + '参与条件：' + data.rs.participationCondition + '</li>' +
                                                        '<li>' + '活动奖励：' + data.rs.award + '</li>' +
                                                        '<li>' + '活动说明：' + data.rs.remark + '</li>' +
                                                        '<li>' + '状态：' + states + '</li>'
                                                        + '</ul>'
                                                    $('#Cti_details_page ul').remove()
                                                    $('#Cti_details_page').append(details)

                                                }
                                            })

                                            return false
                                        })

                                        $(document).click(function(event){
                                            var _con = $('#Cti_details_page');  // 设置目标区域
                                            if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
                                                //$('#divTop').slideUp('slow');  //滑动消失
                                                $('#Cti_details_page').hide();     //淡出消失
                                            }
                                        });
                                        //活动详情页关闭
                                        $('#Cti_deta_img').click(function () {
                                            // $('#Cti_details_page').hide()
                                            $('.mask').hide()
                                            $('#Cti_details_page').hide()
                                            // $('#Cti_details_page').animate({"left": "+=50px"}, "slow")

                                        })
                                        //单条停用启用
                                        $('.Cti_enabled_but').click(function () {

                                            var that = this
                                            var statenum;

                                            var cla = $(this).parent().parent().attr('class')

                                            if (cla == 'truuu') {
                                                statenum = '02'
                                            } else if (cla == 'truuu Cti_enabled_color') {
                                                statenum = '01'
                                            } else {
                                                alert('修改失败')
                                            }

                                            var id = $(this).next().text();//获取到每条点击数据的id

                                            // //01为启用，02为停用,默认为启用
                                            var data = JSON.stringify({"ids": [id], "state": statenum});

                                            $.ajax({
                                                async: false,
                                                type: 'POST',
                                                url: interfaceUrl+CtiStartEnd,
                                                data: data,
                                                dataType: 'JSON',
                                                contentType: "application/JSON;charset=UTF-8",
                                                headers: {'token': token},
                                                success: function (data) {
                                                    console.log(data.rs)
                                                    if (data.rs == '02') {
                                                        $(that).parent().parent().addClass('Cti_enabled_color');
                                                    } else if (data.rs == '01') {
                                                        $(that).parent().parent().removeClass('Cti_enabled_color');
                                                    }
                                                }
                                            })

                                            return false
                                        })


                                        //全选按钮
                                        $("#Cti_checkbox_title").bind("click", function () {
                                            $("[name=checkname]:checkbox").prop("checked", this.checked);
                                        });

                                        $("input[name='checkname']").click(function () {
                                            var $subs = $("input[name='checkname']");
                                            $("#Cti_checkbox_title").prop("checked", $subs.length == $subs.filter(":checked").length ? true : false);
                                        });


                                    }
                                })

                            }


                        })
                    }

                }

            }
        })

    })


//批量启用
    $('#Cti_Batch_open').click(function () {
        var oiz = $("input[name=checkname]:checkbox");
        var idarr = [];
        for (i in oiz) {
            if (oiz[i].checked) {
                idarr.push(oiz[i].id)
            }
        }
        var data = JSON.stringify({"ids": idarr, "state": '01'})
        console.log(data)
        $.ajax({
            async: false,
            url: interfaceUrl+CtiStartEnd,
            type: 'POST',
            headers: {'token': token},
            data: data,
            dataType: 'JSON',
            contentType: "application/JSON;charset=UTF-8",
            success: function (data) {
                console.log(data)
                if (data.rs == '01') {
                    location.reload()

                } else {
                    alert('修改失败')
                }
            }
        })

    })
    //批量停用
    $('#Cti_Batch_end').click(function () {
        var oiz = $('input[name=checkname]:checkbox');
        var idrr = [];
        for (i in oiz) {
            if (oiz[i].checked) {
                idrr.push(oiz[i].id)
            }
        }
        var data = JSON.stringify({"ids": idrr, "state": "02"})

        $.ajax({
            async: false,
            url: interfaceUrl+CtiStartEnd,
            type: 'POST',
            data: data,
            dataType: 'JSON',
            headers: {'token': token},
            contentType: 'application/JSON;charset=UTF-8',
            success: function (data) {
                console.log(data)
                if (data.rs == '02') {
                    location.reload()
                } else {
                    alert('修改失败')
                }
            }

        })


    })
    $(document).click(function(event){
        var _con = $('.add_cti');  // 设置目标区域
        var _cons = $('#Cti_details_page');  // 设置目标区域
        if((!_con.is(event.target) && _con.has(event.target).length === 0)&&(!_cons.is(event.target) && _cons.has(event.target).length === 0)){ // Mark 1
            //$('#divTop').slideUp('slow');  //滑动消失
            $('.add_cti').hide();     //淡出消失
            $('.mask').hide();
            $('#Cti_details_page').hide();
        }
    });





})


