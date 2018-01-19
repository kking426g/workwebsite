$(function(){
    $(".email").click(function(){
      urlbox("/home/mymessage", 1200, 800);
    })

    $(".logout").click(function(){
      location.href = "/login/logout";
    })

    $('.look_around').click(function(){
      urlbox("/home/mymessage", 1200, 800);
      $('.signup_ok').css('display', 'none');
    })

})
