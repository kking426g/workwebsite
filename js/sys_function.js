$(function() {

    $("body").on("click", ".sys_game_item", function (e) {
        e.stopPropagation();
        var _gameId = $(this).data('sys-game-id');
        //var _gameId = ocmsite.game.getCurrentGame().gameInfoId;

        sys_showEnterGamePanelWithParam({gameId: _gameId, gamePlatformName: 321});
    });
    $("body").on("click", ".sys_fav", function (e) {
        e.stopPropagation();
         if(isLogin){
           console.log("add_remove_favorite");
           var ui = $(this).parents(".sys_game_item").first();
           var _gameId = ui.data('sys-game-id');
           console.log(_gameId);

           ocmsite.game.setCurrentGameById(_gameId);

           ocmsite.user.addOrRemoveCurrGameFav({
               gameCardView: null,
               onAdd: function () {
                   $(ui).find(".sys_fav").removeClass('remove_favorite');
                   $(ui).find(".sys_fav").removeClass('add_favorite');
                   $(ui).find(".sys_fav").addClass('remove_favorite');
                   show_favorite_alert();
                   //popup_window.location.reload();
               },
               onRemove: function () {
                   var gametype = $(ui).closest('.sys_gamelist_row').data('sys-gametype');

                   $(ui).find(".sys_fav").removeClass('remove_favorite');
                   $(ui).find(".sys_fav").removeClass('add_favorite');
                   $(ui).find(".sys_fav").addClass('add_favorite');
                   show_Removefavorite_alert();

                   //取得game type 類型是fav 則取消蒐藏會remove 遊戲卡
                   if(gametype == 'fav'){
                       $(ui).remove();
                   }

               },
               onNotLogin: null
           });
         } else{
           $(".plz_login").css('display', 'block');
         }



    });
    $("body").on("click", ".sys_gamelistpt_more", function (e) {
        e.stopPropagation();
        var target = $(e.target).data("sys-row") // activated tab
        sys_gamelistpt_load($(target));
    });


    $('.bbin_quick .enter_game').click(function (e) {
        e.stopPropagation();
        var gameId = ocmsite.game.getCurrentGame().gameInfoId;
        var onDone = function () {
            sys_closeEnterGamePanel()
        };
        ocmsite.game.startGame("1", gameId, 0, onDone);
    });

    $('.bbin_quick .trans_money').click(function (e) {

        loader(1);
        e.stopPropagation();
        var game = ocmsite.game.getCurrentGame();
        var amount = parseInt($(".sys_game_dialog_input").val());

        var onDone = function () {

            //寫入平台餘額
            var platform = game.gamePlatform.gamePlatformId;
            $(".sys_game_dialog_balance").text('-');
            $(".sys_game_dialog_input").val('0');
            ocmsite.user.getGamebalance(platform, function (rePlatform, balance) {
                $(".sys_game_dialog_balance").text(balance);
            });
            //ocmsite.ui.alert("Done");

            //首頁平台下拉選單 重load
            $('.con_area').load('/home/get_game_platform');
            ocmsite.ui.alert(js_lang.done); // 完成
            loader(0);
        }
        var onError = function (data) {
            ocmsite.ui.alert(data.errorMessage);
            loader(0);
        }
        if ($.isNumeric(amount) && amount > 0 && Math.floor(amount) == $(".sys_game_dialog_input").val()) {
            ocmsite.user.sendTransferToPlatformeAction(game.gamePlatform.gamePlatformId, game.gamePlatform.name, amount, onDone, onError);

        } else if( $.isNumeric(amount) && amount > 0  && Math.floor(amount) != $(".sys_game_dialog_input").val()){
            ocmsite.ui.alert(js_lang.deposit_amount_must_be_integer); // 存入金额必须为整数
            loader(0);
        } else {
            ocmsite.ui.alert(js_lang.please_enter_more_than_0_integer); // 请输入0以上整数
            loader(0);
        }

    });

    $(".sys_gamelist_search_btn").click(function (e) {

        var text = $(".sys_gamelist_search_input").val();
        // alert(text);
        $(".sys_gamliest_row_search").empty();
        sys_gamelistpt_search($(".sys_gamliest_row_search"), text);
    });

    // 預讀首頁用到的遊戲資料
    // 可能得搬到php用設定檔印的
    ocmsite.game.loadGameById({ids: [863, 2580, 2460,  648, 603, 1002, 999, 564, 594, 1, 844, 8, 636, 1020, 1029, 1100, 1872, 2386, 5, 11, 12, 2483, 1858]});


    ocmsite.event.setUnreadMessage(function (data) {

        if (data.count >= 0) {
            $(".sys_message_number").text(data.count);
        } else {
            // $(".sys_message_badge").hide();
        }
    });




    $("#arrow").click(function(){

        $(".drop_menu .sys_drop_game_balance").each(function(index, el) {
            console.log($(el).data('pid'));
            ocmsite.user.getGamebalance($(el).data('pid'), function (rePlatform, balance) {
                $(el).text(balance);
            });
        });

    });




    //送訊息已讀給server
    $("#ReceivedMessage .read_msg").click(function () {
        ocmsite.user.sendReaded($(this).data("id"), null);
    });


});



/**
*
 */
function sys_showEnterGamePanelWithParam(param) {
    var gameId = param.gameId;
    var gamePlatformName = param.gamePlatformName;


      if(isLogin){
            console.log(1);

          //判斷 平台是否開啟，若開啟則會秀出轉入出帳戶視窗，若關閉平台則會給“本游戏平台目前暂时关闭”訊息
          if(ocmsite.game.setCurrentGameById(gameId) != null){

              console.log(ocmsite.game.getCurrentGame());
              var game = ocmsite.game.getCurrentGame();

              //展開ui
              //雖然取bbin_quick，應該是通用的吧?
              $('.bbin_quick').css('display', 'block');

              //寫入平台名稱
              $('.sys_game_dialog_platform_name').text(game.gamePlatform.name);

              //寫入平台餘額
              var platform = game.gamePlatform.gamePlatformId;
              $(".sys_game_dialog_balance").text('-');
              ocmsite.user.getGamebalance(platform, function (rePlatform, balance){
                  $(".sys_game_dialog_balance").text(balance);
              });
          }else{

              ocmsite.ui.alert(js_lang.platform_is_closed); // 本游戏平台目前暂时关闭
          }


      } else {
          console.log(2);
          sys_alertNotLogin();
      }

}

function sys_alertNotLogin() {
    $('.plz_login').css('display', 'block');
}

function sys_closeEnterGamePanel() {
  $('.bbin_quick').css('display', 'none');
  $('.popsignup').css('display', 'none');
}

function sys_gamelistpt_load(rowview) {
    var gametype = rowview.data("sys-gametype");
    var gametypedata = rowview.data("sys-gametype-data");
    var start = rowview.data("sys-start");
    if(rowview.children('div').length === 0) {
        var count = rowview.data("sys-count-init");
    } else {
        var count = rowview.data("sys-count");
    }
    var onDone = function(data) {
        var result_count = 0;
        for (var i = 0; i < data.data.length; i++) {
            var ui = $(".sys_gamelist_gamecard_prefab").clone();
            ui.removeClass("sys_gamelist_gamecard_prefab");
            sys_setGameUi(ui, data.data[i]);
            $(rowview).append(ui);
            result_count++;
        }
        $(rowview).data('sys-start', parseInt($(rowview).data('sys-start')) + parseInt(result_count));
    }
    var onError = function(data) {
        console.log("onError");
        console.log(data);
    };
    var onNoMore = function() {
        rowview.parent().find(".sys_gamelistpt_more").remove();
    }
    var param = {
        searchType:gametype
        , searchTypeData:gametypedata
        , platformId:ocmsite.tools.getUrlVar("pid")
        , start:start
        , count:count
        , name:null
        , onDone:onDone
        , onNoMore:onNoMore};
    ocmsite.game.loadGameByPlatform(param);
}


function sys_gamelistpt_search(rowview, name) {
    var gametype = "name";
    var start = 0;
    var count = 20;
    var onDone = function(data) {
        console.log(data);
        var result_count = 0;
        for (var i = 0; i < data.data.length; i++) {
            console.log(data.data[i]);
            var ui = $(".sys_gamelist_gamecard_prefab").clone();
            ui.removeClass("sys_gamelist_gamecard_prefab");
            sys_setGameUi(ui, data.data[i]);
            $(rowview).append(ui);
            result_count++;
        }
        $(rowview).data('sys-start', parseInt($(rowview).data('sys-start')) + parseInt(result_count));
    }
    var onError = function(data) {
        console.log("onError");
        console.log(data);
    };
    var onNoMore = function() {
        rowview.parent().find(".sys_gamelistpt_more").remove();
    }
    var param = {
        searchType:gametype
        , searchTypeData:null
        , platformId:ocmsite.tools.getUrlVar("pid")
        , start:start
        , count:count
        , name:name
        , onDone:onDone
        , onNoMore:onNoMore};
    ocmsite.game.loadGameByPlatform(param);
}

function sys_setGameUi(ui, data) {
    $(ui).find(".sys_gamename").text(data.displayName);
    $(ui).find(".sys_gameimg").attr("src", data.game_img);
    $(ui).data("sys-game-id", data.gameInfoId);
    if (!data.info.choice) {
        $(ui).find(".sys_top").remove();
    }
    if (!data.info.hot) {
        $(ui).find(".sys_hot").remove();

    }
    if (!data.info.newest) {
        $(ui).find(".sys_new").remove();

    }
    if (data.faved) {
        $(ui).find(".sys_fav").removeClass('remove_favorite');
        $(ui).find(".sys_fav").removeClass('add_favorite');
        $(ui).find(".sys_fav").addClass('remove_favorite');
    } else {
        $(ui).find(".sys_fav").removeClass('remove_favorite');
        $(ui).find(".sys_fav").removeClass('add_favorite');
        $(ui).find(".sys_fav").addClass('add_favorite');
    }
}
