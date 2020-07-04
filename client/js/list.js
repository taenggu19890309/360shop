$(() => {
    getDataAndRenderUI("active");

    getPageCount();

    function getPageCount() {
        $.ajax({
            type: "get",
            url: "../../server/getPageCount.php",
            success: function (response) {
                let pageStr = "";
                for (let i = 0; i < response; i++) {
                    pageStr += `<a class= 'p-class ${i == 0 ? "curr" : ""}'>${i + 1}</a>`;
                }
                $(pageStr).insertBefore(".nextPage");
            }
        });
    }

    function getDataAndRenderUI(sort, page = 0) {
        $.ajax({
            url: "../../server/getList.php",
            data: {
                sort,
                page: page
            },
            dataType: "json",
        }).done(data => {
            let html = data.map(item => {
                return `
                        <li class="list-item" data-nid="${item.good_id}">
                                <dl class="desc">
                                    <dt class="pic">
                                        <a target="_blank" href="#">
                                            <img class="lazy" data-size="180_180_"
                                                src="${item.good_src}"
                                                alt="${item.good_title}" style="display: block;">
                                        </a>
                                    </dt>
                                    <dd class="cont">
                                        <a target="_blank" href="#">
                                            <span class="title" title="${item.good_title}">
                                                ￥${item.good_title}
                                            </span>
                                            <span class="price">
                                                <span>${item.good_price}</span>
                                            </span>
                                        </a>
                                    </dd>
                                </dl>
                            </li>
                `
            }).join("");
            $(".list").html(html);
        })

    }

    // $(".list").on("click", ".list-item", function () {
    //     localStorage.setItem("user_nid",this.data().nid);
    //     window.location.href = "../html/details.html"
    // })

    /* 4、排序功能 */
    $(".js-sort >a").click(function () {
        /* 设置选中状态 */
        $(this).addClass("active").siblings().removeClass("active");
        let sortType = $(this).data().sort;

        getDataAndRenderUI(sortType);
    })

    /* 5、分页功能 */
    $(".pageBtnWrap").on("click", ".p-class", function (e) {
        /* 设置选中状态的切换 */
        $(this).addClass("curr").siblings().removeClass("curr");
        let page = $(this).text() * 1 - 1;
        getDataAndRenderUI($(".active").data().sort, page)
    })


    $("#prevPage,#nextPage").click(function () {

        /* 设置选中状态 */
        let page = $(".curr").text() * 1 - 1;
        console.log(page)
        if (this.id == "prevPage") {
            page--;
        } else if (this.id == "nextPage") {
            page++;
        }
        $(".p-class").eq(page).addClass("curr").siblings().removeClass("curr")
        getDataAndRenderUI($(".active").data().sort, page)
    })
})