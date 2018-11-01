$(function () {
    //获取存在cookie中的token
    var token = $.cookie('token')

//点击出现红包创建页面
    $('.red_add_but').click(function (event) {
        event.stopPropagation();
        $('.add_redenvelope').show()
        $('.mask').show()
        return false
    })


    //关闭添加红包模块
    $('.add_red_shut').click(function () {
        $('.add_redenvelope').hide()
    })

    // 判断红包金额的文本框输入格式
    $("#totalAmount").bind('input propertychange', function () {
        var one = $(this).val()
        var minnum = one.substr(0, 1)
        var maxnum = one.substr(0, 4)
        var dog = one.indexOf('.')           //第一次出现点的位置
        if (one.length == 2) {             //当输入为两位数时，判断第一位数是否为0
            // var minnum = one.substr(0, 1)
            if (minnum == 0) {
                var minnuntwo = one.substr(1, 1)
                if (minnuntwo != '.') {      //当一位数为0的时候，第二位数必须为小数点
                    alert('输入格式有误')
                    $(this).val('')
                }
            }
        } else if (maxnum > 200) {
            alert('红包最大金额不超过200元！')
            $(this).val('')
        } else {
            if (dog != -1) {  //当点存在的时候
                var flag = dog + 1
                var conditions = one.substr(flag)
                if (conditions.indexOf('.') != -1) {      //判断所有第一次出现小数点后面的字符串是否包含小数点
                    alert('输入错误');
                    $(this).val('');

                } else if (conditions.length == 2) {     //只精确到小数点后一位
                    alert('红包金额最小单位为角')
                    $(this).val('');
                }

            }

        }


    });


    //点击创建
    $('#add_red_button').click(function () {
        var sendName = $('#sendName').val();
        var totalAmount = $('#totalAmount').val() * 100;//红包金额
        // var totalNum = $('#totalNum').val();
        var wishing = $('#wishing').val();
        var actName = $('#actName').val();
        var name = $('#name').val();
        var remark = $('#remark').val();

        console.log(totalAmount)
        //判断用户输入的数据格式是否正确
        if (sendName == '' || totalAmount == '' || wishing == '' || actName == '' || name == '') {
            alert('信息填写不完全')
        } else {

            var data = JSON.stringify({
                'sendName': sendName,
                'totalAmount': totalAmount,
                'wishing': wishing,
                'actName': actName,
                'name': name,
                'remark': remark
            })
            $.ajax({
                async: false,
                url: interfaceUrl+addRedEbvelope,
                type: 'POST',
                data: data,
                headers: {'token': token},
                dataType: 'JSON',
                contentType: "application/JSON;charset=UTF-8",
                success: function (data) {
                    if (data.code==103){
                        alert('身份验证过期，请重新登录')
                    } else if (data.code==0){
                        alert('红包创建成功')
                        $('.add_redenvelope input').val('')
                    }

                }
            })
        }
    })

//红包列表
    $.ajax({
        async: false,
        type: 'GET',
        url: interfaceUrl+redList,
        // data: {'size':1},
        headers: {'token': token},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)
            if (data.code == 103) {
                alert('身份验证过期，请重新登录');
                window.parent.location.href = '../login/login.html'        //身份过期重新登录
            } else if (data.code == 0) {

                $('#redEbv_list_fenpage').jqPaginator({
                    totalPages: data.pageCount,
                    pageSize: data.size,
                    visiblePages: 7,
                    currentPage: 1,
                    first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                    prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                    next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                    last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                    page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                    onPageChange: function (pagenum) {
                        $('.text').text('当前第' + pagenum + '页,' + '共' + data.pageCount + '页')
                        $.ajax({
                            async: false,
                            type: 'GET',
                            url: interfaceUrl+redList,
                            data: {page: pagenum - 1},
                            headers: {'token': token},
                            dataType: 'JSON',
                            success: function (data) {
                                console.log(data)
                                $('.red_list_for').remove()

                                for (i = 0; i < data.data.length; i++) {
                                    var actName = data.data[i].actName    //活动名称
                                    var name = data.data[i].name  //红包名称
                                    var sendName = data.data[i].sendName//商户名称
                                    var totalAmount = data.data[i].totalAmount / 100 //红包金额
                                    // var totalNum = data.data[i].totalNum//发放红包的人数
                                    var wishing = data.data[i].wishing//红包祝福语
                                    var remark = data.data[i].remark//备注
                                    var state = data.data[i].state;//获取状态
                                    var number = i + 1;

                                    console.log(state)

                                    if (state == '02') {
                                        var apend_red = '<tr class="red_list_for Stop_enabled_color">' +
                                            '<td  flag="' + data.data[i].id + '" title="点击查看详情">' + '<input type="checkbox" id="' + data.data[i].id + '" name="checkname"  ">' + number + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + actName + '<span class="Stop_enabled_id">' + data.data[i].id + '</span>' + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + name + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + sendName + '</td>' +
                                            // '<td>' + totalNum + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + totalAmount + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + wishing + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + remark + '</td>' +
                                            '<td title="点击停用启用">' + '<input type="button" value="停用/启用" class="Stop_enabled_but"  id="Stop_enabled' + i + '">' +
                                            '<span class="Stop_enabled_id">' + data.data[i].id + '</span>' +
                                            // '<input type="button" value="详情" class="red_details_but">' +
                                            '</td>'
                                            + '</tr>'
                                        $('#redEbv_list').append(apend_red)

                                    } else if (state == '01') {
                                        var apend_red = '<tr class="red_list_for">' +
                                            '<td  flag="' + data.data[i].id + '" title="点击查看详情">' + '<input type="checkbox" id="' + data.data[i].id + '"  name="checkname"  flag="' + data.data[i].id + '"  ">' + number + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + actName + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + name + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + sendName + '</td>' +
                                            // '<td>' + totalNum + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + totalAmount + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + wishing + '</td>' +
                                            '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + remark + '</td>' +
                                            '<td title="点击停用启用">' + '<input type="button" value="停用/启用" class="Stop_enabled_but"  id="Stop_enabled' + i + '">' + '' +
                                            '<span class="Stop_enabled_id">' + data.data[i].id + '</span>' +
                                            // '<input type="button" value="详情" class="red_details_but">' +
                                            '</td>'
                                            + '</tr>'
                                        $('#redEbv_list').append(apend_red)
                                    } else {
                                        alert('加载错误！')
                                    }

                                }

                                //红包详情模块
                                $('.red_list_for .redclick').click(function (event) {
                                    event.stopPropagation();
                                    $('.mask').show()
                                    var id = $(this).attr('flag');//点击详情按钮，获取单条记录的id
                                    $.ajax({
                                        async: false,
                                        url: interfaceUrl+redEbvelopDetail,
                                        type: 'GET',
                                        data: {'id': id},
                                        headers: {'token': token},
                                        dataType: 'JSON',
                                        success: function (data) {
                                            console.log(data)
                                            if (data.code == 0) {
                                                var seart;
                                                if (data.rs.state == '01') {
                                                    seart = '启用'
                                                } else if (data.rs.state == '02') {
                                                    seart = '停用'
                                                }
                                                $('#red_details_page').show()
                                                // $('#red_details_page').animate({"left": "-=50px"}, "slow")

                                                var reddetails = '<ul class="a">' +
                                                    '<li>' + '活动名称：' + data.rs.actName + '</li>' +
                                                    '<li>' + '商户名称：' + data.rs.sendName + '</li>' +
                                                    '<li>' + '创建时间：' + data.rs.createTime + '</li>' +
                                                    '<li>' + '金额（单位：元）：' + data.rs.totalAmount / 100 + '</li>' +
                                                    '<li>' + '状态：' + seart + '</li>' +
                                                    '<li>' + '祝福语：' + data.rs.wishing + '</li>' +
                                                    '<li>' + '备注：' + data.rs.remark + '</li>' +
                                                    '</ul>'
                                                $('#red_details_page ul').remove()
                                                $('#red_details_page').append(reddetails)

                                            } else {
                                                alert('查看失败')
                                            }
                                        }
                                    })
                                    return false

                                })
                                // //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
                                // $(document).click(function(event){
                                //     var _con = $('.a');  // 设置目标区域
                                //     if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
                                //         //$('#divTop').slideUp('slow');  //滑动消失
                                //         $('#red_details_page').hide();     //淡出消失
                                //     }
                                // });


                                $('#red_deta_img').click(function () {
                                    $('#red_details_page').hide()

                                })
                                //单条停用启用
                                $('.Stop_enabled_but').click(function () {
                                    var that = this
                                    var statenum;
                                    if ($(this).parent().parent().attr('class') == 'red_list_for Stop_enabled_color') {
                                        statenum = '01'
                                    } else if ($(this).parent().parent().attr('class') == 'red_list_for') {
                                        statenum = '02'
                                    } else {
                                        alert('修改失败！')
                                    }
                                    var id = $(this).next('.Stop_enabled_id').text();//获取到每条点击数据的id
                                    //01为启用，02为停用,默认为启用
                                    var data = JSON.stringify({"ids": [id], "state": statenum})
                                    console.log(data)
                                    $.ajax({
                                        async: false,
                                        url: interfaceUrl+redEbvelopStartEnd,
                                        type: 'POST',
                                        data: data,
                                        dataType: 'JSON',
                                        headers: {'token': token},
                                        contentType: "application/JSON;charset=UTF-8",
                                        success: function (data) {
                                            console.log(data.rs)

                                            if (data.rs == '02') {
                                                $(that).parent().parent().addClass('Stop_enabled_color');

                                            } else if (data.rs == '01') {

                                                $(that).parent().parent().removeClass('Stop_enabled_color');
                                            }
                                        }
                                    })
                                    return false
                                })
                            }
                        })
                    }
                })
            }
        }
    })

    //搜素模块
    $('#search').click(function () {
        var admin_search = $('.admin_search').val(); //红包名称
        var red_down = $('#red_down').val();  //红包状态
        $('.red_list_for').remove()
        //01为启用，02为停用,默认为启用
        if (red_down == '停用') {
            red_down = '02'
        } else if (red_down == '启用') {
            red_down = '01'
        } else if (red_down == '全部红包') {
            red_down = ''
        }
        $.ajax({
            async: false,
            type: 'GET',
            url: interfaceUrl+redList,
            data: {'name': admin_search, 'state': red_down},
            headers: {'token': token},
            dataType: 'JSON',
            success: function (data) {
                if (data.code == 103) {
                    alert('身份过期，请重新登录');
                    window.parent.location.href = '../login/login.html'        //身份过期重新登录
                } else if (data.data.length == 0) {
                    var apend_red = '<tr class="red_list_for">' +
                        '<td>' + '暂无数据' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>'
                        + '</tr>'
                    $('#redEbv_list').append(apend_red)
                } else if (data.code == 0) {
                    $('#redEbv_list_fenpage').jqPaginator({
                        totalPages: data.pageCount,
                        pageSize: data.size,
                        visiblePages: 7,
                        currentPage: 1,
                        first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                        prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                        next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                        last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                        page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                        onPageChange: function (pagenum) {
                            $('.text').text('当前第' + pagenum + '页,' + '共' + data.pageCount + '页')
                            $.ajax({
                                async: false,
                                type: 'GET',
                                url: interfaceUrl+redList,
                                data: {'name': admin_search, 'state': red_down, page: pagenum - 1},
                                headers: {'token': token},
                                dataType: 'JSON',
                                success: function (data) {
                                    console.log(data)
                                    $('.admin_search').val('')
                                    $('.red_list_for').remove()
                                    for (i = 0; i < data.data.length; i++) {
                                        var actName = data.data[i].actName    //活动名称
                                        var name = data.data[i].name  //红包名称
                                        var sendName = data.data[i].sendName//商户名称
                                        var totalAmount = data.data[i].totalAmount / 100 //红包金额
                                        // var totalNum = data.data[i].totalNum//发放红包的人数
                                        var wishing = data.data[i].wishing//红包祝福语
                                        var remark = data.data[i].remark//备注
                                        var state = data.data[i].state;//获取状态
                                        var number = i + 1;
                                        console.log(state)
                                        if (state == '02') {
                                            var apend_red = '<tr class="red_list_for Stop_enabled_color">' +
                                                '<td flag="' + data.data[i].id + '" title="点击查看详情">' + '<input type="checkbox" id="' + data.data[i].id + '" name="checkname"  ">' + number + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + actName + '<span class="Stop_enabled_id">' + data.data[i].id + '</span>' + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + name + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + sendName + '</td>' +
                                                // '<td>' + totalNum + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + totalAmount + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + wishing + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + remark + '</td>' +
                                                '<td  title="点击停用启用">' + '<input type="button" value="停用/启用" class="Stop_enabled_but"  id="Stop_enabled' + i + '">' +
                                                '<span class="Stop_enabled_id">' + data.data[i].id + '</span>' +
                                                // '<input type="button" value="详情" class="red_details_but">' +
                                                '</td>'
                                                + '</tr>'
                                            $('#redEbv_list').append(apend_red)

                                        } else if (state == '01') {
                                            var apend_red = '<tr class="red_list_for">' +
                                                '<td  flag="' + data.data[i].id + '" title="点击查看详情">' + '<input type="checkbox" id="' + data.data[i].id + '"  name="checkname"  flag="' + data.data[i].id + '"  ">' + number + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + actName + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + name + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + sendName + '</td>' +
                                                // '<td>' + totalNum + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + totalAmount + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + wishing + '</td>' +
                                                '<td class="redclick" flag="' + data.data[i].id + '" title="点击查看详情">' + remark + '</td>' +
                                                '<td title="点击停用启用">' + '<input type="button" value="停用/启用" class="Stop_enabled_but"  id="Stop_enabled' + i + '">' + '' +
                                                '<span class="Stop_enabled_id">' + data.data[i].id + '</span>' +
                                                // '<input type="button" value="详情" class="red_details_but">' +
                                                '</td>'
                                                + '</tr>'
                                            $('#redEbv_list').append(apend_red)
                                        } else {
                                            alert('加载错误！')
                                        }

                                    }

                                    //红包详情模块
                                    $('.red_list_for .redclick').click(function (event) {
                                        event.stopPropagation();
                                        $('.mask').show()
                                        var id = $(this).attr('flag');//点击详情按钮，获取单条记录的id
                                        $.ajax({
                                            async: false,
                                            url: interfaceUrl+redEbvelopDetail,
                                            type: 'GET',
                                            data: {'id': id},
                                            headers: {'token': token},
                                            dataType: 'JSON',
                                            success: function (data) {
                                                console.log(data)
                                                if (data.code == 0) {
                                                    var seart;
                                                    if (data.rs.state == '01') {
                                                        seart = '启用'
                                                    } else if (data.rs.state == '02') {
                                                        seart = '停用'
                                                    }
                                                    $('#red_details_page').show()
                                                    // $('#red_details_page').animate({"left": "-=50px"}, "slow")

                                                    var reddetails = '<ul class="a">' +
                                                        '<li>' + '活动名称：' + data.rs.actName + '</li>' +
                                                        '<li>' + '商户名称：' + data.rs.sendName + '</li>' +
                                                        '<li>' + '创建时间：' + data.rs.createTime + '</li>' +
                                                        '<li>' + '金额（单位：元）：' + data.rs.totalAmount / 100 + '</li>' +
                                                        '<li>' + '状态：' + seart + '</li>' +
                                                        '<li>' + '祝福语：' + data.rs.wishing + '</li>' +
                                                        '<li>' + '备注：' + data.rs.remark + '</li>' +
                                                        '</ul>'
                                                    $('#red_details_page ul').remove()
                                                    $('#red_details_page').append(reddetails)

                                                } else {
                                                    alert('查看失败')
                                                }
                                            }
                                        })
                                        return false

                                    })
                                    //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
                                    // $(document).click(function(event){
                                    //     var _con = $('.a');  // 设置目标区域
                                    //     if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
                                    //         //$('#divTop').slideUp('slow');  //滑动消失
                                    //         $('#red_details_page').hide();     //淡出消失
                                    //     }
                                    // });
                                    $('#red_deta_img').click(function () {
                                        $('#red_details_page').hide()

                                    })
                                    //关闭红包详情模块
                                    $('#red_deta_img').click(function () {
                                        $('#red_details_page').hide()

                                    })

                                    $('.Stop_enabled_but').click(function () {
                                        var that = this
                                        var statenum;
                                        if ($(this).parent().parent().attr('class') == 'red_list_for Stop_enabled_color') {
                                            statenum = '01'
                                        } else if ($(this).parent().parent().attr('class') == 'red_list_for') {
                                            statenum = '02'
                                        } else {
                                            alert('修改失败！')
                                        }
                                        var id = $(this).next('.Stop_enabled_id').text();//获取到每条点击数据的id
                                        //01为启用，02为停用,默认为启用
                                        var data = JSON.stringify({"ids": [id], "state": statenum})
                                        console.log(data)
                                        $.ajax({
                                            async: false,
                                            url: interfaceUrl+redEbvelopStartEnd,
                                            type: 'POST',
                                            data: data,
                                            dataType: 'JSON',
                                            headers: {'token': token},
                                            contentType: "application/JSON;charset=UTF-8",
                                            success: function (data) {
                                                console.log(data.rs)

                                                if (data.rs == '02') {
                                                    $(that).parent().parent().addClass('Stop_enabled_color');

                                                } else if (data.rs == '01') {

                                                    $(that).parent().parent().removeClass('Stop_enabled_color');
                                                }
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    })


                }


            }
        })


    })


    //全选
    $("#red_checkbox_title").bind("click", function () {
        $("[name=checkname]:checkbox").prop("checked", this.checked);


        // console.log($("input[type='checkbox']").is(':checked'))  //获取复选框是否选中
    });
    $("input[name=checkname]:checkbox").click(function () {

        var x = $("input[name=checkname]:checkbox");
        $("#red_checkbox_title").prop('checked', x.length == x.filter(":checked").length ? true : false);

    })

    //批量启用
    $('#red_Batch_open').click(function () {
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
            url: interfaceUrl+redEbvelopStartEnd,
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
    $('#red_Batch_end').click(function () {
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
            url: interfaceUrl+redEbvelopStartEnd,
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
    //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
    $(document).click(function (event) {
        var _con = $('.add_redenvelope');  // 设置目标区域
        var _cons = $('.a');  // 设置目标区域
        if ((!_con.is(event.target) && _con.has(event.target).length === 0)&&(!_cons.is(event.target) && _cons.has(event.target).length === 0)) { // Mark 1
            //$('#divTop').slideUp('slow');  //滑动消失
            $('.add_redenvelope').hide();     //淡出消失
            $('#red_details_page').hide();
            $('.mask').hide()
        }
    });

})