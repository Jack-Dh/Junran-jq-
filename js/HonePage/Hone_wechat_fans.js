$(function () {

//获取所有标签
    var labelListino = ajaxrequest(labelList, 'GET')
    for (i = 0; i < labelListino.rs.length; i++) {
        var select = '<option flag="' + labelListino.rs[i].id + '">' + labelListino.rs[i].name + '</option>'
        $('#downLabel').append(select)
    }
    // $('#downLabel').val("12123");
    // $("#downLabel")[0].selectedIndex = -1;

    //刷新微信粉丝
    ajaxrequest(refreshFans, 'GET')


    // 分页模块
    //页面第一次加载时，第一次请求接口，拿到后端传的参数,得到全部粉丝的数据，包括关注后取关的用户
    $('.All_fans').addClass('clickfens')
    $.ajax({
        url:wxfansList,
        type: 'GET',
        dataType: 'JSON',
        headers: {'token': token},
        success: function (data) {
            console.log(data)
            if (data.data.length == 0) {
                var img = '<tr class="wx_fan_list">' + '<td>' + '暂无数据' + '</td>' +
                    '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '</tr>'
                $('#Hone_wechat_list').append(img)
            } else {
                if (data.code == 0) {
                    $('#All_fenpage').jqPaginator({
                        // totalPages: data.pageCount,
                        // visiblePages: 10,
                        // // pageSize: 1,
                        // currentPage: 2,
                        totalCounts: data.pageCount,
                        pageSize: data.size,
                        visiblePages: 7,
                        currentPage: 1,
                        first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                        prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                        next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                        last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                        page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                        onPageChange: function (num) {
                            $('#All_text').html('当前第' + num + '页' + ',' + '共' + data.pageCount + '页');
                            // console.log(num)
                            //第二次请求接口，拿到所有粉丝的信息
                            $.ajax({
                                type: 'GET',
                                url:wxfansList,
                                headers: {'token': token},
                                // data: {'page': num - 1, 'size': 2},
                                data: {'page': num - 1},
                                dataType: 'JSON',
                                success: function (data) {
                                    console.log(data)
                                    $('#Hone_wechat_list .wx_fan_list').remove();

                                    for (var i = 0; i < data.data.length; i++) {
                                        var url = data.data[i].headimgurl;     //获取粉丝头像
                                        var nickname = data.data[i].nickname     //获取粉丝昵称
                                        var provinceCity = data.data[i].province//获取粉丝所在省份
                                        var city = data.data[i].city  //获取粉丝所在城市
                                        var sex = data.data[i].sex//获取粉丝性别
                                        var subscribe = data.data[i].subscribe//获取粉丝关注状态
                                        var subscribeScene = data.data[i].subscribeScene//获取粉丝关注来源
                                        var subscribeTime = data.data[i].subscribeTime//获取粉丝关注时间
                                        var id = data.data[i].id//获取用户id
                                        var number = i + 1
                                        var a = data.data[i].tag
                                        var tag;
                                        var tagg;
                                        var tagId;
                                        var tagIds;
                                        var img = '<tr class="wx_fan_list">' +
                                            '<td>' + number + '</td>' +
                                            '<td>' + '<img class="Hone_wechat_list_img" src="' + url + '">' + '</td>' +
                                            '<td>' + nickname + '</td>' +
                                            '<td>' + provinceCity + city + '</td>' +
                                            '<td>' + sex + '</td>' +
                                            '<td>' + subscribe + '</td>' +
                                            '<td>' + subscribeScene + '</td>' +
                                            '<td>' + subscribeTime + '</td>' +
                                            '<td class="oo' + i + '" ></td>' +//用户标签
                                            '<td class="add_label">' + '<input type="button"  value="添加标签" class="fans_add_label" flag="' + id + '" >' + '<span class="label_id" flag="' + id + '">' + '</span>' + '</td>' + '</tr>'
                                        $('#Hone_wechat_list').append(img)
                                        for (var j = 0; j < a.length; j++) {
                                            tagg = data.data[i].tag[j]//获取标签名
                                            tagIds = data.data[i].tag[j]//获取标签id
                                            //判断标签是否为空，防止报错
                                            if (tagg != null && tagIds != null) {
                                                tag = data.data[i].tag[j].name//获取标签名
                                                tagId = data.data[i].tag[j].id//获取标签id
                                                $('.oo' + i).append('<p>' + tag + '</p>' + '<label style="display: none">' + tagId + '</label>')

                                            }

                                        }
                                    }

                                    // 添加标签模块
                                    $('.fans_add_label').click(function (event) {
                                        event.stopPropagation();
                                        $('.mask').show()
                                        $('.new_fans_label').show()
                                        var that = this
                                        var labalfans = ajaxrequest(labelList, 'GET')
                                        $('.newFansLabel li').remove()
                                        for (var i = 0; i < labalfans.rs.length; i++) {
                                            var label = '<li>' + '<input type="checkbox" name="checkname" id="' + labalfans.rs[i].id + '">' + '<span>' + labalfans.rs[i].name + '</span>' + '</li>'

                                            $('.newFansLabel').append(label)
                                        }
                                        var id = $(that).attr('flag');//获取每条记录的id

                                        //标签名称
                                        var fanslabel = "";//定义div里所有span的值组成的字符串
                                        var labelarr = new Array();//定义一个数组，用来存放每一个span的值
                                        $(that).parent().prev().find('p').each(function (i, obj) {
                                            labelarr[i] = $(this).text();
                                        });//循环取出span的值放入数组中
                                        fanslabel = labelarr.join(",");//将数组中的值用逗号连接起来

                                        //标签id
                                        var labelid = "";//定义div里所有span的值组成的字符串
                                        var labelarrid = new Array();//定义一个数组，用来存放每一个span的值
                                        $(that).parent().prev().find('label').each(function (i, obj) {
                                            labelarrid[i] = $(this).text();
                                        });//循环取出span的值放入数组中
                                        labelid = labelarrid.join(",");//将数组中的值用逗号连接起来


                                        //将已选中的标签在页面显示
                                        var arr = [];
                                        var fanslabelid = []
                                        for (var i = 0, len = labelarrid.length; i < len; i++) {
                                            arr.push([labelarrid[i], labelarr[i]]);
                                        }
                                        //渲染已经选中标签之前先删除已有标签，避免重复渲染
                                        $('.Haschosen li').remove()
                                        for (i = 0; i < arr.length; i++) {
                                            var ul = '<li title="点击移除" class="chooseLabel" flag="' + arr[i][0] + '">' + arr[i][1] + '</li>'
                                            fanslabelid.push(arr[i][0])
                                            $('.Haschosen').append(ul)
                                        }

                                        //删除标签
                                        $('.chooseLabel').click(function () {
                                            $(this).remove()
                                            arr.indexOf($(this).attr('flag'))
                                            var index = fanslabelid.indexOf($(this).attr('flag'))
                                            //判断标签id数组中是否有包含当前要删除的id
                                            if (index != -1) {
                                                fanslabelid.splice(index, 1)
                                            }
                                            return false
                                        })


                                        //确定添加按钮
                                        $('#newLabelBtn').click(function () {

                                            //设定一个粉丝只能添加五个标签
                                            if ($('.Haschosen li').length < 5) {
                                                var oiz = $("input[name=checkname]:checkbox");
                                                var idarr = [];
                                                for (i in oiz) {
                                                    if (oiz[i].checked) {
                                                        idarr.push(oiz[i].id)
                                                    }
                                                }
                                                //进行数组拼接
                                                var e = idarr.concat(fanslabelid);
                                                var data = JSON.stringify({'ids': e, 'state': id})
                                                console.log(data)
                                                var addlabel = ajaxrequest(interfaceUrl + wxfansLabel, 'POST', data)

                                                console.log(addlabel)
                                                if (addlabel.code == 0) {
                                                    alert('操作成功')
                                                    window.location.reload()
                                                }
                                            } else {
                                                alert('一个粉丝最多只能添加五个标签')
                                            }
                                        })
                                        //关闭添加标签模块
                                        $('.add_fans_labe_shut').click(function () {
                                            // $('.new_fans_label').hide()
                                            $('.mask').hide()
                                            $('.new_fans_label').hide()
                                        })
                                        return false
                                    })

                                }
                            })
                        },
                    });
                } else if (data.code == 103) {
                    alert('身份验证已过期，请重新登录')
                    window.parent.location.href = '../login/login.html'
                } else {
                    alert('加载错误！')
                }
            }

        }
    });
    //点击搜索粉丝
    $('#search').click(function () {
        $('#Hone_wechat_list .wx_fan_list').remove();
        var drop_down = $('#drop_down').val()  //获取下拉状态值
        var admin_search = $('.admin_search').val()//获取用户输入的用户名
        if (drop_down == '已关注') {
            drop_down = 1;
        } else if (drop_down == '已取关') {
            drop_down = 0;
        } else if (drop_down == '全部粉丝') {
            drop_down = '';
        }
        var downLabel = $('#downLabel').find('option:selected').attr('flag');//下拉选择标签

        $.ajax({
            url:wxfansList,
            type: 'GET',
            dataType: 'JSON',
            data: {'nickname': admin_search, 'subscribe': drop_down, 'tag': downLabel},
            headers: {'token': token},
            success: function (data) {
                if (data.data.length == 0) {
                    var img = '<tr class="wx_fan_list">' + '<td>' + '暂无数据' + '</td>' +
                        '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + '</td>' + '</tr>'
                    $('#Hone_wechat_list').append(img)
                } else if (data.code == 103) {
                    alert('身份验证已过期，请重新登录')
                    window.parent.location.href = '../login/login.html'
                } else if (data.code == 0) {
                    $('#All_fenpage').jqPaginator({
                        totalCounts: data.pageCount,
                        pageSize: data.size,
                        visiblePages: 7,
                        currentPage: 1,
                        first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
                        prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
                        next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
                        last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
                        page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
                        onPageChange: function (num) {
                            $('#All_text').html('当前第' + num + '页' + ',' + '共' + data.pageCount + '页');
                            $.ajax({
                                type: 'GET',
                                url:wxfansList,
                                headers: {'token': token},
                                data: {
                                    'page': num - 1,
                                    'nickname': admin_search,
                                    'subscribe': drop_down,
                                    'tag': downLabel
                                },
                                dataType: 'JSON',
                                success: function (data) {
                                    $('#Hone_wechat_list .wx_fan_list').remove();
                                    $('.admin_search').val('')//搜索完成后将文本框清空
                                    for (var i = 0; i < data.data.length; i++) {
                                        var url = data.data[i].headimgurl;     //获取粉丝头像
                                        var nickname = data.data[i].nickname     //获取粉丝昵称
                                        var provinceCity = data.data[i].province//获取粉丝所在省份
                                        var city = data.data[i].city  //获取粉丝所在城市
                                        var sex = data.data[i].sex//获取粉丝性别
                                        var subscribe = data.data[i].subscribe//获取粉丝关注状态
                                        var subscribeScene = data.data[i].subscribeScene//获取粉丝关注来源
                                        var subscribeTime = data.data[i].subscribeTime//获取粉丝关注时间
                                        var id = data.data[i].id//获取用户id
                                        var number = i + 1
                                        var a = data.data[i].tag
                                        var tag;
                                        var tagg;
                                        var tagId;
                                        var tagIds;
                                        var img = '<tr class="wx_fan_list">' +
                                            '<td>' + number + '</td>' +
                                            '<td>' + '<img class="Hone_wechat_list_img" src="' + url + '">' + '</td>' +
                                            '<td>' + nickname + '</td>' +
                                            '<td>' + provinceCity + city + '</td>' +
                                            '<td>' + sex + '</td>' +
                                            '<td>' + subscribe + '</td>' +
                                            '<td>' + subscribeScene + '</td>' +
                                            '<td>' + subscribeTime + '</td>' +
                                            '<td class="oo' + i + '" ></td>' +//用户标签
                                            '<td class="add_label">' + '<input type="button"  value="添加标签" class="fans_add_label" flag="' + id + '" >' + '<span class="label_id" flag="' + id + '">' + '</span>' + '</td>' + '</tr>'
                                        $('#Hone_wechat_list').append(img)
                                        for (var j = 0; j < a.length; j++) {
                                            tagg = data.data[i].tag[j]//获取标签名
                                            tagIds = data.data[i].tag[j]//获取标签id
                                            //判断标签是否为空，防止报错
                                            if (tagg != null && tagIds != null) {
                                                tag = data.data[i].tag[j].name//获取标签名
                                                tagId = data.data[i].tag[j].id//获取标签id
                                                $('.oo' + i).append('<p>' + tag + '</p>' + '<label style="display: none">' + tagId + '</label>')
                                            }

                                        }
                                    }

                                    // 添加标签模块
                                    $('.fans_add_label').click(function (event) {
                                        event.stopPropagation();
                                        $('.mask').show()
                                        $('.new_fans_label').show()
                                        var that = this
                                        var labalfans = ajaxrequest(labelList, 'GET')


                                        $('.newFansLabel li').remove()
                                        for (var i = 0; i < labalfans.rs.length; i++) {
                                            var label = '<li>' + '<input type="checkbox" name="checkname" id="' + labalfans.rs[i].id + '">' + '<span>' + labalfans.rs[i].name + '</span>' + '</li>'
                                            $('.newFansLabel').append(label)
                                        }
                                        var id = $(that).attr('flag');//获取每条记录的id

                                        //标签名称
                                        var fanslabel = "";//定义div里所有span的值组成的字符串
                                        var labelarr = new Array();//定义一个数组，用来存放每一个span的值
                                        $(that).parent().prev().find('p').each(function (i, obj) {
                                            labelarr[i] = $(this).text();
                                        });//循环取出span的值放入数组中
                                        fanslabel = labelarr.join(",");//将数组中的值用逗号连接起来

                                        //标签id
                                        var labelid = "";//定义div里所有span的值组成的字符串
                                        var labelarrid = new Array();//定义一个数组，用来存放每一个span的值
                                        $(that).parent().prev().find('label').each(function (i, obj) {
                                            labelarrid[i] = $(this).text();
                                        });//循环取出span的值放入数组中
                                        labelid = labelarrid.join(",");//将数组中的值用逗号连接起来


                                        //将已选中的标签在页面显示
                                        var arr = [];
                                        var fanslabelid = []
                                        for (var i = 0, len = labelarrid.length; i < len; i++) {
                                            arr.push([labelarrid[i], labelarr[i]]);
                                        }
                                        //渲染已经选中标签之前先删除已有标签，避免重复渲染
                                        $('.Haschosen li').remove()
                                        for (i = 0; i < arr.length; i++) {
                                            var ul = '<li title="点击移除" class="chooseLabel" flag="' + arr[i][0] + '">' + arr[i][1] + '</li>'
                                            fanslabelid.push(arr[i][0])
                                            $('.Haschosen').append(ul)
                                        }

                                        //删除标签
                                        $('.chooseLabel').click(function () {
                                            $(this).remove()
                                            arr.indexOf($(this).attr('flag'))
                                            var index = fanslabelid.indexOf($(this).attr('flag'))
                                            //判断标签id数组中是否有包含当前要删除的id
                                            if (index != -1) {
                                                fanslabelid.splice(index, 1)
                                            }
                                            return false
                                        })


                                        //确定添加按钮
                                        $('#newLabelBtn').click(function () {
                                            //设定一个粉丝只能添加五个标签
                                            if ($('.Haschosen li').length < 5) {
                                                var oiz = $("input[name=checkname]:checkbox");
                                                var idarr = [];
                                                for (i in oiz) {
                                                    if (oiz[i].checked) {
                                                        idarr.push(oiz[i].id)
                                                    }
                                                }
                                                //进行数组拼接
                                                var e = idarr.concat(fanslabelid);
                                                var data = JSON.stringify({'ids': e, 'state': id})
                                                var addlabel = ajaxrequest(interfaceUrl + wxfansLabel, 'POST', data)
                                                console.log(addlabel)
                                                if (addlabel.code == 0) {
                                                    alert('操作成功')
                                                    window.location.reload()
                                                }
                                            } else {
                                                alert('一个粉丝最多只能添加五个标签')
                                            }

                                        })
                                        //关闭添加标签模块
                                        $('.add_fans_labe_shut').click(function () {
                                            // $('.new_fans_label').hide()
                                            $('.mask').hide()
                                            $('.new_fans_label').hide()
                                        })
                                        return false
                                    })


                                }
                            })


                        }


                    })
                } else {
                    alert('加载错误！')
                }


            }


        })


    })

    //打开添加标签模块
    $('#addlabelbox').click(function (event) {
        event.stopPropagation();
        $('.add_fans_label').show();
        $('.mask').show()
        return false
    })


    //关闭添加标签模块
    $('.add_fans_labe_shut').click(function () {
        $('.add_fans_label').hide()
        $('.mask').hide()
    })

    //查询所有标签
    $.ajax({
        async: false,
        url: labelList,
        headers: {'token': token},
        dataType: 'JSON',
        success: function (data) {
            for (var i = 0; i < data.rs.length; i++) {
                var input = '<input title="点击修改" class="dataLabel" value="' + data.rs[i].name + '" flag="' + data.rs[i].id + '">'
                $('.add_admin_input').append(input)
            }
            //修改标签
            $(".dataLabel").blur(function () {
                var id = $(this).attr('flag')
                var dataLabel = $(this).val();

                if (dataLabel == '') {
                    alert('标签不能为空')
                } else {
                    var data = JSON.stringify({'name': dataLabel, 'id': id});
                    var addlabel = ajaxrequest(editorLabel, 'POST', data)

                }
            })
            //点击文本框后选中文本内容
            $(".dataLabel").click(function () {
                $(this).focus().select()

            })
        }
    })


//新增标签
    $('#addLabelBtn').click(function () {
        var data = JSON.stringify({'name': $('.addLabel').val()});
        var label = $('.addLabel').val()

        var addlabel = ajaxrequest(editorLabel, 'POST', data)
        console.log(addlabel)

        if (addlabel.code == 0) {
            var input = '<input class="dataLabel" value="' + label + '">'
            $('.add_admin_input').append(input)
            $('.addLabel').val('')
        }


    })

//点击空白处，关闭弹框
    $(document).click(function (event) {
        var _con = $('.add_fans_label');  // 设置目标区域
        var _cons = $('.new_fans_label');  // 设置目标区域

        if ((!_con.is(event.target) && _con.has(event.target).length === 0) && (!_cons.is(event.target) && _cons.has(event.target).length === 0)) { // Mark 1
            //$('#divTop').slideUp('slow');  //滑动消失
            $('.add_fans_label').hide();     //淡出消失
            $('.mask').hide();
            $('.new_fans_label').hide()

        }
    });

})