 /*
  * 延用jAlert CSS
  * FAKE燈箱
  * urlbox("http://www.w3schools.com")
  */
var urlbox = function (url,w , h) {
    if ($(".mask,.jAlert")) { $(".mask,.jAlert").remove() };
    $("<div class='mask'>").appendTo("body");
    $("<div class='jAlert lbox'>").append(
        $("<iframe>", {
            src : url
        })
    )

    .append(
        $("<div class='title'>站內信<div class='xx'>", { src : url }).click(function () { $(".mask,.jAlert").remove();})
        ).appendTo("body");

    (typeof w == "number") ? $(".jAlert").width(w) :"";
    (typeof h == "number") ? $(".jAlert").height(h) :"";
}
