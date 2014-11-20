define(function (require) {
    var $ = require("jquery");
    var Common = require('common');
    require('tweenmax');

    $(".alert").click(function () {
        Common.Action.Alert();
    })

    $(".alert1").click(function () {
        Common.Action.Alert({ state: "success", title: "I'm a winner ^-^", content: "Win~~~~ ╮(￣▽￣)╭" });
    })

    $(".alert2").click(function () {
        Common.Action.Alert({ state: "error", title: "Error", content: "Sth is wrong" });
    })

    $(".alert3").click(function () {
        Common.Action.Alert({ state: "notice", title: "Pay attention class", content: "超生德V5，It's a miracle" });
    })

    $(".alert4").click(function () {
        Common.Action.Alert({ width: 300, state: "notice", title: "又瘦了", content: "- -" });
    })

    $(".alert5").click(function () {
        Common.Action.Alert({ title: "Block", backdrop: "default", content: "点黑的地方不隐藏了？" });
    })

    $(".alert6").click(function () {
        Common.Action.Alert({ title: "Shake shake shake", backdrop: "shake", content: "I'm cold" });
    })

    $(".alert7").click(function () {
        Common.Action.Alert({ title: "You have no idea", backdrop: "shake", content: "you have to click me", close: false });
    })

    $(".confirm").click(function () {
        Common.Action.Confirm().bind("confirm", function () {
            Common.Action.Alert({ content: "确定" });
        });
    })

    $(".loading").click(function () {
        Common.Action.Loading(true);
    })

    $(".changenav").click(function () {
        Action.ChangePage("." + $(this).attr("id").split('_')[1]);
    })

    $(".back").click(function () {
        Action.ChangePage(".mainPage");
    })

    var Action = {
        ChangePage: function (page) {
            TweenMax.set(page, { alpha: 0 });
            TweenMax.to(".active", 1, { css: { alpha: 0 }, ease: Linear.easeIn });
            TweenMax.to(page, 1, { css: { alpha: 1 }, ease: Linear.easeIn, onStart: function () { $(".active").removeClass("active"); $(page).addClass("active"); } });
        }
    }




})