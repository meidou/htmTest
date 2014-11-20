//部署在IIS上之后，要设置base=""
var base = "../..";
var alias = {
    //lib
    "jquery": "/scripts/Libs/Jquery/1.11.0/Jquery",
    'underscore': '/scripts/libs/underscore/1.6.0/underscore',
    'backbone': '/scripts/libs/backbone/1.0.0/backbone',
    'mustache': '/scripts/libs/mustache/0.8.1/mustache',
    'tweenmax': '/scripts/libs/GreenSock/1.13.1/TweenMax.min',
    //modules
    'common': '/scripts/modules/common',
    "temp": '/Scripts/modules/Temp',
    "carousel": '/Scripts/modules/Carousel',
    "storage": '/Scripts/modules/Storage',
    //app



    //Setting
    "appid": 209697
};


for (var a in alias) {
    alias[a] = base + alias[a];
}

seajs.config({
    alias: alias,
    map: [
      [/^(.*\.(?:css|js))(?:.*)$/i, '$1?v=20140506'] // 时间戳，方便清除缓存
    ],
    preload: [
    this.JSON ? '' : 'json'
    ]
});

//方便输出log检查问题，嘿嘿
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function () {
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if (this.console) {
        arguments.callee = arguments.callee.caller;
        var newarr = [].slice.call(arguments);
        (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
    }
};
// make it safe to use console.log always
//(function (b) { function c() { } for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop(); ) { b[a] = b[a] || c } })((function () {
//    try
//    { console.log(); return window.console; } catch (err) { return window.console = {}; }
//})());


