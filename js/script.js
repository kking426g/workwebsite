$(function () {
    //var $ww, $bw, $sw, ii, bol;
    var $marquee = function () {
        $(window).resize(function () {
            $ww = $(".showbox").parent().width();
        });
        //取得畫面大小
        var $ww = $(".showbox").parent().width();
        //取得bar大小
        var $bw = $(".showbox").width();
        //跑吧!
        var ii = 0;
        var bol = true;
        $(".showbox span").hide();
        function $run() {
            var $sw = $(".showbox span").eq(ii).width() + 20;
            if (bol) {
                $(".showbox span").eq(ii).show().css("left", $ww + "px").animate({ left: -$sw }, ($ww + $sw) * 8, "linear", function () { $(".showbox span").eq(ii).hide() });
                ii++;
                if (ii >= $(".showbox span").length) {
                    ii = 0;
                }
                setTimeout($run, ($ww + $sw) * 10 * $sw / $ww);
            } else {
                var ww = $(".showbox span").eq(ii - 1).css("left").replace("px", "");
                //console.log(ww);
                setTimeout($run, (ww + $sw) * 10 * $sw / ww);
            }
        }
        $.getScript("/js/jquery.pause.js", function () {//載入animate暫停套件
            $(".showbox").hover(function () {
                $(".showbox span").pause();
                bol = false;
            }, function () {
                $(".showbox span").resume();
                bol = true;
            });
        });
        $run();
    }
    $marquee();
});