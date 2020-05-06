const patternTitle = /<title>(.*?)<\/title>/i;
const patternDesc = /<meta[^<]*?name="description".*?content="(.*?)"[^<]*?>/i;
const patternNoJs = /<noscript>(.*?)<\/noscript>/i;
const tplMetaTimestamp = '<meta name="static:time" content="{}">';

let title = 'Welcome';
let description = 'Hello World';
let htmlRaw = '<html lang="en"><head><meta name="static:time" content="1588754280875"><meta charset="utf-8"><link rel="icon" href="./logo.png"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#000000"><meta name="description" content="宁波飞龙印铁容器有限公司成立于2000年，位于交通便利、商机无限的美丽港城宁波之东北方向，毗邻闻名世界的北仑港，到宁波栎社机场1小时车程，交通非常便利。在全体员工的共同努力下，公司于2001年8月通过ISO9001:2000质量管理体系认证，又于2003月10月通过ISO14001:2004环境管理体系认证。经过几年的不懈努力，公司现已拥有一整套完善的管理体制和先进的现代化印刷包装设备：日本富士452型全自动金属双色印刷生产线两条；英国确丽自动双色印铁生产线一条；英国确丽留空涂料自动生产线两条；R20电池铁壳生产线两条；9V电池铁壳生产线三条；铁皮裁切机；冲床等配套机器设备……公司现有固定资产8000多万元，职工200多人，其中各类专业工程技术人员50多位，厂房建筑面积20000多平方米。公司以一流的技术、一流的品质、一流的服务，在宁波开发区企业中出类拔萃，在江浙同行企业中位居前列。专业印刷各类马口铁制品(食品罐、饮料罐、电池铁壳、电煮锅外壳、保温瓶外壳、白板文具盒、油漆听、瓶盖等），提供马口铁外壁印刷、内壁涂料等业务。往来客户遍布全国各地，远涉欧美、东南亚各国。公司以“今天的质量、明天的效益”为口号，本着“客户第一、信誉至上”的宗旨，竭诚为广大客户服务。"><link rel="apple-touch-icon" href="./logo.png"><link rel="manifest" href="/manifest.json"><title>宁波飞龙印铁容器有限公司</title><link href="/static/css/main.082492a1.chunk.css" rel="stylesheet"></head><body><script src="/staticpage.js"></script><noscript>宁波飞龙印铁容器有限公司成立于2000年，位于交通便利、商机无限的美丽港城宁波之东北方向，毗邻闻名世界的北仑港，到宁波栎社机场1小时车程，交通非常便利。</noscript><div id="root"><div class="navTop"><nav class="navStyle"><div><img class="navImg" alt="" src="/logo.png"></div><div style="margin-left: 8px;"><div class="navTitle">宁波飞龙印铁容器有限公司</div><div class="navEnglish">Ningbo Feilong Tinplate Printing Vessel Co.,Ltd.</div></div><div class="navWeb"><div class="mobileSee" style="margin: 12px 0px; width: 100%; height: 1px; background: rgb(153, 153, 153); padding: 0px;"></div><div class="navLanguage"><img src="http://assets.amzport.com/f08e12a7-f381-4678-9af1-7ea00e476051" alt="" style="height: 12px; margin-right: 6px;"><span>中文</span><div class="navTabLanguage"></div></div></div><img src="./navTab.png" alt="" class="navIcon"></nav><div><div class="webSee"><div style="overflow: hidden; position: relative; line-height: 0; pointer-events: none;"><div class="swap" style="left: 0px; z-index: -1;"></div><div class="swapButton" style="pointer-events: all; display: none;"></div></div></div><div class="content"><div class="webSee aboutTitle"><img src="/titleLeft.png" alt="" style="height: 20px;"><div><span></span><span style="margin-left: 2px;"></span></div><img src="/titleRight.png" alt="" style="height: 20px;"></div><div style="display: flex; justify-content: center; align-items: center; margin: 22px 0px 49px;"><div class="pageBtn">首页</div><div class="pageBtn">上一页</div><div style="color: rgb(201, 0, 0);">1</div>/1<div class="pageBtn">上一页</div><div class="pageBtn">上一页</div></div></div></div><div id="contactBottom" class="bottomPaper"><div class="bottomContent"><div class="bottomBlock"><div class="bottomFont"></div></div><div class="bottomBlock"><div class="bottomTitle"></div><div class="bottomHtml"></div></div><div><div class="bottomTitle"></div><div class="bottomHtml"></div></div></div><div style="background: rgb(255, 255, 255); height: 1px; width: 100%; margin-bottom: 30px; opacity: 0.7;"></div><div style="font-size: 12px; opacity: 0.7;"></div></div></div></div><script>!function(e){function r(r){for(var n,p,l=r[0],a=r[1],f=r[2],c=0,s=[];c<l.length;c++)p=l[c],Object.prototype.hasOwnProperty.call(o,p)&&o[p]&&s.push(o[p][0]),o[p]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(i&&i(r);s.length;)s.shift()();return u.push.apply(u,f||[]),t()}function t(){for(var e,r=0;r<u.length;r++){for(var t=u[r],n=!0,l=1;l<t.length;l++){var a=t[l];0!==o[a]&&(n=!1)}n&&(u.splice(r--,1),e=p(p.s=t[0]))}return e}var n={},o={1:0},u=[];function p(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.m=e,p.c=n,p.d=function(e,r,t){p.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(e,r){if(1&r&&(e=p(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(p.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)p.d(t,n,function(r){return e[r]}.bind(null,n));return t},p.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(r,"a",r),r},p.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},p.p="/";var l=this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[],a=l.push.bind(l);l.push=r,l=l.slice();for(var f=0;f<l.length;f++)r(l[f]);var i=a;t()}([])</script><script src="/static/js/2.8d76d2d4.chunk.js"></script><script src="/static/js/main.311659b3.chunk.js"></script></body></html>';

const headPos = htmlRaw.indexOf('<head>') + 6;
htmlRaw = htmlRaw.slice(0, headPos) +
  tplMetaTimestamp.replace('{}', '' + new Date().getTime()) +
  htmlRaw.slice(headPos);
if (description) {
  if (htmlRaw.search(patternDesc) > 0) {
    console.log('??what1');
    htmlRaw = htmlRaw.replace(patternDesc, '<meta name="description" content="' + description + '">');
  } else {
    console.log('??what2');
    htmlRaw = htmlRaw.slice(0, headPos) + '<meta name="description" content="' + description + '">' + htmlRaw.slice(headPos);
  }
  if (htmlRaw.search(patternNoJs) > 0) {
    htmlRaw = htmlRaw.replace(patternNoJs, '<noscript>' + description + '</noscript>');
  }
}
if (title) {
  if (htmlRaw.search(patternTitle) > 0) {
    htmlRaw = htmlRaw.replace(patternTitle, '<title>' + title + '</title>');
  } else {
    htmlRaw = htmlRaw.slice(0, headPos) + '<title>' + title + '</title>' + htmlRaw.slice(headPos);
  }
}

console.log(htmlRaw);
