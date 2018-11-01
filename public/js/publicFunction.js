var token=$.cookie('token');
function ajaxrequest(url,type,data) {

    data=(data==''||data==null||typeof(data)==undefined)?{'date': new Date().getTime()}:data;
    // type(type==''||type==null||typeof(type)==undefined)?'GET':type;
    var json={}
    $.ajax({
        url:url,
        async:false,
        type:type,
        data:data,
        dataType:'JSON',
        headers:{'token':token},
        contentType: "application/JSON;charset=UTF-8",
        success:function (resule) {
            json=resule
            // console.log(json)
        },
    })
return json

}