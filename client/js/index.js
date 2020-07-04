$(() => {
    $.getJSON("../../server/mod-banner.json", (data) => {
        (new Banner(data)).init()
    })

    feedlist();
    function feedlist() {
        $.ajax({
            url: "../../server/index.php",
            dataType: "json",
        }).done(data => {
            let tmp = data.map(item => {
                index = item.good_id
                let lineEnd = index % 5 === 0 ? "line-end" : "";
                return `
               <a class="feed-item hover-item ${lineEnd}" data-id=${item.good_id}
                               href="details.html" title="${item.good_title}" >
                                <div class="item-img">
                                    <img alt="" src="${item.good_src}">
                                </div>
                                <p class="name">￥${item.good_title}</p>
                                <p class="price">
                                    <span class="cur-price">${item.good_price}</span>
                                </p>
                            </a>
                            `
            }).join("");
            $(".feed-list").html(tmp)
        })

    }
    $(".feed-list").on("click", "a", function () {
        let nidType = $(this).data().id;
        localStorage.setItem("good_nid", nidType);
    })

    $(".floor-title").on("click", ".more-lnk", function () {
        let pidType = $(this).data().pid;
        localStorage.setItem("good_pid", pidType);
    })

})
