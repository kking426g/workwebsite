//目標功能
//1登入/註冊 用AJAX 載入頁面 再展開
//2有效的RESIZE 可以對應的效果
//country  ...等下拉選單 交給ajax json
//table 做ajax 管理
//  指定欄位        對應 <td data-xid=""> 應填入內容!?
//  指定資料表      對應 <table data-xid="">　填入整個table
//          計算table ROW COL？
//common 共用功能
//alert
//conform
//--調用的JQUERY 套件管理
//跑馬燈
//廣告BANNER
//聯絡選單
//JP的數字JUMP效果
//統計GOOGLE AD /BING
//上傳工具
//對所有的內容
(function (jQ) {
    jQ.extend({
        win : undefined ,
        site: ["127.0.0.1", "localhost", "172.16.80.11"], //註冊域名 比對當前網域
        ua: navigator.userAgent.toLowerCase(),
        cookie: "", //cookie 管理
        lang: "",//語系管理
        jstr: { alert_title: "Notification" },
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        //語系包的內容 請求
        getLang : function (meth, str) {
            str = getJSON(url + meth);
        },
        //瀏覽器
        Bsv: function () { //瀏覽器
            rwebkit = /(webkit)[ \/]([\w.]+)/,
                rchrome = /(chrome)[ \/]([\w.]+)/,
                ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                rmsie = /(msie) ([\w.]+)/,
                rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
                match = rchrome.exec(this.ua) || rwebkit.exec(this.ua) || ropera.exec(this.ua) || rmsie.exec(this.ua) || this.ua.indexOf("compatible") < 0 && rmozilla.exec(this.ua) || [];
            return { browser: match[1] || "", version: match[2] || "0" };
        },
        //補0
        addZ: function (str, length) { return new Array(length - str.toString().length + 1).join("0") + str; },
        //判斷
        isMob: function () {
            if (!navigator) { return false };
            return (this.ua.match(/iPhone|Android|Windows Phone|Mobi/)) && !(this.ua.match(/iPad|iPod/)) ? true : ($(window).width() < 800 && $(window).width() < $(window).height()) ? true : false;
        },
        isPad: function () {
            if (!navigator) { return false };
            return (this.ua.match(/iPad|iPod/)) ? true : false;
        },
        //嵌入Js Css
        include: function (file) {
            var files = typeof file == "string" ? [file] : file;
            for (var i = 0; i < files.length; i++) {
                var name = files[i].replace(/^\s|\s$/g, "");
                var att = name.split('.');
                var ext = att[att.length - 1].toLowerCase();
                var link = undefined;
                if (ext == "css") {
                    link = document.createElement('link');
                    link.type = 'text/css';
                    link.rel = 'stylesheet';
                    link.href = file;
                } else {
                    link = document.createElement('script');
                    link.type = 'text/javascript';
                    link.src = file;
                }
                document.getElementsByTagName("head")[0].appendChild(link);
            }
        },
        //
        jAlert: function (str, til) {
            //文字檢查
            if (str == undefined || str.length == 0) { return false; };
            if (til == undefined || til.length == 0) { til = $.jstr.alert_title; };
            //版本檢查
            if ((this.Bsv().browser + this.Bsv().version) == "msie6.0") { alert(str); return false; }; //排除ie6的問題前暫用
            if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
            $("<div class='mask'>").appendTo("body");
            $("<div class='jAlert'>")
                .append($("<div class='tbar dang'>").text(til))
                .append($("<p>").text(str))
                .append($("<button class='default' type='button'>").text("CLOSE").on("click", function () { $(".mask,.jAlert").remove() })).appendTo("body");
        },
        /*訊息jConfirm */
        jConfirm: function (str, til, callback) {
            //文字檢查
            if (str == undefined || str.length == 0) { return false; };
            if (til == undefined || til.length == 0) { til = $.jstr.alert_title; };
            //版本檢查
            if ((this.Bsv().browser + this.Bsv().version) == "msie6.0") { alert(str); return false; }; //排除ie6的問題前暫用
            if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
            $("<div class='mask'>").appendTo("body");
            $("<div class='jAlert'>")
                .append($("<div class='tbar dang'>").text(til))
                .append($("<p>").text(str))
                .append($("<button class='default orange' type='button'>").text("YES").on("click", function () { $(".mask,.jAlert").remove(); (callback) ? callback(true) : "" }))
                .append($("<button class='default' type='button'>").text("NO").on("click", function () { $(".mask,.jAlert").remove(); (callback) ? callback(false) : "" }))
                .appendTo("body");
        },
        //-------------------
        //遊戲
        game : {
            //預覽
            Preview : function () {
                //給一個長寬預設值
                $("#gamelist .game .pimg").click(function () {
                    var vh = $("#gamelist .game").height();
                    (vh > 0)? $("#gamelist .game").height(vh):"";
                    /*上面二行是防止跑位*/
                    $("#gamelist .game .pitem").removeClass("view");
                    $(this).parents(".pitem").addClass("view");
                });
                $(" .xx").click(function () { //關閉
                    $("#gamelist .game .pitem").removeClass("view");
                });
                // $(".btn_pwin").click(function () {
                //     var key = $(this).parents(".pitem").attr("play-data");
                //     $StartGame(key, "play");
                // });
                $(".btn_pfun").click(function () { //試玩//.attr("start-data")
                    var key = $(this).parents(".pitem").attr("play-data");
                    $StartGame(key, "test");
                });
                $(".btn_fav").click(function () { //加最愛//.attr("start-data")
                    var key = $(this).parents(".pitem").attr("play-data");
                    $StartGame(key, "fav");
                });
            },
            //啟動
            Start: function () {
                if (this.win) { this.win.close(); };//單一啟動限制
                if (key != undefined && key.length > 0) {
                    this.win = window.open(location.host + "/" + type + "/" + key);
                } else {
                    alert("key is fail , please reload the page");
                }
            },
            //兌換。餘額查詢
            Exchange: function (url, json, PostBack) {
                var str = {
                    til: "Deposit to Gaming Platform",
                    tAvailable: "Available Balance",
                    Available: "CNY$20,000",
                    action: "",
                    tPlatform: "Platform",
                    tExist: "Exist Balance",
                    tDeposit: "Deposit Amount",
                    Platform: "Micro Gaming",
                    Exist: "CNY$0-",
                }
                if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
                $("<div class='mask'>").appendTo("body");
                $("<div id='deposit' class='jAlert'>")
                    .append($("<div>", { "class": "tbar succ", "text": str.til }))
                    .append($("<p>").text(str.tAvailable + ":").append($("<span>", { "class": "highlighter", "text": str.Available })))
                    .append($("<from>", { "actions": "", "typeof": "POST" }).append($("<div>", { "class": "tabbox" })
                            .append(
                                $("<table>")
                                    .append($("<tr>").append($("<th>", { "text": str.tPlatform })).append($("<td>", { "text": "：" + str.Platform })))
                                    .append($("<tr>").append($("<th>", { "text": str.tExist })).append($("<td>", { "text": "：" }).append($("<span>", { "class": "highlighter", "text": str.Exist }))))
                                    .append($("<tr>").append($("<th>", { "text": str.tDeposit })).append($("<td>", { "text": "：" }).append($("<input>", { "type": "text", "value": "0" }))))
                            )
                        )
                    )
                    .append($("<button>", { "class": "default", "type": "reset", "text": ocmsite.i18n.get("cancel") }).on("click", function () { $(".mask,.jAlert").remove() }))
                    .append($("<button>", { "class": "default", "type": "button", "text": ocmsite.i18n.get("done") }).text(ocmsite.i18n.get("done")).on("click", function () { /*這邊寫要按了要做啥？ */ }))
                    .appendTo("body");
            }
        },
        //
        jackpot : {
            dom : new Object(),
            speed : 3000,
            data_speed : 60000,
            current: 0,
            difference:0,
            set_data: function(){
                ocmsite.etc.getJackpotMicrogaming({
                    onDone:function(data) {
                        $.jackpot.current = parseFloat(data.currentValue);
                        $.jackpot.difference = parseFloat(data.difference);
                    }
                });
            },
            running:function(){
                setInterval(function(){
                    $.jackpot.dom.each(function(){
                        $.jackpot.current += $.jackpot.difference;
                        $(this).text(
                            "¥" + ($.jackpot.current).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                        );
                    });
                },$.jackpot.speed);
            },
            start: function(me, speed) {
                if (typeof speed == "number" &&  speed > 500) {this.speed = speed};
                if (typeof me == "object" ) {
                    this.dom = me;
                    $.jackpot.set_data();
                    setInterval(function(){
                        $.jackpot.set_data();
                    }, $.jackpot.data_speed );
                    this.running();
                };
            }
        },
        //
        winner :{
            count: 3,
            pool : new Array(),
            pool_size : 50,
            speed : 3000,
            animate_speed:600,
            // draw the Variable in DOM
            drawing : function(item){
                if ( typeof item  != "undefined"){
                    var obj = $(".winner .item:first").clone().attr("style","");
                    obj.children("h4").text(item.name);
                    obj.children(".money2").text(item.money);
                    //Animate
                    $(".winner .item:first").parent().append(obj.hide().slideDown( this.animate_speed));
                    $(".winner .item:first").slideUp( this.animate_speed ,function () {
                        $(this).remove();
                    });
                };
            },
            //load winner data
            set_pool : function(callback){
                ocmsite.etc.getLastWinners({
                    count:this.pool_size,
                    onDone:function(data){
                        $.winner.pool = $.winner.pool.concat(data.winners);
                        if (callback) {
                            callback();
                        };
                    }
                });
            },
            //runing
            running : function (){
                if (typeof this.pool == "undefined") {
                    this.pool =  new Array();
                };
                if (this.pool.length  <= 5 ){
                    this.set_pool()
                };
                if (this.pool.length  > 0 ){
                    //draw winner
                    this.drawing( this.pool.pop() );
                };
            },
            //start
            start : function(){
                // speed to slow
                if (this.animate_speed * 5 >this.speed ){
                    winner.speed =animate_speed * 5
                };
                $.winner.set_pool(function(){
                    for (i = 1 ; i <= 3; i++){
                        setTimeout(function(){
                            $.winner.running();
                        }, $.winner.animate_speed * i + 1 );
                    };
                });
                //start timer
                setInterval(function(){
                    $.winner.running();
                }, $.winner.speed );
            }
        },
        //外部資源延遲載入?!
        lazyjs: function(_url) {
            $(window).load(function() {
                console.log('執行:' + _url)
                $.getScript(_url);
            });
        },
        //即時聯天
        message: {

        },
    });
})(jQuery);

$(document).ready(function () {
    if (top.location.host != location.host) { top.location.replace("/") }; /*禁內嵌*/
    if (!$.isMob() && $.getCookie('mmenu') == 'true') {
        $('#m_menu .collapse').addClass("in");
    };
    //瀏覽器 限制
    var language = window.navigator.userLanguage || window.navigator.language;
    if ($.Bsv().browser == "msie" && $.Bsv().version <= 10) {
        var Tip = {
            "en-US": "<a target='_blank' href = 'https://www.microsoft.com/" + language + "/WindowsForBusiness/End-of-IE-support' >Microsoft Support for older versions of Internet Explorer ended on January 12th, 2016 < /a>,<a target='_blank' href='https://technet.microsoft.com/" + language + "/browser/dn262703'> Please Upgraded your Browser IE11</a>",
            "zh-CN": "<a target='_blank' href = 'https://www.microsoft.com/" + language + "/WindowsForBusiness/End-of-IE-support' >Microsoft 对 Internet Explorer 早期版本的支持将于 2016 年 1 月 12 日结束< /a>，为使您有更快、更安全的体验，<a target='_blank' href='https://technet.microsoft.com/" + language + "/browser/dn262703'>请升级最新浏览器</a>",
            "zh-TW": "<a target='_blank' href='https://www.microsoft.com/" + language + "/WindowsForBusiness/End-of-IE-support'>Microsoft 將於 2016 年 1 月 12 日停止支援舊版 Internet Explorer </a>， <a target='_blank' href='https://technet.microsoft.com/" + language + "/browser/dn262703'>請先升級你的瀏覽器</a>"
        };
        $("body").addClass("lock").append("<div class='mask'>").append($("<div class='jUpdata'>").html(Tip[language]));
        if ($.Bsv().version <= 9) {
            setTimeout(function () {
                location.href = "https://www.microsoft.com/" + language + "/WindowsForBusiness/End-of-IE-support";
            }, 3000);
        };
    };
    //message alert
    // ocmsite.event.setUnreadMessage(function (data) {
    //     if (data.count > 0) {
    //         $(".sys_message_badge").show();
    //     } else {
    //         $(".sys_message_badge").hide();
    //     }
    // });

    //到數計時器
    $(".tbox").each(function (data) {
        if (new Date($(this).data("num").toString()) == "Invalid Date" &&
            new Date(parseInt($(this).data("num").toString())) == "Invalid Date") {
            //填入值，移除時間格式
            $(this).text($(this).data("num")).removeAttr("data-num").find(".days, .hours, .mins").hide();
        };
    });
    //正常的話 跑計時器

    setInterval(function () {
        $(".tbox").each(function (data) {
            if ($(this).data("num") != undefined) {
                var Spantime = (new Date($(this).data("num")) - new Date()) / 1000;
                var d = Math.floor(Spantime / 86400);
                var h = Math.floor((Spantime % 86400) / 3600);
                var m = Math.floor((Spantime % 3600) / 60);
                if (Spantime > 0) {
                    var DD = $.addZ(d, 3);
                    $(this).find(".days:eq(0)").text(DD.split("")[0]);
                    $(this).find(".days:eq(1)").text(DD.split("")[1]);
                    $(this).find(".days:eq(2)").text(DD.split("")[2]);
                    var HH = $.addZ(h, 2);
                    $(this).find(".hours:eq(0)").text(HH.split("")[0]);
                    $(this).find(".hours:eq(1)").text(HH.split("")[1]);
                    var MM = $.addZ(m, 2);
                    $(this).find(".mins:eq(0)").text(MM.split("")[0]);
                    $(this).find(".mins:eq(1)").text(MM.split("")[1]);
                } else { // 避免倒數變成負的
                    $(this).find(".hour, .min, .sec").text(0);
                };
            };//undefined就直接跳过
        });
    }, 3000);

});


$(window).load(function(){
    //clear null images
    $("img").each(function(){
        if( $(this).attr("src") == ""){ $(this).remove(); };
    });
    $.jackpot.start($(".money"), 1000);
    $.winner.start();



    //跑馬燈
    if ($("#marquee").length > 0) { marquee(); };


    //set the banner img
    var setBanner_times = 0;
    function setBanner(obj){
        try{
            for (key in obj){
                $("<li>").append(
                        $("<a>").attr("target", "_blank").attr("title",obj[key].hoverMsg).attr("href",obj[key].url).append(
                            $("<img>").attr("src",obj[key].img).load(function(){
                                setBanner_times ++;
                                if (setBanner_times >= obj.length && $("#banner").length >0 ){
                                    //run the banner scroll.
                                    $(".flexslider").flexslider({
                                        animation: "slide"
                                    });
                                };
                            })
                        )
                    ).appendTo($("#banner ul"));
            };
        }catch(err) {
            console.log(err);
        }
    };
    ocmsite.etc.getBanner({type:"home", onDone:function(data){
        setBanner(data.data);
    }});
});

var comm = {/*瀏覽器*/
    site: "127.0.0.1", //網域名稱
    ua: navigator.userAgent.toLowerCase(),
    cookie: "", //cookie 管理
    lang: "",//語系管理
    jstr: {alert_title:"Notification"},
    init: function () {
        alert(0)
    },
    Bsv: function () { //瀏覽器
        rwebkit = /(webkit)[ \/]([\w.]+)/,
        rchrome = /(chrome)[ \/]([\w.]+)/,
        ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        rmsie = /(msie) ([\w.]+)/,
        rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
        match = rchrome.exec(this.ua) || rwebkit.exec(this.ua) || ropera.exec(this.ua) || rmsie.exec(this.ua) || this.ua.indexOf("compatible") < 0 && rmozilla.exec(this.ua) || [];
        return { browser: match[1] || "", version: match[2] || "0" };
    },
    addZ: function(str, length) { return new Array(length - str.toString().length + 1).join("0") + str; }, //補0
    isMob:function () {
        if (!navigator) { return false }
        return (this.ua.match(/iPhone|Android|Windows Phone|Mobi/)) && !(this.ua.match(/iPad|iPod/)) ? true : ($(window).width() < 800 && $(window).width() < $(window).height()) ? true : false;
    },
    isPad:function () {
        if (!navigator) { return false }
        return (this.ua.match(/iPad|iPod/)) ? true : false;
    },
    jAlert: function(str, til){/*訊息Alert 20151207*/
        //文字檢查
        if (str == undefined || str.length == 0) { return false; };
        if (til == undefined || til.length == 0) { til = comm.jstr.alert_title; };
            //版本檢查
        if ((this.Bsv().browser + this.Bsv().version) == "msie6.0") { alert(str); return false; }; //排除ie6的問題前暫用
        if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
        $("<div class='mask'>").appendTo("body");
        $("<div class='jAlert'>")
            .append($("<div class='tbar dang'>").text(til))
            .append($("<p>").text(str))
            .append($("<button class='default orange' type='button'>").text("CLOSE").on("click", function () { $(".mask,.jAlert").remove() })).appendTo("body");
            //$(".MsgBox span").on("click", function () { $(this).remove(); $("#mask").remove(); (url) ? (location.replace(url)) : "" });
    },
    /*訊息jConfirm */
    jConfirm: function (str, til, callback) {
        //文字檢查
        if (str == undefined || str.length == 0) { return false; };
        if (til == undefined || til.length == 0) { til = comm.jstr.alert_title; };
        //版本檢查
        if ((this.Bsv().browser + this.Bsv().version) == "msie6.0") { alert(str); return false; }; //排除ie6的問題前暫用
        if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
        $("<div class='mask'>").appendTo("body");
        $("<div class='jAlert'>")
            .append($("<div class='tbar dang'>").text(til))
            .append($("<p>").text(str))
            .append($("<button class='default orange' type='button'>").text("YES").on("click", function () { $(".mask,.jAlert").remove(); (callback) ? callback(true) : "" }))
            .append($("<button class='default' type='button'>").text("NO").on("click", function () { $(".mask,.jAlert").remove(); (callback) ? callback(false) : "" }))
            .appendTo("body");
    }
}

//var banner = {
//    init: function () {
//    },
//}
//var game = {
//    init: function () { },
//}
/* 語系包的內容 請求
 * 期望的是打成一包嗎？
 * 降低
 *
 *
 * */
function getLang(meth, str){
    str = getJSON(url + meth)
}
//啟動遊戲 STEP2
function jGetBonus(url, json, PostBack) {
    //餘額查詢
    var str = json;
    //str = $.getJSON("");
    if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
    $("<div class='mask'>").appendTo("body");
    $("<div id='deposit' class='jAlert'>")
        .append($("<div>", { "class": "tbar succ", "text": str.til }))
        .append($("<p>").text(str.tAvailable + ":").append($("<span>", { "class": "highlighter", "text": str.Available })))
        .append($("<from>", { "actions": "", "typeof": "POST" }).append($("<div>", { "class": "tabbox" })
            .append(
                $("<table>")
                    .append($("<tr>").append($("<th>", { "text": str.tPlatform })).append($("<td>", { "text": "：" + str.Platform }))
                    )
                    .append($("<tr>").append($("<th>", { "text": str.tExist })).append($("<td>", { "text": "：" }).append($("<span>", { "class": "highlighter", "class": "sys_game_dialog_balance", "text": str.Exist })))
                    )
                    .append($("<tr>").append($("<th>", { "text": str.tDeposit })).append($("<td>").append($("<input>", { "id":"sys_deposit", "type": "text", "value": "0" })))
                    )
                )
            )
        )
        .append($("<button>", { "class": "default", "type": "reset", "text": ocmsite.i18n.get("cancel") }).on("click", function () { $(".mask,.jAlert").remove() }))
        .append($("<button>", { "class": "default", "type": "button", "text": ocmsite.i18n.get("done") }).text(ocmsite.i18n.get("done")).on("click", function () { PostBack() }))
        .appendTo("body");
};
    var w = $(window).width();
    $(window).resize(function () {
        //為了自適版型 重載css
        var nw = $(window).width();
        //if (w != nw) {
        //    w = nw;
        //    location.reload();
        //}
    })
    //輪播banner 之後可以改成全css3

    //遊戲啟動
    var win ;
    var $StartGame = function (platform, key, platformName, deposit) {
        if (isLogin) {
            ocmsite.user.getGamebalance(platform, function (rePlatform, balance){
                $(".sys_game_dialog_balance").text(balance);
            });
            jGetBonus(1,getDataInfo(getCurrBalance(),'-',platformName),function(){
                deposit = $("#sys_deposit").val();
                ocmsite.game.startGame(platform, key, deposit, function(){
                    //關掉原本的對話框
                    if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
                });
            });
        } else {
            showLoginPanel();
        }
    };



//遊戲選項
var $GameShow = function () {
    $("#gamelist .col-md-3 .pimg").unbind("click");
    $("#gamelist .col-md-3 .pimg").click(function () {

        var _gameId = $(this).parents(".col-md-3").data("sys-gameid");
        ocmsite.debug.info(_gameId);
        ocmsite.game.setCurrentGameById(_gameId);
        var vh = $("#gamelist .game").height();
        (vh > 0)? $("#gamelist .game").height(vh):"";
        /*上面二行是防止跑位*/
        $("#gamelist .game .pitem").removeClass("view");
        $(this).parents(".pitem").addClass("view");
    });
    $(" .xx").click(function () { //關閉
        $("#gamelist .col-md-3 .pitem").removeClass("view");
    });
    // $(".btn_pwin").unbind("click");
    // $(".btn_pwin").click(function () {
    //
    //     var _gameid = $(this).parent().parent().data('sys-gameid');
    //     ocmsite.game.setCurrentGameById(_gameid);
    //     var _gameinfo = ocmsite.game.getCurrentGame();
    //     if (_gameinfo) {
    //         var key = _gameinfo.gameInfoId;
    //         var platform = _gameinfo.gamePlatform.gamePlatformId;
    //         var platformName = _gameinfo.gamePlatform.name;
    //         $StartGame(platform, key, platformName);
    //     }
    //
    // });
    $(".btn_pfun").unbind("click");
    $(".btn_pfun").click(function () { //試玩//.attr("start-data")
        //var key = $(this).parents(".pitem").attr("play-data");
        //$StartGame(key, "test");

        var key = ocmsite.game.currentSelectGame.gameInfoId;
        var platform = ocmsite.game.currentSelectGame.gamePlatform.gamePlatformId;
        var platformName = ocmsite.game.currentSelectGame.gamePlatform.name;
        ocmsite.game.freetoplay(platform, key, closePitem);
    });
    $(".btn_fav").unbind("click");
    $(".btn_fav").click(function () { //加最愛//.attr("start-data")
        var param = ocmsite.user.getAddOrRemoveCurrGameFavParam();
        param.onNotLogin = function() {
            showLoginPanel();
        };
        param.onAdd = function(gameCardView) {
            //$(gameCardView).find(".btn_fav").removeClass("gray");
            $(gameCardView).find(".btn_fav").css("background", "url(/images/icon_fav.png) top right no-repeat");
            //window.location.reload();
            show_favorite_alert();
        };
        param.onRemove = function(gameCardView) {
            //$(gameCardView).find(".btn_fav").addClass("gray");

            $(gameCardView).find(".btn_fav").css("background", "url(/images/icon_fav_1.png) top right no-repeat");

            if ($(gameCardView).hasClass("sys_fav_item")) {

                //最近進行遊戲 --取消收藏則是星圖為灰色 / 其餘則是 remove遊戲框畫面
                if($(gameCardView).closest( ".container" ).attr('id') == 'Played_icon')
                {
                    $(gameCardView).find(".btn_fav").css("background", "url(/images/icon_fav_1.png) top right no-repeat");

                }else{

                    $(gameCardView).remove();
                }

                //window.location.reload();
            }
            //window.location.reload();
            //window.opener.location.reload();
            show_Removefavorite_alert();


        };
        param.gameCardView = $(this).parent().parent();

        ocmsite.user.addOrRemoveCurrGameFav(param);

    });
}




var defaultDataInfo = {
    til: "Deposit to Gaming Platform",
    tAvailable:"Available Balance",
    action: "",
    tPlatform: "Platform",
    tExist: "Exist Balance",
    tDeposit: "Deposit Amount",
};
    function getDataInfo(balance, platformBlance, platformName) {
        return $.extend(defaultDataInfo , {
            Available: balance,
            Platform: platformName,
            Exist: platformBlance,
        });
    }

//跑馬燈
var marquee = function () {
    var marquee_width = 0;
    var bool = true;
    ///init
    //$(".showbox, .stage, #marquee").height(30);
    var SetWidth = 0;
    $(".showbox a").each(function () {
        SetWidth += $(this).outerWidth(true);
    });

    //set width and clone to 3 items
    $(".showbox").width(SetWidth * 1.1);
    var copytimes = 0;
    if ($(".showbox").outerWidth() > 0) {
        copytimes = Math.floor($("#marquee .stage").outerWidth() / $(".showbox").outerWidth());
    }
    for (var i = 0; i <= copytimes; i++) {
        $(".showbox").eq(0).clone().appendTo($("#marquee .stage"));
    };

    //Pause
    $("#marquee .stage").hover(function () {
        bool = false;
    }, function () {
        bool = true;
    });
    //Start
    setInterval(function () {
        if (bool) {
            if (marquee_width > SetWidth) {
                $(".showbox").eq(1).clone().appendTo($("#marquee .stage"));
                $(".showbox").eq(0).remove();
                marquee_width = 0;
            } else {
                marquee_width += 1;
                $(".showbox").eq(0).css({ "margin-left": "-" + marquee_width * 1.1 + "px" });
            };
        };
    }, 22);
}



/*安全性設定*/
    $(document).ready(function () {
        //$(document).on("contextmenu", function (event) { return false; }); /*右鍵鎖*/
        if (top.location.host != location.host) { top.location.replace("/") }; /*禁內嵌*/
        if (comm.Bsv().browser = "msie" && comm.Bsv().version < 7) { $.getScript("/_js/DD_belatedPNG-min.js", function () { DD_belatedPNG.fix('*'); }) }; /*png支援*/
        if (navigator.cookieEnabled == false) { jAlert(jStr.s1); }; /*Cookie 判斷*/
        /*鎖上頁    history.go(1);*/
        //手機版程式修正捲軸寬度
        if (comm.isMob()) {
            var www = 0;
            $(".slider div .nav li").each(function () {
                 www += $(this).width();
            })
            $(".slider div .nav").width(www + 10);
        }
    });
    $(function () {
        // 理論上跟放在BODY最後面是一樣的效果<!--script(src='/js/bootstrap.min.js')-->
        $.getScript('/js/bootstrap.min.js');

        //遊戲切頁 對應TOP BAR 效果
        $("#gamelist .slider li").click(function () {
            $("img.bar").attr("src", "/images/top_CG_0" + ($(this).index() + 1) + ".jpg")
        });


        //會員選單
        if ($("#gamelist").length > 0) { $GameShow(); } ;//
        $(".login, form.loginform button[type='button']").click(function () {
            $(".signupform, .loginform").slideToggle(1000);
        });//登入頁

        $("#Account .item , #Support .item").click(function () {
            $(this).toggleClass('reversal').find("h5").toggleClass('show').next(".subs").stop(false, false).slideToggle(300);
        });

        $("#FAQ .item, #News .item").click(function () {
            $(this).toggleClass('reversal').find("h5").toggleClass('show').next(".subs").stop(false, false).slideToggle(300);
        });

        //
        //選單關閉
        $(".back").click(function () {
            //if ($.isMob() || $.isPad) { //不需要判斷 css 會hidden
                $('#menu .collapse, #m_menu .collapse').removeClass("in");
                $("body").removeClass("lock");
            //} ;
        });
        //
        $("button.collapsed").mouseup(function () {
            var name = $(this).attr("data-target");
            $(".collapse").not(name).removeClass("in");
            if ($(".collapse.in").length > 0) {
                $("body").removeClass("lock");
            } else {
                $("body").addClass("lock");
            };
            setInterval(function () {
                $.setCookie('mmenu', $("#m_menu .collapse").hasClass('in'));
            }, 300);
        });

    });


// 5j used js
function getCurrBalance() {
    return $(".sys_txt_balance").first().text();
}

function showLoginPanel() {
    $('html, body').scrollTop(0);
    //2016-08-12 fix the login bug on the mobile
    $("#gamelist .col-md-3 .pitem").removeClass("view");
    $(".signupform, .loginform").slideDown(1000);
}

function closejBonusAlert() {
    if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
}

function closePitem() {
    $("#gamelist .col-md-3 .pitem").removeClass("view");
}
