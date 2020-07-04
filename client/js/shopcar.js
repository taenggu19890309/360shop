$(() => {
    let user_id = localStorage.getItem("user_id") || "";
    $.ajax({
        url: "../../server/getCart.php",
        data: { user_id },
        dataType: "json"
    }).done(data => {
        let html = data.map(item => {
            return `
        <tbody class="tbodys mod-cart-list">
            <tr class="itemsList cart-item " data-id="5e9fe364ad4cd56d01b69046" data-promotionid=""
                data-num="1">
                <td class="check_goods">
                    <input class="common-checkbox  checked  j_operate obj" type="checkbox"></input>
                </td>
                <td class="goods_info">
                    <figure class="goods-info">
                        <a href="#">
                            <img src="${item.good_src}" alt="">
                        </a>
                        <figcaption>
                            <a class="item-title"
                                href="#">
                                ${item.good_title}
                            </a>
                            <div class="promtions-box">
                            </div>
                        </figcaption>
                    </figure>
                </td>
                <td>
                    <span>分类:8GB+256GB 亮黑色 全网通</span>
                </td>
                <td>
                    <p class="price"><span>￥${item.good_price}</span></p>
                </td>
                <td class="goods_num">
                    <div class="mod-modifier fr" data-monitor="shopcart_number_click">
                        <a href="javascript:;" class="modifier-sub j_operate  disabled" 
                            data-op="add" data-val="-1">-</a>
                        <input type="tel" class="modifier-value"  data-id="" value="${item.num}"
                            data-count="1" data-maxcount="8">
                        <a href="javascript:;" class="modifier-add j_operate" data-op="add"
                            data-val="1">+</a>
                    </div>
                </td>
                <td class="item_total">
                    <p class="total"><span>￥${item.good_price*item.num*1}</span></p>
                </td>
                <td>
                    <span class="js_del" data-val="直降" >删除</span>
                </td>
            </tr>
        </tbody>
            `
        }).join("");
        $(html).insertAfter("thead");
        
    })
    /* 全选的功能：点击的时候切换选中的状态(改变自己的状态 + 改变所有其他复选框的状态) */
    $("#all").click(function () {
        // console.log(this, $(this).is(":checked"));
        $(this).next().toggleClass("mark");
        $(".j_operate").toggleClass("mark");
        computedTotal();
    })


    /* 封装方法计算商品的总数和总价 */
    function computedTotal() {
        // let flag = $(".order_item").find(".son_check").next().hasClass("mark");
        let ele = $(".tbodys").filter(function () {
            return $(".obj", this).hasClass("mark") == true;
        })

        /* 计算数量 */
        let total = 0;
        let totalPrice = 0;
        ele.each(function (index, item) {
            console.log($(item).find(".jnum_num").val(), $(item).find(".sum_price").text().slice(1));
            total += $(item).find(".modifier-value").val() * 1;
            totalPrice += $(item).find(".total").text().slice(1) * 1;
        })

        $(".jnum_num").text(total+"件");
        $(".unit").text("￥" + totalPrice.toFixed(2));
    }
})