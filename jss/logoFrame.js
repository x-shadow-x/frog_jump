/**
 * 播放logo进度条
 */
function showLogoProgress(time) {
    if (!time) {
        return;
    }
    var playLogoTimeInterval = time / 100;
    var logoFrameName = "#api4399_logoFrame";
    var tempProgressNum = 0;
    playProgress();


    /**
     * 播放进度条
     */
    function playProgress() {
        tempProgressNum++;
        progress(tempProgressNum);
        if (tempProgressNum < 100) {
            setTimeout(playProgress, playLogoTimeInterval);
        }
    }

    /**
     * 进度条控制
     * @param progressNum
     * @param progressStr
     */
    function progress(progressNum, progressStr) {
        var div = getChildOfName(logoFrameName);
        if (!div) {
            div = createLogoFrame();
        }
        var pie1 = getChildOfName(".pie1");
        var pie2 = getChildOfName(".pie2");
        var percent = getChildOfName(".word em");
        var rotate = progressNum * 3.6; //角度
        if (rotate >= 0 && rotate <= 180) {
            setRotate(pie1, rotate);
        } else if (rotate >= 180 && rotate <= 360) {
            setRotate(pie1, 180);
            pie2.style.background = "#fff000";
            setRotate(pie2, rotate);
        }
        percent.innerHTML = progressNum + "%";
        if (progressNum >= 100) {
            setTimeout(hideProgress, 500);
        }

    }

    /**
     * 隐藏LOGO层
     */
    function hideProgress() {
        div.style.display = "none";
    }

    /**
     * 创建LOGO层
     */
    function createLogoFrame() {
        var css = [
            logoFrameName + " {opacity:1;position:fixed;left:0;top:0;z-index:9947483646;width:100%;height:100%;z-index:9947483646;font-size:12px;color:#585649;background:url(http://h.4399.com/images/play/bg.png) center top no-repeat #32aae4;}",
            logoFrameName + " .cf{overflow:hidden;*zoom:1}",
            logoFrameName + " .cf:after{content:'';display:block;height:0;clear:both;}",
            logoFrameName + " .fl{float:left;}",
            logoFrameName + " .fr{float:right;}",
            logoFrameName + " .logo{position:fixed;top:12%;left:50%;margin-left:-100px;z-index:3}",
            logoFrameName + " .footer{position:fixed;bottom:10%;left:50%;margin-left:-110px;z-index:2}",
            logoFrameName + " .box{position:fixed;top:50%;left:50%;width:300px;margin:-66px 0 0 -150px;z-index:1}",
            logoFrameName + " .box p{height:36px;line-height:36px;color:#116498;font-size:12px;text-align:center}",
            logoFrameName + " .load{position:relative;top:0;left:50%;width:100px;height:100px;margin-left:-50px;}",
            logoFrameName + " .load .circle{position:absolute;top:0;left:0;width:100px;height:100px;background:#fff;border-radius:50%}",
            logoFrameName + " .load .pie1,.load .pie2{position:absolute;width:100px;height:100px;background:#fff000;clip:rect(0,50px,100px,0);border-radius:50%;}", //transition:all .2s ease;-webkit-transition:all .2s ease;-o-transition:all .2s ease;
            logoFrameName + " .load .pie2{background:#fff;}",
            logoFrameName + " .load .cover{position:relative;top:5px;left:5px;width:90px;height:90px;background:#45ccff;border-radius:50%}",
            logoFrameName + " .word{position:absolute;top:30px;left:0;width:100px;text-align:center}",
            logoFrameName + " .word span{font-size:12px;display:block;line-height:30px;color:#fff;margin:0;padding:0;list-style:none;vertical-align:middle;}",
            logoFrameName + " .word em{font-size:12px;color:#fff000;margin:0;padding:0;list-style:none;font-style:normal;vertical-align:top;}",
            logoFrameName + " p {height: 28px!important;line-height: 28px!important;margin: 0;padding: 0;list-style: none;vertical-align: middle;width: 400px;margin-left: -50px;}"
        ];
        createStyle(css.join(""));
        div = document.createElement("div");
        div.id = logoFrameName.slice(1);
        div.innerHTML = [
            '<div class="logo">',
            '<img src="http://h.4399.com/images/play/logo_1.png" width="200"/>',
            '</div>',
            '<div class="box">',
            '<div class="load">',
            '<div class="circle"></div>',
            '<div class="pie1"></div>',
            '<div class="pie2"></div>',
            '<div class="cover"></div>',
            '<div class="word">',
            '<span>游戏载入中...</span>',
            '<em>0%</em>',
            '</div>',
            '</div>',
            '<p>（如长时间无响应，请刷新页面）</p>',
            '<p>抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。</p>',
            '<p>适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。</p>',
            '<p>此游戏适用16岁以上用户。游戏纠纷处理电话：0592-5054399</p>',
            '</div>',
            '<div class="footer">',
            '<img src="http://h.4399.com/images/play/footer.png" width="220"/>',
            '</div>'
        ].join(" ");
        document.body.appendChild(div);
        div.addEventListener("touchstart", stopEvent);
        div.addEventListener("mousedown", stopEvent);
        return div;
    }

    /**
     * 创建CSS样式表
     * @param css
     * @param cssDoc
     */
    function createStyle(css, cssDoc) {
        var doc = cssDoc || document;
        var style = doc.createElement("style");
        style.type = "text/css";
        doc.getElementsByTagName("head")[0].appendChild(style);
        if (style.styleSheet)
            style.styleSheet.cssText = css;
        else
            style.appendChild(doc.createTextNode(css));
    }

    /**
     * 依照对象名获取对象
     * @param name              对象名
     * @param parent            父类
     */
    function getChildOfName(name, parent) {
        parent = parent || document;
        return parent.querySelector(name);
    }

    /**
     * 设置对应组件的旋转属性
     * @param element       组件
     * @param rotate        旋转角度
     */
    function setRotate(element, rotate) {
        element.style.webkitTransform = "rotate(" + rotate + "deg)";
        element.style.MozTransform = "rotate(" + rotate + "deg)";
        element.style.msTransform = "rotate(" + rotate + "deg)";
        element.style.OTransform = "rotate(" + rotate + "deg)";
        element.style.transform = "rotate(" + rotate + "deg)";
    }

    /**
     * 监听点击事件 并禁止向下传递，用于面板下不可点击
     * @param e
     */
    function stopEvent(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}