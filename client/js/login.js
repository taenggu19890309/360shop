$(() => {
    $(".quc-tab-item").click(function () {
        $(this).addClass("quc-tab-item-active").siblings().removeClass("quc-tab-item-active");
        $().eq($(this).index()).css('display', 'block').siblings().css('display', 'none')
    })

    $(".quc-button-submit").click(function () {
        let username = $.trim($(".username").val());
        let password = $.trim($(".password").val());
        if (username.length == 0) {
            alert("请输入用户名");
            return;
        }

        if (password.length == 0) {
            alert("请输入密码");
            return;
        }
        let data = {
            username,
            password
            // md5(password).substr(0, 10)
        };
        /* .... */
        $.ajax({
            type: "post",
            url: "../../server/login.php",
            data,
            dataType: "json",
        }).done(data => {
            console.log(data)
            if (data.status == "success") {
                localStorage.setItem("user_id", data.data.userId);
                localStorage.setItem("user_name", data.data.username);
                window.location.href = "../html/index.html";
            } else {
                alert(data.data.msg);
            }

        });
    })

})