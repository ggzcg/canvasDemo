

var canvasL ;         
var imgBg ;                     //加载要分割的图片
var ctx ;
var num ;                       //碎片数量
var n ;                         //n*n的分割
var number;
var fillArr;                    //拼图数组（按数组顺序）
var j ;
var m ;
var seeds_num  ;
var  apiHost = "http://192.168.1.6:3333";   
var apiUrl = {
    seedsNumbers: apiHost+"/userFragment/list",
    products: apiHost+'/userFragment/getProductFragmentList',
    exchange: apiHost+'/userFragment/exchange'
}
// var apiUrl = {
//     seedsNumbers: "/userFragment/list",
//     products: '/userFragment/getProductFragmentList',
//     exchange: '/userFragment/exchange'
// }

var seedInfo = {
    nickname: "",
    youId: "",
    openId: "",
    itemId: "76",
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
    //     try{
    //         var appUserJsonStr = CommonBrowse.getUserInfo();
    //     } catch(err) {

    //     }
    //      if(!appUserJsonStr || appUserJsonStr == '') {
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
    //         var chik = result.data.data[0].itemId
    //         seedInfo.itemId = chik;
    //         chikenPieces()
    //     },
    //     error: function(){
    //         alert('服务器正忙products.....');
    //     }
    // })
    // chikenPieces()
}init2();
// chikenPieces()
init(80)


function init(showNum){
    canvasL = document.getElementById('imageL');          
    imgBg = new Image();
    imgBg.src = "images/default_red_paper.jpg"
    ctx = canvasL.getContext('2d');
    seeds_num = showNum;
    num = showNum;
    n = 10;                                                   
    j = 0;
    m = 0;
    fillArr = [];
    sortNum(m);
    imgBg.onload = function(){
        canvasL.width = imgBg.width;
        canvasL.height = imgBg.height;
        ctx.drawImage(imgBg, 0, 0, canvasL.width, canvasL.height);
        if(Loadfunc()){
            mianconImg(fillArr)
        }
    } 
    function Loadfunc(){
        canvasL.style.width = '100%';
        canvasL.style.height = '100%';
        return true
    }
};


//拼图排序算法
function sortNum(m){
    for(var i = 1; i <=  num; i++){
        if((m+1)*m/2 < i && i <= (m+1)*(m+2)/2){
            number = n*n- m*n + j*(n-1)
            fillArr.push(number)
            j = j + 1;
            if(j == (m+1)){
                m = j;
                j = 0
                if(m < n){
                    sortNum(m)
                } else {
                    m = n -1
                    sortNum2(m)
                }
                return
            }
        }
    }
}

function sortNum2(m){
    for(var i = 1; i <=  num; i++){
        if(n*n-(m+1)*m/2 < i && i <= n*n-(m-1)*m/2){
            number = n*n- (n-1)*n + j*(n-1) - (n-m)
            fillArr.push(number)
            j = j + 1;
            if(j == m){
                m = j - 1;
                j = 0
                if(m <= n){
                    sortNum2(m)
                }
                return
            }
        }
    }
}

//随机函数
function randoms(){
    var temp = [];
    fillArr = [];
    var len = 0;
    var num;
    while(len < 50){
        num = Math.round( Math.random() * 90);
        if(!temp[num]) {
            temp[num] = 1;
            fillArr.push(num);
            len++;
        }
    }
    return fillArr
}


function mianconImg(fillArr){       //颜色
    var numberX = numberY = 10;
    var locationArr = [];
    var imgArr = [];
    var imgArr2 = [];

    function clickCropImage() {
        //  获取画布大小，判断画布大小
        var canvasH = canvasL.height;
        var canvasW = canvasL.width;
        var splaceX = 0;
        var splaceY = 0;
        //  将图片等分
        for (var x = 0; x < numberX; x++) {
            for (var y = 0; y < numberY; y++) {
                var location = {
                    'x' : x * canvasW / numberX -splaceX,
                    'y' : y * canvasH / numberY -splaceY,
                    'Dx' : x * canvasW / numberX + canvasW / numberX,
                    'Dy' : y * canvasH / numberY + canvasH / numberY,
                    'locationOption' : (x + 1).toString() + (y + 1).toString(),
                };
                locationArr.push(location);
                cropImage(ctx, (x * canvasW / numberX) -splaceX, (y * canvasH / numberY)-splaceY, canvasW / numberX, canvasH / numberY);
                cropImage2(ctx, (x * canvasW / numberX) -splaceX, (y * canvasH / numberY)-splaceY, canvasW / numberX, canvasH / numberY);
            };
        };
    }clickCropImage();
    //分解图片
    function cropImage(ctx, x, y, width, height) {
        try{
            var targetctxImageData = ctx.getImageData(x, y, width, height);
        }catch(e){
            alert(e + "一");
        }
        //创建有颜色的数组存储
        var imgobj = {
            img: targetctxImageData,
            x: x,
            y: y,
            width: width,
            height: height
        }
        imgArr.push(imgobj);
    }
    function cropImage2(ctx, x, y, width, height){
        try{
            var targetctxImageData = ctx.getImageData(x, y, width, height);
        }catch(e){
            alert(e + "二");
        } 
        //创建黑白（操作像素）
        for (var i=0;i<targetctxImageData.data.length;i+=4)
        {
            var black = (targetctxImageData.data[i] + targetctxImageData.data[i+1] + targetctxImageData.data[i+2])/3;
            targetctxImageData.data[i]= black;
            targetctxImageData.data[i+1]= black;
            targetctxImageData.data[i+2]= black;
        }
        var imgobj2 = {
            img: targetctxImageData,
            x: x,
            y: y,
            width: width,
            height: height
        }
        imgArr2.push(imgobj2);
    }

    //组合无颜色图片
    function contactPic1(imgArr2){
        var imgArr = imgArr2;
        for(var i= 0; i < imgArr.length; i++){
                for(var i= 0; i < imgArr.length; i++){
                    new CombinationImg(imgArr[i].img, imgArr[i].x, imgArr[i].y, imgArr[i].width, imgArr[i].height, false);
                }
        }
    };
    contactPic1(imgArr2); 
    // contactPic2(imgArr,fillArr);
    
    //组合有颜色图片    
    var adds = 0;
    var imgArr = imgArr;
    var fillArr = fillArr;
    var timers;
    contactPic3()
    function contactPic3(){
        if(fillArr == "")return
        var f = fillArr[adds]-1;
        new CombinationImg(imgArr[f].img, imgArr[f].x, imgArr[f].y, imgArr[f].width, imgArr[f].height, true)
        adds = adds + 1;
        if(adds < fillArr.length){
            requestAnimationFrame(contactPic3)
            // contactPic3();
        }
    }

    function CombinationImg(img, x, y, width, height,bool) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasComimg = canvasL;
        this.canvasComimgCtx = this.canvasComimg.getContext('2d');
        // this.canvasComimg.width = this.img.width * 6;
        // this.canvasComimg.height = this.img.height * 6;
        this.canvasComimgCtx.save();
        // this.canvasComimgCtx.globalAlpha = 1;
        // this.canvasComimgCtx.rect(0, 0, this.width * numberX, this.height * numberY);
        this.canvasComimgCtx.fillStyle = '#d3d3d3';
        this.canvasComimgCtx.fillRect(this.x, this.y, this.width, this.height);
        this.canvasComimgCtx.globalCompositeOperation = 'source-over';
        this.canvasComimgCtx.putImageData(this.img, (this.x + 2), (this.y + 2),0,0,this.width-2,this.height-2);
        // this.canvasComimgCtx.globalAlpha = 0;
        this.canvasComimgCtx.restore();
    }
}



function chikenPieces(){
    $.ajax({
        type: "get",
        url: apiUrl.seedsNumbers,
        data: {
            youId: seedInfo.youId,
            itemId: 76
        },
        success: function (result){
            if (typeof result == "string") { result = JSON.parse(result)};
            var seedsNum;
            var seeds_num;
            if(result.data.data[0]){
                var seedsNum = (result.data.data[0].fragmentNum)/100;
                $('.baseinfo .left h2 span').html(seedsNum);
                createEle(parseInt(seedsNum.toString().split('.')[0]));                 //创建可领取罐子
                seeds_num = (result.data.data[0].fragmentNum)%100;
                if(seeds_num >= 0){
                    init(seeds_num);
                } else {
                    seeds_num = 0;
                    init(seeds_num);
                }
            } else {
                $('.baseinfo .left h2 span').html(0);
                seeds_num = 0;
                init(seeds_num);
            }
            
        },
        error: function(){
            alert('服务器正忙.....');
            // console.log('服务器正忙');
        }
    })
}
function createEle(showseed){
    for(var i = 0; i < showseed; i++){
        $('.List').append('<li class="active"><img src="images/chicken.png"></li>')
    }
    $('.show .List .active').off().on('click',function(event){
        event.preventDefault();
        $('.getwin2').fadeIn(300);
        $('.mask_grow').fadeIn(300);
        // seedsNumber();
    })
}

function getseedsEvent(){
    exchange();
}

function exchange(){
    $.ajax({
        type: "post",
        url: apiUrl.exchange,
        data: {
            youId: seedInfo.youId,
            openId: seedInfo.openId,
            itemId: seedInfo.itemId,
            source: seedInfo.source
        },
        success: function (result){
            if (typeof result == "string") { result = JSON.parse(result)};
            if(result.status == "ok"){
                $('.show .List li:last').remove();
                var seedsnum = parseFloat($('.baseinfo .left h2 span').html());
                if(seedsnum > 0){
                    $('.baseinfo .left h2 span').html((seedsnum - 1).toFixed(2))
                }
                $('.getwin2').css({display:'none'});
                $('.getwin1').fadeIn(150);
                getbools = true
            } else {
                alert("领取失败")
                return
            }
        },
        error: function(){
            alert('服务器正忙exchange.....');
            // console.log('服务器正忙');
        }
    })
}


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