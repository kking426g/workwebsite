    $(function () {
        $("#ReceivedMessage .item, #History .item").click(function(){
            if($(this).hasClass('sys_message_unread')) {
                var id = $(this).attr('sys_messageid');
                ocmsite.user.sendReaded(id, $(this));
            }
        });
    });

    function reply(rid, title) {
        $("#tab_sending").click();//switch tab
        $("#referenceMasterId").val(rid);
        $("#message_title").val("Re: " + title);

    }
