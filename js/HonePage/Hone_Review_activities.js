$(function () {
    var token = $.cookie('token');//获取存在cookie中的token
    //活动审核列表
    $.ajax({
        async: false,
        type: 'GET',
        data: {'size': 15},
        url:interfaceUrl+ctiReview,
        headers: {'token': token},
        dataType: 'JSON',
        success: function (data) {
            console.log(data)
            if (data.code == 0) {
                $('#revi_ct_fenpag').jqPaginator({
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
                        $('.page_num').text('当前第' + num + '页,' + '共' + data.pageCount + '页');
                        $.ajax({
                            async: false,
                            type: 'GET',
                            data: {'page': num - 1, 'size': 15},
                            url:interfaceUrl+ctiReview,
                            headers:{'token': token},
                            dataType: 'JSON',
                            success: function (data) {
                                console.log(data)
                                $('.rev_cti_list_but').remove()
                                for (i = 0; i < data.data.length; i++) {
                                    var activityName = data.data[i].activityName //活动名
                                    var comment = data.data[i].comment//用户评论
                                    var activityId = data.data[i].id//当条订单id
                                    var state = data.data[i].state//当条记录的状态
                                    var name = data.data[i].name//用户名
                                    var img = data.data[i].img//评论图片
                                    var state = data.data[i].state//获取状态
                                    var createTime = data.data[i].createTime//操作时间
                                    var operatorName = data.data[i].operatorName//操作人
                                    var rejectMessage = data.data[i].rejectMessage//拒绝原因
                                    var nickname = data.data[i].nickname//粉丝名称
                                    var money = data.data[i].money / 100 //红包金额
                                    var number = i + 1//序号
                                    if (state == '02' || state == '03') {

                                        if (state == '02') {
                                            state = '已通过'
                                        } else if (state == '03') {
                                            state = '已拒绝'
                                        }
                                        var datalist =
                                            '<tr class="rev_cti_list_but">' +
                                            '<td flag="' + activityId + '" title="点击审核">' + number + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + activityName + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + nickname + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + money + '</td>' +

                                            // '<td class="rev_cti_list_td">' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</td>' +
                                            // '<td>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</td>' +
                                            // '<td>' + '<input type="button" flagsta="' + state + '" flag="' + activityId + '" class="rev_ok Have_to_review" value="通过">' +
                                            // '<input type="button" flag="' + activityId + '" flagsta="' + state + '" class="rev_no Have_to_review" value="拒绝" title="'+rejectMessage+'">' + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + state + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核">' + createTime + '</td>' +
                                            // '<td>' + operatorName + '</td>' +
                                            // '<td flag="' + activityId + '" title="点击审核">' + '<input type="button" value="操作" class="operation" flag="' + activityId + '">' + '</td>' +
                                            '</tr>'
                                        $('.rev_cti_list').append(datalist)

                                        // var datalist =
                                        //     '<tr class="rev_cti_list_but">' +
                                        //     '<td>' + number + '</td>' +
                                        //     '<td class="rev_cti_list_td">' + activityName + '</td>' +
                                        //     '<td class="rev_cti_list_td">' + name + '</td>' +
                                        //     '<td class="rev_cti_list_td">' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</td>' +
                                        //     '<td>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</td>' +
                                        //     '<td>' + '<input type="button" flagsta="' + state + '" flag="' + activityId + '" class="rev_ok Have_to_review" value="通过">' +
                                        //     '<input type="button" flag="' + activityId + '" flagsta="' + state + '" class="rev_no Have_to_review" value="拒绝" title="'+rejectMessage+'">' + '</td>' +
                                        //     '<td class="rev_cti_list_td">' + state + '</td>' +
                                        //     '<td>' + createTime + '</td>' +
                                        //     '<td>' + operatorName + '</td>' +
                                        //     '</tr>'
                                        // $('.rev_cti_list').append(datalist)
                                    } else if (state == '01') {
                                        if (state == '01') {
                                            state = '待审核'
                                        }
                                        var datalist =
                                            '<tr class="rev_cti_list_but" flag="' + activityId + '">' +
                                            '<td flag="' + activityId + '" title="点击审核">' + number + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + activityName + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + nickname + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + money + '</td>' +
                                            // '<td class="rev_cti_list_td">' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</td>' +
                                            // '<td>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</td>' +
                                            // '<td>' + '<input type="button" flagsta="' + state + '" flag="' + activityId + '" class="rev_ok" value="通过">' +
                                            // '<input type="button" flag="' + activityId + '" flagsta="' + state + '" class="rev_no" value="拒绝" title="'+rejectMessage+'">' + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + state + '</td>' +
                                            '<td flag="' + activityId + '" title="点击审核">' + createTime + '</td>' +
                                            '</tr>'


                                        $('.rev_cti_list').append(datalist)
                                    }
                                }


                                //活动页面关闭
                                $('#Shut_down').click(function () {

                                    $('.Review_the_operation').hide()
                                    $('.mask').hide()

                                })


                                //活动操作
                                $('.rev_cti_list_but td').click(function (event) {
                                    $('.Review_the_operation').show()
                                    event.stopPropagation();
                                    $('.mask').show()
                                    var id = $(this).attr('flag')
                                    console.log(id)

                                    $.ajax({
                                        async: false,
                                        url: interfaceUrl+ctiOperation,
                                        data: {'id': id},
                                        headers: {'token': token},
                                        dataType: 'JSON',
                                        success: function (data) {
                                            console.log(data)

                                            if (data.code == 0) {

                                                var id = data.rs.id//当条记录id
                                                var activityName = data.rs.activityName//活动名称
                                                var auditTime = data.rs.auditTime//审核时间
                                                var comment = data.rs.comment//用户评论
                                                var count = data.rs.count//活动总参与人数
                                                var createTime = data.rs.createTime//订单创建时间
                                                var img = data.rs.img//好评图片
                                                var maxNumber = data.rs.maxNumber//活动最大参与人数
                                                var nickname = data.rs.nickname//用户名
                                                var operatorName = data.rs.operatorName//操作人
                                                var passNumber = data.rs.passNumber//活动审核通过人数
                                                var redPackCount = data.rs.passNumber//红包已发数量
                                                var redPacksendTime = data.rs.redPacksendTime//红包发送时间
                                                var rejectMessage = data.rs.rejectMessage//拒绝原因
                                                var remain = data.rs.remain//红包剩余数量
                                                var taobaoOrder=data.rs.taobaoOrder//淘宝编号
                                                var state = data.rs.state//审核状态

                                                //已通过不显示拒绝原因，已拒绝显示拒绝原因，待审核展示拒绝输入框，让管理人员输入拒绝原因
                                                if (state == '02' || state == '03') {
                                                    if (state == '02') {
                                                        state = '已通过'
                                                        $('.Review_the_operation ul').remove()
                                                        var ctipage = '<ul class="a">' +
                                                            '<li>' + '<label>' + '活动名称：' + '</label>' + activityName + '</li>' +
                                                            '<li>' + '<label>' + '淘宝编号：' + '</label>' + taobaoOrder + '</li>' +
                                                            '<li>' + '<label>' + '审核状态：' + '</label>' + state + '</li>' +
                                                            '<li>' + '<label>' + '用户名：' + '</label>' + nickname + '</li>' +
                                                            '<li>' + '<label>' + '好评图片：' + '</label>' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</li>' +
                                                            '<li>' + '<label>' + '用户评论：' + '</label>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</li>' +
                                                            '<li>' + '<label>' + '参与时间：' + '</label>' + createTime + '</li>' +
                                                            '<li>' + '<label>' + '参与人数：' + '</label>' + maxNumber + '/' + passNumber + '</li>' +
                                                            '<li>' + '<label>' + '审核时间：' + '</label>' + auditTime + '</li>' +
                                                            '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                            '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                            '<li>' + '<label>' + '操作人：' + '</label>' + operatorName + '</li>' +
                                                            '<li>' + '<input type="button" flagsta="' + state + '" flag="' + id + '" class="rev_ok" value="通过">' +
                                                            '<input type="button" flag="' + id + '" flagsta="' + state + '" class="rev_no" value="拒绝">' + '</li>'
                                                        '</ul>'
                                                        $('.Review_the_operation').append(ctipage)
                                                    } else if (state == '03') {
                                                        state = '已拒绝'
                                                        $('.Review_the_operation ul').remove()
                                                        var ctipage = '<ul class="a">' +
                                                            '<li>' + '<label>' + '活动名称：' + '</label>' + activityName + '</li>' +
                                                            '<li>' + '<label>' + '淘宝编号：' + '</label>' + taobaoOrder + '</li>' +
                                                            '<li>' + '<label>' + '审核状态：' + '</label>' + state + '</li>' +
                                                            '<li>' + '<label>' + '用户名：' + '</label>' + nickname + '</li>' +
                                                            '<li>' + '<label>' + '好评图片：' + '</label>' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</li>' +
                                                            '<li>' + '<label>' + '用户评论：' + '</label>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</li>' +
                                                            '<li>' + '<label>' + '参与时间：' + '</label>' + createTime + '</li>' +
                                                            '<li>' + '<label>' + '参与人数：' + '</label>' + maxNumber + '/' + passNumber + '</li>' +
                                                            '<li>' + '<label>' + '审核时间：' + '</label>' + auditTime + '</li>' +
                                                            '<li>' + '<label>' + '拒绝原因：' + '</label>' + '<textarea class="rev_cti_list_Notext" >' + rejectMessage + '</textarea>' + '</li>' +
                                                            '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                            '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                            '<li>' + '<label>' + '操作人：' + '</label>' + operatorName + '</li>' +
                                                            '<li>' + '<input type="button" flagsta="' + state + '" flag="' + id + '" class="rev_ok" value="通过">' +
                                                            '<input type="button" flag="' + id + '" flagsta="' + state + '" class="rev_no" value="拒绝">' + '</li>'
                                                        '</ul>'
                                                        $('.Review_the_operation').append(ctipage)
                                                    }
                                                } else if (state == '01') {
                                                    if (state == '01') {
                                                        state = '待审核'
                                                        $('.Review_the_operation ul').remove()
                                                        var ctipage = '<ul class="a">' +
                                                            '<li>' + '<label>' + '活动名称：' + '</label>' + activityName + '</li>' +
                                                            '<li>' + '<label>' + '淘宝编号：' + '</label>' + taobaoOrder + '</li>' +
                                                            '<li>' + '<label>' + '审核状态：' + '</label>' + state + '</li>' +
                                                            '<li>' + '<label>' + '用户名：' + '</label>' + nickname + '</li>' +
                                                            '<li>' + '<label>' + '好评图片：' + '</label>' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</li>' +
                                                            '<li>' + '<label>' + '用户评论：' + '</label>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</li>' +
                                                            '<li>' + '<label>' + '参与时间：' + '</label>' + createTime + '</li>' +
                                                            '<li>' + '<label>' + '参与人数：' + '</label>' + maxNumber + '/' + passNumber + '</li>' +
                                                            '<li>' + '<label>' + '审核时间：' + '</label>' + auditTime + '</li>' +
                                                            '<li>' + '<label>' + '拒绝原因：' + '</label>' + '<textarea style="border: 1px solid #97a3ad" class="rev_cti_list_Notext" >'+'</textarea>' + '</li>' +
                                                            '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                            '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                            '<li>' + '<label>' + '操作人：' + '</label>' + operatorName + '</li>' +
                                                            '<li>' + '<input type="button" flagsta="' + state + '" flag="' + id + '" class="rev_ok" value="通过">' +
                                                            '<input type="button" flag="' + id + '" flagsta="' + state + '" class="rev_no" value="拒绝">' + '</li>'
                                                        '</ul>'
                                                        $('.Review_the_operation').append(ctipage)
                                                    }
                                                }
                                                // $('.Review_the_operation ul').remove()
                                                // var ctipage = '<ul class="a">' +
                                                //     '<li>' + '<label>' + '活动名称：' + '</label>' + activityName + '</li>' +
                                                //     '<li>' + '<label>' + '淘宝编号：' + '</label>' + taobaoOrder + '</li>' +
                                                //     '<li>' + '<label>' + '审核状态：' + '</label>' + state + '</li>' +
                                                //     '<li>' + '<label>' + '用户名：' + '</label>' + nickname + '</li>' +
                                                //     '<li>' + '<label>' + '好评图片：' + '</label>' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</li>' +
                                                //     '<li>' + '<label>' + '用户评论：' + '</label>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</li>' +
                                                //     '<li>' + '<label>' + '参与时间：' + '</label>' + createTime + '</li>' +
                                                //     '<li>' + '<label>' + '参与人数：' + '</label>' + maxNumber + '/' + passNumber + '</li>' +
                                                //     '<li>' + '<label>' + '审核时间：' + '</label>' + auditTime + '</li>' +
                                                //     '<li>' + '<label>' + '拒绝原因：' + '</label>' + '<textarea class="rev_cti_list_Notext" >' + rejectMessage + '</textarea>' + '</li>' +
                                                //     '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                //     '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                //     '<li>' + '<label>' + '操作人：' + '</label>' + operatorName + '</li>' +
                                                //     '<li>' + '<input type="button" flagsta="' + state + '" flag="' + id + '" class="rev_ok" value="通过">' +
                                                //     '<input type="button" flag="' + id + '" flagsta="' + state + '" class="rev_no" value="拒绝">' + '</li>'
                                                // '</ul>'
                                                // $('.Review_the_operation').append(ctipage)
                                                if (state != '待审核') {
                                                    $('.rev_ok').addClass('Have_to_review')
                                                    $('.rev_no').addClass('Have_to_review')
                                                    $('.rev_cti_list_Notext').attr('readonly', 'readonly')
                                                }


                                                //查看大图
                                                $('.rev_cti_list_img').click(function () {
                                                    $('.bin_img').show();
                                                    $('.Review_the_operation').hide()
                                                    var img = $(this).attr('src');
                                                    $('.bin_img img').attr('src', img)

                                                })
                                                //关闭大图
                                                $('.bin_img_Shut').click(function () {
                                                    $('.Review_the_operation').show();
                                                    $('.bin_img').hide();
                                                    return false
                                                })
                                                //关闭大图
                                                $('.bin_img').click(function () {
                                                    $('.Review_the_operation').show();
                                                    $('.bin_img').hide();
                                                    return false
                                                })

                                                //活动通过
                                                $('.rev_ok').click(function () {
                                                    var that = this
                                                    var id = $(this).attr('flag')  //当条记录的id
                                                    var data = JSON.stringify({ids: [id]})
                                                    var cssclass = $(this).attr('class')
                                                    $.ajax({
                                                        async: false,
                                                        type: 'POST',
                                                        url: interfaceUrl+ctiThrough,
                                                        data: data,
                                                        headers: {'token': token},
                                                        contentType: "application/JSON;charset=UTF-8",
                                                        dataType: 'JSON',
                                                        success: function (data) {

                                                            if (data.code != 0) {
                                                                alert(data.message)
                                                            } else if (data.code == 0) {
                                                                $(that).addClass('Have_to_review');
                                                                $(that).next().addClass('Have_to_review');
                                                                window.location.reload()

                                                            }

                                                        }

                                                    })

                                                })

                                                //活动拒绝
                                                $('.rev_no').click(function () {

                                                    var that = this
                                                    var rev_cti_list_Notext = $('.rev_cti_list_Notext').val()
                                                    if (rev_cti_list_Notext == '') {
                                                        alert('随便说几句吧！')
                                                    } else {
                                                        var id = $(this).attr('flag');
                                                        var data = JSON.stringify({
                                                            id: id,
                                                            rejectMessage: rev_cti_list_Notext
                                                        })
                                                        var cssclass = $(this).attr('class')
                                                        $.ajax({
                                                            async: false,
                                                            type: 'POST',
                                                            url:interfaceUrl+ctiRefused,
                                                            data: data,
                                                            headers: {'token': token},
                                                            contentType: "application/JSON;charset=UTF-8",
                                                            dataType: 'JSON',
                                                            success: function (data) {


                                                                if (cssclass == 'rev_no Have_to_review') {
                                                                    alert('已经审核过，请勿重复审核');
                                                                    console.log(data)
                                                                    return
                                                                } else if (data.code == 0) {
                                                                    alert('已完成')
                                                                    $(that).addClass('Have_to_review');
                                                                    $(that).prev().addClass('Have_to_review');
                                                                    window.location.reload()

                                                                }
                                                            }

                                                        })
                                                    }


                                                })


                                            }


                                        }


                                    })
                                    return false

                                })





                                // //活动拒绝
                                // $('.rev_no').click(function () {
                                //     if ($(this).attr('class') == 'rev_no Have_to_review') {
                                //         alert('已经审核过，请勿重复审核');
                                //     } else {
                                //         var Refused = prompt('请输入拒绝原因')
                                //         var that = this
                                //         var id = $(this).attr('flag');
                                //         var rejectMessage = Refused //活动拒绝原因
                                //         var data = JSON.stringify({id: id, rejectMessage: rejectMessage})
                                //         var cssclass = $(this).attr('class')
                                //
                                //         $.ajax({
                                //             async: false,
                                //             type: 'POST',
                                //             url: 'http://jie.nat300.top/junran/manage/useractivity/reject',
                                //             data: data,
                                //             headers: {'token': token},
                                //             contentType: "application/JSON;charset=UTF-8",
                                //             dataType: 'JSON',
                                //             success: function (data) {
                                //                 if (cssclass == 'rev_no Have_to_review') {
                                //                     alert('已经审核过，请勿重复审核');
                                //                     return
                                //                 } else if (data.code == 0) {
                                //                     $(that).addClass('Have_to_review');
                                //                     $(that).prev().addClass('Have_to_review');
                                //                     window.location.reload()
                                //
                                //                 }
                                //             }
                                //
                                //         })
                                //
                                //     }
                                //
                                //     // var Refused=prompt('请输入拒绝原因')
                                //     // var that = this
                                //     // var id = $(this).attr('flag');
                                //     // var rejectMessage=Refused //活动拒绝原因
                                //     // var data = JSON.stringify({id:id})
                                //     // var cssclass = $(this).attr('class')
                                //     // $.ajax({
                                //     //     async: false,
                                //     //     type: 'POST',
                                //     //     url: 'http://jie.nat300.top/junran/manage/useractivity/reject',
                                //     //     data: data,
                                //     //     headers: {'token': token},
                                //     //     contentType: "application/JSON;charset=UTF-8",
                                //     //     dataType: 'JSON',
                                //     //     success: function (data) {
                                //     //         if (cssclass == 'rev_no Have_to_review') {
                                //     //             alert('已经审核过，请勿重复审核');
                                //     //             return
                                //     //         } else if (data.code == 0) {
                                //     //             $(that).addClass('Have_to_review');
                                //     //             $(that).prev().addClass('Have_to_review');
                                //     //             window.location.reload()
                                //     //
                                //     //         }
                                //     //     }
                                //     //
                                //     // })
                                //
                                // })
                                // //查看大图
                                // $('.rev_cti_list_img').click(function () {
                                //     $('.bin_img').show();
                                //     var img = $(this).attr('src');
                                //     $('.bin_img img').attr('src', img)
                                //
                                // })
                                // //关闭大图
                                // $('.bin_img_Shut').click(function () {
                                //     $('.bin_img').hide();
                                // })

                            }


                        })

                    }


                })

            } else if (data.code==103) {
                alert('身份验证过期，请重新登录')
                window.parent.location.href = '../login/login.html'
            }

        }


    })

    //根据时间搜索
    laydate.render({   //开始时间
        elem: '#start_time',
        type: 'datetime'
    })
    laydate.render({   //结束时间
        elem: '#end_time',
        type: 'datetime'
    })


    //搜索模块
    $('#search').click(function () {
        $('.rev_cti_list_but').remove()
        var state = $('#red_down').val()  //获取输入状态
        var startTime = $('#start_time').val();//开始时间
        var endTime = $('#end_time').val();//结束时间
        var keyword = $('#keyword').val();//根据关键字搜索
        if (state == '全部') {
            state = ''
        } else if (state == '已通过') {
            state = '02'
        } else if (state == '待审核') {
            state = '01'
        } else if (state == '已拒绝') {
            state = '03'
        }

        $.ajax({
            async: false,
            type: 'GET',
            data: {'size': 15, 'state': state, 'auditStartTime': startTime, 'auditEndTime': endTime, 'keyword': keyword},
            url:interfaceUrl+ctiReview,
            headers: {'token': token},
            dataType: 'JSON',
            success: function (data) {
                console.log(data)
                if (data.data.length == 0) {
                    var datalist =
                        '<tr class="rev_cti_list_but">' +
                        '<td>' + '暂无数据' + '</td>' +
                        '<td class="rev_cti_list_td">' + '</td>' +
                        '<td class="rev_cti_list_td">' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '</tr>'
                    $('.rev_cti_list').append(datalist)
                } else if (data.code == 0) {
                    $('#revi_ct_fenpag').jqPaginator({
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
                            $('.page_num').text('当前第' + num + '页,' + '共' + data.pageCount + '页');
                            $.ajax({
                                async: false,
                                type: 'GET',
                                data: {
                                    'page': num - 1,
                                    'size': 15,
                                    'state': state,
                                    'auditStartTime': startTime,
                                    'auditEndTime': endTime,
                                    'keyword': keyword
                                },
                                url:interfaceUrl+ctiReview,
                                headers: {'token': token},
                                dataType: 'JSON',
                                success: function (data) {
                                    $('#keyword').val('');
                                    $('#start_time').val('')
                                    $('#end_time').val('')
                                    $('.rev_cti_list_but').remove()
                                    for (i = 0; i < data.data.length; i++) {
                                        var activityName = data.data[i].activityName //活动名
                                        var comment = data.data[i].comment//用户评论
                                        var activityId = data.data[i].id//当条订单id
                                        var state = data.data[i].state//当条记录的状态
                                        var name = data.data[i].name//用户名
                                        var img = data.data[i].img//评论图片
                                        var state = data.data[i].state//获取状态
                                        var createTime = data.data[i].createTime//操作时间
                                        var operatorName = data.data[i].operatorName//操作人
                                        var rejectMessage = data.data[i].rejectMessage//拒绝原因
                                        var nickname = data.data[i].nickname//粉丝名称
                                        var money = data.data[i].money / 100 //红包金额
                                        var number = i + 1//序号

                                        if (state == '02' || state == '03') {

                                            if (state == '02') {
                                                state = '已通过'
                                            } else if (state == '03') {
                                                state = '已拒绝'
                                            }
                                            var datalist =
                                                '<tr  class="rev_cti_list_but" title="点击审核">' +
                                                '<td flag="' + activityId + '" title="点击审核">' + number + '</td>' +
                                                '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + activityName + '</td>' +
                                                '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + nickname + '</td>' +
                                                '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + money + '</td>' +

                                                // '<td class="rev_cti_list_td">' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</td>' +
                                                // '<td>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</td>' +
                                                // '<td>' + '<input type="button" flagsta="' + state + '" flag="' + activityId + '" class="rev_ok Have_to_review" value="通过">' +
                                                // '<input type="button" flag="' + activityId + '" flagsta="' + state + '" class="rev_no Have_to_review" value="拒绝" title="'+rejectMessage+'">' + '</td>' +
                                                '<td flag="' + activityId + '" title="点击审核" class="rev_cti_list_td">' + state + '</td>' +
                                                '<td flag="' + activityId + '" title="点击审核">' + createTime + '</td>' +
                                                // '<td>' + operatorName + '</td>' +
                                                // '<td>' + '<input type="button" value="操作" class="operation" flag="' + activityId + '">' + '</td>' +
                                                '</tr>'
                                            $('.rev_cti_list').append(datalist)

                                            // var datalist =
                                            //     '<tr class="rev_cti_list_but">' +
                                            //     '<td>' + number + '</td>' +
                                            //     '<td class="rev_cti_list_td">' + activityName + '</td>' +
                                            //     '<td class="rev_cti_list_td">' + name + '</td>' +
                                            //     '<td class="rev_cti_list_td">' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</td>' +
                                            //     '<td>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</td>' +
                                            //     '<td>' + '<input type="button" flagsta="' + state + '" flag="' + activityId + '" class="rev_ok Have_to_review" value="通过">' +
                                            //     '<input type="button" flag="' + activityId + '" flagsta="' + state + '" class="rev_no Have_to_review" value="拒绝" title="'+rejectMessage+'">' + '</td>' +
                                            //     '<td class="rev_cti_list_td">' + state + '</td>' +
                                            //     '<td>' + createTime + '</td>' +
                                            //     '<td>' + operatorName + '</td>' +
                                            //     '</tr>'
                                            // $('.rev_cti_list').append(datalist)
                                        } else if (state == '01') {
                                            if (state == '01') {
                                                state = '待审核'
                                            }
                                            var datalist =
                                                '<tr class="rev_cti_list_but" title="点击审核">' +
                                                '<td>' + number + '</td>' +
                                                '<td class="rev_cti_list_td" flag="' + activityId + '" title="点击审核">' + activityName + '</td>' +
                                                '<td class="rev_cti_list_td" flag="' + activityId + '" title="点击审核">' + nickname + '</td>' +
                                                '<td class="rev_cti_list_td" flag="' + activityId + '" title="点击审核">' + money + '</td>' +
                                                // '<td class="rev_cti_list_td">' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</td>' +
                                                // '<td>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</td>' +
                                                // '<td>' + '<input type="button" flagsta="' + state + '" flag="' + activityId + '" class="rev_ok" value="通过">' +
                                                // '<input type="button" flag="' + activityId + '" flagsta="' + state + '" class="rev_no" value="拒绝" title="'+rejectMessage+'">' + '</td>' +
                                                '<td class="rev_cti_list_td" flag="' + activityId + '" title="点击审核">' + state + '</td>' +
                                                '<td flag="' + activityId + '" title="点击审核">' + createTime + '</td>' +
                                                // '<td>' + operatorName + '</td>' +
                                                // '<td flag="' + activityId + '" title="点击审核">' + '<input type="button" value="操作" class="operation" flag="' + activityId + '">' + '</td>' +
                                                '</tr>'
                                            // '<tr class="rev_cti_list_but">' +
                                            // '<td>' + number + '</td>' +
                                            // '<td class="rev_cti_list_td">' + activityName + '</td>' +
                                            // '<td class="rev_cti_list_td">' + name + '</td>' +
                                            // '<td class="rev_cti_list_td">' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</td>' +
                                            // '<td>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</td>' +
                                            // '<td>' + '<input type="button" flagsta="' + state + '" flag="' + activityId + '" class="rev_ok" value="通过">' +
                                            // '<input type="button" flag="' + activityId + '" flagsta="' + state + '" class="rev_no" value="拒绝" title="'+rejectMessage+'">' + '</td>' +
                                            // '<td class="rev_cti_list_td">' + state + '</td>' +
                                            // '<td>' + createTime + '</td>' +
                                            // '<td>' + operatorName + '</td>' +
                                            // '</tr>'

                                            $('.rev_cti_list').append(datalist)
                                        }
                                    }
                                    // //活动通过
                                    // $('.rev_ok').click(function () {
                                    //     var that = this
                                    //     var id = $(this).attr('flag')
                                    //     var data = JSON.stringify({ids: [id]})
                                    //     var cssclass = $(this).attr('class')
                                    //     $.ajax({
                                    //         async: false,
                                    //         type: 'POST',
                                    //         url: 'http://jie.nat300.top/junran/manage/useractivity/pass',
                                    //         data: data,
                                    //         headers: {'token': token},
                                    //         contentType: "application/JSON;charset=UTF-8",
                                    //         dataType: 'JSON',
                                    //         success: function (data) {
                                    //             if (cssclass == 'rev_ok Have_to_review') {
                                    //                 alert('已经审核过，请勿重复审核');
                                    //                 return
                                    //             } else if (data.code == 0) {
                                    //                 $(that).addClass('Have_to_review');
                                    //                 $(that).next().addClass('Have_to_review');
                                    //                 window.location.reload()
                                    //
                                    //             }
                                    //         }
                                    //
                                    //     })
                                    //
                                    // })

                                    //活动页面关闭
                                    $('#Shut_down').click(function () {
                                        // $('.Review_the_operation').animate({"left": "+=50px"}, "slow")
                                        $('.Review_the_operation').hide()
                                        $('.mask').hide()

                                    })

                                    //活动操作
                                    $('.rev_cti_list_but td').click(function (event) {
                                        $('.Review_the_operation').show()
                                        event.stopPropagation();
                                        $('.mask').show()
                                        var id = $(this).attr('flag')
                                        console.log(id)

                                        $.ajax({
                                            async: false,
                                            url:interfaceUrl+ctiOperation,
                                            data: {'id': id},
                                            headers: {'token': token},
                                            dataType: 'JSON',
                                            success: function (data) {
                                                console.log(data)

                                                if (data.code == 0) {

                                                    var id = data.rs.id//当条记录id
                                                    var activityName = data.rs.activityName//活动名称
                                                    var auditTime = data.rs.auditTime//审核时间
                                                    var comment = data.rs.comment//用户评论
                                                    var count = data.rs.count//活动总参与人数
                                                    var createTime = data.rs.createTime//订单创建时间
                                                    var img = data.rs.img//好评图片
                                                    var maxNumber = data.rs.maxNumber//活动最大参与人数
                                                    var nickname = data.rs.nickname//用户名
                                                    var operatorName = data.rs.operatorName//操作人
                                                    var passNumber = data.rs.passNumber//活动审核通过人数
                                                    var redPackCount = data.rs.passNumber//红包已发数量
                                                    var redPacksendTime = data.rs.redPacksendTime//红包发送时间
                                                    var rejectMessage = data.rs.rejectMessage//拒绝原因
                                                    var remain = data.rs.remain//红包剩余数量
                                                    var state = data.rs.state//审核状态


                                                    if (state == '02' || state == '03') {
                                                        if (state == '02') {
                                                            state = '已通过'
                                                        } else if (state == '03') {
                                                            state = '已拒绝'
                                                        }
                                                    } else if (state == '01') {
                                                        if (state == '01') {
                                                            state = '待审核'
                                                        }
                                                    }
                                                    $('.Review_the_operation ul').remove()
                                                    var ctipage = '<ul class="a">' +
                                                        '<li>' + '<label>' + '活动名称：' + '</label>' + activityName + '</li>' +
                                                        '<li>' + '<label>' + '审核状态：' + '</label>' + state + '</li>' +
                                                        '<li>' + '<label>' + '用户名：' + '</label>' + nickname + '</li>' +
                                                        '<li>' + '<label>' + '好评图片：' + '</label>' + '<img class="rev_cti_list_img" src="http://' + img + '">' + '</li>' +
                                                        '<li>' + '<label>' + '用户评论：' + '</label>' + '<textarea class="rev_cti_list_text" readonly="readonly">' + comment + '</textarea>' + '</li>' +
                                                        '<li>' + '<label>' + '参与时间：' + '</label>' + createTime + '</li>' +
                                                        '<li>' + '<label>' + '参与人数：' + '</label>' + maxNumber + '/' + passNumber + '</li>' +
                                                        '<li>' + '<label>' + '审核时间：' + '</label>' + auditTime + '</li>' +
                                                        '<li>' + '<label>' + '拒绝原因：' + '</label>' + '<textarea class="rev_cti_list_Notext" >' + rejectMessage + '</textarea>' + '</li>' +
                                                        '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                        '<li>' + '<label>' + '发送时间：' + '</label>' + redPacksendTime + '</li>' +
                                                        '<li>' + '<label>' + '操作人：' + '</label>' + operatorName + '</li>' +
                                                        '<li>' + '<input type="button" flagsta="' + state + '" flag="' + id + '" class="rev_ok" value="通过">' +
                                                        '<input type="button" flag="' + id + '" flagsta="' + state + '" class="rev_no" value="拒绝">' + '</li>'
                                                    '</ul>'
                                                    $('.Review_the_operation').append(ctipage)
                                                    if (state != '待审核') {
                                                        $('.rev_ok').addClass('Have_to_review')
                                                        $('.rev_no').addClass('Have_to_review')
                                                        $('.rev_cti_list_Notext').attr('readonly', 'readonly')
                                                    }


                                                    //查看大图
                                                    $('.rev_cti_list_img').click(function () {
                                                        $('.bin_img').show();
                                                        $('.Review_the_operation').hide()
                                                        var img = $(this).attr('src');
                                                        $('.bin_img img').attr('src', img)

                                                    })
                                                    //关闭大图
                                                    $('.bin_img_Shut').click(function () {

                                                        $('.Review_the_operation').show();
                                                        $('.bin_img').hide();
                                                        return false
                                                    })
                                                    //关闭大图
                                                    $('.bin_img').click(function () {
                                                        $('.Review_the_operation').show();
                                                        $('.bin_img').hide();
                                                        return false
                                                    })

                                                    //活动通过
                                                    $('.rev_ok').click(function () {
                                                        var that = this
                                                        var id = $(this).attr('flag')  //当条记录的id
                                                        var data = JSON.stringify({ids: [id]})
                                                        var cssclass = $(this).attr('class')
                                                        $.ajax({
                                                            async: false,
                                                            type: 'POST',
                                                            url: interfaceUrl+ctiThrough,
                                                            data: data,
                                                            headers: {'token': token},
                                                            contentType: "application/JSON;charset=UTF-8",
                                                            dataType: 'JSON',
                                                            success: function (data) {

                                                                if (data.code != 0) {
                                                                    alert(data.message)
                                                                } else if (data.code == 0) {
                                                                    $(that).addClass('Have_to_review');
                                                                    $(that).next().addClass('Have_to_review');
                                                                    window.location.reload()

                                                                }

                                                            }

                                                        })

                                                    })

                                                    //活动拒绝
                                                    $('.rev_no').click(function () {

                                                        var that = this
                                                        var rev_cti_list_Notext = $('.rev_cti_list_Notext').val()
                                                        if (rev_cti_list_Notext == '') {
                                                            alert('随便说几句吧！')
                                                        } else {
                                                            var id = $(this).attr('flag');
                                                            var data = JSON.stringify({
                                                                id: id,
                                                                rejectMessage: rev_cti_list_Notext
                                                            })
                                                            var cssclass = $(this).attr('class')
                                                            $.ajax({
                                                                async: false,
                                                                type: 'POST',
                                                                url:interfaceUrl+ctiRefused,
                                                                data: data,
                                                                headers: {'token': token},
                                                                contentType: "application/JSON;charset=UTF-8",
                                                                dataType: 'JSON',
                                                                success: function (data) {


                                                                    if (cssclass == 'rev_no Have_to_review') {
                                                                        alert('已经审核过，请勿重复审核');
                                                                        console.log(data)
                                                                        return
                                                                    } else if (data.code == 0) {
                                                                        alert('已完成')
                                                                        $(that).addClass('Have_to_review');
                                                                        $(that).prev().addClass('Have_to_review');
                                                                        window.location.reload()

                                                                    }
                                                                }

                                                            })
                                                        }


                                                    })


                                                }


                                            }


                                        })
                                        return false

                                    })


                                    //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
                                    // $(document).click(function(event){
                                    //     var _con = $('.Review_the_operation');  // 设置目标区域
                                    //     if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
                                    //         //$('#divTop').slideUp('slow');  //滑动消失
                                    //         $('.Review_the_operation').hide();     //淡出消失
                                    //     }
                                    // });

                                    // //活动拒绝
                                    // $('.rev_no').click(function () {
                                    //     if ($(this).attr('class') == 'rev_no Have_to_review') {
                                    //         alert('已经审核过，请勿重复审核');
                                    //     } else {
                                    //         var Refused = prompt('请输入拒绝原因')
                                    //         var that = this
                                    //         var id = $(this).attr('flag');
                                    //         var rejectMessage = Refused //活动拒绝原因
                                    //         var data = JSON.stringify({id: id, rejectMessage: rejectMessage})
                                    //         var cssclass = $(this).attr('class')
                                    //
                                    //         $.ajax({
                                    //             async: false,
                                    //             type: 'POST',
                                    //             url: 'http://jie.nat300.top/junran/manage/useractivity/reject',
                                    //             data: data,
                                    //             headers: {'token': token},
                                    //             contentType: "application/JSON;charset=UTF-8",
                                    //             dataType: 'JSON',
                                    //             success: function (data) {
                                    //                 if (cssclass == 'rev_no Have_to_review') {
                                    //                     alert('已经审核过，请勿重复审核');
                                    //                     return
                                    //                 } else if (data.code == 0) {
                                    //                     $(that).addClass('Have_to_review');
                                    //                     $(that).prev().addClass('Have_to_review');
                                    //                     window.location.reload()
                                    //
                                    //                 }
                                    //             }
                                    //
                                    //         })
                                    //
                                    //     }
                                    //
                                    //     // var Refused=prompt('请输入拒绝原因')
                                    //     // var that = this
                                    //     // var id = $(this).attr('flag');
                                    //     // var rejectMessage=Refused //活动拒绝原因
                                    //     // var data = JSON.stringify({id:id})
                                    //     // var cssclass = $(this).attr('class')
                                    //     // $.ajax({
                                    //     //     async: false,
                                    //     //     type: 'POST',
                                    //     //     url: 'http://jie.nat300.top/junran/manage/useractivity/reject',
                                    //     //     data: data,
                                    //     //     headers: {'token': token},
                                    //     //     contentType: "application/JSON;charset=UTF-8",
                                    //     //     dataType: 'JSON',
                                    //     //     success: function (data) {
                                    //     //         if (cssclass == 'rev_no Have_to_review') {
                                    //     //             alert('已经审核过，请勿重复审核');
                                    //     //             return
                                    //     //         } else if (data.code == 0) {
                                    //     //             $(that).addClass('Have_to_review');
                                    //     //             $(that).prev().addClass('Have_to_review');
                                    //     //             window.location.reload()
                                    //     //
                                    //     //         }
                                    //     //     }
                                    //     //
                                    //     // })
                                    //
                                    // })
                                    // //查看大图
                                    // $('.rev_cti_list_img').click(function () {
                                    //     $('.bin_img').show();
                                    //     var img = $(this).attr('src');
                                    //     $('.bin_img img').attr('src', img)
                                    //
                                    // })
                                    // //关闭大图
                                    // $('.bin_img_Shut').click(function () {
                                    //     $('.bin_img').hide();
                                    // })

                                }


                            })

                        }


                    })


                } else {
                    alert('加载出错了！')
                }

            }


        })


    })
    //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
    $(document).click(function(event){
        var _con = $('.Review_the_operation');  // 设置目标区域
        if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
            //$('#divTop').slideUp('slow');  //滑动消失
            $('.Review_the_operation').hide();     //淡出消失
            $('.mask').hide()
        }
    });
})