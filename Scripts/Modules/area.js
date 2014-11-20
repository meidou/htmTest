define(function (require, exports) {
    var mustache = require("mustache");
    var areadata = [];
    var iplocation = {
        "1": { name: "北京", root: 0, djd: 1, c: 72 }, "2": { name: "上海", root: 1, djd: 1, c: 78 }, "3": { name: "天津", root: 0, djd: 1, c: 51035 }, "4": { name: "重庆", root: 3, djd: 1, c: 113 }, "5": { name: "河北", root: 0, djd: 1, c: 142 },
        "6": { name: "山西", root: 0, djd: 1, c: 303 }, "7": { name: "河南", root: 0, djd: 1, c: 412 }, "8": { name: "辽宁", root: 0, djd: 1, c: 560 }, "9": { name: "吉林", root: 0, djd: 1, c: 639 }, "10": { name: "黑龙江", root: 0, djd: 1, c: 698 },
        "11": { name: "内蒙古", root: 0, djd: 0, c: 799 }, "12": { name: "江苏", root: 1, djd: 1, c: 904 }, "13": { name: "山东", root: 0, djd: 1, c: 1000 }, "14": { name: "安徽", root: 1, djd: 1, c: 1116 }, "15": { name: "浙江", root: 1, djd: 1, c: 1158 },
        "16": { name: "福建", root: 2, djd: 1, c: 1303 }, "17": { name: "湖北", root: 0, djd: 1, c: 1381 }, "18": { name: "湖南", root: 2, djd: 1, c: 1482 }, "19": { name: "广东", root: 2, djd: 1, c: 1601 }, "20": { name: "广西", root: 2, djd: 1, c: 1715 },
        "21": { name: "江西", root: 2, djd: 1, c: 1827 }, "22": { name: "四川", root: 3, djd: 1, c: 1930 }, "23": { name: "海南", root: 2, djd: 1, c: 2121 }, "24": { name: "贵州", root: 3, djd: 1, c: 2144 }, "25": { name: "云南", root: 3, djd: 1, c: 2235 },
        "26": { name: "西藏", root: 3, djd: 0, c: 2951 }, "27": { name: "陕西", root: 3, djd: 1, c: 2376 }, "28": { name: "甘肃", root: 3, djd: 1, c: 2487 }, "29": { name: "青海", root: 3, djd: 0, c: 2580 }, "30": { name: "宁夏", root: 3, djd: 1, c: 2628 },
        "31": { name: "新疆", root: 3, djd: 0, c: 2652 }, "32": { name: "台湾", root: 2, djd: 0, c: 2768 }, "42": { name: "香港", root: 2, djd: 0, c: 2754 }, "43": { name: "澳门", root: 2, djd: 0, c: 2770 }, "84": { name: "钓鱼岛", root: 2, djd: 0, c: 84 }
    };
    var temp = {
        areatemp: '{{#list}}<li><a data-value="{{id}}" href="javascript:void(0)">{{name}}</a></li>{{/list}}'
    }

    var Action = {
        GetData: function (id) {
            $.ajax({
                url: 'http://d.360buy.com/area/get?fid=' + id,
                dataType: "jsonp",
                jsonp: "callback",
                success: function (data) {
                    if ($(".pcity").hasClass("curr")) {
                        $(".cprovince").addClass("hide");
                        $(".ccity").removeClass("hide");
                        $(".ccity .area-list").html(mustache.to_html(temp.areatemp, { list: data }));
                        $(".ccity .area-list").find("a").click(function () {
                            var id = $(this).attr("data-value");
                            Action.GetData(id);
                            $(".pcity").removeClass("curr");
                            $(".pstreet").addClass("curr").removeClass("hide");
                            $(".pcity").find("em").html($(this).html());
                        })
                    }
                    else if ($(".pstreet").hasClass("curr")) {
                        $(".ccity").addClass("hide");
                        $(".cstreet").removeClass("hide");
                        $(".cstreet .area-list").html(mustache.to_html(temp.areatemp, { list: data }));
                        $(".cstreet .area-list").find("a").click(function () {
                            $(".pstreet").find("em").html($(this).html());
                            var html = "";
                            $(".JD-stock .tab").find("em").each(function (index, item) {
                                html += $(item).html();
                            })
                            $(".txtArea").html(html + "<b></b>");
                            $("#store-selector").removeClass("hover");
                            $("#txtareaid").val($(this).attr("data-value"));
                        });
                    }
                }
            })

        },
        Init: function () {
            $("#store-selector").mouseover(function () { $(this).addClass("hover") });
            $(".areaClose").click(function () { $("#store-selector").removeClass("hover") });
            for (var id in iplocation) { areadata.push({ id: id, name: iplocation[id].name }); }
            $(".cprovince .area-list").html(mustache.to_html(temp.areatemp, { list: areadata }));
            $(".cprovince .area-list").find("a").click(function () {
                var id = $(this).attr("data-value");
                Action.GetData(id);
                $(".pprovince").removeClass("curr");
                $(".pcity").addClass("curr").removeClass("hide");
                $(".pprovince").find("em").html($(this).html());
            });

            $(".pprovince").find("a").click(function () {
                $(".cprovince").removeClass("hide");
                $(".ccity,.cstreet").addClass("hide");
                $(".pprovince").addClass("curr").find("em").html("请选择");
                $(".pcity,.pstreet").removeClass("curr").addClass("hide");
            })

            $(".pcity").find("a").click(function () {
                $(".ccity").removeClass("hide");
                $(".cstreet").addClass("hide");
                $(".pcity").addClass("curr").find("em").html("请选择");
                $(".pstreet").removeClass("curr").addClass("hide");
            })
        }
    }
    exports.Action = Action;
})
