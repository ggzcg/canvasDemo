
var  apiHost = "http://192.168.1.6:3333"; 

var apiUrl = {
    Lists: apiHost+"/userFragment/historyList",
    products: apiHost+'/userFragment/getProductFragmentList'
}

var seedInfo = {
    nickname: "",
    youId: "",
    openId: ""
}
function init2(){
    if(is_weixin_browse()) {
        if(localStorage.seedInfo) {
            if(typeof localStorage.seedInfo == "string") {
                seedInfo = JSON.parse(localStorage.seedInfo);
            }  
        } else {
            nickname = GetQueryString("nickname").replace(/-/g, '+').replace(/_/g, '/');
            seedInfo.nickname = decodeURIComponent(escape(window.atob(nickname)));
            seedInfo.youId = window.atob(GetQueryString("youId"));
            seedInfo.openId = window.atob(GetQueryString("openId"));
            localStorage.seedInfo = JSON.stringify(seedInfo);
        }   
    } else {
        try{
            var appUserJsonStr = CommonBrowse.getUserInfo();
        } catch(err) {

        }
         if(!appUserJsonStr || appUserJsonStr == '') {
            CommonBrowse.loginUser();
            return;
        }
        var appUserJson = $.parseJSON(appUserJsonStr);
        if(appUserJson.nickname) {
            seedInfo.nickname = appUserJson.nickname;
        } else {
            seedInfo.nickname = appUserJson.nickName;
        }
        seedInfo.youId = appUserJson.proId;
        seedInfo.openId = appUserJson.proId;
    }
    // commongetId()
    Lists();
}init2();

var type1 = [];
var type2 = [];
var ctrNum = 10;
var ctrNum2 = 0;
var totalNum = 0;
var nonebool = true;
function Lists(){
    $.ajax({
        type: "get",
        url: apiUrl.Lists,
        data: {
            youId: seedInfo.youId
        },
        success: function (result){
            if (typeof result == "string") { result = JSON.parse(result)};
            console.log(result.data.data.length);
            if(result.data.data.length > 0){
                for(var i = 0; i < result.data.data.length; i++){
                    var data = {
                        exchageTime: result.data.data[i].exchageTime,
                        number: result.data.data[i].number,
                        unit:  result.data.data[i].unit || "",
                        remark: result.data.data[i].remark,
                        type: result.data.data[i].type
                    }
                    type1.push(data)
                }
                type1 = type1.reverse();
                createEle(type1)
            } else{
                $('.showNone').css({display: 'block'})
                $('.more').css({display: "none"})
            }
            totalNum = result.data.data.length
        },
        error: function(){
            alert('服务器正忙Lists.....');
            // console.log('服务器正忙');
        }
    })
}

function createEle(type1){
    if(type1.length > 0){
        for(var i = ctrNum2; i < ctrNum;i++){
            if(type1[i].unit == "只"){
                type1[i].unit = type1[i].unit + "清远鸡"
            }else if(type1[i].unit == "罐") {
                type1[i].unit = type1[i].unit + "二掌柜瓜子"
            }
            if(type1[i].type == 1){
                $('.list').append('<li><h3>福袋获取</h3><p class="time">'+ formatDate(type1[i].exchageTime,"M月D日 H:II:ss") +'</p><strong>'+ type1[i].number/100 + type1[i].unit+'</strong></li>')
            } else if(type1[i].type == 2) {
                $('.list').append('<li><h3>领取成长礼物</h3><p class="time">'+ formatDate(type1[i].exchageTime,"M月D日 H:II:ss") +'</p><strong>'+ type1[i].number/100 + type1[i].unit+'</strong></li>')
            }
        }
    }
    if((type1.length)>=10){
        $('.more').css({
            display: 'block'
        })
    } else {
        // $('.showNone').fadeIn(100).fadeOut(1500);
    }
}
$('.more').off().on('click',moreclick)
function moreclick(){
    if(ctrNum <= totalNum){
        ctrNum2 = ctrNum
        ctrNum = ctrNum + 10;
        createEle(type1)
    } else {
        $('.more').html('没有更多了')
        return
    }
}

//滑动  
function getScrollTop()   
{  
  var scrollTop = 0;  
  if (document.documentElement && document.documentElement.scrollTop) {  
      scrollTop = document.documentElement.scrollTop;  
   }else if (document.body) {  
    scrollTop = document.body.scrollTop;  
   }  
    return scrollTop;  
}  
  
//获取当前可视范围的高度  
function getClientHeight()  
{  
  var clientHeight = 0;  
  if (document.body.clientHeight && document.documentElement.clientHeight) {  
     clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);  
  }else {  
     clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);  
  }  
     return clientHeight;  
}  
//获取文档完整的高度  
function getScrollHeight()   
{  
     return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);  
}   
  
//绑定事件  
window.onscroll = function ()   
{  
  if (getScrollTop() + getClientHeight() >= getScrollHeight()) {  
    moreclick();
  }  
   
} 


//格式化时间
function formatDate(date,formatStr){
    date = (/^\d+$/.test(date) && new Date(date)) || date;
    var addZero = function(v,size){
        for(var i=0,len=size-(v+"").length;i<len;i++){
            v="0"+v;
        };
        return v+"";
    }
    //格式化时间
    var arrWeek=['日','一','二','三','四','五','六'],
        str=formatStr
            .replace(/yyyy|YYYY/,date.getFullYear())
            .replace(/yy|YY/,addZero(date.getFullYear() % 100,2)   )
            .replace(/mm|MM/,addZero(date.getMonth()+1,2))
            .replace(/m|M/g,date.getMonth()+1)
            .replace(/dd|DD/,addZero(date.getDate(),2) )
            .replace(/d|D/g,date.getDate())
            .replace(/hh|HH/,addZero(date.getHours(),2))
            .replace(/h|H/g,date.getHours())
            .replace(/ii|II/,addZero(date.getMinutes(),2))
            .replace(/i|I/g,date.getMinutes())
            .replace(/ss|SS/,addZero(date.getSeconds(),2))
            .replace(/s|S/g,date.getSeconds())
            .replace(/w/g,date.getDay())
            .replace(/W/g,arrWeek[date.getDay()]); 
    return str; 
}


//屏蔽复制链接和分享
$(function(){
    function onBridgeReady() { 
        WeixinJSBridge.call('hideOptionMenu'); 
    } 
    if (typeof WeixinJSBridge == "undefined") { 
        if (document.addEventListener) { 
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false); 
        } else if (document.attachEvent) { 
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady); 
        } 
    } else { 
        onBridgeReady(); 
    }
});

// if(is_weixin_browse()){
//     window.addEventListener("popstate", function(e) {
//         window.location.href = window.localStorage.seedInfo.winhref;
//     }, false);
// }