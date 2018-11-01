$(function () {

var operation=ajaxrequest(operationLog,'GET',{'size':15})
    console.log(operation)
    if (operation.code==0){
        $('#Hone_operation_fenpage').jqPaginator({
            totalPages: operation.pageCount,
            pageSize: operation.size,
            visiblePages: 5,
            currentPage: 1,
            first: '<td class="first"><a href="javascript:void(0);">首页</a></td>',
            prev: '<td class="prev"><a href="javascript:void(0);">上一页</a></td>',
            next: '<td class="next"><a href="javascript:void(0);">下一页</a></td>',
            last: '<td class="last"><a href="javascript:void(0);">尾页</a></td>',
            page: '<td class="page"><a href="javascript:void(0);">{{page}}</a></td>',
            onPageChange:function (num) {
                $('.text').html('当前第' + num + '页' + ',' + '共' + operation.pageCount + '页')
                var operationTwo=ajaxrequest(operationLog,'GET',{'page': num - 1,'size':15})
                if (operationTwo.code==0){
                    $('#Hone_operation_table .for_oper_list').remove()
                    for (i=0;i<operationTwo.data.length;i++){
                        var opLog= '<tr class="for_oper_list">'+
                            '<td>'+operationTwo.data[i].module+'</td>'+
                            '<td>'+operationTwo.data[i].operation+'</td>'+
                            '<td>'+operationTwo.data[i].updateTime+'</td>'+
                            '<td>'+operationTwo.data[i].operation+'</td>'+
                            '<td>'+operationTwo.data[i].operatorName+'</td>'+
                            '<td>'+operationTwo.data[i].ip+'</td>'+'</tr>'
                        $('#Hone_operation_table').append(opLog)
                        // console.log(operationTwo.data[i].module)
                    }
                }else if (operationTwo.code==103){
                    alert('身份验证过期，请重新登录')
                    window.parent.location.href = '../login/login.html' }       //身份过期重新登录}

            }


        })
    }else if (operation.code==103){
    alert('身份验证过期，请重新登录')
    window.parent.location.href = '../login/login.html' }       //身份过期重新登录}

    
    
    
    
})