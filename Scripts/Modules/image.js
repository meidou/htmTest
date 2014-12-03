define(function (require, exports) {
    var $ = require("jquery");
    var set;
    var img = new Image();
    img.src = "images/2.1.jpg";

    var Action = {
        Init: function () {
            set = setInterval(Action.InitData(), 40);
        },
        InitData: function () {
            if (img.width > 0 || img.height > 0) {
                clearInterval(set);
                $(".spZoom").width($(".divOverlay").width() * $(".smallImg").width() / img.width);
                $(".spZoom").height($(".divOverlay").height() * $(".smallImg").height() / img.height);
                $(".divOverlay").offset({ top: $(".smallImg").offset().top, left: $(".smallImg").offset().left + $(".smallImg").width() + 10 });
                $(".smallImg").hover(function () {
                    $(".spZoom").show();
                    $(".divOverlay").show();
                }, function () {
                    $(".spZoom").hide();
                    $(".divOverlay").hide();
                }).mousemove(function (e) {
                    var xWidth = $(this).width();
                    var yHegiht = $(this).height();
                    var x = $(this).offset().left;
                    var y = $(this).offset().top;
                    var left = e.pageX - $(".spZoom").width() / 2;
                    var top = e.pageY - $(".spZoom").height() / 2;

                    if (left < x) {
                        left = x;
                    }
                    else if ((e.pageX + $(".spZoom").width() / 2) > (x + xWidth)) {
                        left = x + xWidth - $(".spZoom").width();
                    }
                    if (top < y) {
                        top = y;
                    }
                    else if ((e.pageY + $(".spZoom").height() / 2) > (y + yHegiht)) {
                        top = y + yHegiht - $(".spZoom").height();
                    }
                    $(".spZoom").offset({ left: left, top: top });

                    $(".baseImg").offset({ left: $(".divOverlay").offset().left - (left - x) * $(".baseImg").width() / xWidth, top: $(".divOverlay").offset().top - (top - y) * $(".baseImg").height() / yHegiht });
                })
            }
        }
    }


    exports.Action = Action;
})