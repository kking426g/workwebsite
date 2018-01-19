$(function () {
// Can also be used with $(document).ready()
    $('.flexslider').flexslider({
      animation: "slide"
    });


    $('.cclose').click(function () {
        $('.contact').css('display', 'none');
    })

    $(window).resize(function () {
        var window_width = $(window).width();//螢幕寬度
        var window_height = $(window).height();//螢幕高度
        $('.bg_left').css('height', window_height - 400);
        $('.bg_right').css('height', window_height - 400);
        $('.pillar').css('left', (window_width / 2) - 700);
        $('.pillar_left').css('height', window_height - 550);
        $('.pillar_right').css('height', window_height - 550);
        $('.marquee_box').css('max-width', window_width - 662);


//light box 自適應
        if (window_width < 1200) {

            $('div.jAlert.lbox iframe').css('width', window_width);
            $('div.jAlert.lbox .title').css('width', window_width);
        } else {
            $('div.jAlert.lbox iframe').css('width', '1200px');
            $('div.jAlert.lbox .title').css('width', '100%');
        }

        if (window_height < 800) {
            var n = window_height - 50;
            //console.log(n)
            $('div.jAlert.lbox iframe').css('height', n);
        } else {
            $('div.jAlert.lbox iframe').css('height', '800px');
        }
    });

    $(window).trigger('resize');

    $(".clear").click(function () {
        $(".sys_cus_first_name").val('');
        $(".sys_cus_last_name").val('');
        $(".sys_cus_mail").val('');
        $(".sys_cus_phone").val('');
        $(".sys_cus_question").val('');
    })

    /*隱藏 入款彈出視窗*/
    $('.popout_xx').click(function () {
        $('.pop_out_quick').css('display', 'none');
        $('.pop_out').css('display', 'none');
        $('.popup_set').css('display', 'none');
        $('#member_popup').css('display', 'none');
    })


//電子遊戲 hover
    var electronicishover = false;
    $(".electronic").hover(function () {
        $("#electronic_content").stop(false, false).slideDown(600);
        electronicishover = true;
    }, function () {
        electronicishover = false;
        if (!electronicishover) {
            $("#electronic_content").stop(false, false).slideUp(600);
        }
    });

    $("#electronic_content").hover(
        function () {
            electronicishover = true;
            $("#electronic_content").stop(false, false).slideDown(600);
        }, function () {
            electronicishover = false;
            if (!electronicishover) {
                $("#electronic_content").stop(false, false).slideUp(600);
            }
        }
    );

//彩票 hover
   var ticketishover = false;
    $(".ticket").hover(function () {
        $("#ticket_content").stop(false, false).slideDown(600);
        ticketishover = true;
    }, function () {
        ticketishover = false;
        if (!ticketishover) {
            $("#ticket_content").stop(false, false).slideUp(600);
        }
    });

    $("#ticket_content").hover(
        function () {
            ticketishover = true;
            $("#ticket_content").stop(false, false).slideDown(600);
        }, function () {
            ticketishover = false;
            if (!ticketishover) {
                $("#ticket_content").stop(false, false).slideUp(600);
            }
        }
    );

//體育 hover
    var sportishover = false;
    $(".sport").hover(function () {
        $("#sport_content").stop(false, false).slideDown(600);
        sportishover = true;
    }, function () {
        sportishover = false;
        if (!sportishover) {
            $("#sport_content").stop(false, false).slideUp(600);
        }
    });

    $("#sport_content").hover(
        function () {
            sportishover = true;
            $("#sport_content").stop(false, false).slideDown(600);
        }, function () {
            sportishover = false;
            if (!sportishover) {
                $("#sport_content").stop(false, false).slideUp(600);
            }
        }
    );

//真人 hover
  var realishover = false;
    $(".real").hover(function () {
        $("#real_content").stop(false, false).slideDown(600);
        realishover = true;
    }, function () {
        realishover = false;
        if (!realishover) {
            $("#real_content").stop(false, false).slideUp(600);
        }
    });

    $("#real_content").hover(
        function () {
            realishover = true;
            $("#real_content").stop(false, false).slideDown(600);
        }, function () {
            realishover = false;
            if (!realishover) {
                $("#real_content").stop(false, false).slideUp(600);
            }
        }
    );   


//請登入視窗
    $('.clc').click(function () {
        if (isLogin) {
            $('.bbin_quick').css('display', 'block');
        } else {
            $('.plz_login').css('display', 'block');
        }
    })

    $('.alert_btn').click(function () {
        $('.plz_login').css('display', 'none');
        $('.pop_out').css('display', 'none');
        $('#reminder').css('display', 'none');
        $('.cover_box').css('display', 'none');//黑色背景
    });

    $('.signup_btn').click(function () {
        $('.popsignup').css('display', 'block');
    });

    if (isLogin) {
        $('.hd-1r').css('display', 'none');
        $('.member_info').css('display', 'inline-block');
    } else {
        $('.hd-1r').css('display', 'block');
        $('.member_info').css('display', 'none');
    }
    
    $("#tab1").click(function () {
        $("#ReceivedMessage").addClass("in active");
        $("#SendingMessage").removeClass("in active");
        $("#History").removeClass("in active");
    })

    $("#tab_sending").click(function () {
        $("#ReceivedMessage").removeClass("in active");
        $("#SendingMessage").addClass("in active");
        $("#History").removeClass("in active");
    })


    $("#tab2").click(function () {
        $("#ReceivedMessage").removeClass("in active");
        $("#SendingMessage").removeClass("in active");
        $("#History").addClass("in active");
    });


    $('.bg2').click(function () {

        $('.word1').css('display', 'none');
        $('.word2').css('display', 'block');
        $('.word3').css('display', 'none');
        $('.word4').css('display', 'none');
        $('.word5').css('display', 'none');

    });

    $('.bg1').click(function () {
        $('.word1').css('display', 'none');
        $('.word2').css('display', 'none');
        $('.word3').css('display', 'block');
        $('.word4').css('display', 'none');
        $('.word5').css('display', 'none');
    });

    $('.bg4').click(function () {

        //判斷是否有綁定銀行設定
        if ($("#set_mybank").val() != 1) {

            //沒有綁定就導入銀行設定頁
            show_alert(js_lang.please_setting_bank_info, 'banksetting'); // 请设定往来银行账户，存提款都必须使用本银行账户进行操作

            $('.cover_box').css('display', 'block');//黑色背景

        } else {
            $('.word1').css('display', 'none');
            $('.word2').css('display', 'none');
            $('.word3').css('display', 'none');
            $('.word5').css('display', 'none');
            $('.word4').css('display', 'block');
            $('.online_preset').css('display', 'block');
        }


    });

    $('.bg3').click(function () {

        $('.word1').css('display', 'none');
        $('.word2').css('display', 'none');
        $('.word3').css('display', 'none');
        $('.word4').css('display', 'none');
        $('.word5').css('display', 'block');

    });


    //下拉功能列
    var drop_menu_on = false;
        $("#arrow").click(function () {
            drop_menu_on = false;
            $('.con_area').load('/home/get_game_platform');
            $('.drop_menu').stop(false, false).slideDown(500, function() {
              drop_menu_on = true;
            });
        });
    //hover時 不收合
        $(".drop_menu").hover(
            function () {
              drop_menu_on = false;
            }, function(){
              drop_menu_on = true;
            }
        );
    //點任意鍵收合
        $("html").click(function(){
          if (drop_menu_on) {
              $('.drop_menu').slideUp(500);
              drop_menu_on = false;
          }
        })


    $(".pt").click(function () {
        $('#CasinoGames1').css('display', 'block');
        $('#CasinoGames2').css('display', 'none');
        $('#CasinoGames').css('display', 'none');
    })

    $(".mg").click(function () {
        $('#CasinoGames1').css('display', 'none');
        $('#CasinoGames2').css('display', 'none');
        $('#CasinoGames').css('display', 'block');
        // location.href = '/home/gamelist';
    })

    $(".ag").click(function () {
        $('#CasinoGames1').css('display', 'none');
        $('#CasinoGames2').css('display', 'block');
        $('#CasinoGames').css('display', 'none');
    })

    $('.confirm_money').click(function () {
        $('.alipay_msg').css('display', 'none');
        $('.wechat_msg').css('display', 'none');
        $('.bank_alert').css('display', 'block');
    })

    // $('.online_pay').click(function () {
    //     $('.online_msg').css('display', 'block');
    //     $('html, body').scrollTop(0);
    // })

// /*支付寶 提交*/
// $('.alipay_pay').click(function(){
//   var al_deposit_money = $(".sys_deposit_al_amount").val();
//   $('#pop_out_info').append($('#alipay_m'));
//   $('#bank_msg').css('display', 'block');
//   $('#member_popup').css('display', 'block');
//   $('#pop_out_info').css('display', 'block');
//   //顯示在泡泡框金額欄位
//   $('.bank_money').html(al_deposit_money);
// })


    $('.wechat_pay').click(function () {

        var money = $('.getmoney').val();
        console.log(money)
        if (money > 0) {
            $('.mon').html(money);//顯示要存入金額
            $('.wechat_msg').css('display', 'block');
            $('html, body').scrollTop(0);
        }
    })


    $('.wd_send').click(function () {
        $('.wd_msg').css('display', 'block');
        $('html, body').scrollTop(0);
    })


    $('.reset_btn').click(function () {
        $('.clear').val("");
    })


    $('.return_page').click(function () {
        //show_alert('測試用的文字', function(){})
        $('#bank_msg').css('display', 'none');
        $('#member_popup').css('display', 'none');
        $('#pop_out_info').css('display', 'none');
        $('.cover_box').css('display', 'none');//黑色背景
    })

    /*站內信*/
    $("#ReceivedMessage .read_msg").click(function () {
        var a = $(this).parent();
        var b = a.parent().find('.subs');
        var c = b.css('display');
        if (c != 'block') {
            b.slideDown(300);
        } else {
            b.slideUp(300);
        }
    });


    $("#Account li").click(function () {
        $('#Account li').removeClass('on');
        $(this).addClass('on');
    })

    $('.stay').click(function () {
        $('.cover_box').css('display', 'none');
        $('#favorite_alert').css('display', 'none');
        $('#Removefavorite').css('display', 'none');
    })

    $('.go_favorite').click(function () {
        window.open('/home/favorite', '_self');
        $('.cover_box').css('display', 'none');
        $('#favorite_alert').css('display', 'none');
        $('#Removefavorite').css('display', 'none');
    })

    $(".slider_fav li").click(function () {
        $('.slider_fav li').removeClass('on');
        $(this).addClass('on');
    })


    $("#sel_all").click(function () {
        if ($("#sel_all").prop("checked")) {
            $('.msg_check').prop("checked", true);
        } else {
            $('.msg_check').prop("checked", false);
        }
    });


    //刪除按鈕
    $("#del_all").click(function () {
        var del_id_arr = new Array();

        $("#Account table input:checkbox:checked").each(function (n) {


            var obj = $("#Account table input:checkbox:checked").eq(n);
            del_id = obj.data().id;

            del_id_arr.push(del_id);

        });

        if(del_id_arr.length == 0){
            alert(js_lang.unselected); // 未选择
            return false;
        }

        jConfirm(js_lang.delete_the_selected_msg, function (bool) { // 确定要删除所选的信息

            if (bool) {
                //刪除
                if (del_id_arr != undefined) {

                    ocmsite.user.delMsgList(del_id_arr);

                }
            }

        });
    })


    $('#summit_error').click(function () {
        $('.wd_msg').css('display', 'none');
        $('.wd_alert').css('display ', 'block');
    })


    $('.tothetop').click(function () {
        // 讓捲軸移動到 0 的位置
        $('html, body').scrollTop(0);
        return false;
    });


//   $('a').on('mousedown', stopNavigate);
//   $('a').on('click', stopNavigate);
// //綁定離開頁面事件
//   $('a').on('mouseleave', function () {
//          $(window).on('beforeunload', function(){
//                 return 'Are you sure you want to leave?';
//          });
//   });


    $('.check_yes').click(function () {
        $('#summit_error').css('display', 'none');
        $('.cover_box').css('display', 'none');
    })

    $('.no_play_icon').click(function () {
        $("#no_played").css('display', 'none');
        $('.cover_box').css('display', 'none');
    })

    $('.no_fav_icon').click(function () {
        $("#no_favorite").css('display', 'none');
        $('.cover_box').css('display', 'none');
    })
})

function show_summit_error() {
    $('#summit_error').css('display', 'block');
    $('.cover_box').css('display', 'block');
}

function show_favorite_alert() {
    $('#favorite_alert').css('display', 'block');
    $('.cover_box').css('display', 'block');
}

function show_signup_ok() {
    $('.signup_ok').css('display', 'block');
}


function show_Removefavorite_alert() {
    $('#Removefavorite').css('display', 'block');
    $('.cover_box').css('display', 'block');
}

function summit_error() {
    $('#summit_error').css('display', 'block');
    $('.cover_box').css('display', 'block');
}


function show_loading() {
    $(".loadding").css('display', 'block');
    $('.cover_box').css('display', 'block');
}

var loader = function (status) {
    if (status === 1) {
        $('#loader').show();
        $('.cover_box').css('display', 'block');
    } else {
        $('#loader').hide();
        $('.cover_box').css('display', 'none');
    }
};

// //取消綁定離開頁面事件
// function stopNavigate(){
//     $(window).off('beforeunload');
// }


/*訊息jConfirm */
function jConfirm(str, callback) {

    //文字檢查
    if (str == undefined || str.length == 0) {
        return false;
    }

    if ($(".mask,.jAlert")) {
        $(".mask,.jAlert").remove()
    }

    $("<div class='mask'>").appendTo("body");
    $("<div class='jAlert'>")
        .append($("<div class='tbar dang'>").text())
        .append($("<p>").text(str))
        .append($("<button class='default orange' type='button'>").text("YES").on("click", function () {
            $(".mask,.jAlert").remove();
            (callback) ? callback(true) : ""
        }))
        .append($("<button class='default' type='button'>").text("NO").on("click", function () {
            $(".mask,.jAlert").remove();
            (callback) ? callback(false) : ""
        }))
        .appendTo("body");
};


//alert彈窗--顯示與導入下一頁步驟
var show_alert = function show_alert(text, next_step) {

    var info = $('#reminder').find('.info');

    $('#reminder').css('display', 'block');//顯示提醒

    info.html(text);


    //導入下一頁步驟
    if (typeof(next_step) != 'undefined') {

        $('#btn_next_step').click(function () {

            //next_step();

            window.location.replace(next_step);


            $('#reminder').hide();
        });
    }
};

var red_border_style = function(elements, remove_attr) {
    var remove_attr = remove_attr || false;
    var elements = elements || [];
    elements.forEach(function(element) {
        if (remove_attr === false) {
            element.css({'background-color': '#ffcccc', 'border': 'solid #f00 1px'});
        }
        else {
            element.css({'background-color': '', 'border': ''});
        }
    });
};


//popupwindow center
function popupwindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  if (navigator.userAgent.indexOf('Firefox') > 0){
    return ''
  } else {
    return popup_window = window.open(url, title, 'height='+h+', width='+w+', top='+top+', left='+left+', scrollbars=yes')
  }
}
