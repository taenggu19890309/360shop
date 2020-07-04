$(() => {
    let user_id=localStorage.getItem("user_id")||"";
    let user_name=localStorage.getItem("user_name")||"";
    console.log(user_id,user_name);
    if (user_id && user_name) {
        $(".login-box").css("display","none")
        $(".user-box").css("display","block")
        $(".user").text(user_name);
        
    } else {
        $(".login-box").css("display","block")
        $(".user-box").css("display","none")
    }

    $(".icon-qrcode").click(function () {
        if ($(".right-download-box").css("display") == "none") {
            $(".right-download-box").css('display', 'block')
        }
        else {
            $(".right-download-box").css('display', 'none')
        }

    })

    $(".login-box").on("click", ".text-lnk", function () {
        if ($(this).text() == "登录") {
            window.location.href = "../html/login.html";
        }
        else if ($(this).text() == "注册") {
            window.location.href = "../html/register.html"
        }
    })

    $(".icon-close").click(function () {
        $(".right-download-box").css('display', 'none')
    })

    $(".tuichu").click(function(){
        localStorage.removeItem("user_id")
        localStorage.removeItem("user_name");
        $(".login-box").css("display","block")
        $(".user-box").css("display","none")
        window.location.reload();
    })
})