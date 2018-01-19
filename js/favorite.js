$(function () {
  favourites_area();
  $(".top_info").text("我的游戏 > 我的收藏游戏");

  $("#fav_game").click(function(){
    $(".top_info").text("我的游戏 > 我的收藏游戏");
    $(".sys_fav_container").empty();
    $(".sys_played_container").empty();
    $(this).css({
        'background': 'url(/images/bn_favourite_02_on.png)',
        'background-repeat': 'no-repeat'
    });
    $("#recentgame").css('background', '');
    favourites_area();

  })

  $("#recentgame").click(function(){
    $(".top_info").text("我的游戏 > 最近进行的游戏");
    $(".sys_played_container").empty();
    $(".sys_fav_container").empty();
    $(this).css({
        'background': 'url(/images/bn_favourite_01_on.png)',
        'background-repeat': 'no-repeat'
    });
    $("#fav_game").css('background', '');
    recentgame_area();
  })

});

//載入 我的收藏遊戲
function favourites_area() {
    if ($("#Favourites_icon").length >= 1) {
        ocmsite.game.loadFavGame(0, 100, function (data) {
            if (data.length) {
              console.log(data.length)
              console.log(data);
                var contain = $("#fav_game_list").find($(".col-sm-6"));
                data.forEach(function (game) {
                    if (game.favgamesIsMobile == game.performType.performTypeId){
                        var newview = contain.clone();
                        //新增game id
                        newview.find('.btn_pwin').data("sys-game-id", game.gameInfoId);

                        newview.css('display', 'block');
                        var info = newview.find(".info");
                        var img = newview.find('img');
                        $(info).attr('data-gameid', game.gameInfoId);
                        if (game.is_fav) {
                            $(img).attr('src', game.game_img); //圖片
                            info.find("div").eq(3).addClass('remove_favorite'); //取消收藏
                            newview.find("p").text(game.displayName);
                        } else {
                        }
                        if (game.info.choice) {
                            info.find("div").eq(1).removeClass('sub'); //熱
                        }
                        if (game.info.hot) {
                            info.find("div").eq(0).removeClass('sub'); //熱
                        }
                        if (game.info.newest) {
                            info.find("div").eq(2).removeClass('sub'); //新
                        }
                        newview.find(".fav_btn").bind("click", function (e) {
                            e.stopPropagation();
                            var key = $(this).parents(".info").attr("data-gameid");
                            var ui = $(this).parents(".col-md-3").first();
                            console.log(key)
                            //$StartGame(key, "fav");
                            ocmsite.game.setCurrentGameById(key);
                            ocmsite.user.addOrRemoveCurrGameFav({
                                gameCardView: null,
                                onAdd: function () {
                                    $(ui).find(".fav_btn").removeClass('remove_favorite');
                                    $(ui).find(".fav_btn").removeClass('add_favorite');
                                    $(ui).find(".fav_btn").addClass('remove_favorite');
                                },
                                onRemove: function () {
                                    $(ui).find(".fav_btn").removeClass('remove_favorite');
                                    $(ui).find(".fav_btn").removeClass('add_favorite');
                                    $(ui).find(".fav_btn").addClass('add_favorite');
                                    $(ui).remove();
                                },
                                onNotLogin: null
                            });
                        });

                        newview.find(".gamecard").on("click", function (e) {
                            e.stopPropagation();
                            var key = newview.find(".info").attr("data-gameid");
                            sys_showEnterGamePanelWithParam({gameId: key, gamePlatformName: 321});
                        });
                        $("#fav_game_list").append(newview);
                        $(".sys_fav_container").append(newview);
                    }
                })
             }
        });
    }
}




//載入 最近進行遊戲
function recentgame_area() {
    if ($("#Played_icon").length >= 1) {
        var onDone = function (data) {
            if (data.data.length) {
                console.log(data.data.length);
                console.log(data.data);
                 var container = $(".sys_played_container");
                var prefab = $(".sys_fav_item").first();
                var contain = $("#recent_game_list").find($(".col-sm-6"));
                data.data.forEach(function (game) {
                    if(data.isMobile == game.performType.performTypeId) {
                        var newview = contain.clone();
                        //新增game id
                        newview.find('.btn_pwin').data("sys-game-id", game.gameInfoId);

                        newview.css('display', 'block');
                        var info = newview.find(".info");
                        var img = newview.find('img');
                        $(info).attr('data-gameid', game.gameInfoId);
                        if (game.is_fav) {
                            $(img).attr('src', game.game_img); //圖片
                            info.find("div").eq(3).addClass('remove_favorite'); //取消收藏
                            newview.find("p").text(game.displayName);
                        } else {
                            $(img).attr('src', game.game_img); //圖片
                            info.find("div").eq(3).addClass('add_favorite'); //加入收藏
                            info.find("p").text(game.displayName);
                            newview.find("p").text(game.displayName);
                        }

                        if (game.info.choice) {
                            info.find("div").eq(1).removeClass('sub'); //熱
                        }
                        if (game.info.hot) {
                            info.find("div").eq(0).removeClass('sub'); //熱
                        }
                        if (game.info.newest) {
                            info.find("div").eq(2).removeClass('sub'); //新
                        }
                        newview.find(".fav_btn").bind("click", function () {
                            var key = $(this).parents(".info").attr("data-gameid");
                            var ui = $(this).parents(".col-md-3").first();
                            console.log(key)
                            //$StartGame(key, "fav");
                            ocmsite.game.setCurrentGameById(key);
                            ocmsite.user.addOrRemoveCurrGameFav({
                                gameCardView: null,
                                onAdd: function () {
                                    $(ui).find(".fav_btn").removeClass('remove_favorite');
                                    $(ui).find(".fav_btn").removeClass('add_favorite');
                                    $(ui).find(".fav_btn").addClass('remove_favorite');
                                    show_favorite_alert();
                                },
                                onRemove: function () {
                                    $(ui).find(".fav_btn").removeClass('remove_favorite');
                                    $(ui).find(".fav_btn").removeClass('add_favorite');
                                    $(ui).find(".fav_btn").addClass('add_favorite');
                                    show_Removefavorite_alert();
                                },
                                onNotLogin: null
                            });
                        });
                        newview.find(".card_img").on("click", function (e) {
                            e.stopPropagation();
                            var key = newview.find(".info").attr("data-gameid");
                            sys_showEnterGamePanelWithParam({gameId: key, gamePlatformName: 321});
                        });

                        $("#recent_game_list").append(newview);
                        $(".sys_played_container").append(newview);
                    }
                })
             }
        };
        var onNoMore = function () {
        };
        var onError = function () {
        };
        var start = 0;
        var count = 8;
        var param = {
            start: start,
            count: count,
            onDone: onDone,
            onError: onError,
            onNoMore: onNoMore
        }
        ocmsite.game.loadPlayedGames(param);
    }
}
