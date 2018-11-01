$(function () {
    //获取存在cookie中的token
    var token = $.cookie('token');

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

                }else if (conditions.length==2){     //只精确到小数点后一位
                    alert('红包金额最小单位为角')
                    $(this).val('');
                }

            }

        }


    });


    //点击创建
    $('#add_red_button').click(function () {
        var sendName = $('#sendName').val();
        var totalAmount = $('#totalAmount').val()*100;//红包金额
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
                url: 'http://jie.nat300.top/junran/manage/redpack/upsert',
                type: 'POST',
                data: data,
                headers: {'token': token},
                dataType: 'JSON',
                contentType: "application/JSON;charset=UTF-8",
                success: function (data) {
                    alert('红包创建成功')
                    $('#add_red input').val('')
                }
            })
        }
    })

})