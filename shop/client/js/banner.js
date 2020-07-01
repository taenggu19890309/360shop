class Banner {
    constructor(data) {
        this.data = data;
        this.slider = null;
        this.sliderBox = null;
        this.sliderControl = null;
        this.SlidePoint = null;
        this.timer = null;
        this.index = 0;
        this.len = this.data.length;
    }
    init() {
        this.createUI();
        this.autoPlayer(); 
        this.addEventHandlerWithSlider();
        this.addEventHandlerWithControl();
        this.addEventHandlerWithSlidePointItem();
    }
    autoPlayer() {
        this.timer = setInterval(() => {
            this.next();
            this.selectSlidePointItem(this.index);
        }, 2000);
    }
    addEventHandlerWithSlider() {
        this.slider.mouseenter(() => clearInterval(this.timer));
        this.slider.mouseleave(() => this.autoPlayer());
    }
    addEventHandlerWithControl() {
        let self = this;
        /* 事件委托 */
        this.sliderControl.on("click", "a", function() {
            if (this.className == "slide-prev") {
                self.prev();
            }
            if (this.className == "slide-next") {
                self.next();
            }
            self.selectSlidePointItem(self.index);
        })
    }
    prev() {
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1;
        }
        $(".slider-film").eq(this.index).css('display','block').siblings().css('display','none')
    }
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        $(".slider-film").eq(this.index).css('display','block').siblings().css('display','none')
    }   
    addEventHandlerWithSlidePointItem() {
        let self = this;
        this.SlidePoint.children().each((idx, item) => {
            console.log("item", item, "idx", idx)
            item.onclick = function() {
                self.selectSlidePointItem(idx);
                self.index = idx;
                $(".slider-film").eq(self.index).css('display','block').siblings().css('display','none')
            }
        })
    }
    selectSlidePointItem(idx) {
        this.SlidePoint.children().eq(idx).addClass("curr-point").siblings().removeClass("curr-point");
    }
    createUI() {
        this.createSlidePoint();
        this.createSliderBox();
        this.createSliderControl();
        this.slider = $("<div class='banner-box'></div>");
        this.slider.append(this.sliderBox);
        this.slider.append(this.sliderControl);
        this.slider.append(this.SlidePoint);
        $(".header-wrapper").append(this.slider);
    }
    createSliderBox() {
        this.sliderBox = $("<div class='slide-box'></div>");
        this.sliderBox.html(this.data.map(item => `<a class="slider-film"  style="background-image: ${item.src};"  href="#" title="${item.title}"></a>` ).join(""));
    }
    createSliderControl() {
        this.sliderControl = $("<div></div>");
        this.sliderControl.html('<a href="javascript:;" class="slide-prev" style="display: inline;"></a><a href="javascript:;" class="slide-next" style="display: inline;"></a>');
    }
    createSlidePoint() {
        this.SlidePoint = $("<div class='slide-point' style='display: block;'>");
        this.SlidePoint.html(this.data.map((item, idx) => `<a class="${idx == 0 ? "curr-point" : ""}"></a>`).join(""));
    }
}