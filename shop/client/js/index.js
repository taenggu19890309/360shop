$(() => {
    let oUl = document.querySelector(".feed-list");
    $.getJSON("../../server/feed.list.json", (data) => {
        let tmp = data.map((item, index) => {
            index = index + 1
            let lineEnd = index % 5 === 0 ? "line-end" : "";
            let label = item.label ? item.label : ""
            let labelClass = item.label ? "label" : ""
            return `
           <a class="feed-item hover-item ${lineEnd}"
                            href="#" title="${item.name}" >
                            <div class="item-img">
                                <img alt="" src="${item.src}">
                            </div>
                            <p class="name">${item.name}</p>
                            <p class="price">
                                <span class="cur-price">${item.price}</span>
                            </p>
                            <p class="label-line">
                                 <span class="${labelClass}">${label}</span>
                            </p>
                        </a>
                        `
        }).join("");
        oUl.innerHTML = tmp;
    })

    $.getJSON("../../server/mod-banner.json", (data) => {
        (new Banner(data)).init()
        console.log(data)
    })

    // function loadCart() {
    //     $(".cartBox").remove();
    //     $.ajax({ //获取商品数据
    //         data: { type: "get", id: localStorage.id },
    //         url: "../server/cart.php",
    //         dataType: "json",
    //         success: function(res) {
    //             console.log("1", res);

    //             $(res.data).each((index, ele) => {
    //                 renderUI(ele);
    //             })
    //         }
    //     });
    // }
    // function renderUI(data){
    //     let tmp=data.map(item=>{
    //         return
    //         `<a class="feed-item hover-item "
    //         href="#" title="${data.name}" >
    //         <div class="item-img">
    //             <img alt="" src="${data.src}">
    //         </div>
    //         <p class="name">${data.name}</p>
    //         <p class="price">
    //             <span class="cur-price">${data.price}</span>
    //         </p>
    //         <p class="label-line">
    //         </p>
    //     </a>
    //     `
    //     }).join("");
    //     $(".feed-list").html(tmp)
    // }
})