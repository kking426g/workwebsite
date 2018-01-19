/*  NOTE
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.12/clipboard.min.js"></script>
    <link href="/js/sys/bootstrap-datetimepicker/bootstrap-datetimepicker.css" rel="stylesheet">
    <script src="/js/sys/bootstrap-datetimepicker/moment-with-locales.js"></script>
    <script src="/js/sys/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script>
 */
//跑馬燈
//判断登入的方法？？
//:::擴展工具
//      分頁籤 nav tab
//      跑馬燈
//
(function ($) {
    $.extend({
        getTime: function (_time) {
            return new Date(_time).toLocaleDateString() + " " + new Date(_time).toTimeString().split(" GMT")[0];
        },
        addZ: function (str, length) {
            return new Array(length - str.toString().length + 1).join("0") + str;
        },
        navtab: function (dom) {
            dom = (typeof dom == 'string') ? $(dom) : $("nav.tab");
            //取得nav tab
            if (dom.length > 0) {
                //  有的話 檢查數量
                var slider = dom.children(".slider");
                var row = slider.children("ul");
                var item = row.children("li");
                var ii = 0;
                var icount = item.length;
                if (icount > 4) {
                    // -4 因為 1/4 192px * 4 768
                    icount -= 4;
                    slider
                        .append(
                            $("<div class='turnR'>").click(function () {
                                if ((icount + ii) > 0) {
                                    ii -= 1;
                                } else {
                                    row.css({
                                        'margin-left': (192 * ii) - 5 + 'px'
                                    });
                                }
                                setTimeout(function () {
                                    row.css({
                                        'margin-left': 192 * ii + 'px'
                                    });
                                }, 100);
                            })
                        )
                        .append(
                            $("<div class='turnL'>").click(function () {
                                if (ii < 0) {
                                    ii += 1;
                                } else {
                                    row.css({
                                        'margin-left': (192 * ii) + 5 + 'px'
                                    });
                                }
                                setTimeout(function () {
                                    row.css({
                                        'margin-left': 192 * ii + 'px'
                                    });
                                }, 100);
                            })
                        );
                }

            }
        }, //外部資源延遲載入?!
        lazyjs: function (_url) {
            $(window).load(function () {
                $.getScript(_url);
            });
        }
    });
})(jQuery);

/*
elements
remove_attr 預設值是false 表示是要對指定的elements 加上 class 反之是 刪除elements的class
*/

var red_border_style = function (elements, remove_attr) {
    remove_attr = remove_attr || false;
    elements = elements || [];
    elements.forEach(function (element) {
        if (remove_attr === false) {
            element.addClass('error');
        } else {
            element.removeClass('error');
        }
    });
};


var version = "v" + "20170511",
    //账户馀额
    account_balance = function () {

        return;
    },
    //dom 的初始化
    init = function (bool) {
        bool = bool || true; //預設值
        //menu menu2
        $("body").removeClass('openmenu openmmenu lock');
        //mask
        if (bool) {
            $(".mask .xx").removeAttr("style");
        } else {
            $(".mask .xx").hide();
        }
        //
        $(".mbox, .card").remove();
        //隱藏lightbox
        $("article.lightbox").hide();
    },
    //設定banner
    setBanner = function (obj) {
        try {
            //banner 數量 但執行時機怪怪的！？
            var setBanner_times = 0,
            //判斷banner 加完後 要執行
            animateBanner = function () {
                setBanner_times++;
                if (setBanner_times >= obj.length && $("#banner").length > 0) {
                    //run the banner scroll.
                    $(".flexslider").flexslider({
                        animation: "slide"
                    });
                }
            };
            for (var key in obj) {
                $("<li>").append(
                    $("<a>").attr("target", "_blank").attr("title", obj[key].hoverMsg).attr("href", obj[key].url).append(
                        $("<img>").attr("src", obj[key].img).load(animateBanner())
                    )
                ).appendTo($("#banner ul"));
            }
        } catch (err) {
            console.log(err);
        }
    },
    //跑馬登設置
    marquee = function () {

        var dom = $("#marquee");
        var stage = $("#marquee .stage");
        var showbox = $("#marquee .stage .showbox");
        var link = $("#marquee .stage .showbox a");
        var marquee_width = 0;
        var SetWidth = 0;
        var bool = true;

        ///init
        if (dom.length < 0 || link.length < 0) {
            return;
        }

        link.each(function () {
            SetWidth += $(this).outerWidth(true);
        });

        //set width and clone to 3 items
        showbox.width(SetWidth * 1.1);
        var copytimes = 0;
        if (showbox.outerWidth() > 0) {
            copytimes = Math.floor(stage.outerWidth() / showbox.outerWidth());
        }
        for (var i = 0; i <= copytimes; i++) {
            showbox.eq(0).clone().appendTo(stage);
        }

        //Pause
        stage.hover(function () {
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
                    $(".showbox").eq(0).css({
                        "margin-left": "-" + marquee_width * 1.1 + "px"
                    });
                }
            }
        }, 22);
    },
    //登入判断
    islogin = function () {
        if ($("button.login").length > 0) {
            init();
            jConfirm(js_lang.login_in_account, function (b) { // 请先登入会员账号
                if (b) {
                    login();
                }
            });
            return false;
        } else {
            return true;
        }
    },
    //開啟 指定頁
    msg = function (_name) {
        var obj = $("article." + _name);
        if (obj.length > 0) {
            init();
            $("body").addClass("lock");
            obj.show();
        }
        //無法開啟時暫無動作
    },
    //登入
    login = function () {
        msg("login");
    },
    //注册成功
    success = function () {
        msg("success");
    },
    //建立物件
    jMask = function (z_idx) {
        z_idx = z_idx || 1;
        //1 article
        //2 alert
        //3 confirm loading
        //层级 暂定益 3层 3 6 9
        var z_index = z_idx * 3;

        //可以 加入html物件
        //
    },
    //提示訊息 不含( x )
    jLoading = function (sec) {
        sec = sec || 2500;
        init(false);
        var rn_id = Math.floor((Math.random() * 100) + 1);
        $("body").addClass("lock");
        $("<div class='mbox " + rn_id + "'>").append(
            $("<div class='msg loading'>")
        ).appendTo("div.mask");
        //自动关闭
        // setTimeout(function() {
        //     if ($("<div class=' " + rn_id + "'>").length == 1) {
        //         init();
        //     }
        // }, sec)
        return rn_id;
    },
    jInfo = function (str, til, sec) {
        sec = sec || 600;
        if ($("body.lock, body.openmenu, body.openmmenu").length >= 1) {
            return;
        }
        //文字檢查
        if (str === undefined || str.length === 0) {
            return false;
        }
        init(false);
        var rn_id = Math.floor((Math.random() * 100) + 1);
        $("body").addClass("lock");
        $("<div class='mbox " + rn_id + "'>").append(
            $("<div class='msg'>").append($("<p>").text(str))
        ).appendTo("div.mask");
        //有title的话
        if (typeof til == "string" && til.length >= 0) {
            $("<h2>").text(til).prependTo(".mbox");
        }
        //自动关闭
        setTimeout(function () {
            if ($("<div class=' " + rn_id + "'>").length == 1) {
                init();
            }
        }, sec);
        return rn_id;
    },
    /*
       訊息Alert 20161130
    */
    jAlert = function (str, til, callback) {
        //文字檢查
        if (str === undefined || str.length === 0) {
            return false;
        }
        init();
        $("body").addClass("lock");
        $("<div class='mbox'>").append(
                $("<div class='msg'>").append($("<p>").html(str))
            ).append($("<button class='default sure' type='button'>").text(js_lang.determine).on("click", function () {
                init();
            }))
            .appendTo("div.mask");
        //有title的话
        if (typeof til == "string" && til.length >= 0) {
            $("<h2>").text(til).prependTo(".mbox");
        }
    },
    /*
       訊息jConfirm 20161130
    */
    jConfirm = function (str, callback) {
        //文字檢查
        if (str === undefined || str.length === 0) {
            return false;
        }
        init();
        $("body").addClass("lock");
        $("<div class='mbox'>")
            .append($("<div class='msg'>").append($("<p>").text(str)))
            .append($("<button class='default done' type='button'>").text(js_lang.determine).on("click", function () {
                init();
                if (callback) callback(true);
            }))
            .append($("<button class='default cancel' type='button'>").text(js_lang.cancel).on("click", function () {
                init();
                if (callback) callback(false);
            }))
            .appendTo("div.mask");
    },
    //畫遊戲列表
    gamelist = {
        //數量
        count: 18,
        //
        bfdom: undefined, //為了查詢做的還原暫存
        dom: undefined,
        //記得轉小寫
        //平台代號 寫死或之後請求
        // 遊戲商id(platformId)
        //是否在載入中
        isloading: false,
        //載入時的效果
        loading: function () {
            //載入
            this.load();
            //先保留
            jInfo('Loading...', 9000);
        },
        pid: {
            all: 0, //全部
            allbet: 1, //欧博
            microgameing: 2,
            i789: 3,
            bbin: 4, //
            asiagaming: 5, //亚洲娱乐
            sportsbook: 6, //沙巴
            playtech: 7, //
            ebet: 8 //
        },
        ptype: {
            // 遊戲類型
            Unknown: 1, //
            Slot: 2, // 機台
            LiveCasino: 3, //真人
            VisualCasino: 4,
            Sport: 5, //運動
            VisualSport: 6, //虛擬 運動
            TableGame: 7, //台桌
            Others: 8,
            lottery: 9, //樂透
            _3DHall: 10
        },
        //帶入遊戲名稱text
        sreach: function (txt) {
            var text = $(".sreachtxt").val() || txt;
            if (text === undefined || text.length === 0) {
                //新增查詢 空值帶回到原本的dom
                if (this.dom == $("#sreach")) {
                    this.bfdom.show();
                    this.dom.hide();
                    this.dom = this.bfdom;
                }
            } else {
                this.dom = $('.gamelist:visible') || $('.gamelist:eq(0)');
                //移到查询页
                this.bfdom = this.dom;
                $("#sreach").data(this.dom.hide().data()).show();
                //指定操作的view
                this.dom = $("#sreach");
                //清理畫面
                this.dom.empty();
                var obj = {
                    searchType: "name", //fav
                    searchTypeData: null,
                    platformId: this.dom.data().platformid, //2
                    start: 0,
                    count: 100,
                    name: text,
                    onDone: function (data) {
                        if (data.searchTypeData == 5) {
                            //畫 運動卡
                            gamelist.sport(data.data);
                        } else {
                            //畫 遊戲卡
                            gamelist.card(data.data);
                        }
                    },
                    onNoMore: function () {
                        gamelist.nomore();
                    }
                };
                // ocmsite.game.loadGameByPlatform(obj);
                //判斷搜尋區塊
                if (obj.platformId == 'fav') {

                    //搜尋 我的收藏夹
                    ocmsite.game.loadFavGameBySearch(obj);

                } else {
                    //搜尋 遊戲平台
                    ocmsite.game.loadGameByPlatform(obj);
                }
            }
        },
        //遊戲卡設定
        card: function (data) {
            //遊戲卡
            data.forEach(function (D) {
                //只load手機的遊戲卡
                if (D.performType.performTypeId == 2) {
                    var game_data;
                    //判斷是否為手機版蒐藏
                    if (D.favgamesIsMobile === undefined || D.favgamesIsMobile.length === 0) {
                        game_data = D;
                    } else {
                        //只取得手機版的我的蒐藏資料
                        if (D.favgamesIsMobile == D.performType.performTypeId) {
                            game_data = D;
                        } else {
                            return false;
                        }
                    }

                    var tag = $("<div class='ptag'>");
                    //熱門
                    if (game_data.info.hot) {
                        tag.append($("<span class='hot'>"));
                    }
                    //精選
                    if (game_data.info.choice) {
                        tag.append($("<span class='choice'>"));
                    }
                    //新品
                    if (game_data.info.newest) {
                        tag.append($("<span class='newest'>"));
                    }
                    //寫入data
                    $("<div id='gid_" + game_data.gameInfoId + "' class='game'>")
                    //寫入data
                        .data(game_data)
                        //啟動事件
                        .click(function () {
                            game.start($(this).data());
                        })
                        //卡片內容
                        .append(
                            $("<div class='pitem'>").append(
                                //圖片
                                $("<div class='pbox'>").append(
                                    $("<img>", {
                                        src: game_data.game_img
                                    })
                                )
                            ).append(
                                //標籤
                                tag
                            )
                                .append(
                                    //遊戲名稱
                                    $("<p>", {
                                        text: game_data.displayName || game_data.gameName
                                    })
                                )
                        ).appendTo(gamelist.dom);
                    gamelist.isloading = false;
                }
            }, this);
        },
        //運動卡設定
        sport: function (data) {
            //運動卡
            data.forEach(function (D) {
                //只load手機的遊戲卡
                if (D.performType.performTypeId == 2) {
                    //寫入data
                    $("<div id='gid_" + D.gameInfoId + "' class='gameSP'>")
                    //寫入data
                        .data(D)
                        //啟動事件
                        .click(function () {
                            game.start($(this).data());
                        })
                        //卡片內容
                        .append(
                            $("<div class='pitem'>")
                                .append(
                                    //遊戲名稱
                                    $("<p>", {
                                        class: 'title',
                                        text: D.displayName || D.gameName
                                    })
                                )
                                .append(
                                    //圖片
                                    $("<div class='pbox'>").append(
                                        $("<img>", {
                                            src: D.game_img
                                        })
                                    )
                                )
                                .append(
                                    $("<p>", {
                                        text: js_lang.play_win
                                    }) // 进入游戏
                                )
                        ).appendTo(gamelist.dom);
                    gamelist.isloading = false;
                }
            }, this);
        },

        //自動載入
        watch: function () {
            //分頁開啟時
            //切換頁時 更改變數
            gamelist.isloading = true;
            gamelist.loading();
            $("body").scroll(function () {
                //卷軸到底時
                if (!gamelist.isloading && $('#CasinoGames').height() - $("html").height() + $("header").height() + $('#CasinoGames').offset().top <= -15) {
                    //增加!gamelist.isloading 的判斷防止到底了還在load
                    gamelist.isloading = true;
                    gamelist.loading();
                }
            });
        },
        nomore: function () {
            //jInfo('can not have more');
        },
        //分頁切換
        tab: function () {
            setTimeout(function () {
                gamelist.isloading = false;
                gamelist.loading();
            }, 1000);
        },
        load: function () {
            //判斷列表是否存在
            this.dom = $('.gamelist:visible') || $('.gamelist:eq(0)');
            if (this.dom !== undefined && this.dom.length > 1) {
                //抓不到不dom 造成loop
                //this.load();
            } else if (this.dom !== undefined && this.dom.length == 1) {
                //判斷ocmsite
                if (ocmsite) {
                    var obj = {
                        searchType: this.dom.data().type || 'type', //'top'
                        searchTypeData: this.dom.data().searchtypedata || null,
                        platformId: this.dom.data().platformid,
                        start: this.dom.data().start,
                        count: this.count,
                        name: null,
                        onDone: function (data) {
                            //為了all  拉掉了 && data.resultCode == 1
                            if (data && typeof data.data == "object") {
                                if (data.data !== null) {
                                    if (data.data.length === 0) {
                                        if (gamelist.dom.data().start == 18) {
                                            jInfo(js_lang.not_yet_open_this_type_of_game); // 尚未开放此类型游戏
                                        }
                                    } else if (gamelist.dom.data().searchtypedata == 5 || gamelist.dom.data().searchtypedata == 9) {
                                        //畫 SP卡
                                        gamelist.sport(data.data);
                                    } else {
                                        //畫 遊戲卡
                                        gamelist.card(data.data);
                                    }
                                }
                            }
                        },
                        onNoMore: function () {
                            gamelist.nomore();
                        }
                    };

                    //開始no 加指定數
                    this.dom.data().start += this.count;
                    if (obj.platformId == "all") {
                        ocmsite.game.loadGame(
                            "top",
                            null,
                            obj.start,
                            obj.count,
                            obj.onDone,
                            function (errorData) {
                                console.log(errorData);
                            }
                        );

                    } else if (obj.searchType == "fav") {
                        //我的最愛
                        ocmsite.game.loadFavGame(obj.start, obj.count, function (data) {
                            //只有一層 無法延用 所以另外跑
                            //一律 以遊戲卡樣式程現所以不判斷searchtypedata
                            gamelist.card(data);
                        });
                    } else {
                        ocmsite.game.loadGameByPlatform(obj);
                    }


                }
            }
        }
    },
    //遊戲卡
    game = {
        //快速首頁連結  判斷分類
        link: function (_type) {
            // if (_type = "game") {
            //     game.start();
            // }
            if (islogin() && ocmsite) {

                ocmsite.game.loadGameById({
                    ids: [796],
                    onDone: function () {
                        //ocmsite.game.setCurrentGameById("796");
                        if (ocmsite.game.setCurrentGameById("796") !== null) {
                            var me = ocmsite.game.getCurrentGame();

                            //參數
                            var platform = "1";
                            var key = me.gameInfoId;
                            var deposit = 0;
                            var onDone = function () {
                                init();
                            };

                            //先存錢

                            init();
                            //out
                            ocmsite.user.getGamebalance(me.gamePlatform.gamePlatformId, function (rePlatform, balance) {
                                $("div.trans.hall input").val(balance);
                            });

                            $("body").addClass("lock");
                            $("<div class='card'>")
                                .append($("<h1>").text(js_lang.quickly_out_money)) // 快速转出金额
                                //转出
                                //主账户
                                .append($("<h3>").text(js_lang.out_money)) // 转出
                                .append(
                                    $("<div class='group'>").append(
                                        $("<label>").text(js_lang.master_account)
                                    ).append(
                                        $("<input class='trans account' type='text' autocomplete='off' readonly>").val($(".sys_txt_balance").text())
                                    )
                                )
                                .append($("<h3>").text(js_lang.into_money)) // 转入
                                //馆名 me.gamePlatform.name //剩下代币
                                //$("<input class='trans hall' type='text' autocomplete='off' readonly>").val("-")
                                .append(
                                    $("<div class='group trans hall'>").append(
                                        $("<label>").text(me.gamePlatform.name)
                                    ).append(
                                        $("<input type='text' autocomplete='off' readonly>")
                                    )
                                )
                                //本次兑换代币
                                .append(
                                    $("<div class='group'>").append(
                                        $("<label>").text("$")
                                    ).append(
                                        $("<input class='trans money' type='text' autocomplete='off'>").val(0)
                                    )
                                )
                                //转出金额
                                .append($("<button class='trans btn' type='button'>").text(js_lang.out_money).on("click", function () {
                                    var amount = parseInt($("input.trans.money").val());
                                    var onDone = function () {
                                        //
                                        $(".trans.account").val(parseInt($(".sys_txt_balance").text()));
                                        //寫入平台餘額
                                        ocmsite.user.getGamebalance(me.gamePlatform.gamePlatformId, function (rePlatform, balance) {
                                            $("input.trans.hall").val(balance);
                                        });
                                        $(".trans.money").val('0');
                                        jAlert(js_lang.done); // 完成
                                    };
                                    var onError = function (D) {
                                        jAlert("onError:" + D.errorMessage);
                                    };

                                    if ($.isNumeric(amount) && amount > 0) {
                                        ocmsite.user.sendTransferToPlatformeAction(me.gamePlatform.gamePlatformId, me.gamePlatform.name, amount, onDone, onError);
                                    } else if($.isNumeric(amount) && amount <= 0) {
                                        jAlert(js_lang.please_enter_more_than_0_integer); // 请输入0以上整数
                                    } else {
                                        jAlert(js_lang.deposit_amount_must_be_integer); // 请输入整数
                                    }
                                }))
                                //开始游戏
                                .append($("<button class='trans btn' type='button'>").text(js_lang.start_game).on("click", function () {
                                    if (ocmsite.playingwindow) {
                                        ocmsite.playingwindow.close();
                                    } //單一啟動限制
                                    if (key !== undefined) {
                                        if (onDone !== null) {
                                            onDone();
                                        }
                                        deposit *= 10000;
                                        ocmsite.playurl = ocmsite.config.path.startgame + "/" + platform + "/" + key + "/" + deposit;
                                        $("article.pages").html($("<iframe>", {
                                            src: ocmsite.playurl,
                                            style: "width:100%; min-height:78vh; border:none;"
                                        }));
                                    } else {
                                        ocmsite.ui.alert("key is fail , please reload the page");
                                    }
                                }))
                                //
                                .append($("<button class='trans btn' type='button'>").text(js_lang.return).on("click", function () {
                                    init();
                                }))
                                .appendTo("div.mask");
                        } else {
                            jAlert(js_lang.platform_is_closed); // 本游戏平台目前暂时关闭

                        }



                    }
                });
            }

        },
        //加最愛
        fav: function (me, callback) {
            if (islogin() && ocmsite) {
                ocmsite.game.setCurrentGameById(me.gameInfoId);
                ocmsite.user.addOrRemoveCurrGameFav({
                    gameCardView: null,
                    onAdd: function () {
                        //#id
                        var $card = $("#gid_" + me.gameInfoId);
                        //修改及時資料
                        //有兩個判斷變數 ???
                        $card.data("is_fav", true);
                        $card.data("faved", true);
                        init();
                        jInfo('Loading...');
                    },
                    onRemove: function () {
                        //#id
                        var $card = $("#gid_" + me.gameInfoId);
                        if (location.pathname == "/home/favorite") {
                            //在我的收藏時  需刪除卡片
                            $card.remove();
                        } else {
                            //修改及時資料
                            $card.data("is_fav", false);
                            $card.data("faved", false);
                        }
                        init();
                        jInfo('Loading...');
                    },
                    onNotLogin: isLogin
                });
            }
        },
        //開始玩
        play: function (me) {
            if (islogin()) {
                var onDone = function () {
                    init();
                };
                ocmsite.game.startGame("1", me.gameInfoId, 0, onDone);
            }
        },
        //兌金幣
        exchange: function (me) {
            init();
            //out
            ocmsite.user.getGamebalance(me.gamePlatform.gamePlatformId, function (rePlatform, balance) {
                $("div.trans.hall input").val(balance);
            });

            $("body").addClass("lock");
            $("<div class='card'>")
                .append($("<h1>").text(js_lang.quickly_out_money)) // 快速转出金额
                //转出
                .append($("<h3>").text(js_lang.out_money))
                //主账户
                .append(
                    $("<div class='group'>")
                    .append($("<label>").text(js_lang.master_account))
                    .append($("<input class='trans account' type='text' autocomplete='off' readonly>").val($(".sys_txt_balance").text()))
                )
                .append($("<h3>").text(js_lang.into_money)) // 转入
                //馆名 me.gamePlatform.name //剩下代币
                //$("<input class='trans hall' type='text' autocomplete='off' readonly>").val("-")
                .append(
                    $("<div class='group'>")
                    .append($("<label>").text(me.gamePlatform.name))
                    .append($("<input type='text' autocomplete='off' readonly>"))
                )
                //本次兑换代币
                .append(
                    $("<div class='group'>")
                    .append($("<label>").text('$'))
                    .append($("<input class='trans money' type='text' autocomplete='off'>").val(0))
                )
                //转出金额
                .append($("<button class='trans btn' type='button'>").text(js_lang.out_money).on("click", function () {
                    var amount = parseInt($("input.trans.money").val());
                    var onDone = function () {
                        //
                        $(".trans.account").val(parseInt($(".sys_txt_balance").text()));
                        //寫入平台餘額
                        ocmsite.user.getGamebalance(me.gamePlatform.gamePlatformId, function (rePlatform, balance) {
                            $("input.trans.hall").val(balance);
                        });
                        $(".trans.money").val('0');
                        jAlert(js_lang.done); // 完成
                    };
                    var onError = function (D) {
                        jAlert("onError:" + D.errorMessage);
                    };

                    if ($.isNumeric(amount) && amount > 0) {
                        ocmsite.user.sendTransferToPlatformeAction(me.gamePlatform.gamePlatformId, me.gamePlatform.name, amount, onDone, onError);
                    } else if($.isNumeric(amount) && amount <= 0) {
                        jAlert(js_lang.please_enter_more_than_0_integer); // 请输入0以上整数
                    } else {
                        jAlert(js_lang.deposit_amount_must_be_integer); // 请输入整数
                    }
                }))
                //开始游戏
                .append($("<button class='trans btn' type='button'>").text(js_lang.start_game).on("click", function () {
                    game.play(me);
                }))
                //
                .append($("<button class='trans btn' type='button'>").text(js_lang.return).on("click", function () {
                    init();
                }))
                .appendTo("div.mask");
        },
        //啟動畫面(預)
        start: function (me) {
            //判斷登入
            if (islogin()) {
                //開啟遊戲卡(已登入) 開啟兌換卡
                if (me !== null) {
                    init();
                    ocmsite.user.getGamebalance(me.gamePlatform.gamePlatformId, function (rePlatform, balance) {
                        $("input.balance").val(balance);
                    });
                    $("body").addClass("lock");
                    $("<div class='card'>")
                        .append($("<img>", {
                            src: me.game_img
                        }))
                        .append($("<h1>").text(me.displayName || me.gameName))
                        //余額
                        .append(
                            $("<div class='group'>")
                            .append($("<label>").text(js_lang.balance_of_account))
                            .append($("<input class='balance' type='text' autocomplete='off' readonly>").val(0))
                        )
                        //存款
                        .append($("<button class='go _withdrawal' type='button'>").text(js_lang.trans_info_type_deposit).on("click", function () {
                            game.exchange(me);
                        }))
                        //開始遊戲
                        .append($("<button class='go _start' type='button'>").text(js_lang.start_game).on("click", function () {
                            game.play(me);
                        }))
                        //收藏鍵
                        .append($("<button class='fav' type='button'>").addClass(me.is_fav.toString()).on("click", function () {
                            game.fav(me);
                            //先不管了 要接回應呀
                            $(this).toggleClass("true false");
                        }))
                        .appendTo("div.mask");
                } else {

                    jAlert(js_lang.platform_is_closed); // 本游戏平台目前暂时关闭
                }
            } else {
                //開啟遊戲卡(未登入) 應該是看不到的才對(神奇)
                init();
                $("body").addClass("lock");
                $("<div class='card'>")
                    .append($("<img>", {
                        src: me.game_img
                    }))
                    .append($("<h1>").text(me.displayName || me.gameName))
                    .append($("<button class='default go _login' type='button'>").on("click", function () {
                        login();
                    }))
                    .append($("<button class='default go _signup' type='button'>").on("click", function () {
                        location.href = "/home/signup";
                    }))
                    //收藏鍵
                    .append($("<button class='fav' type='button'>").addClass(me.is_fav.toString()).on("click", function () {
                        game.fav(me, function () {
                            $(this).toggleClass("true false");
                        });
                    }))
                    .appendTo("div.mask");
            }
        }
    },
    //tabs分頁事件
    gotab = function (dom) {
        //分页效果
        if (dom.match(/^([\w]*)(([\.\#]+)([\_:()\w]+))$/) && $(dom).length == 1) {
            if ($(this).is("li")) {
                $("nav.tab li").removeClass('visited');
                $(this).addClass('visited');
            }
            $(".tab_page").hide();
            $(dom).fadeIn(600);
            setTimeout(function () {
                if ($(".pages").offset().top < 0) {
                    var element = document.getElementsByClassName('bar');
                    if (element.length > 0) {
                        element[0].scrollIntoView(false); //false 之後再看原因- -
                    }
                }
                $("body").scrollTop(0);
            }, 120);
        }
    },

    //平台轉賬
    trans = {
        //建立當前 遊戲選項
        load: function () {
            //-填入主賬戶餘額
            $(".amount_acc").val($(".sys_txt_balance").text());
            $("select.hall option").each(function () {
                if (parseInt($(this).val()) === 0) {
                    $(this).data('balance', $(".sys_txt_balance").text() || 0);
                }
            });
            //-有更新 才更新
            $(".sys_txt_balance").on('DOMSubtreeModified', function () {
                $(".amount_acc").val($(".sys_txt_balance").text());
            });
            //-
            sys_platforms_data.forEach(function (D) {
                //判斷是否顯示= 1:開啟/ -1:隱藏/ 0:維護中
                var is_transfer = D.data.is_transfer;

                var option_txt = D.data.name;
                var is_disabled = false;

                //判斷是否顯示= 1:開啟/ -1:隱藏/ 0:維護中
                if (is_transfer === 0) {
                    option_txt += '(' + js_lang.in_maintenance + ')';
                    is_disabled = true;
                }

                if (is_transfer !== -1) {
                    $("select.hall").append(
                        $("<option>").val(D.data.id).text(option_txt).data('balance', D.balence).data('is_transfer', D.data.is_transfer).prop('disabled', is_disabled)
                    );
                }
            });
            //--
            $(".plat select.name").change(function () {
                $("input.amount").val(
                    $(this).find(':selected').data("balance")
                );
            });
        },
        upnew: function (data) {
            var obj = data.info || data;
            //更新資料 主帳戶
            //左選單sys_txt_balance
            $("input.amount_acc, .sys_txt_balance").val(obj.availableAmount || 0);
            //多語所以 無法比對 
            //暫時要 前端的數值處理一下
            $("select.hall option").each(function () {
                var dom = $(this);
                if (parseInt(dom.val()) === 0) {
                    dom.data('balance', obj.availableAmount || 0);
                }
                obj.platforms.forEach(function (D) {
                    //比對id 跟name 更新balance
                    if (dom.text() == D.data.name && dom.val() == D.data.id) {
                        dom.data('balance', D.balence || 0);
                    }
                });
            });
            //選取當前的項目 觸發change事件 
            $("select option:selected").change();
        },
        //平台到平台
        b2b: function () {
            // a 轉 b
            //form platformID
            //to platformID
            var tran_Out_amount = $("select.tran_form option:selected").data('balance');

            if (tran_Out_amount <= 0) {
                jAlert(js_lang.out_of_account_0_amount_is_insufficient); // 轉出賬戶 0 金額不足!!
            } else {
                //::::  執行轉賬
                var tran_In_name = $("select.tran_to option:selected").text();
                var tran_Out_name = $("select.tran_form option:selected").text();

                if ($("select.tran_to option:selected").val() === '*' ||
                    $("select.tran_form option:selected").val() === '*') {
                    red_border_style([$('select.tran_to'), $('select.tran_form')]);
                    //$('select.tran_to, select.tran_form').addClass('error');
                    

                    alert(js_lang.select_platforms);
                    return;
                }

                // 相同平台不得互轉
                if (tran_In_name === tran_Out_name) {
                    red_border_style([$('select.tran_to'), $('select.tran_form')]);
                    //$('select.tran_to, select.tran_form').addClass('error');
                    alert(js_lang.transfer_into_out_is_different);
                    return;
                }

                red_border_style([$('select.tran_to'), $('select.tran_form')], true);
                //$('select.tran_to, select.tran_form').removeClass('error');
                jInfo(js_lang.do_not_perform_any_other_operations_before_proceeding, js_lang.in_operation, 9999); // 完成前 请勿执行其它操作, 操作中
                ocmsite.user.sendTransferPlatformToPlatforme(
                    $(".tran_form").val(),
                    $(".tran_to").val(),
                    function (data) {
                        jAlert(js_lang.successful_operation); // 操作成功
                        if (typeof data == "object") {
                            //更新資料
                            trans.upnew(data.data);
                        } else {
                            //未取得更新資料，重載頁面
                            location.reload();
                        }
                    },
                    function (data) {
                        jAlert(data.errorMessage, js_lang.failed_operation);
                    }, // 操作失败
                    function (data) {
                        // if (typeof data == "object") {
                        //     jInfo(data.step, '操作中', 9999);
                        // } else {
                        jInfo(js_lang.do_not_perform_any_other_operations_before_proceeding, js_lang.in_operation, 9999); // 完成前 请勿执行其它操作, 操作中
                        //};
                    }
                );
            }
        },
        //平台到賬戶
        b2c: function () {
            // 各平台轉回主帳號
            var arr = [];
            //等公變數完成後 再處理同步更新
            // sys_platforms_data.forEach(function(D) {
            //     if (D.balence > 0) {
            //         arr.push(D.data.id);
            //     };
            // });
            $("#info select.hall option").each(function () {
                var _balance = $(this).data('balance');
                var _id = $(this).val();
                if (_balance > 0) {
                    console.log(_id);
                    arr.push(_id);
                }
            });
            if (arr.length > 0) {
                ocmsite.user.sendTransferFromPlatformeAll(
                    arr,
                    function (data) {
                        jAlert(js_lang.successful_operation); // 操作成功
                        if (typeof data == "object") {
                            //更新資料
                            trans.upnew(data.data);
                        } else {
                            //未取得更新資料，重載頁面
                            location.reload();
                        }
                    },
                    function (data) {

                        var errorPlatId = data.errorPlatId;
                        var successPlatId = data.successPlatId;
                        var error_Message = data.error_Message;
                        var error_msg = '';
                        var success_msg = '';

                        if (successPlatId !== '') {

                            success_msg = js_lang.success_of_the_platform_transfer_is + '：</br>';

                            $.each(successPlatId, function (key, value) {
                                success_msg = success_msg + $('#info select.hall option[value= ' + value + ']').text() + '</br>';
                            });
                        }

                        if (errorPlatId !== '') {

                            error_msg = js_lang.false_of_the_platform_transfer_is + '：</br>';

                            $.each(errorPlatId, function (key, value) {

                                var option_val = value;

                                error_msg = error_msg + $('#info select.hall option[value= ' + option_val + ']').text() + ':' + error_Message[key] + '</br>';
                            });
                        }

                        jAlert(success_msg + error_msg + '</br>' + js_lang.you_have_questions_contact_customer_service + '！', js_lang.failed_operation);

                    }, // 操作失败
                    function (data) {
                        // if (typeof data == "object") {
                        //     jInfo('完成前 请勿执行其它操作', '操作中' + JSON.stringify(data), 4000);
                        // } else {
                        jInfo(js_lang.do_not_perform_any_other_operations_before_proceeding, js_lang.in_operation, 9999); // 完成前 请勿执行其它操作, 操作中
                        //};
                    }
                );
            } else {
                jAlert(js_lang.all_amounts_are_in_the_main_account, js_lang.failed_operation); // 所有金額已全在主賬戶, 操作失败
            }
        },
        //轉錢到单一平台
        exchange: function () {
            var money = parseInt($(".wait_widthdrawl input").val()) || 0;
            var msg = js_lang.the_amount_transferred_is + ' ' + money + ' ' + js_lang.are_you_sure_to_turn_it_out; // 转出金额为, 是否确认转出？
            if (money <= 0) {
                jAlert(js_lang.the_amount_transferred_can_not_be_0); // 转出金额不可为0
            } else if (money > 0 && Math.floor(money) != $(".wait_widthdrawl input").val()) {
                jAlert(js_lang.deposit_amount_must_be_integer); // 存入金额必须为整数
            } else if (money <= $("input.amount_acc").val()) {
                jConfirm(msg, function (bol) {
                    if (bol) {
                        jInfo(js_lang.in_operation, js_lang.do_not_perform_any_other_operations_before_proceeding, 9999); // 操作中, 完成前 请勿执行其它操作
                        ocmsite.user.sendTransferToPlatformeAction(
                            // 拉值
                            $(".plat .hall").val(),
                            "platformName",
                            money,
                            function (data) {
                                jAlert(js_lang.successful_operation); // 操作成功
                                if (typeof data == "object") {
                                    //更新資料
                                    trans.upnew(data.data);
                                } else {
                                    //未取得更新資料，重載頁面
                                    location.reload();
                                }
                            },
                            function (data) {
                                jAlert(data.errorMessage, js_lang.failed_operation);
                            } // 操作失败
                        );
                    } else {
                        jAlert(js_lang.cancelled); // 已取消!!
                    }
                });
            } else {
                jAlert(js_lang.the_amount_of_the_main_account_is_insufficient); // 主账户金额不足!!
            }

        }
    };

function setSize() {
    //定義主框架尺寸 然後畫出頁面
    var wh = $(document).height();
    var ww = $(window).width();
    //然後計算縮放zoom
    var szo = (768 > ww) ? (ww / 768).toFixed(2) : (768 / ww).toFixed(2);
    var sh = parseInt(wh / szo);

    $("html").css('zoom', szo);
    $("html, body").width(768);
    $("html, body, nav.menu, nav.menu2").height(sh);
}

$(function () {
    //改逺端/////元寶
    // $("body").prepend('<link href="http://events.ettoday.net/dropmoney2017/drop_money.css?0001" rel="stylesheet" type="text/css"/>');
    // $("body").prepend('<scr' + 'ipt src="http://events.ettoday.net/dropmoney2017/drop_money.js?0002"></scr' + 'ipt>');

    //擴展工作
    $.navtab(); //多頁通用 nav-tab 滑動效果
    //load banner
    ocmsite.etc.getBanner({
        type: "home",
        onDone: function (data) {
            setBanner(data.data);
        }
    });
    //點選左選單 開啟
    setSize();
    $(window).resize(function () {
        //setSize();
    });

    $("button.menu, a.close_menu").click(function () {
        $("body").removeClass('lock');
        $(".mbox, .card").remove();
        $("article.lightbox").hide();
        $("body").stop(!1, !1).toggleClass('openmenu', 2000);
    });

    $("button.member, div.info").click(function () {
        $("body").removeClass('lock');
        $(".mbox, .card").remove();
        $("article.lightbox").hide();
        if (islogin()) {
            $("body").toggleClass('openmmenu', 2000);
        }
    });

    $("button.back").click(function () {
        $("body").removeClass('lock');
        $(".mbox, .card").remove();
        $("article.lightbox").hide();
        if ($("button.return:visible").length > 0) {
            //為了show hide 頁面做的返回觸發;
            $("button.return").click();
        } else {
            history.go(-1);
        }
    });

    $("button.home, div.logo").click(function () {
        location.href = "/";
    });

    $("button.login").click(function () {
        login();
    });

    $("button.xx").click(function () {
        init();
    });
    $("button[type=reset]").click(function () {
        //$("input:not([type='hidden'])") maybe better
        $("input:visible, select, textarea ").val('');
    });

    //>>新聞與常見問頭
    $("#Faq .item h5, #News .item h5, #News .item span.dateitem").click(function () {
        $(this).parent().toggleClass('visited');
    });
    //>>存款页
    //选择存款方式
    $(".linkbox .item").click(function () {
        var idx = $(this).children("a").attr("href");

        //是否有銀行綁定，有綁定為1
        var mybank = $("#set_mybank").val();

        if (mybank != 1 && idx == "#bank") {
            //alert視窗 秀未綁定銀行帳號，跳到銀行設定頁面
            jConfirm(js_lang.please_set_the_back_account_first, function (bol) { // 请先设定 银行账号
                if (bol) {
                    location.href = "/home/banksetting";
                }
            });
        } else {
            gotab(idx);
        }

    });
    $("button.default.return").click(function () {
        // check jq-validate-custom-class is exist
        // remove red border
        if ($('.jq-validate-custom-class').length > 0) {
            $('.jq-validate-custom-class').removeClass('jq-validate-custom-class');
        }

        // check my-error-class is exist
        // remove red border
        if ($('.my-error-class').length > 0) {
            $('.my-error-class').removeClass('my-error-class');
        }

        gotab(".tab_page:eq(0)");
    });

    //支付種類--顯示支付銀行列
    $(".sys_deposit_paymentlist").on('change', function () {

        $('.deposit_banklist').css('display', 'block');

    });

    //支付銀行--顯示按鈕欄
    $(".deposit_banklist").on('change', function () {

        $('.online_pay_submit').css('display', 'block');
    });

    //清除重置-隱藏支付種類與支付銀行
    $(".online_reset_btn").click(function () {

        $('.deposit_banklist').css('display', 'none');
        $('.online_pay_submit').css('display', 'none');
    });

    //上傳圖片 
    $("#sys_file").change(function () {
        var filepath = $("#sys_file").val();
        $(".fileinput").val(filepath);
    });
    $(".fileinput").click(function () {
        $("#sys_file").click();
    });
    //開啟詳細
    $("button.detail").click(function () {
        gotab("div#Details");
    });
    //提款页
    // 多加 type='button' 區分第二頁的 submit
    $("button.sys_withdrawal_submit[type='button']").click(function () {
        //进行提款操作前,必须检查会员是否有完成银行设定动作,若无则于点击提款连结时,以对话窗进行提示
        //if (XXX ) {}
        if ($("form").valid() === true) {
            gotab("div#Withdrawal_Check");
        }
    });
    //银行设定banksetting 进行提款密码设定
    //新增valid 驗証檢查
    $("button.sys_sitsafepass").click(function () {
        if ($(".sys_banksetting_form").valid() === true) {
            gotab("div#UnBinded2");
        }
    });
    //遊戲頁
    $(".tab ul li").click(function () {
        var idx = $(this).children("a").attr("href");
        $("nav.tab li").removeClass('visited');
        $(this).addClass('visited');
        gotab(idx);
    });
    if (location.pathname == "/home/deposit") {
        //ios安全性问题 so  可能要加判断式 或自动全选

        $.getScript("//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.12/clipboard.min.js", function () {
            new Clipboard('.sys_deposit_bank_name', {
                text: function (trigger) {
                    return $('.sys_deposit_bank_name').text();
                }
            });
            new Clipboard('.sys_deposit_bank_branchName', {
                text: function (trigger) {
                    return $('.sys_deposit_bank_branchName').text();
                }
            });
            new Clipboard('.sys_deposit_bank_accname', {
                text: function (trigger) {
                    return $('.sys_deposit_bank_accname').text();
                }
            });
            new Clipboard('.sys_deposit_bank_bankAcc', {
                text: function (trigger) {
                    return $('.sys_deposit_bank_bankAcc').text();
                }
            });
        });
    }


    //載入完成後執行
    $(window).load(function () {
        //到數計時器
        $(".tbox").each(function (data) {
            if (new Date($(".tbox").data().num).toString() == "Invalid Date") {
                //填入值，移除時間格式
                $(this).text($(this).data("num")).removeAttr("data-num").find(".days, .hours, .mins").hide();
            }
        });
        //正常的話 跑計時器
        setInterval(function () {
            $(".tbox").each(function (data) {
                if ($(this).data("num") !== undefined) {
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
                    }
                } //undefined就直接跳过
            });
        }, 3000);
        //執行跑馬燈
        if ($("#marquee").length > 0) {
            marquee();
        }
        //只在游戏页做
        if (gamelist && $("#CasinoGames").length > 0) {
            gamelist.watch();
            //enter
            $('input.isreach').on('keydown', function (e) {
                if (e.which == 13) {
                    gamelist.sreach($('input.isreach').val());
                }
            });
        }
        //分页反白效果
        $("nav.tab li").each(function () {
            if ($(this).children("a").attr('href') == location.pathname) {
                //只是代入效果
                $(this).addClass('visited');
            } else if ($(this).children("a").attr('href') == location.hash) {
                //包含触发分页
                $(this).click().addClass('visited');
            }
        });
        //都没有就把第一个代入效果
        if ($("nav.tab li").length > 0 && $("nav.tab li.visited").length <= 0) {
            $("nav.tab li").first().addClass('visited');
        }
    });

    //線上支付列表--送出連結
    $(".sys_payment").click(function () {
        var paytype = $(this).attr('id');

        location.href = "/home/paymentlist/" + paytype;
    });
});