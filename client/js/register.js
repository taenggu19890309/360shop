$(() => {

    let options = {
        "quc-input-name": {
            reg: `/^[a-zA-Z]{2,6}$/.test(val)`,
            msg: "用户名不规范！"
        },
        "quc-input-phone": {
            reg: `/^1[3-9]\\d{9}$/.test(val)`,
            msg: "手机号码不规范！"
        },
        "quc-input-password": {
            reg: `/^[a-zA-Z0-9]{3,6}$/.test(val)`,
            msg: "密码不规范！"
        }
        // "quc-input-captcha": {
        //     reg: "imgCodeTarget == val",
        //     msg: "输入的验证码不正确！！！",
        // }
    }

    $(".quc-form input").blur(function() {
        let option_id = this.id;
        let val = $.trim($(this).val());
        console.log(options[option_id]);
        if (eval(options[option_id].reg)) {
            $(this).parents(".quc-field").next().text("");
            $(this).parents(".quc-field").next().removeClass("quc-tip-error");
        } else {
            $(this).parents(".quc-field").next().text(options[option_id].msg);
            $(this).parents(".quc-field").next().addClass("quc-tip-error");
        }
    });

    // let imgCodeTarget;
    // let captcha = new Captcha();

    // captcha.draw(document.querySelector('#quc-captcha-change'), r => {
    //     imgCodeTarget = r;
    //     console.log(r, '验证码1');
    //     /* 当用户点击图形变化验证码的时候需要重新校验 */
    //     $("#quc-input-captcha").trigger("blur");
    // });




    /* 注册按钮的点击事件 */
    $(".quc-nextAndGet-sms-token").click(function() {
        $("#quc-input-name,#quc-input-password,#quc-input-phone").trigger("blur");
        if ($(".form-group-error").length != 0) {
            return;
        }

        if (!$(".quc-checkbox").is(":checked")) {
            alert("请阅读并同意用户协议！");
            return;
        }

        let data = {
            username: $.trim($("#quc-input-name").val()),
            password: $.trim($("#quc-input-password").val()),
            phone: $.trim($("#quc-input-phone").val())
        }

        $.ajax({
            data,
            type: "get",
            dataType: "json",
            url: "../../server/register.php",
            success(response) {
                if (response.status == "success") {
                    alert(response.msg);
                    window.location.href = "../html/login.html";
                } else {
                    alert(response.msg);
                }
            }
        })

    })
})