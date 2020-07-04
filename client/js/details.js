$(()=>{
    let good_id = localStorage.getItem("good_nid");
    $.ajax({
        url: "../../server/details.php",
        data: { good_id },
        dataType: "json"
    }).done(data => {
        let html = data.map(item => {
            return `
            <div class="product-info">
                        <div class="sInfo-title">${item.good_title}</div>
                        <div class="sInfo-subtitle">${item.good_desc}</div>
                        <div class="sInfo-wrap sInfo-wrap-info">
                            <div class="seckill" style="display: none;"></div>
                            <div class="divider"></div>
                            <div class="sInfo-wrap-content">
                                <div class="row-box sInfo-price">
                                    <div class="row-box-label item-label">价格</div>
                                    <div class="row-box-content">
                                        <div class="item sInfo-price-normal">
                                            <strong class="nowprice">${item.good_price}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-box sInfo-activity ">
                                    <div class="row-box-label item-label">促销</div>
                                    <div class="row-box-content">
                                        <div class="row-box ">
                                            <div class="row-box-label"><i class="tag">直降</i></div>
                                            <div class="row-box-content">立减 289.00 元</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="top-notice-bar" style="display:none"> </div>
                    <div class="sInfo-wrap">
                        <div class="sInfo-wrap-content">
                            <div class="row-box sInfo-cate" id="item-cate">
                                <div class="cate"><span class="cate-label">分类</span>
                                    <ul class="cate-list" data-catename="571e343af28d012310e72cb8">
                                        <li class="cate-item cur"><a href="javascript:;"
                                                data-catevalue="571e343af28d012310e72cb8_571e343af28d012310e72c9f">8GB+256GB
                                                亮黑色 全网通</a></li>
                                        <li class="cate-item"><a href="javascript:;"
                                                data-catevalue="571e343af28d012310e72cb8_571e343af28d012310e72ca0">8GB+256GB
                                                深海蓝 全网通</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product-status">
                                <div class="row-box sInfo-num">
                                    <div class="row-box-label item-label">数量</div>
                                    <div class="row-box-content">
                                        <div class="gcIpt" data-monitor="itemdetail_number_click">
                                            <a href="javascript:void(0);" class="decrement disabled" data-num="-1">-</a>
                                            <input type="text" class="goodsCount" value="1">
                                            <a href="javascript:void(0);" class="increment" data-num="1">+</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="row-box sInfo-point">
                                    <div class="row-box-label item-label">积分</div>
                                    <div class="row-box-content">
                                        购买可获得${item.good_price}积分<i class="icon i-warn-info js-score-info"></i>
                                    </div>
                                </div>
                                <div class="sInfo-btns goods-detail-btns">
                                    <span class="jsBtnBox">
                                        <div  class="btn btn btn-submit btn-buy js-buy"
                                            data-monitor="itemdetail_buy_click">立即购买</div>
                                        <div  class="btn btn btn-submit btn-linear js-cart"
                                            data-monitor="itemdetail_addcart_click">加入购物车</div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
            `
        }).join("");
        $(".sInfo").html(html);
    })
    let good_id = localStorage.getItem("good_nid");
    $(".sInfo-btns").on("click", ".js-cart", function() {
        console.log("++")
        let user_id = localStorage.getItem("user_id") || "";
        let user_name = localStorage.getItem("user_name") || "";
        if (user_id && user_name) {
            /* 发请求，执行添加到购物车 */
            $.ajax({
                url: "../../server/addCart.php",
                data: { user_id, good_id }
            }).done(data => {
                console.log("返回值:", data);
            })

        } else {
            location.href = "../html/login.html"
        }
    })
})