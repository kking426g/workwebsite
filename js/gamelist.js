    $(function () {


        $(".sys_btn_loadmoregame").click(function () {
            var parent = $(this).parent();
            var row_class = $(this).data("sys-row-target");
            var row = $("." + row_class);

            loadgame(
                row.data('type'),
                row.data('typeid'),
                row.data('start'),
                row.data('count'),
                row,
                this
            );
        });




        

        //nav li click event set
        $("#gamelist ul.nav li").click(function(){
            setTimeout(function(){
                if ($("#gamelist .tab-pane.active .game").length <1  ){
                    $("#gamelist .tab-pane.active .sys_btn_loadmoregame").click();
                };
            }, 500);
        });
        //the first times load to do click
        $(window).load(function(){
            $("#gamelist ul.nav li").first().click()
        });
    });


    function loadgame(type, typeid, start, count, container, button) {
        var onDone = function (data) {
            var dataobj = data;
            var dataCount = 0;

            var gamelist = dataobj.data;

            if (gamelist != null) {

                gamelist.forEach(function (game) {
                    dataCount++;
                    var newview = $('#tmp-game-item').clone();
                    var row = newview.find('.pitem');
                    newview.attr('id', '');

                    newview.data("sys-gameid", game.gameInfoId);

                    var pimg = newview.find('.pimg');
                    var title = pimg.find('h3');
                    var img = pimg.find('img');
                    $(img).attr('src', game.game_img);
                    if (game.is_fav ) {

                    } else {
                        //newview.find('.btn_fav').addClass('gray');
                        newview.find(".btn_fav").css("background", "url('/images/icon_fav_1.png') top right no-repeat");

                    }
                    $(title).html(game.displayName);
                    newview.show();
                    $(container).append(newview);

                    if (!game.info.hot) {
                        pimg.removeClass("hot");
                    }
                    if (!game.info.newest) {
                        pimg.removeClass("new");
                    }

                    if (!game.canTest) {
                        newview.find('.btn_pfun').remove();
                    }

                    pimg.click(function () {
                        var vh = $("#gamelist .game").height();
                        (vh > 0)? $("#gamelist .game").height(vh):"";
                        /*上面二行是防止跑位*/
                        $("#gamelist .game .pitem").removeClass("view");
                        $(this).parents(".pitem").addClass("view");


                    });

                });
                if (gamelist.length < parseInt(count)) {
                    $(button).remove();
                }
                $(container).data('start', parseInt(start) + parseInt(dataCount));
                //console.log($(container).data('start'));
                if ($(container).data('start') == 0) {
                    //console.log("REMOVE?");
                    $(container).prev().remove();
                    $(container).remove();
                }
                $GameShow();
            } else {
                $(button).remove();
            }
        };
        var onError = null;
        ocmsite.game.loadGame(type, typeid, start, count, onDone, onError);
    }
