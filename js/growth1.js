

var waveWidth,                                   //波浪总长
    offset,
    waveHeight,                            //波浪的起伏高度
    waveCount,                                    //波浪的段数
    startX,                                     //波浪x轴的起始点
    startY,                                      //波浪的填充高度
    progress,
    progressStep,
    offsetY,
    avgW,                          //每段波浪的平均长度
    d,                                             //x坐标控制点
    hd,                                      //x坐标控制点
    c = document.getElementById("myCanvas"),
    ctx = c.getContext("2d");
var  apiHost = "http://192.168.1.6:3333";  
var apiUrl = {
    seedsNumbers:apiHost + "/userFragment/list",
    products:apiHost + '/userFragment/getProductFragmentList',
    exchange: apiHost + '/userFragment/exchange'
}
// var apiUrl = {
//     seedsNumbers: "/userFragment/list",
//     products: '/userFragment/getProductFragmentList',
//     exchange:  '/userFragment/exchange'
// }
var seedInfo = {
    nickname: "",
    youId: "",
    openId: "",
    itemId: "980",
    source: "0",
    number: "100",
    winhref: ""
}
function init2(){
    // if(is_weixin_browse()) {
    //     if(localStorage.seedInfo) {
    //         if(typeof localStorage.seedInfo == "string") {
    //             seedInfo = JSON.parse(localStorage.seedInfo);
    //         }  
    //     } else {
    //         nickname = GetQueryString("nickname").replace(/-/g, '+').replace(/_/g, '/');
    //         seedInfo.nickname = decodeURIComponent(escape(window.atob(nickname)));
    //         seedInfo.youId = window.atob(GetQueryString("youId"));
    //         seedInfo.openId = window.atob(GetQueryString("openId"));
    //         localStorage.seedInfo = JSON.stringify(seedInfo);
    //         seedInfo.winhref = window.location.href
    //     }   
    // } else {
    //     var appUserJsonStr = CommonBrowse.getUserInfo();
    //     if(!appUserJsonStr || appUserJsonStr == '') {
    //         CommonBrowse.loginUser();
    //         return;
    //     }
    //     var appUserJson = $.parseJSON(appUserJsonStr);
    //     if(appUserJson.nickname) {
    //         seedInfo.nickname = appUserJson.nickname;
    //     } else {
    //         seedInfo.nickname = appUserJson.nickName;
    //     }
    //     seedInfo.youId = appUserJson.proId;
    //     seedInfo.openId = appUserJson.proId;
    //     seedInfo.source = 1;
    // }
    // $.ajax({
    //     type: "get",
    //     url: apiUrl.products,
    //     data: "",
    //     success: function (result){
    //         if (typeof result == "string") { result = JSON.parse(result)};
    //         // if(result.data.data != "" ||)
    //         console.log(result.data.data != "");
    //         var chik = result.data.data[1].itemId
    //         seedInfo.itemId = chik;
    //         seedsNumber()
    //     },
    //     error: function(){
    //         alert('服务器正忙products.....');
    //         // console.log('服务器正忙');
    //     }
    // })
    // commongetId()
    // seedsNumber()
}init2();

var boolCtr = false;
var seedsNum ;
var ch
var imgs = new Image();
init_(25)
function init_(seeds_num){
    imgs.src = "images/bigjar.png"
    imgs.onload = function(){
        waveWidth = 930,                                    //波浪总长
        offset = 0,
        waveHeight = 28,                             //波浪的起伏高度
        waveCount = 3,                                      //波浪的段数
        startX = -300,                                       //波浪x轴的起始点
        // startY = 500,
        seedsNum = seeds_num,
        offsetY = seedsNum,                                     //波浪的填充高度,区间500——100(500为0罐，100为集满)
        // progress = 0,
        // progressStep = 0,
        avgW = waveWidth / waveCount,                           //每段波浪的平均长度
        d = avgW / 2,                                             //x坐标控制点
        hd = avgW / 4,                                        //x坐标控制点
        tick();
    }
};

function tick() {
    offset -= 0.002 * waveWidth;
    // progress += progressStep;
    c.width = imgs.width;
    c.height = imgs.height;
    if (-1*offset >= avgW) offset = 0;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    // if(parseInt(progressStep)){
    //     $('.mask_stop').fadeIn(10);
    //     $('.headinfo button').attr('disabled', true)
    // }
    // if(offsetY <= 100){
    //     progressStep = 2;
    // }
    // offsetY = seedsNum + progress
    // if(progress >= 400){
    //     progressStep = 0;
    //     seedsNum = offsetY;
    //     progress = 0;
    //     $('.getwin2').fadeIn(300);
    //     $('.mask_grow').fadeIn(300);
    //     $('.mask_stop').fadeOut(10);
    //     $('.getwin2').addClass('active')
    //     $('.headinfo button').attr('disabled', false)
    // }
    offsetY = seedsNum;
    ctx.moveTo(startX - offset, offsetY);
    for (var i = 0; i < 5; i++) {
        var dx = i * avgW;
        var offsetX = dx + startX - offset;
        ctx.quadraticCurveTo(offsetX + hd, offsetY + waveHeight, offsetX + d, offsetY);
        ctx.quadraticCurveTo(offsetX + hd + d, offsetY - waveHeight, offsetX + avgW, offsetY);  
    }
    ctx.lineTo(waveWidth,  0);
    ctx.lineTo(0, 0);
    ctx.fillStyle = 'rgba(0,0,0,0.95)';
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(imgs,0,0,imgs.width,imgs.height);
    c.style.width = '100%';
    c.style.height = '100%';
    requestAnimationFrame(tick);
};

/**
 * Created by Administrator on 2018/4/26.
 */

// var animation_service={
//     waveWidth:null,                                   //波浪总长
//     offset:null,
//     waveHeight:null,                            //波浪的起伏高度
//     waveCount:null,                                    //波浪的段数
//     startX:null,                                     //波浪x轴的起始点
//     startY:null,                                      //波浪的填充高度
//     progress:null,
//     progressStep:null,
//     offsetY:null,
//     avgW:null,                          //每段波浪的平均长度
//     d:null,                                             //x坐标控制点
//     hd:null,
//     seedsNum:null,
//     imgs:new Image(),
//     c:document.getElementById("myCanvas"),
//     ctx:document.getElementById("myCanvas").getContext("2d"),

//     romance:function(seeds_num,imgPath,waveCount,waveHeight,defineStart,defineEnd){
//         animation_service.imgs.src=imgPath;
//         animation_service.imgs.onload = function(){
//             defineStart = defineStart?defineStart:50;
//             defineEnd = defineEnd?defineEnd:(defineStart/2);
//             var totalNumber = animation_service.imgs.height - defineStart;
//             animation_service.waveWidth = 930,                                    //波浪总长
//             animation_service.offset = 0,
//             animation_service.waveHeight = waveHeight?waveHeight:28,                             //波浪的起伏高度
//             animation_service.waveCount = waveCount?waveCount:3,                                      //波浪的段数
//             animation_service.startX = -350,                                       //波浪x轴的起始点
//             // startY = 500,
//             animation_service.seedsNum = seeds_num,
//             animation_service.offsetY = seeds_num,                                     //波浪的填充高度,区间500——100(500为0罐，100为集满)
//             // progress = 0,
//             // progressStep = 0,
//             animation_service.avgW = animation_service.waveWidth / animation_service.waveCount,                           //每段波浪的平均长度
//             animation_service.d = animation_service.avgW / 2,                                             //x坐标控制点
//             animation_service.hd = animation_service.avgW / 4; 
//             if(seeds_num >= 0){
//                 animation_service.seedsNum = animation_service.imgs.height-defineEnd - seeds_num*totalNumber;
//             } else {
//                 animation_service.seedsNum = totalNumber;
//             }                                   //x坐标控制点
//             animation_service.draw(animation_service.imgs);
//         }
//     },
//     draw:function(){
//         animation_service.offset -= 0.002 * animation_service.waveWidth;
//         animation_service.c.width = animation_service.imgs.width;
//         animation_service.c.height = animation_service.imgs.height;
//         if (-1*animation_service.offset >= animation_service.avgW){
//             animation_service.offset = 0;
//         }
//         animation_service.ctx.clearRect(0, 0, animation_service.c.width, animation_service.c.height);
//         animation_service.ctx.beginPath();
//         animation_service.offsetY = animation_service.seedsNum;
//         animation_service.ctx.moveTo(animation_service.startX - animation_service.offset, animation_service.offsetY);
//         for (var i = 0; i < 5; i++) {
//             var dx = i * animation_service.avgW;
//             var offsetX = parseFloat(dx) + parseFloat(animation_service.startX) - parseFloat(animation_service.offset);
//             var temp3 = parseFloat(offsetX) + parseFloat(animation_service.hd);
//             var temp4 = parseFloat(animation_service.offsetY) + parseFloat(animation_service.waveHeight);
//             var temp5 = parseFloat(offsetX) + parseFloat(animation_service.d);
//             animation_service.ctx.quadraticCurveTo(temp3, temp4, temp5, animation_service.offsetY);
//             var temp = offsetX + animation_service.hd  + animation_service.d;
//             var temp1 = animation_service.offsetY - animation_service.waveHeight;
//             var temp2 = offsetX + animation_service.avgW;
//             animation_service.ctx.quadraticCurveTo(temp, temp1, temp2, animation_service.offsetY);
//         }
//         animation_service.ctx.lineTo(animation_service.startX + animation_service.waveWidth, 0);
//         // animation_service.ctx.quadraticCurveTo(animation_service.c.width/2, 0.206 * animation_service.c.height, -50, animation_service.c.height * 0.1);
//         animation_service.ctx.lineTo(0,  0);
//         animation_service.ctx.fillStyle = 'rgba(238,226,223,0.95)';
//         animation_service.ctx.fill();
//         // animation_service.ctx.globalCompositeOperation = 'destination-atop';
//         // animation_service.ctx.drawImage(animation_service.imgs,0,0,animation_service.imgs.width,animation_service.imgs.height);
//         animation_service.c.style.width = '100%';
//         animation_service.c.style.height = '100%';
//         requestAnimationFrame(animation_service.draw);
//     }
// }
// animation_service.romance(10,"./images/bigjar2.png");




// wx.ready(function() {
//     wx.showOptionMenu();
//     wx.onMenuShareTimeline({
//         title: '我正在胖吴货栈免费抽奖赢大礼，快来试试手气吧！', // 分享标题
//         link: "http://192.168.199.140:3000/growing_gift/gift.html", // 分享链接
//         imgUrl: 'http://pub.youzhipai.cn/lucky_draw/img/share.png', // 分享图标
//         success: function() {
//             // 用户确认分享后执行的回调函数
//         },
//         cancel: function() {
//             // 用户取消分享后执行的回调函数
//         }
//     });

//     //分享给朋友
//     wx.onMenuShareAppMessage({
//         title: '我正在胖吴货栈免费抽奖赢大礼，快来试试手气吧！', // 分享标题
//         desc: '每日3次免费参与机会，点击立即参与抽奖', // 分享描述
//         link: 'http://192.168.199.140:3000/growing_gift/gift.html', // 分享链接
//         imgUrl: 'http://pub.youzhipai.cn/lucky_draw/img/share.png', // 分享图标
//         type: 'link', // 分享类型,music、video或link，不填默认为link
//         success: function() {
//             // 用户确认分享后执行的回调函数
//         },
//         cancel: function() {
//             // 用户取消分享后执行的回调函数
//         }
//     });
// })