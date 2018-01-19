$(function() {
    $('#add_bookmark').click(function (e) {
        var bookmark_Page_URL = window.location.href;
        var bookmark_Page_Title = document.title;

        if ('addToHomescreen' in window && window.addToHomescreen.isCompatible) {
            // For Mobile browsers
            addToHomescreen({autostart: false, startDelay: 0}).show(true);
        } else if (window.sidebar && window.sidebar.addPanel) {
            // For Firefox version < 23
            window.sidebar.addPanel(bookmark_Page_Title, bookmark_Page_URL, '');
        } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
            // For Firefox version >= 23 and Opera Hotlist
            $(this).attr({
                href: bookmark_Page_URL,
                title: bookmark_Page_Title,
                rel: 'sidebar'
            }).off(e);
            return true;
        } else if (window.external && ('AddFavorite' in window.external)) {
            // IE Favorite
            window.external.AddFavorite(bookmark_Page_URL, bookmark_Page_Title);
        } else {
            // Other browsers (mainly WebKit - Chrome/Safari)
            alert(js_lang.press + (/Mac/i.test(navigator.userAgent) ? 'Cmd' : 'Ctrl') + '+D ' + js_lang.type_one_key_to_collect_this_site); // 請按, 一键收藏本站网址
        }

        return false;
    });

    //名字跟著帳號的value
    $('#new_account').keyup( function(){

        $("#DisplayName").val($('#new_account').val());

    });





});