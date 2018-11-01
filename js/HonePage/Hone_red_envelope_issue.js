$(function () {
    var token = $.cookie('token')
    //红包发放列表
    $.ajax({
        async: false,
        type: 'GET',
        url: interfaceUrl + redIssueList,
        headers: {'token': token},
        data: {'state': '02'},
        dataType: 'JSON',
        success: function (data) {
            if (data.code == 103) {
                alert('身份过期，请重新登录');
                window.parent.location.href = '../login/login.html'
            } else if (data.data.length == 0) {
                var pagedata = '<tr class="redflag">' +
                    '<td>' + '暂无数据' + '</td>' +
                    '<td>' + '</td>' +
                    '<td>' + '</td>' +
                    '<td>' + '</td>' +
                    '<td>' + '</td>' +
                    '<td>' + '</td>' +
                    '<td>' + '</td>' +
                    '<td>' + '</td>'
                    + '</tr>'
                $('.rev_cti_list').append(pagedata)
            } else if (data.code == 0) {
                $('#red_issue_fenpag').jqPaginator({
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
                        $('.page_num').text('当前第' + num + '页,' + '共' + data.pageCount + '页')
                        $.ajax({
                            async: false,
                            type: 'GET',
                            url: interfaceUrl + redIssueList,
                            headers: {'token': token},
                            data: {'page': num - 1, 'state': "02"},
                            dataType: 'JSON',
                            success: function (data) {
                                console.log(data)
                                $('.redflag').remove()
                                for (i = 0; i < data.data.length; i++) {
                                    var activityName = data.data[i].activityName//活动名称
                                    var nickname = data.data[i].nickname//用户名
                                    var sendRedpack = data.data[i].sendRedpack//状态
                                    var id = data.data[i].id//当前记录id
                                    var redPacksendTime = data.data[i].redPacksendTime//红包发送时间
                                    var sendOperatorName = data.data[i].sendOperatorName//发送操作人
                                    var money = data.data[i].money / 100 //红包金额
                                    var number = i + 1//序号

                                    if (sendOperatorName == null) {
                                        sendOperatorName = ' '
                                    }
                                    if (sendRedpack == '01') {
                                        sendRedpack = '已发送'
                                        var pagedata = '<tr class="redflag">' +
                                            '<td>' + number + '</td>' +
                                            '<td>' + activityName + '</td>' +
                                            '<td>' + nickname + '</td>' +
                                            '<td>' + redPacksendTime + '</td>' +
                                            '<td>' + money + '</td>' +
                                            '<td>' + '<span>' + sendRedpack + '</span>' + '</td>' +
                                            '<td>' + '<input class="issue_btn"  type="button" value="发送红包" flag="' + id + '">' + '</td>' +
                                            '<td>' + sendOperatorName + '</td>'
                                            + '</tr>'
                                        $('.rev_cti_list').append(pagedata)
                                    } else if (sendRedpack == '02') {
                                        sendRedpack = '未发送'
                                        var pagedata = '<tr class="redflag">' +
                                            '<td>' + '<input type="checkbox" name="checkname" id="' + id + '">' + number + '</td>' +
                                            '<td>' + activityName + '</td>' +
                                            '<td>' + nickname + '</td>' +
                                            '<td>' + redPacksendTime + '</td>' +
                                            '<td>' + money + '</td>' +
                                            '<td>' + '<span>' + sendRedpack + '</span>' + '</td>' +
                                            // '<td>'+redPacksendTime+'</td>'+
                                            '<td>' + '<input class="issue_btn"  type="button" value="发送红包" flag="' + id + '">' + '</td>' +
                                            '<td>' + sendOperatorName + '</td>'
                                            + '</tr>'
                                        $('.rev_cti_list').append(pagedata)
                                    }
                                }


                                //发送红包按钮

                                $('.issue_btn').click(function () {
                                    var that = this
                                    var ctiId = $(this).attr('flag')
                                    var data = JSON.stringify({'ids': [ctiId]})
                                    var sendRedpack = $(that).parent().prev().children().text();
                                    console.log(data)
                                    if (sendRedpack == '已发送') {
                                        alert('红包已经发送，请勿重复发送');
                                    } else if (sendRedpack == '未发送') {
                                        $.ajax({
                                            async: false,
                                            url: interfaceUrl + redIssue,
                                            type: 'POST',
                                            headers: {'token': token},
                                            data: data,
                                            contentType: "application/JSON;charset=UTF-8",
                                            success: function (data) {
                                                console.log(data)

                                                if (data.code == 0) {
                                                    alert('发送成功');
                                                    $(that).parent().prev().children().text('已发送')
                                                    window.location.reload()
                                                }
                                            }
                                        })
                                    }
                                })

                                //全选按钮
                                $("#Cti_checkbox_title").bind("click", function () {
                                    $("[name=checkname]:checkbox").prop("checked", this.checked);

                                });

                                $("input[name='checkname']").click(function () {
                                    var $subs = $("input[name='checkname']");
                                    $("#Cti_checkbox_title").prop("checked", $subs.length == $subs.filter(":checked").length ? true : false);
                                });

                                $('#red_issue_envelope').click(function () {
                                    var oiz = $("input[name=checkname]:checkbox");
                                    var idarr = [];
                                    for (i in oiz) {
                                        if (oiz[i].checked) {
                                            idarr.push(oiz[i].id)
                                        }
                                    }
                                    var data = JSON.stringify({'ids': idarr})
                                    //批量发送红包
                                    $.ajax({
                                        async: false,
                                        type: 'POST',
                                        url: interfaceUrl + redIssue,
                                        data: data,
                                        headers: {'token': token},
                                        contentType: "application/JSON;charset=UTF-8",
                                        dataType: 'JSON',
                                        success: function (data) {
                                            if (data.code == 0) {
                                                alert('批量操作成功!')
                                                window.location.reload()
                                            } else {
                                                alert('批量操作失败')
                                            }

                                        }


                                    })


                                })


                            }


                        })


                    }


                })
            }


            // $('#red_issue_fenpag').jqPaginator({
            //     totalPages: data.pageCount,
            //     pageSize: data.size,
            //     visiblePages: 7,
            //     currentPage: 1,
            //     first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
            //     prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
            //     next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
            //     last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
            //     page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
            //     onPageChange: function (num) {
            //         $('.page_num').text('当前第' + num + '页,' + '共' + data.pageCount + '页')
            //
            //         $.ajax({
            //             async: false,
            //             type: 'GET',
            //             url: 'http://jie.nat300.top/junran/manage/useractivity/search',
            //             headers: {'token': token},
            //             data: {'page': num - 1, 'state': '02'},
            //             dataType: 'JSON',
            //             success: function (data) {
            //                 console.log(data)
            //                 for (i = 0; i < data.data.length; i++) {
            //                     var activityName = data.data[i].activityName//活动名称
            //                     var nickname = data.data[i].nickname//用户名
            //                     var state = data.data[i].state//状态
            //                     var id=data.data[i].id//当前记录id
            //                     if (state == '02') {
            //                         state = '审核通过'
            //                         var pagedata = '<tr>' +
            //                             '<td>'+'<input type="checkbox">' + activityName + '</td>' +
            //                             '<td>' + nickname + '</td>' +
            //                             '<td>'+'<span>'+ state +'</span>'+ '</td>' +
            //                             '<td>' + '<input class="issue_btn"  type="button" value="发送红包" flag="'+id+'">' + '</td>'
            //                             + '</tr>'
            //                         $('.rev_cti_list').append(pagedata)
            //
            //                     }
            //
            //                 }
            //                 $('.issue_btn').click(function () {
            //                     var that=this
            //                     var ctiId=$(this).attr('flag')
            //                     console.log(ctiId)
            //                     var data=JSON.stringify({'ids':[ctiId]})
            //                     $.ajax({
            //                         async:false,
            //                         url:'http://jie.nat300.top/junran/manage/useractivity/sendRedPack',
            //                         type:'POST',
            //                         headers:{'token':token},
            //                         data:data,
            //                         contentType: "application/JSON;charset=UTF-8",
            //                         success:function (data) {
            //                             if (data.code==0){
            //                                 // alert('发送成功');
            //                                 $(this).parent().text()
            //                                 console.log( $(that).parent().prev().children().text('已发送'))
            //                                 // window.location.reload()
            //
            //                             }
            //                         }
            //
            //                     })
            //
            //                 })
            //
            //             }
            //
            //
            //         })
            //
            //
            //     }
            //
            //
            // })


        }


    })
//创建时间搜索模块
    laydate.render({
        elem: '#startTime',
        type: 'datetime'
    })
    laydate.render({
        elem: '#endTime',
        type: 'datetime'
    })


    //搜索模块
    $('#search').click(function () {
        var issue_down = $('#issue_down').val();//获取状态 01已发送  02未发送
        var startTime = $('#startTime').val() //起始时间
        var endTime = $('#endTime').val() //结束时间
        console.log(startTime)
        $('.redflag').remove()
        if (issue_down == '全部') {
            issue_down = '';
        } else if (issue_down == '已发送') {
            issue_down = '01'
        } else if (issue_down == '未发送') {
            issue_down = '02'
        }

        $.ajax({
            async: false,
            type: 'GET',
            url: interfaceUrl + redIssueList,
            data: {'sendRedPack': issue_down, 'state': '02', 'startTime': startTime, 'endTime': endTime},
            headers: {'token': token},
            dataType: 'JSON',
            success: function (data) {
                console.log(data)
                if (data.data.length == 0) {
                    var pagedata = '<tr class="redflag">' +
                        '<td>' + '暂无数据' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>'
                        + '</tr>'
                    $('.rev_cti_list').append(pagedata)


                } else if (data.code == 0) {
                    $('#red_issue_fenpag').jqPaginator({
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
                            $('.page_num').text('当前第' + num + '页,' + '共' + data.pageCount + '页')
                            $.ajax({
                                async: false,
                                type: 'GET',
                                url: interfaceUrl + redIssueList,
                                headers: {'token': token},
                                data: {
                                    'page': num - 1,
                                    'sendRedPack': issue_down,
                                    'state': '02',
                                    'startTime': startTime,
                                    'endTime': endTime
                                },
                                dataType: 'JSON',
                                success: function (data) {
                                    console.log(data)
                                    $('#startTime').val('')
                                    $('#endTime').val('')
                                    $('.redflag').remove()
                                    for (i = 0; i < data.data.length; i++) {
                                        var activityName = data.data[i].activityName//活动名称
                                        var nickname = data.data[i].nickname//用户名
                                        var sendRedpack = data.data[i].sendRedpack//状态
                                        var id = data.data[i].id//当前记录id
                                        var redPacksendTime = data.data[i].redPacksendTime//红包发送时间
                                        var sendOperatorName = data.data[i].sendOperatorName//操作人
                                        var money = data.data[i].money / 100 //红包金额
                                        var number = i + 1//序号
                                        if (sendOperatorName == null) {
                                            sendOperatorName = ' '
                                        }
                                        if (sendRedpack == '01') {
                                            sendRedpack = '已发送'
                                            var pagedata = '<tr class="redflag">' +
                                                '<td>' + number + '</td>' +
                                                '<td>' + activityName + '</td>' +
                                                '<td>' + nickname + '</td>' +
                                                '<td>' + redPacksendTime + '</td>' +
                                                '<td>' + money + '</td>' +
                                                '<td>' + '<span>' + sendRedpack + '</span>' + '</td>' +
                                                '<td>' + '<input class="issue_btn"  type="button" value="发送红包" flag="' + id + '">' + '</td>' +
                                                '<td>' + sendOperatorName + '</td>'
                                                + '</tr>'
                                            $('.rev_cti_list').append(pagedata)
                                        } else if (sendRedpack == '02') {
                                            sendRedpack = '未发送'
                                            var pagedata = '<tr class="redflag">' +
                                                '<td>' + '<input type="checkbox" name="checkname" id="' + id + '">' + number + '</td>' +
                                                '<td>' + activityName + '</td>' +
                                                '<td>' + nickname + '</td>' +
                                                '<td>' + redPacksendTime + '</td>' +
                                                '<td>' + money + '</td>' +
                                                '<td>' + '<span>' + sendRedpack + '</span>' + '</td>' +
                                                // '<td>'+redPacksendTime+'</td>'+
                                                '<td>' + '<input class="issue_btn"  type="button" value="发送红包" flag="' + id + '">' + '</td>' +
                                                '<td>' + sendOperatorName + '</td>'
                                                + '</tr>'
                                            $('.rev_cti_list').append(pagedata)
                                        }
                                    }


                                    //发送红包按钮

                                    $('.issue_btn').click(function () {
                                        var that = this
                                        var ctiId = $(this).attr('flag')
                                        var data = JSON.stringify({'ids': [ctiId]})
                                        var sendRedpack = $(that).parent().prev().children().text();
                                        if (sendRedpack == '已发送') {
                                            alert('红包已经发送，请勿重复发送');
                                        } else if (sendRedpack == '未发送') {
                                            $.ajax({
                                                async: false,
                                                url: interfaceUrl + redIssue,
                                                type: 'POST',
                                                headers: {'token': token},
                                                data: data,
                                                contentType: "application/JSON;charset=UTF-8",
                                                success: function (data) {
                                                    console.log(data)
                                                    if (data.code == 0) {
                                                        alert('发送成功');
                                                        $(that).parent().prev().children().text('已发送')
                                                        window.location.reload()
                                                    }
                                                }
                                            })
                                        }
                                    })

                                    //全选按钮
                                    $("#Cti_checkbox_title").bind("click", function () {
                                        $("[name=checkname]:checkbox").prop("checked", this.checked);

                                    });

                                    $("input[name='checkname']").click(function () {
                                        var $subs = $("input[name='checkname']");
                                        $("#Cti_checkbox_title").prop("checked", $subs.length == $subs.filter(":checked").length ? true : false);
                                    });

                                    $('#red_issue_envelope').click(function () {
                                        var oiz = $("input[name=checkname]:checkbox");
                                        var idarr = [];
                                        for (i in oiz) {
                                            if (oiz[i].checked) {
                                                idarr.push(oiz[i].id)
                                            }
                                        }
                                        //批量发送红包
                                        var data = JSON.stringify({'ids': idarr})
                                        $.ajax({
                                            async: false,
                                            type: 'POST',
                                            url: interfaceUrl + redIssue,
                                            data: data,
                                            headers: {'token': token},
                                            contentType: "application/JSON;charset=UTF-8",
                                            dataType: 'JSON',
                                            success: function (data) {
                                                if (data.code == 0) {
                                                    alert('批量操作成功!')
                                                    window.location.reload()
                                                } else {
                                                    alert('批量操作失败')
                                                }

                                            }


                                        })


                                    })


                                }


                            })


                        }


                    })
                } else if (data.code == 103) {
                    alert('身份过期，请重新登录');
                    window.parent.location.href = '../login/login.html'
                }


                // $('#red_issue_fenpag').jqPaginator({
                //     totalPages: data.pageCount,
                //     pageSize: data.size,
                //     visiblePages: 7,
                //     currentPage: 1,
                //     first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                //     prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                //     next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                //     last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                //     page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                //     onPageChange: function (num) {
                //         $('.page_num').text('当前第' + num + '页,' + '共' + data.pageCount + '页')
                //
                //         $.ajax({
                //             async: false,
                //             type: 'GET',
                //             url: 'http://jie.nat300.top/junran/manage/useractivity/search',
                //             headers: {'token': token},
                //             data: {'page': num - 1, 'state': '02'},
                //             dataType: 'JSON',
                //             success: function (data) {
                //                 console.log(data)
                //                 for (i = 0; i < data.data.length; i++) {
                //                     var activityName = data.data[i].activityName//活动名称
                //                     var nickname = data.data[i].nickname//用户名
                //                     var state = data.data[i].state//状态
                //                     var id=data.data[i].id//当前记录id
                //                     if (state == '02') {
                //                         state = '审核通过'
                //                         var pagedata = '<tr>' +
                //                             '<td>'+'<input type="checkbox">' + activityName + '</td>' +
                //                             '<td>' + nickname + '</td>' +
                //                             '<td>'+'<span>'+ state +'</span>'+ '</td>' +
                //                             '<td>' + '<input class="issue_btn"  type="button" value="发送红包" flag="'+id+'">' + '</td>'
                //                             + '</tr>'
                //                         $('.rev_cti_list').append(pagedata)
                //
                //                     }
                //
                //                 }
                //                 $('.issue_btn').click(function () {
                //                     var that=this
                //                     var ctiId=$(this).attr('flag')
                //                     console.log(ctiId)
                //                     var data=JSON.stringify({'ids':[ctiId]})
                //                     $.ajax({
                //                         async:false,
                //                         url:'http://jie.nat300.top/junran/manage/useractivity/sendRedPack',
                //                         type:'POST',
                //                         headers:{'token':token},
                //                         data:data,
                //                         contentType: "application/JSON;charset=UTF-8",
                //                         success:function (data) {
                //                             if (data.code==0){
                //                                 // alert('发送成功');
                //                                 $(this).parent().text()
                //                                 console.log( $(that).parent().prev().children().text('已发送'))
                //                                 // window.location.reload()
                //
                //                             }
                //                         }
                //
                //                     })
                //
                //                 })
                //
                //             }
                //
                //
                //         })
                //
                //
                //     }
                //
                //
                // })


            }


        })


    })


})