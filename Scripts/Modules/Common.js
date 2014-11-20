/*
2014年7月21日 made by 梁斌

*/

define(function (require, exports) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Mustache = require('mustache');
    var temps = {
        confirm: '<div class="ajaxContent"><div class="ajaxheader">{{#close}}<a class="ajaxClose" href="javascript:void(0)">×</a>{{/close}}<span class="ajaxh3">{{title}}</span></div><div class="ajaxbody">{{#state}} <span class="d_message-inline {{state}}"><i></i></span>{{/state}}<p>{{{content}}}</p></div><div class="ajaxfoot">{{#confirm}}<input class="uibtnf60 ml05" id="btn_confirm" type="button" value="确 定">{{/confirm}}{{#cancel}}<input class="uibtn999 ml05 close" type="button"  value="关 闭">{{/cancel}}</div></div>',
        alert: '<div class="ajaxContent"><div class="ajaxheader">{{#close}}<a class="ajaxClose" href="javascript:void(0)">×</a>{{/close}}<span class="ajaxh3">{{title}}</span></div><div class="ajaxbody">{{#state}} <span class="d_message-inline {{state}}"><i></i></span>{{/state}}<p>{{{content}}}</p></div><div class="ajaxfoot">{{#confirm}}<input class="uibtnf60 ml05" id="btn_pass" type="button" value="确 定">{{/confirm}}{{#cancel}}<input class="uibtn999 ml05 close" type="button"  value="关 闭">{{/cancel}}</div></div>',
        tip: '<div class="tooltip" style="font-size: 12px;line-height: 1.4;position: absolute;visibility: visible;z-index: 1070;margin-top: -3px;padding: 5px 0;"><div style="border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 10px solid {{color}};width: 0;height: 0;position:absolute;bottom:-5px;left: 50%;margin-left: -5px;"></div><div style="background-color: {{color}};border-radius: 4px;color: #fff;max-width: 200px;padding: 3px 8px;text-align: center;text-decoration: none;">{{content}}</div></div>',
        loading: '<div id="loadingElement" class="pop"  style="z-index:999999; display:none;"><div class="popui tckbox"><div class="loadbox"><span class="icoloading">正在努力加载中，请稍候……</span></div></div></div>'
    };
    var defSet = { title: "Have a nice day ^-^", content: "I'm content -.-" };

    var Common = {
        ShowBox: function (Switch) {
            if (Switch) {
                if ($(".wcbox").length == 0) {
                    $("body").append("<div class='wcbox'></div>");
                    $("body").append("<div class='wcboxbg'></div>");
                    $(".wcbox,.wcboxbg").fadeIn('normal');
                }
            }
            else {
                $(".wcbox,.wcboxbg").fadeOut("normal", function () { $("body").find(".wcbox,.wcboxbg").remove(); });
            }
        },
        Loading: function (Switch) {
            if (Switch) {
                $("body").append(temps.loading).fadeIn(500);
                $("#loadingElement").show();
            } else {
                $("#loadingElement").fadeOut(200);
                $("body").find("#loadingElement").remove();
            }
        },
        Alert: function (options) {
            Common.ShowBox(true);
            var defOpt = { temp: temps.alert, confirm: true, cancel: false, close: true }
            $.extend(defOpt, defSet, options);
            return new View().render(defOpt);

        },
        Confirm: function (options) {
            Common.ShowBox(true);
            var defOpt = { temp: temps.confirm, confirm: true, cancel: true }
            $.extend(defOpt, defSet, options);
            return new View().render(defOpt);
        },
        Shake: function (obj) {
            $(obj).animate({ left: "+=10px" }, 100)
                        .animate({ left: "-=20px" }, 100)
                        .animate({ left: "+=20px" }, 100)
                        .animate({ left: "-=20px" }, 100)
                        .animate({ left: "+=20px" }, 100)
                        .animate({ left: "-=10px" }, 100);
        },
        ShowTip: function (obj, option) {
            var def = { content: "我是内容", color: "#78ba32" }
            def = $.extend(def, option);
            $(obj).hover(function () {
                $(".tooltip").remove();
                $("body").append(Mustache.to_html(temps.tip, { content: def.content, color: def.color }));
                $(".tooltip").offset({ top: $(this).offset().top - 40, left: $(this).offset().left + $(this).width() / 2 - $(".tooltip").width() / 2 });
            }, function () {
                $(".tooltip").remove();
            })
        },
        Move: function (obj, content) {
            $(obj).mousedown(function (event) {
                var isMove = true;
                var abs_x = event.pageX - $(content).offset().left;
                var abs_y = event.pageY - $(content).offset().top;
                $(document).mousemove(function (event) {
                    if (isMove) {
                        $(content).css({ 'left': event.pageX - abs_x, 'top': event.pageY - abs_y });
                    }
                }).mouseup(function () { isMove = false; });
            });
        }
    }

    View = Backbone.View.extend({
        el: '.wcbox',
        template: '',
        render: function (options) {
            this.template = options.temp;
            var content = Mustache.to_html(this.template, options);
            $(this.el).html(content);
            if (options.width) {
                owidth = $(this.el).width();
                oleft = $(this.el).offset().left;
                $(this.el).width(options.width);
                $(this.el).offset({ left: (oleft + owidth / 2 - options.width / 2) });
            }
            if (!options.backdrop) {
                $(".wcboxbg").click(function () { Common.ShowBox(false); })
            }
            else if (options.backdrop == "shake") {
                $(".wcboxbg").click(function ()
                { Common.Shake($(".wcbox")) })
            }
            Common.Move($(".ajaxheader"), $('div.wcbox'));
            return this;
        },
        events: {
            'click .ajaxClose': 'close',
            'click .close': 'close',
            'click #btn_pass': 'commit',
            'click #btn_confirm': 'confirm'
        },
        close: function () {
            Common.ShowBox(false);
        },
        commit: function () {
            this.close();
        },
        confirm: function () {
            this.trigger('confirm');
        }
    })

    exports.Action = Common;

})