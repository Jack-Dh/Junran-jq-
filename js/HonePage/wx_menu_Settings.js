// $(function () {
//     var token = $.cookie('token')
//     console.log(token)
//     $.ajax({
//         async: false,
//         type: 'GET',
//         url: 'http://jie.nat300.top/junran/manage/wxsetting/get',
//         headers: {'token': token},
//         dataType: 'JSON',
//         success: function (data) {
//             console.log(data)
//             var onemenunum = data.rs.menus.length //获取所有一级菜单的数量
//             for (i = 0; i < data.rs.menus.length; i++) {       //循环一级菜单
//                 var menuname = data.rs.menus[i].menFirTitle  //一级菜单名称
//                 var menFirUrl = data.rs.menus[i].menFirUrl  //一级菜单页面地址
//                 var num = data.rs.menus[i].menuSeconds.length//当前一级菜单下的二级菜单数量
//                 var onemenu = '<div class="one_menu">' + '<p class="one_menu_son_one">' + menuname + '</p>' + '<span class="menu_url">' + menFirUrl + '</span>' + '<span class="twomenuNum">' + num + '</span>' + '</div>'
//                 $('.wx_menu_box').append(onemenu)
//                 for (j = 0; j < data.rs.menus[i].menuSeconds.length; j++) {  //循环二级菜单
//                     var twomenuname = data.rs.menus[i].menuSeconds[j].menSecTitle//对应第一个一级菜单的名称
//                     var twomenuurl = data.rs.menus[0].menuSeconds[j].menSecUrl//二级菜单地址
//                     var onemenu = '<p class="one_menu_son_two">' + twomenuname + '<span class="menu_url">' + twomenuurl + '</span>' + '</p>'
//                     $('.wx_menu_box').append(onemenu)
//
//                     // var arr={'menFirTitle':menuname,'menFirUrl':menuname,'menuSeconds':{'menSecTitle':twomenuname,'menSecUrl':twomenuurl}};
//
//                 }
//             }
//
//             //编辑当前点击的一级菜单
//             $('.one_menu').click(function () {
//                 var aa=$(this).next().siblings('.one_menu').find('.one_menu_son_one')
//                 console.log(aa)
//                 var that = this
//                 $('.one_label_meny_one').remove()
//                 $('.updatwomenu').remove()
//
//                 var name = $(this).find('p').text();
//                 var url = $(this).find('span').text();
//                 var num = $(this).find('.twomenuNum').text()
//                 var a =
//                     '<div class="one_label_meny_one">' +
//                     '<label class="wx_menu_title">' + '一级菜单:' + '</label>' +
//                     '<input id="one_label_meny_one_name" value="' + name + '">' +
//                     '<img src="../../img/addtwo.png" id="one_label_meny_img">' +
//                     '<br>' +
//                     '<label class="wx_menu_title">' + '页面地址:' + '</label>' +
//                     '<input id="one_label_meny_one_url" value="' + url + '">' + '</div>'
//                 $('.wx_menu_box_right').append(a)
//
//                 //添加二级菜单
//                 $('#one_label_meny_img').click(function () {
//                     if (num >= 5) {
//                         alert('一个一级菜单最多只有五个子菜单')
//                     } else {
//                         $('.twomenu').remove()
//                         $('.updatwomenu').remove()
//                         var onemenu = '<p class="twomenu">' + '<label class="wx_menu_title">' + '二级菜单:' + '</label>' +
//                             '<input id="two_son_meny_two_name">' +
//                             '<br>' +
//                             '<label class="wx_menu_title">' + '页面地址:' + '</label>' +
//                             '<input id="two_son_meny_two_url">' + '</p>'
//                         $('.wx_menu_box_right').append(onemenu)
//
//                     }
//
//                 })
//
//             })
//             //修改二级菜单
//             $('.one_menu_son_two').click(function () {
//                 var name = $(this).text().substring(0, 6);//当前点击的二级菜单名称
//                 var url = $(this).find('span').text();//当前点击二级菜单的页面地址
//                 $('.updatwomenu').remove();
//                 $('.one_label_meny_one').remove()
//                 $('.twomenu').remove();
//                 var b =
//                     '<p class="updatwomenu">' + '<label class="wx_menu_title">' + '二级菜单:' + '</label>' +
//                     '<input id="two_son_meny_two_name" value="' + name + '">' +
//                     '<br>' +
//                     '<label class="wx_menu_title">' + '页面地址:' + '</label>' +
//                     '<input id="two_son_meny_two_url" value="' + url + '">' + '</p>'
//                 $('.wx_menu_box_right').append(b)
//
//             })
//
//             $('.add_menu').click(function () {
//                 if (onemenunum >= 3) {
//                     alert('最多只能有三个一级菜单！')
//                 } else {
//                     $('.one_label_meny_one').remove()
//                     $('.updatwomenu').remove()
//                     var a =
//                         '<div class="one_label_meny_one">' +
//                         '<label class="wx_menu_title">' + '一级菜单:' + '</label>' +
//                         '<input id="one_label_meny_one_name">' +
//                         '<img src="../../img/addtwo.png" id="one_label_meny_img">' +
//                         '<br>' +
//                         '<label class="wx_menu_title">' + '页面地址:' + '</label>' +
//                         '<input id="one_label_meny_one_url">' + '</div>'
//                     $('.wx_menu_box_right').append(a)
//                 }
//
//
//             })
// // var qwe=[]
// //             $('#but').click(function () {
// //               var a= $('#one_label_meny_one_name').val()
// //                 var b=$('#one_label_meny_one_url').val()
// //                 var c=$('#two_son_meny_two_name').val();
// //                 var d=$('#two_son_meny_two_url').val()
// //
// //                 var arr=[{'menFirTitle':a,'menFirUrl':b,'menuSeconds':{'menSecTitle':c,'menSecUrl':d}}];
// //                 qwe.push(arr)
// //                 console.log(qwe)
// //             })
//
//         }
//     })
//
// //     //添加一级标签
// //     var flag = 0;
// //     $('.add_menu').click(function () {
// //         flag += 1;
// //         if (flag == 1) {
// //
// //             $('.one_label_meny_one').show();
// //             $('.one_label_meny_one input').addClass('flag')
// //
// //         } else if (flag == 2) {
// //             $('.one_label_meny_two input').addClass('flag')
// //
// //             $('.one_label_meny_two').show()
// //
// //
// //         } else if (flag == 3) {
// //             $('.one_label_meny_three input').addClass('flag')
// //             $('.one_label_meny_three').show()
// //
// //
// //         }
// //     })
// //
// // //添加第一个一级标签的的二级标签
// //     var onemenyflage = 0
// //     $('#one_label_meny_img').click(function () {
// //         onemenyflage += 1;
// //         if (onemenyflage == 1) {
// //             $('.one_son_meny_one input').addClass('flag')
// //             $('.one_son_meny_one').show()
// //         } else if (onemenyflage == 2) {
// //             $('.one_two_meny_one input').addClass('flag')
// //             $('.one_two_meny_one').show();
// //         } else if (onemenyflage == 3) {
// //             $('.one_three_meny_one input').addClass('flag')
// //             $('.one_three_meny_one').show();
// //         } else if (onemenyflage == 4) {
// //             $('.one_for_meny_one input').addClass('flag')
// //             $('.one_for_meny_one').show();
// //         } else if (onemenyflage == 5) {
// //             $('.one_five_meny_one input').addClass('flag')
// //             $('.one_five_meny_one').show();
// //         }
// //
// //     })
// //
// // //添加第二个一级标签的二级标签
// //     var twomenyflage = 0
// //     $('#two_label_meny_img').click(function () {
// //         twomenyflage += 1;
// //         if (twomenyflage == 1) {
// //             $('.two_one_meny_one input').addClass('flag')
// //             $('.two_one_meny_one').show()
// //         } else if (twomenyflage == 2) {
// //             $('.two_two_meny_one input').addClass('flag')
// //             $('.two_two_meny_one').show()
// //         } else if (twomenyflage == 3) {
// //             $('.two_three_meny_one input').addClass('flag')
// //             $('.two_three_meny_one').show()
// //         } else if (twomenyflage == 4) {
// //             $('.two_for_meny_one input').addClass('flag')
// //             $('.two_for_meny_one').show()
// //         } else if (twomenyflage == 5) {
// //             $('.two_five_meny_one input').addClass('flag')
// //             $('.two_five_meny_one').show()
// //         }
// //
// //
// //     })
// //
// // //添加第三个一级标签的二级标签
// //     var threemenyflage = 0
// //     $('#three_label_meny_img').click(function () {
// //         threemenyflage += 1;
// //         if (threemenyflage == 1) {
// //             $('.three_one_meny_one input').addClass('flag')
// //             $('.three_one_meny_one').show()
// //         } else if (threemenyflage == 2) {
// //             $('.three_two_meny_one input').addClass('flag')
// //             $('.three_two_meny_one').show()
// //         } else if (threemenyflage == 3) {
// //             $('.three_three_meny_one input').addClass('flag')
// //             $('.three_three_meny_one').show()
// //         } else if (threemenyflage == 4) {
// //             $('.three_for_meny_one input').addClass('flag')
// //             $('.three_for_meny_one').show()
// //         } else if (threemenyflage == 5) {
// //             $('.three_five_meny_one input').addClass('flag')
// //             $('.three_five_meny_one').show()
// //         }
// //
// //
// //     })
//
//     $('#Menu_to_submit').click(function () {
//         // var one_label_meny_one_name = $('#one_label_meny_one_name .flag').val()//第一个一级菜单名称
//         // var one_label_meny_one_url = $('#one_label_meny_one_url .flag').val()//第一个一级菜单页面地址
//         //
//         // var one_son_meny_one_name = $('#one_son_meny_one_name .flag').val()//第一个一级菜单的第一个子菜单名称
//         // var one_son_meny_one_url = $('#one_son_meny_one_url .flag').val()//第一个一级菜单的第一个子菜单页面地址
//         //
//         // var one_son_meny_two_name = $('#one_son_meny_two_name').val()//第一个一级菜单的第二个子菜单名称
//         // var one_son_meny_two_url = $('#one_son_meny_two_url').val()//第二个一级菜单的第一个子菜单页面地址
//         //
//         // var one_son_meny_three_name = $('#one_son_meny_three_name').val()//第一个一级菜单的第三个子菜单名称
//         // var one_son_meny_three_url = $('#one_son_meny_three_url').val()//第一个一级菜单的第三个子菜单页面地址
//         //
//         // var one_son_meny_for_name = $('#one_son_meny_for_name').val()//第一个一级菜单的第四个子菜单名称
//         // var one_son_meny_for_url = $('#one_son_meny_for_url').val()//第一个一级菜单的第四个子菜单页面地址
//         //
//         // var one_son_meny_five_name = $('#one_son_meny_five_name').val()//第一个一级菜单的第五个子菜单名称
//         // var one_son_meny_five_url = $('#one_son_meny_five_url').val()//第一个一级菜单的第五个子菜单页面地址
//         //
//         //
//         // var one_label_meny_two_name = $('#one_label_meny_two_name').val()//第二个一级菜单名称
//         // var one_label_meny_two_url = $('#one_label_meny_two_url').val()//第二个一级菜单页面地址
//         //
//         // var two_son_meny_one_name = $('#two_son_meny_one_name').val()//第二个一级菜单的第一个子菜单名称
//         // var two_son_meny_one_url = $('#two_son_meny_one_url').val()//第二个一级菜单的第一个子菜单页面地址
//         //
//         // var two_son_meny_two_name = $('#two_son_meny_two_name').val()//第二个一级菜单的第二个子菜单名称
//         // var two_son_meny_two_url = $('#two_son_meny_two_url').val()//第二个一级菜单的第一个子菜单页面地址
//         //
//         // var two_son_meny_three_name = $('#two_son_meny_three_name').val()//第二个一级菜单的第三个子菜单名称
//         // var two_son_meny_three_url = $('#two_son_meny_three_url').val()//第二个一级菜单的第三个子菜单页面地址
//         //
//         // var two_son_meny_for_name = $('#two_son_meny_for_name').val()//第二个一级菜单的第四个子菜单名称
//         // var two_son_meny_for_url = $('#two_son_meny_for_url').val()//第一个一级菜单的第四个子菜单页面地址
//         //
//         // var two_son_meny_five_name = $('#two_son_meny_five_name').val()//第二个一级菜单的第五个子菜单名称
//         // var two_son_meny_five_url = $('#two_son_meny_five_url').val()//第二个一级菜单的第五个子菜单页面地址
//         //
//         //
//         // var one_label_meny_three_name = $('#one_label_meny_three_name').val()//第三个一级菜单名称
//         // var one_label_meny_three_url = $('#one_label_meny_three_url').val()//第三个一级菜单页面地址
//         //
//         // var three_son_meny_one_name = $('#three_son_meny_one_name').val()//第二个一级菜单的第一个子菜单名称
//         // var three_son_meny_one_url = $('#three_son_meny_one_url').val()//第三个一级菜单的第一个子菜单页面地址
//         //
//         // var three_son_meny_two_name = $('#three_son_meny_two_name').val()//第二个一级菜单的第二个子菜单名称
//         // var three_son_meny_two_url = $('#three_son_meny_two_url').val()//第三个一级菜单的第一个子菜单页面地址
//         //
//         // var three_son_meny_three_name = $('#three_son_meny_three_name').val()//第二个一级菜单的第三个子菜单名称
//         // var three_son_meny_three_url = $('#three_son_meny_three_url').val()//第三个一级菜单的第三个子菜单页面地址
//         //
//         // var three_son_meny_for_name = $('#three_son_meny_for_name').val()//第二个一级菜单的第四个子菜单名称
//         // var three_son_meny_for_url = $('#three_son_meny_for_url').val()//第三个一级菜单的第四个子菜单页面地址
//         //
//         // var three_son_meny_five_name = $('#three_son_meny_five_name').val()//第三个一级菜单的第五个子菜单名称
//         // var three_son_meny_five_url = $('#three_son_meny_five_url').val()//第三个一级菜单的第五个子菜单页面地址
//
//
//     })
//
//
// })



    // requestAjax

$(function () {
    var a= ajaxrequest(interfaceUrl+adminList,'GET')
    console.log(a)
    
})





