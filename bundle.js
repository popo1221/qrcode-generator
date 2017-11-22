/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qartjs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_qartjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode__);




$(document).ready(function() {
  var value = 'https://github.com/kciter/qart.js';
  var filter = 'threshold';
  var defaultImage = $('#default-image').attr('src');
  var imagePath = defaultImage; // './example.png';
  var version = 10;
  var imageSize = 75 + (version * 12) - 24;
  var bg = "#C2C";
  var size = "175";
  var fillType = 'scale_to_fit';
  var self = this;
  $('#image img').width(imageSize);
  function makeQR() {
      // console.log('Current version:', version)
      __WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode__["QRCode"].stringToBytes = __WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode__["QRCode"].stringToBytesFuncs['UTF-8']
      var qr = Object(__WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode__["QRCode"])(version, 'H');
      qr.addData(value);
      try {
        qr.make();
      } catch (err) {
        console.log('Version is low:', version)
        console.log('Error:', err)
      }
      document.getElementById('qr').innerHTML = qr.createImgTag(3);
  }
  function makeQArt() {
      new __WEBPACK_IMPORTED_MODULE_0_qartjs___default.a({
          value: value,
          imagePath: imagePath,
          filter: filter,
          version: version,
          background: bg,
          size: size,
          fillType: fillType
      }).make(document.getElementById('combine'));
  }
  function getBase64(file, callback) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
          callback(reader.result);
      };
  }
  $('#value').keyup(function() {
      value = $(this).val();
      makeQR();
      makeQArt();
  });
  $('#bg').keyup(function() {
      bg = $(this).val();
      makeQArt();
  });
  $('#size').keyup(function() {
      size = $(this).val();
      makeQArt();
  });
  $('#fillType').bind('change',function() {
      fillType = $(this).val();
      makeQArt();
  });
  $('#version').bind('keyup change click', function() {
      console.log($('#version').val());
      version = $('#version').val();
      imageSize = 75 + (version * 12) - 24;
      $('#image img').width(imageSize);
      makeQR();
      makeQArt();
  });
  $('#file').change(function() {
      getBase64(this.files[0], function(base64Img) {
          var regex = /data:(.*);base64,(.*)/gm;
          var parts = regex.exec(base64Img);
          imagePath = parts[0];
          $('#image img').attr('src', imagePath);
          makeQArt();
      });
  });
  $('input[type=radio]').click(function() {
      filter = $(this).val();
      makeQArt();
  });
  makeQR();
  makeQArt();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!function(n,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.qart=e():n.qart=e()}(this,function(){return function(n){function e(r){if(t[r])return t[r].exports;var i=t[r]={exports:{},id:r,loaded:!1};return n[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var t={};return e.m=n,e.c=t,e.p="../dist/",e(0)}([function(n,e,t){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(e,"__esModule",{value:!0});var i=t(1),o=r(i),u=t(2),a=r(u),l=t(21),f=t(75),m=r(f),p=function(){function n(e){if((0,o.default)(this,n),"undefined"==typeof e)throw new TypeError("QArt required `options`.");if("undefined"==typeof e.value)throw new TypeError("QArt required `value` option.");if("undefined"==typeof e.imagePath)throw new TypeError("QArt required `imagePath` option.");this.size="undefined"==typeof e.size?n.DEFAULTS.size:e.size,this.filter="undefined"==typeof e.filter?n.DEFAULTS.filter:e.filter,this.value=e.value,this.imagePath=e.imagePath,this.version="undefined"==typeof e.version?n.DEFAULTS.version:e.version,this.fillType="undefined"==typeof e.fillType?n.DEFAULTS.fillType:e.fillType,this.background=e.background}return(0,a.default)(n,[{key:"findWorkingVersion",value:function(n){var e=n;l.QRCode.stringToBytes=l.QRCode.stringToBytesFuncs["UTF-8"];for(var t=(0,l.QRCode)(n,"H"),r=n;r<=40;r++){try{t=(0,l.QRCode)(e,"H"),t.addData(this.value),t.make()}catch(n){if(console.log("Error: ",n),"CodeLengthOverflow"===n.name){e+=1,console.log("Can't create QRCode need up version, current version",e);continue}throw n}return e}}},{key:"make",value:function(n){var e=this.findWorkingVersion(this.version),t=(0,l.QRCode)(e,"H");t.addData(this.value),t.make(),l.QRCode.stringToBytes=l.QRCode.stringToBytesFuncs["UTF-8"];var r=t.createImgObject(3),i=75+12*e,o=12,u=o*this.size/i,a=this;r.onload=function(){var t=new Image;t.src=a.imagePath;var f=m.default.createCanvas(i-2*o,t,a.fillType);t.src=f.toDataURL();var p=m.default.createCanvas(i,r),c=m.default.createCanvas(i,r);if("undefined"!=typeof a.background){var g=m.default.createCanvas(a.size,new Image),Z=g.getContext("2d");Z.fillStyle=a.background,Z.fillRect(0,0,g.width,g.height)}t.onload=function(){t.width<t.height?(t.height=(i-2*o)*(1*t.height/t.width),t.width=i-2*o):(t.width=(i-2*o)*(1*t.width/t.height),t.height=i-2*o);var r=document.createElement("canvas");r.width=i,r.height=i;for(var f=r.getContext("2d").getImageData(0,0,i,i),Z=f.data,h=p.getContext("2d").getImageData(0,0,i,i),d=h.data,s=0;s<Z.length;s+=4){var j=Math.floor(s/4)%i,W=Math.floor(Math.floor(s/4)/i);if(j<o||W<o||j>=i-o||W>=i-o)d[s+3]=0;else if((j%3!==1||W%3!==1)&&!(j<36&&(W<36||W>=i-36)||j>=i-36&&W<36)){if("threshold"===a.filter){var O=m.default.threshold(Z[s],Z[s+1],Z[s+2],127);d[s]=O,d[s+1]=O,d[s+2]=O}else"color"===a.filter&&(d[s]=Z[s],d[s+1]=Z[s+1],d[s+2]=Z[s+2]);d[s+3]=Z[s+3]}}p.getContext("2d").putImageData(h,0,0);for(var k=l.QRUtil.getPatternPosition(e),s=0;s<k.length;s+=1)for(var Y=0;Y<k.length;Y+=1){var j=k[s],W=k[Y];if(!(6===j&&50===W||6===W&&50===j||6===j&&6===W)){var J=3*(j-2)+12,y=3*(W-2)+12,b=3*(j+3)+12-J,V=3*(W+3)+12-y,v=c.getContext("2d").getImageData(J,y,b,V);p.getContext("2d").putImageData(v,J,y)}}var X=m.default.createCanvas(a.size,new Image);"undefined"!=typeof a.background&&X.getContext("2d").drawImage(g,u,u,a.size-2*u,a.size-2*u),X.getContext("2d").drawImage(t,u,u,a.size-2*u,a.size-2*u),X.getContext("2d").drawImage(p,0,0,a.size,a.size),n.innerHTML="",n.appendChild(X)}}}}],[{key:"DEFAULTS",get:function(){return{size:195,value:"",filter:"threshold",version:10,fillType:"scale_to_fit"}}}]),n}();window.QArt=p,e.default=window.QArt},function(n,e){"use strict";e.__esModule=!0,e.default=function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}},function(n,e,t){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}e.__esModule=!0;var i=t(3),o=r(i);e.default=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}()},function(n,e,t){n.exports={default:t(4),__esModule:!0}},function(n,e,t){t(5);var r=t(8).Object;n.exports=function(n,e,t){return r.defineProperty(n,e,t)}},function(n,e,t){var r=t(6);r(r.S+r.F*!t(16),"Object",{defineProperty:t(12).f})},function(n,e,t){var r=t(7),i=t(8),o=t(9),u=t(11),a="prototype",l=function(n,e,t){var f,m,p,c=n&l.F,g=n&l.G,Z=n&l.S,h=n&l.P,d=n&l.B,s=n&l.W,j=g?i:i[e]||(i[e]={}),W=j[a],O=g?r:Z?r[e]:(r[e]||{})[a];g&&(t=e);for(f in t)m=!c&&O&&void 0!==O[f],m&&f in j||(p=m?O[f]:t[f],j[f]=g&&"function"!=typeof O[f]?t[f]:d&&m?o(p,r):s&&O[f]==p?function(n){var e=function(e,t,r){if(this instanceof n){switch(arguments.length){case 0:return new n;case 1:return new n(e);case 2:return new n(e,t)}return new n(e,t,r)}return n.apply(this,arguments)};return e[a]=n[a],e}(p):h&&"function"==typeof p?o(Function.call,p):p,h&&((j.virtual||(j.virtual={}))[f]=p,n&l.R&&W&&!W[f]&&u(W,f,p)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,n.exports=l},function(n,e){var t=n.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=t)},function(n,e){var t=n.exports={version:"2.4.0"};"number"==typeof __e&&(__e=t)},function(n,e,t){var r=t(10);n.exports=function(n,e,t){if(r(n),void 0===e)return n;switch(t){case 1:return function(t){return n.call(e,t)};case 2:return function(t,r){return n.call(e,t,r)};case 3:return function(t,r,i){return n.call(e,t,r,i)}}return function(){return n.apply(e,arguments)}}},function(n,e){n.exports=function(n){if("function"!=typeof n)throw TypeError(n+" is not a function!");return n}},function(n,e,t){var r=t(12),i=t(20);n.exports=t(16)?function(n,e,t){return r.f(n,e,i(1,t))}:function(n,e,t){return n[e]=t,n}},function(n,e,t){var r=t(13),i=t(15),o=t(19),u=Object.defineProperty;e.f=t(16)?Object.defineProperty:function(n,e,t){if(r(n),e=o(e,!0),r(t),i)try{return u(n,e,t)}catch(n){}if("get"in t||"set"in t)throw TypeError("Accessors not supported!");return"value"in t&&(n[e]=t.value),n}},function(n,e,t){var r=t(14);n.exports=function(n){if(!r(n))throw TypeError(n+" is not an object!");return n}},function(n,e){n.exports=function(n){return"object"==typeof n?null!==n:"function"==typeof n}},function(n,e,t){n.exports=!t(16)&&!t(17)(function(){return 7!=Object.defineProperty(t(18)("div"),"a",{get:function(){return 7}}).a})},function(n,e,t){n.exports=!t(17)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(n,e){n.exports=function(n){try{return!!n()}catch(n){return!0}}},function(n,e,t){var r=t(14),i=t(7).document,o=r(i)&&r(i.createElement);n.exports=function(n){return o?i.createElement(n):{}}},function(n,e,t){var r=t(14);n.exports=function(n,e){if(!r(n))return n;var t,i;if(e&&"function"==typeof(t=n.toString)&&!r(i=t.call(n)))return i;if("function"==typeof(t=n.valueOf)&&!r(i=t.call(n)))return i;if(!e&&"function"==typeof(t=n.toString)&&!r(i=t.call(n)))return i;throw TypeError("Can't convert object to primitive value")}},function(n,e){n.exports=function(n,e){return{enumerable:!(1&n),configurable:!(2&n),writable:!(4&n),value:e}}},function(n,e,t){function r(n){return n&&n.__esModule?n:{default:n}}var i,o,u,a=t(22),l=(r(a),function(){function n(e,t){if("undefined"==typeof e.length)throw new Error(e.length+"/"+t);var r=function(){for(var n=0;n<e.length&&0==e[n];)n+=1;for(var r=new Array(e.length-n+t),i=0;i<e.length-n;i+=1)r[i]=e[i+n];return r}(),i={};return i.getAt=function(n){return r[n]},i.getLength=function(){return r.length},i.multiply=function(e){for(var t=new Array(i.getLength()+e.getLength()-1),r=0;r<i.getLength();r+=1)for(var o=0;o<e.getLength();o+=1)t[r+o]^=a.gexp(a.glog(i.getAt(r))+a.glog(e.getAt(o)));return n(t,0)},i.mod=function(e){if(i.getLength()-e.getLength()<0)return i;for(var t=a.glog(i.getAt(0))-a.glog(e.getAt(0)),r=new Array(i.getLength()),o=0;o<i.getLength();o+=1)r[o]=i.getAt(o);for(var o=0;o<e.getLength();o+=1)r[o]^=a.gexp(a.glog(e.getAt(o))+t);return n(r,0).mod(e)},i}var e=function(e,r){function o(n){this.message=n,this.name="CodeLengthOverflow"}var a=236,Z=17,h=e,d=i[r],s=null,W=0,O=null,k=new Array,Y={},J=function(n,e){W=4*h+17,s=function(n){for(var e=new Array(n),t=0;t<n;t+=1){e[t]=new Array(n);for(var r=0;r<n;r+=1)e[t][r]=null}return e}(W),y(0,0),y(W-7,0),y(0,W-7),v(),V(),A(n,e),h>=7&&X(n),null==O&&(O=C(h,d,k)),I(O,e)},y=function(n,e){for(var t=-1;t<=7;t+=1)if(!(n+t<=-1||W<=n+t))for(var r=-1;r<=7;r+=1)e+r<=-1||W<=e+r||(t>=0&&t<=6&&(0==r||6==r)||r>=0&&r<=6&&(0==t||6==t)||t>=2&&t<=4&&r>=2&&r<=4?s[n+t][e+r]=!0:s[n+t][e+r]=!1)},b=function(){for(var n=0,e=0,t=0;t<8;t+=1){J(!0,t);var r=u.getLostPoint(Y);(0==t||n>r)&&(n=r,e=t)}return e},V=function(){for(var n=8;n<W-8;n+=1)null==s[n][6]&&(s[n][6]=n%2==0);for(var e=8;e<W-8;e+=1)null==s[6][e]&&(s[6][e]=e%2==0)},v=function(){for(var n=u.getPatternPosition(h),e=0;e<n.length;e+=1)for(var t=0;t<n.length;t+=1){var r=n[e],i=n[t];if(null==s[r][i])for(var o=-2;o<=2;o+=1)for(var a=-2;a<=2;a+=1)o==-2||2==o||a==-2||2==a||0==o&&0==a?s[r+o][i+a]=!0:s[r+o][i+a]=!1}},X=function(n){for(var e=u.getBCHTypeNumber(h),t=0;t<18;t+=1){var r=!n&&1==(e>>t&1);s[Math.floor(t/3)][t%3+W-8-3]=r}for(var t=0;t<18;t+=1){var r=!n&&1==(e>>t&1);s[t%3+W-8-3][Math.floor(t/3)]=r}},A=function(n,e){for(var t=d<<3|e,r=u.getBCHTypeInfo(t),i=0;i<15;i+=1){var o=!n&&1==(r>>i&1);i<6?s[i][8]=o:i<8?s[i+1][8]=o:s[W-15+i][8]=o}for(var i=0;i<15;i+=1){var o=!n&&1==(r>>i&1);i<8?s[8][W-i-1]=o:i<9?s[8][15-i-1+1]=o:s[8][15-i-1]=o}s[W-8][8]=!n},I=function(n,e){for(var t=-1,r=W-1,i=7,o=0,a=u.getMaskFunction(e),l=W-1;l>0;l-=2)for(6==l&&(l-=1);;){for(var f=0;f<2;f+=1)if(null==s[r][l-f]){var m=!1;o<n.length&&(m=1==(n[o]>>>i&1));var p=a(r,l-f);p&&(m=!m),s[r][l-f]=m,i-=1,i==-1&&(o+=1,i=7)}if(r+=t,r<0||W<=r){r-=t,t=-t;break}}},T=function(e,t){for(var r=0,i=0,o=0,a=new Array(t.length),l=new Array(t.length),f=0;f<t.length;f+=1){var m=t[f].dataCount,p=t[f].totalCount-m;i=Math.max(i,m),o=Math.max(o,p),a[f]=new Array(m);for(var c=0;c<a[f].length;c+=1)a[f][c]=255&e.getBuffer()[c+r];r+=m;var g=u.getErrorCorrectPolynomial(p),Z=n(a[f],g.getLength()-1),h=Z.mod(g);l[f]=new Array(g.getLength()-1);for(var c=0;c<l[f].length;c+=1){var d=c+h.getLength()-l[f].length;l[f][c]=d>=0?h.getAt(d):0}}for(var s=0,c=0;c<t.length;c+=1)s+=t[c].totalCount;for(var j=new Array(s),W=0,c=0;c<i;c+=1)for(var f=0;f<t.length;f+=1)c<a[f].length&&(j[W]=a[f][c],W+=1);for(var c=0;c<o;c+=1)for(var f=0;f<t.length;f+=1)c<l[f].length&&(j[W]=l[f][c],W+=1);return j},C=function(n,e,t){for(var r=l.getRSBlocks(n,e),i=f(),m=0;m<t.length;m+=1){var p=t[m];i.put(p.getMode(),4),i.put(p.getLength(),u.getLengthInBits(p.getMode(),n)),p.write(i)}for(var c=0,m=0;m<r.length;m+=1)c+=r[m].dataCount;if(i.getLengthInBits()>8*c)throw new o("code length overflow. ("+i.getLengthInBits()+">"+8*c+")");for(i.getLengthInBits()+4<=8*c&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;;){if(i.getLengthInBits()>=8*c)break;if(i.put(a,8),i.getLengthInBits()>=8*c)break;i.put(Z,8)}return T(i,r)};return Y.addData=function(n,e){e=e||"Byte";var t=null;switch(e){case"Numeric":t=m(n);break;case"Alphanumeric":t=p(n);break;case"Byte":t=c(n);break;case"Kanji":t=g(n);break;default:throw"mode:"+e}k.push(t),O=null},Y.isDark=function(n,e){if(n<0||W<=n||e<0||W<=e)throw new Error(n+","+e);return s[n][e]},Y.getModuleCount=function(){return W},Y.make=function(){J(!1,b())},Y.createTableTag=function(n,e){n=n||2,e="undefined"==typeof e?4*n:e;var t="";t+='<table style="',t+=" border-width: 0px; border-style: none;",t+=" border-collapse: collapse;",t+=" padding: 0px; margin: "+e+"px;",t+='">',t+="<tbody>";for(var r=0;r<Y.getModuleCount();r+=1){t+="<tr>";for(var i=0;i<Y.getModuleCount();i+=1)t+='<td style="',t+=" border-width: 0px; border-style: none;",t+=" border-collapse: collapse;",t+=" padding: 0px; margin: 0px;",t+=" width: "+n+"px;",t+=" height: "+n+"px;",t+=" background-color: ",t+=Y.isDark(r,i)?"#000000":"#ffffff",t+=";",t+='"/>';t+="</tr>"}return t+="</tbody>",t+="</table>"},Y.createSvgTag=function(n,e){n=n||2,e="undefined"==typeof e?4*n:e;var t,r,i,o,u,a=Y.getModuleCount()*n+2*e,l="";for(u="l"+n+",0 0,"+n+" -"+n+",0 0,-"+n+"z ",l+="<svg",l+=' width="'+a+'px"',l+=' height="'+a+'px"',l+=' xmlns="http://www.w3.org/2000/svg"',l+=">",l+='<path d="',i=0;i<Y.getModuleCount();i+=1)for(o=i*n+e,t=0;t<Y.getModuleCount();t+=1)Y.isDark(i,t)&&(r=t*n+e,l+="M"+r+","+o+u);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},Y.createImgTag=function(n,e){n=n||2,e="undefined"==typeof e?4*n:e;var t=Y.getModuleCount()*n+2*e,r=e,i=t-e;return j(t,t,function(e,t){if(r<=e&&e<i&&r<=t&&t<i){var o=Math.floor((e-r)/n),u=Math.floor((t-r)/n);return Y.isDark(u,o)?0:1}return 1})},Y.createImgObject=function(n,e){n=n||2,e="undefined"==typeof e?4*n:e;var r=Y.getModuleCount()*n+2*e,i=e,o=r-e;return t(r,r,function(e,t){if(i<=e&&e<o&&i<=t&&t<o){var r=Math.floor((e-i)/n),u=Math.floor((t-i)/n);return Y.isDark(u,r)?0:1}return 1})},Y},t=function(n,e,t){for(var r=s(n,e),i=0;i<e;i+=1)for(var o=0;o<n;o+=1)r.setPixel(o,i,t(o,i));var u=Z();r.write(u);for(var a=h(),l=u.toByteArray(),f=0;f<l.length;f+=1)a.writeByte(l[f]);a.flush();var m=new Image;return m.src="data:image/gif;base64,"+a,m.width=n,m.height=e,m};e.stringToBytesFuncs={default:function(n){for(var e=[],t=0;t<n.length;t+=1){var r=n.charCodeAt(t);e.push(255&r)}return e}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(n,e){var t=function(){for(var t=d(n),r=function(){var n=t.read();if(n==-1)throw new Error;return n},i=0,o={};;){var u=t.read();if(u==-1)break;var a=r(),l=r(),f=r(),m=String.fromCharCode(u<<8|a),p=l<<8|f;o[m]=p,i+=1}if(i!=e)throw new Error(i+" != "+e);return o}(),r="?".charCodeAt(0);return function(n){for(var e=new Array,i=0;i<n.length;i+=1){var o=n.charCodeAt(i);if(o<128)e.push(o);else{var u=t[n.charAt(i)];"number"==typeof u?(255&u)==u?e.push(u):(e.push(u>>>8),e.push(255&u)):e.push(r)}}return e}};var r={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},i={L:1,M:0,Q:3,H:2},o={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},u=function(){var e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,i=7973,u=21522,l={},f=function(n){for(var e=0;0!=n;)e+=1,n>>>=1;return e};return l.getBCHTypeInfo=function(n){for(var e=n<<10;f(e)-f(t)>=0;)e^=t<<f(e)-f(t);return(n<<10|e)^u},l.getBCHTypeNumber=function(n){for(var e=n<<12;f(e)-f(i)>=0;)e^=i<<f(e)-f(i);return n<<12|e},l.getPatternPosition=function(n){return e[n-1]},l.getMaskFunction=function(n){switch(n){case o.PATTERN000:return function(n,e){return(n+e)%2==0};case o.PATTERN001:return function(n,e){return n%2==0};case o.PATTERN010:return function(n,e){return e%3==0};case o.PATTERN011:return function(n,e){return(n+e)%3==0};case o.PATTERN100:return function(n,e){return(Math.floor(n/2)+Math.floor(e/3))%2==0};case o.PATTERN101:return function(n,e){return n*e%2+n*e%3==0};case o.PATTERN110:return function(n,e){return(n*e%2+n*e%3)%2==0};case o.PATTERN111:return function(n,e){return(n*e%3+(n+e)%2)%2==0};default:throw new Error("bad maskPattern:"+n)}},l.getErrorCorrectPolynomial=function(e){for(var t=n([1],0),r=0;r<e;r+=1)t=t.multiply(n([1,a.gexp(r)],0));return t},l.getLengthInBits=function(n,e){if(e>=1&&e<10)switch(n){case r.MODE_NUMBER:return 10;case r.MODE_ALPHA_NUM:return 9;case r.MODE_8BIT_BYTE:return 8;case r.MODE_KANJI:return 8;default:throw new Error("mode:"+n)}else if(e<27)switch(n){case r.MODE_NUMBER:return 12;case r.MODE_ALPHA_NUM:return 11;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 10;default:throw new Error("mode:"+n)}else{if(!(e<41))throw new Error("type:"+e);switch(n){case r.MODE_NUMBER:return 14;case r.MODE_ALPHA_NUM:return 13;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 12;default:throw new Error("mode:"+n)}}},l.getLostPoint=function(n){for(var e=n.getModuleCount(),t=0,r=0;r<e;r+=1)for(var i=0;i<e;i+=1){for(var o=0,u=n.isDark(r,i),a=-1;a<=1;a+=1)if(!(r+a<0||e<=r+a))for(var l=-1;l<=1;l+=1)i+l<0||e<=i+l||0==a&&0==l||u==n.isDark(r+a,i+l)&&(o+=1);o>5&&(t+=3+o-5)}for(var r=0;r<e-1;r+=1)for(var i=0;i<e-1;i+=1){var f=0;n.isDark(r,i)&&(f+=1),n.isDark(r+1,i)&&(f+=1),n.isDark(r,i+1)&&(f+=1),n.isDark(r+1,i+1)&&(f+=1),0!=f&&4!=f||(t+=3)}for(var r=0;r<e;r+=1)for(var i=0;i<e-6;i+=1)n.isDark(r,i)&&!n.isDark(r,i+1)&&n.isDark(r,i+2)&&n.isDark(r,i+3)&&n.isDark(r,i+4)&&!n.isDark(r,i+5)&&n.isDark(r,i+6)&&(t+=40);for(var i=0;i<e;i+=1)for(var r=0;r<e-6;r+=1)n.isDark(r,i)&&!n.isDark(r+1,i)&&n.isDark(r+2,i)&&n.isDark(r+3,i)&&n.isDark(r+4,i)&&!n.isDark(r+5,i)&&n.isDark(r+6,i)&&(t+=40);for(var m=0,i=0;i<e;i+=1)for(var r=0;r<e;r+=1)n.isDark(r,i)&&(m+=1);var p=Math.abs(100*m/e/e-50)/5;return t+=10*p},l}(),a=function(){for(var n=new Array(256),e=new Array(256),t=0;t<8;t+=1)n[t]=1<<t;for(var t=8;t<256;t+=1)n[t]=n[t-4]^n[t-5]^n[t-6]^n[t-8];for(var t=0;t<255;t+=1)e[n[t]]=t;var r={};return r.glog=function(n){if(n<1)throw new Error("glog("+n+")");return e[n]},r.gexp=function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return n[e]},r}(),l=function(){var n=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],e=function(n,e){var t={};return t.totalCount=n,t.dataCount=e,t},t={},r=function(e,t){switch(t){case i.L:return n[4*(e-1)+0];case i.M:return n[4*(e-1)+1];case i.Q:return n[4*(e-1)+2];case i.H:return n[4*(e-1)+3];default:return}};return t.getRSBlocks=function(n,t){var i=r(n,t);if("undefined"==typeof i)throw new Error("bad rs block @ typeNumber:"+n+"/errorCorrectionLevel:"+t);for(var o=i.length/3,u=new Array,a=0;a<o;a+=1)for(var l=i[3*a+0],f=i[3*a+1],m=i[3*a+2],p=0;p<l;p+=1)u.push(e(f,m));return u},t}(),f=function(){var n=new Array,e=0,t={};return t.getBuffer=function(){return n},t.getAt=function(e){var t=Math.floor(e/8);return 1==(n[t]>>>7-e%8&1)},t.put=function(n,e){for(var r=0;r<e;r+=1)t.putBit(1==(n>>>e-r-1&1))},t.getLengthInBits=function(){return e},t.putBit=function(t){var r=Math.floor(e/8);n.length<=r&&n.push(0),t&&(n[r]|=128>>>e%8),e+=1},t},m=function(n){var e=r.MODE_NUMBER,t=n,i={};i.getMode=function(){return e},i.getLength=function(n){return t.length},i.write=function(n){for(var e=t,r=0;r+2<e.length;)n.put(o(e.substring(r,r+3)),10),r+=3;r<e.length&&(e.length-r==1?n.put(o(e.substring(r,r+1)),4):e.length-r==2&&n.put(o(e.substring(r,r+2)),7))};var o=function(n){for(var e=0,t=0;t<n.length;t+=1)e=10*e+u(n.charAt(t));return e},u=function(n){if(n>="0"&&n<="9")return n.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+n};return i},p=function(n){var e=r.MODE_ALPHA_NUM,t=n,i={};i.getMode=function(){return e},i.getLength=function(n){return t.length},i.write=function(n){for(var e=t,r=0;r+1<e.length;)n.put(45*o(e.charAt(r))+o(e.charAt(r+1)),11),r+=2;r<e.length&&n.put(o(e.charAt(r)),6)};var o=function(n){if(n>="0"&&n<="9")return n.charCodeAt(0)-"0".charCodeAt(0);if(n>="A"&&n<="Z")return n.charCodeAt(0)-"A".charCodeAt(0)+10;switch(n){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+n}};return i},c=function(n){var t=r.MODE_8BIT_BYTE,i=e.stringToBytes(n),o={};return o.getMode=function(){return t},o.getLength=function(n){return i.length},o.write=function(n){for(var e=0;e<i.length;e+=1)n.put(i[e],8)},o},g=function(n){var t=r.MODE_KANJI,i=e.stringToBytesFuncs.SJIS;!function(n,t){var r=e.stringToBytes(n);if(2!=r.length||(r[0]<<8|r[1])!=t)throw"sjis not supported."}("友",38726);var o={};return o.getMode=function(){return t},o.getLength=function(n){return~~(i.length/2)},o.write=function(n){for(var e=i,t=0;t+1<e.length;){var r=(255&e[t])<<8|255&e[t+1];if(r>=33088&&r<=40956)r-=33088;else{if(!(r>=57408&&r<=60351))throw"illegal char at "+(t+1)+"/"+r;r-=49472}r=192*(r>>>8&255)+(255&r),n.put(r,13),t+=2}if(t<e.length)throw"illegal char at "+(t+1)},o},Z=function(){var n=new Array,e={};return e.writeByte=function(e){n.push(255&e)},e.writeShort=function(n){e.writeByte(n),e.writeByte(n>>>8)},e.writeBytes=function(n,t,r){t=t||0,r=r||n.length;for(var i=0;i<r;i+=1)e.writeByte(n[i+t])},e.writeString=function(n){for(var t=0;t<n.length;t+=1)e.writeByte(n.charCodeAt(t))},e.toByteArray=function(){return n},e.toString=function(){var e="";e+="[";for(var t=0;t<n.length;t+=1)t>0&&(e+=","),e+=n[t];return e+="]"},e},h=function(){var n=0,e=0,t=0,r="",i={},o=function(n){r+=String.fromCharCode(u(63&n))},u=function(n){if(n<0);else{if(n<26)return 65+n;if(n<52)return 97+(n-26);if(n<62)return 48+(n-52);if(62==n)return 43;if(63==n)return 47}throw new Error("n:"+n)};return i.writeByte=function(r){for(n=n<<8|255&r,e+=8,t+=1;e>=6;)o(n>>>e-6),e-=6},i.flush=function(){if(e>0&&(o(n<<6-e),n=0,e=0),t%3!=0)for(var i=3-t%3,u=0;u<i;u+=1)r+="="},i.toString=function(){return r},i},d=function(n){var e=n,t=0,r=0,i=0,o={};o.read=function(){for(;i<8;){if(t>=e.length){if(0==i)return-1;throw new Error("unexpected end of file./"+i)}var n=e.charAt(t);if(t+=1,"="==n)return i=0,-1;n.match(/^\s$/)||(r=r<<6|u(n.charCodeAt(0)),i+=6)}var o=r>>>i-8&255;return i-=8,o};var u=function(n){if(n>=65&&n<=90)return n-65;if(n>=97&&n<=122)return n-97+26;if(n>=48&&n<=57)return n-48+52;if(43==n)return 62;if(47==n)return 63;throw new Error("c:"+n)};return o},s=function(n,e){var t=n,r=e,i=new Array(n*e),o={};o.setPixel=function(n,e,r){i[e*t+n]=r},o.write=function(n){n.writeString("GIF87a"),n.writeShort(t),n.writeShort(r),n.writeByte(128),n.writeByte(0),n.writeByte(0),n.writeByte(0),n.writeByte(0),n.writeByte(0),n.writeByte(255),n.writeByte(255),n.writeByte(255),n.writeString(","),n.writeShort(0),n.writeShort(0),n.writeShort(t),n.writeShort(r),n.writeByte(0);var e=2,i=a(e);n.writeByte(e);for(var o=0;i.length-o>255;)n.writeByte(255),n.writeBytes(i,o,255),o+=255;n.writeByte(i.length-o),n.writeBytes(i,o,i.length-o),n.writeByte(0),n.writeString(";")};var u=function(n){var e=n,t=0,r=0,i={};return i.write=function(n,i){if(n>>>i!=0)throw new Error("length over");for(;t+i>=8;)e.writeByte(255&(n<<t|r)),i-=8-t,n>>>=8-t,r=0,t=0;r|=n<<t,t+=i},i.flush=function(){t>0&&e.writeByte(r)},i},a=function(n){for(var e=1<<n,t=(1<<n)+1,r=n+1,o=l(),a=0;a<e;a+=1)o.add(String.fromCharCode(a));o.add(String.fromCharCode(e)),o.add(String.fromCharCode(t));var f=Z(),m=u(f);m.write(e,r);var p=0,c=String.fromCharCode(i[p]);for(p+=1;p<i.length;){var g=String.fromCharCode(i[p]);p+=1,o.contains(c+g)?c+=g:(m.write(o.indexOf(c),r),o.size()<4095&&(o.size()==1<<r&&(r+=1),o.add(c+g)),c=g)}return m.write(o.indexOf(c),r),m.write(t,r),m.flush(),f.toByteArray()},l=function(){var n={},e=0,t={};return t.add=function(r){if(t.contains(r))throw new Error("dup key:"+r);n[r]=e,e+=1},t.size=function(){return e},t.indexOf=function(e){return n[e]},t.contains=function(e){return"undefined"!=typeof n[e]},t};return o},j=function(n,e,t,r){for(var i=s(n,e),o=0;o<e;o+=1)for(var u=0;u<n;u+=1)i.setPixel(u,o,t(u,o));var a=Z();i.write(a);for(var l=h(),f=a.toByteArray(),m=0;m<f.length;m+=1)l.writeByte(f[m]);l.flush();var p="";return p+="<img",p+=' src="',p+="data:image/gif;base64,",p+=l,p+='"',p+=' width="',p+=n,p+='"',p+=' height="',p+=e,p+='"',r&&(p+=' alt="',p+=r,p+='"'),p+="/>"};return{qrcode:e,QRUtil:u}}());!function(){l.qrcode.stringToBytesFuncs.SJIS=l.qrcode.createStringToBytes("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MIWC4zCGguQwh4LlMIiC5jCJgucwioLoMIuC6TCMguowjYLrMI6C7DCPgu0wkILuMJGC7zCSgvAwk4LxMJuBSjCcgUswnYFUMJ6BVTChg0AwooNBMKODQjCkg0MwpYNEMKaDRTCng0YwqINHMKmDSDCqg0kwq4NKMKyDSzCtg0wwroNNMK+DTjCwg08wsYNQMLKDUTCzg1IwtINTMLWDVDC2g1Uwt4NWMLiDVzC5g1gwuoNZMLuDWjC8g1swvYNcML6DXTC/g14wwINfMMGDYDDCg2Eww4NiMMSDYzDFg2QwxoNlMMeDZjDIg2cwyYNoMMqDaTDLg2owzINrMM2DbDDOg20wz4NuMNCDbzDRg3Aw0oNxMNODcjDUg3Mw1YN0MNaDdTDXg3Yw2IN3MNmDeDDag3kw24N6MNyDezDdg3ww3oN9MN+DfjDgg4Aw4YOBMOKDgjDjg4Mw5IOEMOWDhTDmg4Yw54OHMOiDiDDpg4kw6oOKMOuDizDsg4ww7YONMO6DjjDvg48w8IOQMPGDkTDyg5Iw84OTMPSDlDD1g5Uw9oOWMPuBRTD8gVsw/YFSMP6BU04AiOpOAZKaTgOOtU4HlpxOCI/kTgmOT04Kj+NOC4m6Tg2Vc04Ol15OEJigThGJTk4Uio5OFZihThaQok4XmcBOGIt1ThmVuE4ej+VOIZe8TiaVwE4qmKJOLZKGTjGYo04yi/hONpikTjiK2045kk9OO47lTjyYpU4/mKZOQpinTkOUVE5Fi3ZOS5RWTk2T4U5OjMFOT5ZSTlXlaE5WmKhOV4/mTliYqU5ZibNOXYvjTl6M7k5fludOYpukTnGXkE5zk/tOfoqjToCLVE6CmKpOhZirToaXuU6Il1xOiZGIToqYrU6LjpZOjJPxTo6YsE6RiV1OkozdTpSM3E6ViOROmJhqTpmYaU6bjbFOnIifTp6YsU6fmLJOoJizTqGWU06imLROpIzwTqWI5U6mlpJOqIucTquLnU6si55OrZLgTq6Xuk6wmLVOs5i2TraYt066kGxOwI9ZTsGQbU7CmLxOxJi6TsaYu07Hi3dOyo2hTsuJ7k7NmLlOzpi4Ts+Vp07UjmVO1Y5kTtaRvE7XmL1O2JV0TtmQ5U7dgVdO3pi+Tt+YwE7jkeNO5JffTuWIyE7tmL9O7om8TvCLwk7ykodO9oyPTveYwU77lENPAYrpTwmYwk8KiMlPDYzeTw6K6k8PlZpPEJSwTxGLeE8aie9PHJjlTx2TYE8vlIxPMJjETzSUuk82l+BPOJBMTzqOZk88jpdPPYm+T0OSz09GkkFPR5jIT02Iyk9OkuFPT49aT1CNsk9Rl0NPU5HMT1WJvU9XmMdPWZddT1qYw09bmMVPXI3sT12Yxk9em0NPaZjOT2+Y0U9wmM9Pc4nAT3WVuU92mMlPe5jNT3yM8U9/jmdPg4qkT4aY0k+ImMpPi5fhT42OmE+PmMtPkZjQT5aY00+YmMxPm4ufT52Iy0+gi6BPoYm/T6ubRE+tlplPrpWOT6+M8k+1kE5Ptpe1T7+V1k/CjFdPw5GjT8SJ4k/Kj3JPzpjXT9CY3E/RmNpP1JjVT9eRrU/YmNhP2pjbT9uY2U/dldtP35jWT+GQTU/jlpNP5JjdT+WY3k/uj0NP75jrT/OUb0/1lVVP9pjmT/iV7k/6ibRP/pjqUAWY5FAGmO1QCZFxUAuMwlANlHtQD+DFUBGY7FASk3xQFJjhUBaM9FAZjPNQGpjfUB+O2FAhmOdQI5XtUCSSbFAlmONQJoyRUCiY4FApmOhQKpjiUCuXz1AsmOlQLZhgUDaL5FA5jJBQQ5juUEeY71BImPNQSYjMUE+VzlBQmPJQVZjxUFaY9VBamPRQXJLiUGWMklBsmPZQco7DUHSRpFB1kuNQdov0UHiY91B9i1VQgJj4UIWY+lCNllRQkYyGUJiOUFCZlPVQmpj5UKyNw1Ctl2JQspj8ULOZQlC0mPtQtY3CULePnVC+jFhQwplDUMWLzVDJmUBQyplBUM2TrVDPkZxQ0YuhUNWWbFDWmURQ2pe7UN6ZRVDjmUhQ5ZlGUOeRbVDtmUdQ7plJUPWZS1D5mUpQ+5XGUQCLVlEBmU1RAplOUQSJrVEJmUxREo7yURSZUVEVmVBRFplPURiY1FEamVJRH4+eUSGZU1Eql0RRMpbXUTeZVVE6mVRRO5lXUTyZVlE/mVhRQJlZUUGI8lFDjLNRRIxaUUWPW1FGkptRR4uiUUiQ5lFJjPVRS42OUUyZW1FNlsZRTpNlUVCOmVFSmVpRVJlcUVqTfVFcipVRYpldUWWT/FFokVNRaZlfUWqZYFFrlKpRbIz2UW2YWlFumWFRcYukUXWVulF2kbRRd4vvUXiTVFF8jJNRgJliUYKZY1GFk+BRhol+UYmZZlGKjftRjJllUY2NxFGPmWdRkOPsUZGZaFGSlmBRk5lpUZWZalGWmWtRl4/nUZmOylGgiqVRopluUaSZbFGllrtRppltUaiVeVGpmW9RqplwUauZcVGsk35RsJl1UbGZc1GymXRRs5lyUbSN4VG1mXZRtpboUbeX4lG9mXdRxJCmUcWZeFHGj3lRyZl5UcuSnFHMl71RzZOAUdaZw1HbmXpR3OqjUd2Lw1HgmXtR4ZZ9UeaPiFHnkfpR6Zl9UeqT4lHtmX5R8JmAUfGKTVH1mYFR9oulUfiTylH5iZpR+o9vUf2Un1H+mYJSAJOBUgOQblIEmYNSBpWqUgeQ2FIIiqBSCoqnUguZhFIOmYZSEYxZUhSZhVIXl/FSHY+JUiSUu1IllcpSJ5mHUimXmFIqmYhSLpmJUjCTnlIzmYpSNpCnUjeN/FI4jJRSOZmLUjqOaFI7jY9SQ5LkUkSZjVJHkaVSSo3tUkuZjlJMmY9STZFPUk+ZjFJUmZFSVpZVUluNhFJemZBSY4yVUmSN3FJllI1SaZmUUmqZklJvlZtScI/oUnGZm1JyioRSc5mVUnSZk1J1kW5SfZmXUn+ZllKDimNSh4yAUoiZnFKJl6tSjZmYUpGZnVKSmZpSlJmZUpuXzVKfjPdSoInBUqOX8lKpj5VSqpN3UquNhVKsmaBSrZmhUrGX41K0mEpStZmjUrmM+FK8maJSvopOUsGZpFLDlnVSxZK6UseXRVLJlddSzZmlUtLo01LVk65S15mmUtiKqFLZlrFS3Y+fUt6Zp1LfleVS4JmrUuKQqFLjmahS5IvOUuaZqVLniqlS8oxNUvOZrFL1ma1S+JmuUvmZr1L6jtlS/oz5Uv+W3FMBluZTApP1UwWV71MGmbBTCJmxUw2Zs1MPmbVTEJm0UxWZtlMWibtTF5ZrUxmN+lMambdTHZF4UyCPoFMhi6dTI5m4UyqU2VMvmblTMZm6UzOZu1M4mbxTOZVDUzqL5lM7iONTP5O9U0CZvVNBj1xTQ5DnU0WZv1NGmb5TR4+hU0iM31NJmcFTSpS8U02ZwlNRlNpTUpGyU1OR7FNUi6ZTV5PsU1iSUFNalI5TXJZtU16ZxFNgkOhTZoxUU2mZxVNumcZTb4lLU3CI81NxiutTc5GmU3SLcFN1l5FTd5nJU3iJtVN7mchTf4uoU4KZylOElu9TlpnLU5iX0FOajPpTn4y0U6CZzFOlmc5TppnNU6iQflOpiVhTrYl9U66Zz1OwmdBTs4y1U7aZ0VO7i45Two5RU8OZ0lPIlpRTyY2zU8qLeVPLl0ZTzJFvU82UvVPOjvtT1I9mU9aO5lPXjvNT2Y+WU9uUvlPfmdVT4YliU+KRcFPjjPtT5IzDU+WL5VPomdlT6ZJAU+qR/FPri6lT7I+iU+2Z2lPumdhT74nCU/CR5FPxjrZT8o5qU/OJRVP2ipBT942GU/iOaVP6mdtUAZncVAOLaFQEimVUCI2HVAmLZ1QKkt1UC4lEVAyTr1QNlrxUDo1AVA+XmVQQk2ZUEYz8VBuMTlQdmeVUH4vhVCCWaVQmlNtUKZnkVCuK3FQsmd9ULZngVC6Z4lQ2meNUOIt6VDmQgVQ7latUPJnhVD2Z3VQ+jOFUQJneVEKYQ1RGlfBUSJLmVEmM4FRKjZBUTpnmVFGT21RfmepUaI78VGqO9FRwme1UcZnrVHOWoVR1mehUdpnxVHeZ7FR7me9UfIzEVH2WvVSAmfBUhJnyVIaZ9FSLje5UjJhhVI6Z6VSPmedUkJnzVJKZ7lSimfZUpJpCVKWZ+FSomfxUq5pAVKyZ+VSvml1Uso3nVLOKUFS4mfdUvJpEVL2I9FS+mkNUwIijVMGVaVTCmkFUxJn6VMeZ9VTImftUyY3GVNiaRVThiPVU4ppOVOWaRlTmmkdU6I+jVOmWiVTtmkxU7ppLVPKTTlT6mk1U/ZpKVQSJU1UGjbRVB5BPVQ+aSFUQk4JVFJpJVRaIoFUumlNVL5dCVTGPpVUzmllVOJpYVTmaT1U+kcFVQJpQVUSR7VVFmlVVRo+kVUyaUlVPluJVU4xbVVaaVlVXmldVXJpUVV2aWlVjmlFVe5pgVXyaZVV+mmFVgJpcVYOaZlWEkVBVh5poVYmNQVWKml5Vi5KdVZiaYlWZmltVmoqrVZyK7FWdioVVnppjVZ+aX1WnjJZVqJppVamaZ1WqkXJVq4tpVayLqlWummRVsIvyVbaJY1XEmm1VxZprVceapVXUmnBV2ppqVdyablXfmmxV445rVeSab1X3mnJV+Zp3Vf2adVX+mnRWBpJRVgmJw1YUmnFWFppzVhePplYYiVJWG5p2VimJ3FYvmoJWMY/6VjKafVY0mntWNpp8VjiaflZCiVxWTJFYVk6aeFZQmnlWW4qaVmSagVZoiu1WapqEVmuagFZsmoNWdJWsVniT01Z6lLZWgJqGVoaahVaHimRWipqHVo+ailaUmolWoJqIVqKUWFalmotWrpqMVrSajla2mo1WvJqQVsCak1bBmpFWwpqPVsOaklbImpRWzpqVVtGallbTmpdW15qYVtiZZFbajvpW245sVt6J8VbgiPZW45JjVu6amVbwjaJW8ojNVvOQfVb5mppW+ozFVv2NkVb/mpxXAJqbVwOV3lcEmp1XCJqfVwmanlcLmqBXDZqhVw+Ml1cSiYBXE5qiVxaapFcYmqNXHJqmVx+TeVcmmqdXJ4izVyiN3VctjFxXMJJuVzeaqFc4mqlXO5qrV0CarFdCjeJXR4vPV0qWVldOmqpXT5qtV1CNv1dRjUJXYZqxV2SNo1dmklJXaZquV2qS2Fd/mrJXgpCCV4iasFeJmrNXi4xeV5OatFegmrVXoo1DV6OKX1ekmrdXqpq4V7CauVezmrZXwJqvV8OaulfGmrtXy5aEV86P6VfSmr1X05q+V9SavFfWmsBX3JRXV9+I5lfglXVX45rBV/SP+1f3jrdX+ZR8V/qK7lf8jelYAJZ4WAKTsFgFjJhYBpHNWAqav1gLmsJYFZHCWBmaw1gdmsRYIZrGWCSS51gqiqxYL+qfWDCJgVgxlfFYNI/qWDWTZ1g6jeRYPZrMWECVu1hBl9tYSonyWEuayFhRkVlYUprLWFSTg1hXk2hYWJOEWFmUt1hakstYXo3HWGKax1hpiZZYa5NVWHCayVhymsVYdZBvWHmazVh+j21Yg4urWIWazliTleZYl5GdWJySxFifmtBYqJZuWKua0ViumtZYs5WtWLia1Vi5ms9YuprSWLua1Fi+jaRYwZXHWMWa11jHkmRYyonzWMyP61jRmtlY05rYWNWNiFjXmtpY2JrcWNma21jcmt5Y3prTWN+a4Fjkmt9Y5ZrdWOuObVjskHBY7pFzWO+a4VjwkLpY8YjrWPKUhFj3ktlY+ZrjWPqa4lj7muRY/JrlWP2a5lkCmudZCZXPWQqa6FkPicRZEJrpWRWXW1kWik9ZGJnHWRmPZ1kakb1ZG5rqWRyW6VkilrJZJZrsWSeR5Vkpk1ZZKpG+WSuVdlksmu1ZLZruWS6Jm1kxjrhZMprvWTeIzlk4mvBZPprxWUSJgllHiu9ZSJPeWUmV8llOmvVZT5F0WVCa9FlRjF9ZVJZ6WVWa81lXk4VZWJr3WVqa9llgmvlZYpr4WWWJnFlnmvpZaI+nWWma/FlqkkRZbJr7WW6VsVlzj5dZdJN6WXibQFl9jURZgZtBWYKUQFmDlNxZhJbPWYqURFmNm0pZk4tXWZaXZFmZlq1Zm5uqWZ2bQlmjm0VZpZHDWaiWV1msk2lZsptGWbmWhVm7jchZvo+oWcabR1nJjm9Zy45uWdCIt1nRjMZZ05CpWdSIz1nZm0tZ2ptMWdybSVnliVdZ5oqtWeibSFnqlsNZ65VQWfaIpln7iPdZ/45wWgGI0FoDiKFaCZtRWhGbT1oYlrpaGptSWhybUFofm05aIJBQWiWbTVopldhaL4ziWjWbVlo2m1daPI+pWkCbU1pBmEtaRpRrWkmbVVpajaVaYptYWmaVd1pqm1labJtUWn+WuVqSlH1amptaWpuVUVq8m1tavZtfWr6bXFrBicVawpteWsmOuVrLm11azIyZWtCba1rWm2Ra15thWuGShFrjm2Ba5ptiWumbY1r6m2Va+5tmWwmK8FsLm2hbDJtnWxabaVsij+xbKptsWyyS2lswiWRbMptqWzabbVs+m25bQJtxW0Obb1tFm3BbUI5xW1GbcltUjUVbVZtzW1eOmltYkbZbWpt0W1ubdVtcjnlbXY1GW1+W0Ftji0dbZIzHW2WbdltmindbaZt3W2uRt1twm3hbcZuhW3ObeVt1m3pbeJt7W3qbfVuAm35bg5uAW4WR7luHiUZbiI7nW4mIwFuLkXZbjIquW42Os1uPjUdblZOGW5ePQFuYiq9bmZKIW5qS6FubiLZbnItYW52V81ufjsBbootxW6OQ6VukjrpbpZdHW6abgVuui3tbsI3JW7OKUVu0iYNbtY+qW7aJxlu4m4JbuZdlW7+PaFvCjuJbw5uDW8SK8VvFk9BbxpanW8ebhFvJm4VbzJV4W9Cbh1vSiqZb04v1W9SbhlvbirBb3ZBRW96bi1vfjkBb4YnHW+Kbilvkm4hb5ZuMW+abiVvnlEpb6J7LW+mQUlvrm41b7pe+W/Cbjlvzm5Bb9ZKeW/abj1v4kKFb+o6bW/6Rzlv/jvVcAZWVXAKQ6lwEjstcBZuRXAaPq1wHm5JcCJuTXAmI0VwKkbhcC5BxXA2blFwOk7FcD4+sXBGPrVwTm5VcFpDrXBqPrlwgm5ZcIpuXXCSW3lwom5hcLYvEXDGPQVw4m5lcOZuaXDqO2lw7kEtcPJPyXD2Qc1w+lPZcP5RBXECLx1xBm5tcRYuPXEabnFxIi/xcSpPNXEuJrlxNjnJcTpudXE+boFxQm59cUYv7XFObnlxVk1dcXpGuXGCTalxhjsZcZJF3XGWXmlxsm6JcbpujXG+T1FxxjlJcdpulXHmbplyMm6dckIryXJGbqFyUm6lcoYmqXKiRWlypiuJcq5urXKyWplyxkdBcs4p4XLabrVy3m69cuIrdXLubrFy8m65cvpuxXMWbsFzHm7Jc2ZuzXOCTu1zhi6xc6InjXOmbtFzqm7lc7Zu3XO+V9VzwlfRc9pOHXPqbtlz7j3Nc/Zu1XQeQkl0Lm7pdDo3oXRGbwF0Um8FdFZu7XRaKUl0Xm7xdGJvFXRmbxF0am8NdG5u/XR+bvl0im8JdKZX2XUubyV1Mm8ZdTpvIXVCXkl1Sm8ddXJu9XWmQk11sm8pdb421XXOby112m8xdgpvPXYSbzl2Hm81di5OIXYybuF2Qm9VdnZvRXaKb0F2sm9JdrpvTXbeb1l26l+RdvJvXXb2b1F3Jm9hdzIreXc2b2V3Sm9td05vaXdab3F3bm91d3ZDsXd6PQl3hj4Rd45GDXeWNSF3mjbZd541JXeiLkF3rm95d7o23XfGMyF3ym99d85akXfSUYl31m+Bd941KXfuKql39kkZd/ovQXgKOc14DlXpeBpS/Xgub4V4MivNeEZvkXhaSn14Zm+NeGpviXhub5V4dkuleJZCDXiuOdF4tkMheL5HRXjCLQV4zkqBeNpvmXjeb5144j+1ePZZYXkCb6l5Dm+leRJvoXkWVnV5Hm/FeTJZ5Xk6b615Um+1eVZaLXleb7F5fm+5eYZSmXmKb715jlbxeZJvwXnKKsV5zlb1edJROXnWb8l52m/NeeI1LXnmKsl56m/Ree4y2XnyXY159l0hefor0Xn+b9l6BkqFeg41MXoSPr16HlN1eio+wXo+PmF6VkupelpX3XpeTWF6ajU1enJV7XqCb916mk3hep43AXquMyV6tkutetYjBXraPjl63jU5euJdmXsGb+F7Cm/lew5RwXsib+l7Jl/VeyphMXs+b/F7Qm/te04pmXtacQF7anENe25xEXt2cQl7flV9e4I+xXuGcRl7inEVe45xBXuicR17pnEhe7JxJXvCcTF7xnEpe85xLXvScTV72iYRe95LsXvicTl76jJpe+4n0XvyUVV7+nE9e/5P5XwGV2V8DnFBfBJhNXwmcUV8Klb5fC5xUXwyYn18NmK9fD46uXxCT818RnFVfE4t8XxSSol8ViPhfFpxWXxeVpF8YjU9fG5JvXx+S7V8llu1fJoy3XyeMyl8pnFdfLZxYXy+cXl8xjuNfNZKjXzeLrV84nFlfPJVKXz6SZV9BnFpfSJxbX0qLrl9MnFxfTpxdX1GcX19Tk5ZfVpxgX1ecYV9ZnGJfXJxTX12cUl9hnGNfYoxgX2aVRl9pjcpfapVWX2uSpF9slWpfbZxkX3CPsl9xiWVfc5xlX3ecZl95lvBffJTeX3+caV+AiZ1fgZCqX4KcaF+DnGdfhIxhX4WR0l+HnG1fiJxrX4qcal+Ll6VfjIzjX5CPmV+RnGxfkpNrX5OPXV+Xk75fmJxwX5mcb1+enG5foJxxX6GM5F+onHJfqZWcX6qPel+tnHNfrpT3X7OTv1+0kqVfuZNPX7ycdF+9i0pfw5BTX8WVS1/MivVfzZRFX9acdV/XjnVf2JZZX9mWWl/ciZ5f3Zx6X+CSiV/knHdf64n1X/Ccq1/xnHlf9ZRPX/iceF/7nHZf/Y2aX/+cfGAOnINgD5yJYBCcgWASk3tgFZyGYBaVfGAZnIBgG5yFYByX5WAdjnZgIJHTYCGcfWAli31gJpyIYCeQq2AoiYVgKZyCYCqJ9mArnIdgL4uvYDGchGA6nIpgQZyMYEKclmBDnJRgRpyRYEqckGBLl/ZgTZySYFCLsGBSjVBgVY+aYFmcmWBanItgX5yPYGCcfmBiifhgY5yTYGSclWBlknBgaI2mYGmJtmBqnI1ga5yYYGycl2Bti7Fgb5GnYHCKhmB1jGJgd5yOYIGcmmCDnJ1ghJyfYImOu2CLnKVgjJLuYI2cm2CSnKNglIn3YJacoWCXnKJgmpyeYJucoGCfjOVgoJdJYKOKs2CmiXhgp5ykYKmUWWCqiKtgspTfYLOce2C0nKpgtZyuYLaW42C4nKdgvJOJYL2crGDFj+5gxpytYMeT1WDRmGZg05ypYNicr2DajZtg3JDJYN+I0mDgnKhg4ZymYOOReWDnnJxg6I5TYPCRxGDxnLtg85F6YPSctmD2nLNg95y0YPmO5GD6nLdg+5y6YQCctWEBj0RhA5y4YQacsmEIlvphCZb5YQ2cvGEOnL1hD4jTYRWcsWEai/BhG4ikYR+KtGEhnLlhJ5zBYSicwGEsnMVhNJzGYTycxGE9nMdhPpy/YT+cw2FCnMhhRJzJYUecvmFIjpxhSpzCYUuR1GFMjVFhTZywYU6QVGFTnNZhVZXnYViczGFZnM1hWpzOYV2c1WFfnNRhYpadYWOKtWFlnNJhZ4xkYWiKU2FrnM9hbpe2YW+c0WFwiNRhcZzTYXOcymF0nNBhdZzXYXaMY2F3nMthfpd8YYKXSmGHnNphipzeYY6RnmGQl/dhkZzfYZSc3GGWnNlhmZzYYZqc3WGkla5hp5OyYamMZWGrnOBhrJzbYa6c4WGyjJthtomvYbqc6WG+irZhw5znYcac6GHHjadhyJzmYcmc5GHKnONhy5zqYcyc4mHNnOxh0In5YeOc7mHmnO1h8pKmYfSc8WH2nO9h95zlYfiMnGH6nPBh/Jz0Yf2c82H+nPVh/5zyYgCc9mIInPdiCZz4YgqV6GIMnPpiDZz5Yg6PXmIQkKxiEYnkYhKJ+mIUnPtiFoi9YhqQymIbnPxiHebBYh6dQGIfjIFiIZ1BYiaQ7WIqnUJiLp1DYi+LWWIwnURiMp1FYjOdRmI0kdViOIzLYjuW32I/lltiQI+KYkGdR2JHkO5iSOe7YkmU4GJLjuhiTY3LYk6dSGJTkcViVZWlYliR72JbnUtiXp1JYmCdTGJjnUpiaJ1NYm6Vr2JxiLVidpV9YnmU4WJ8nU5ifp1RYn+Ps2KAi1pigp1PYoOdVmKEj7RiiZ1QYoqUY2KRl31ikp1SYpOdU2KUnVdilZOKYpadVGKXjVJimJDcYpudZWKclLJinpHwYquU4mKsnatisZX4YrWS72K5lpViu51aYryJn2K9kopiwp1jYsWSU2LGnV1ix51kYsidX2LJnWZiyp1iYsydYWLNlI9iz51bYtCJ+2LRnVli0ouRYtOR8WLUnVVi151YYtiNU2LZkNli24+1YtydYGLdlHFi4IuSYuGKZ2Lsiodi7ZBAYu6daGLvnW1i8Z1pYvOMnWL1nW5i9o5BYveNiWL+j0Vi/51cYwGOnWMCnWtjB453YwidbGMJiMJjDJ1nYxGSp2MZi5NjH4uyYyedamMoiKVjK43BYy+QVWM6kvBjPZTSYz6dcGM/kX1jSZGoY0yOSmNNnXFjT51zY1Cdb2NVld9jV5K7Y1yRe2NnlfljaI7MY2mdgGNrnX5jbpCYY3KMnmN2nXhjd4+3Y3qT5mN7lFBjgJ12Y4ORfGOIjvZjiZ17Y4yPtmOOnXVjj516Y5KUcmOWnXRjmIxAY5uKfGOfnXxjoJepY6GNzGOiklRjo515Y6WQ2mOnjVRjqJCEY6mJhmOqkVtjq513Y6yLZGOyjGZjtJLNY7WdfWO7kX5jvp2BY8Cdg2PDkbVjxJ2JY8adhGPJnYZjz5VgY9CS8WPSnYdj1pdLY9qXZ2Pbirdj4YisY+OdhWPpnYJj7or2Y/SJh2P2nYhj+pdoZAadjGQNkblkD52TZBOdjWQWnYpkF52RZBydcmQmnY5kKJ2SZCyUwGQtk4tkNJ2LZDadj2Q6jGdkPo3vZEKQ22ROnZdkWJNFZGedlGRploBkb52VZHadlmR4lsxkepCgZIOMgmSInZ1kko5UZJOdmmSVnZlkmpRRZJ6Ts2Skk1BkpZ2bZKmdnGSrlY9krZRkZK6OQmSwkO9kspZvZLmKaGS7naNkvJ2eZMGXaWTCnaVkxZ2hZMedomTNkYBk0p2gZNSdXmTYnaRk2p2fZOCdqWThnapk4pNGZOOdrGTmjkNk552nZOyLW2Tvna1k8Z2mZPKdsWT0nbBk9p2vZPqdsmT9nbRk/o/vZQCds2UFnbdlGJ21ZRydtmUdnZBlI525ZSSduGUqnZhlK526ZSydrmUvjnhlNJ27ZTWdvGU2nb5lN529ZTidv2U5ifxlO41VZT6V+mU/kK1lRYzMZUidwWVNncRlT5VxZVGLfmVVncNlVp3CZVeUc2VYncVlWYuzZV2dx2VencZlYoq4ZWOOVWVmk9ZlbIxoZXCQlGVynchldJCuZXWTR2V3lX5leJ3JZYKdymWDnctlh5W2ZYibfGWJkMRljJVrZY6N1mWQlONlkZTBZZeTbGWZl79lm53NZZyOzmWfnc5loYi0ZaSL0mWlkMtlp5WAZaudz2WsjmFlrZJmZa+OemWwkFZlt53QZbmV+2W8iZdlvY57ZcGd02XDndFlxJ3UZcWXt2XGndJly5D5Zcyd1WXPkbBl0p3WZdeK+GXZndhl253XZeCd2WXhndpl4or5ZeWT+mXmklVl54uMZeiOfGXpkYFl7I97Ze2IrmXxndtl+omgZfud32YCjVZmA53eZgaNqWYHj7hmCp3dZgyPuWYOlr5mD42oZhOI1WYUkMxmHJ3kZh+Qr2YgiWZmJY90ZieWhmYojfBmLY+6Zi+QpWY0neNmNZ3hZjad4mY8kotmP55FZkGd6GZCjp5mQ41XZkSd5mZJnedmS5BXZk+d5WZSjk5mXZ3qZl6d6WZfne5mYp3vZmSd62ZmikFmZ53sZmid7WZplNNmbpWBZm+MaWZwnfBmdJCwZnaPu2Z6knFmgYvFZoOd8WaEnfVmh4nJZoid8maJnfRmjp3zZpGPi2aWkmdml4jDZpid9madnfdmopKoZqaX72arjmJmrpXpZrSWXGa4nkFmuZ35Zryd/Ga+nftmwZ34ZsSeQGbHk9xmyZ36ZtaeQmbZj4xm2p5DZtyXambdlJhm4J5EZuaeRmbpnkdm8J5IZvKLyGbziWdm9I1YZvWeSWb3nkpm+I+RZvmRgmb8mdZm/ZFdZv6RXGb/kdZnAI3FZwOY8GcIjI5nCZdMZwuV/GcNlZ5nD55LZxSN8WcVkr1nFp5MZxeYTmcbll1nHZKpZx6eTWcfivpnJp5OZyeeT2colthnKpaiZyuWlmcslntnLY5EZy6eUWcxjulnNJZwZzaeU2c3nlZnOJ5VZzqK92c9i4BnP55SZ0GeVGdGnldnSZCZZ06Xm2dPiMdnUI3eZ1GRumdTjttnVo/xZ1meWmdck21nXp5YZ1+RqWdgnllnYY/wZ2KW22djnltnZJ5cZ2WXiGdqnmFnbY1ZZ2+UdGdwnl5ncZOMZ3Kd3GdzneBndYtuZ3eUZmd8nmBnfo+8Z3+UwmeFnmZnh5T4Z4meXWeLnmNnjJ5iZ5CQzWeVlo1nl5fRZ5qWh2ecicpnnY59Z6CYZ2ehnmVnopCVZ6aeZGepnl9nr4zNZ7Oea2e0nmlntonLZ7eeZ2e4nm1nuZ5zZ8GRxmfElb9nxp51Z8qVQWfOnnRnz5SQZ9CWXmfRirln05D1Z9SPX2fYktFn2pdNZ92ecGfenm9n4p5xZ+SebmfnnnZn6Z5sZ+yeamfunnJn755oZ/GSjGfzlvZn9I7EZ/WN8mf7jbhn/paPZ/+KYGgCksxoA5PIaASJaGgTkPBoFpCyaBeMSWgennhoIY1aaCKKnGgpnnpoKoqUaCuegWgynn1oNJDxaDiKamg5japoPIppaD2NzWhAnntoQYyFaEKMamhDk41oRp55aEiIxGhNnnxoTp5+aFCLy2hRjEtoU4q6aFSLamhZnoJoXI33aF2WkWhfjlZoY56DaGeVT2h0no9odomxaHeehGh+npVof56FaIGXwGiDnoxohZR+aI2elGiPnodok4iyaJSeiWiXjVtom56LaJ2eimifnoZooJ6RaKKPvWimmutop4zmaKiXnGitnohor5LyaLCKQmixjatos56AaLWekGi2ioFouZ6OaLqekmi8k45oxIr8aMaesGjJlsdoyp6XaMuK+2jNnp5o0pZfaNSen2jVnqFo156laNiemWjakklo35OPaOCeqWjhnpxo456maOeeoGjukFho756qaPKQsWj5nqho+oq7aQCYb2kBnpZpBJ6kaQWI1mkInphpC5a4aQyenWkNkEFpDpLFaQ+ek2kSnqNpGZCaaRqerWkbipFpHIyfaSGer2kinpppI56uaSWep2kmnptpKJ6raSqerGkwnr1pNJPMaTaeomk5nrlpPZ67aT+S1mlKl2tpU5WWaVSetmlVkchpWZ68aVqRXmlcnrNpXZ7AaV6ev2lgk+1pYZ6+aWKT6GlqnsJpa561aW2Lxmlunrhpb498aXOUgGl0nrppdYvJaXeesml4nrRpeZ6xaXyYT2l9inlpfp63aYGewWmCilRpio3laY6JfGmRntJplJhQaZWe1WmbkFlpnJ7UaaCe02mnntBprp7EabGe4WmynsNptJ7Wabuezmm+nslpv57GacGex2nDns9px+qgacqezGnLjVxpzJLGac2RhGnOnspp0J7FadOeyGnYl2xp2ZaKad2ezWnentdp557faeie2GnrnuVp7Z7jafKe3mn5nt1p+5LOaf2RhWn/nttqAp7ZagWe4GoKnuZqC5Tzagye7GoSnudqE57qahSe5GoXkpRqGZVXahue2moenuJqH4++aiGWzWoinvZqI57paimMoGoqiaFqK4p+ai6e0Wo1j79qNp7uajie9Wo5jvdqOoqSaj2STWpEnutqR57wakie9GpLi7RqWItralme8mpfi0BqYZPJamKe8WpmnvNqcp7tanie72p/ioBqgJJoaoSe+mqNnvhqjoznapCe92qXn0BqnJ53aqCe+Wqinvtqo578aqqfS2qsn0dqrp6NarOfRmq4n0Vqu59CasGe6GrCn0Rqw59DatGfSWrTmEVq2p9MatuL+Wren0hq359KauiUpWrqn01q+p9RavufTmsEl5NrBZ9Pawqe3GsSn1JrFp9Tax2JVGsfn1VrIIyHayGOn2sji9NrJ4miazKXfms3n1drOJ9WazmfWWs6i1xrPYvUaz6KvGtDn1xrR59ba0mfXWtMicxrTpJWa1CfXmtTir1rVJ9ga1mfX2tbn2FrX59ia2GfY2tijn5rY5Cza2SNn2tmlZBraZXga2qYY2tvjpVrc43Oa3SX8Gt4n2RreZ9la3uOgGt/n2ZrgJ9na4OfaWuEn2hrhpZ3a4mPfWuKjupri45ja42famuVn2xrlpBCa5ifa2uen21rpJ9ua6qfb2urn3Brr59xa7Gfc2uyn3Jrs590a7SJo2u1kmlrt591a7qORWu7imtrvJ92a7+TYWvAmsprxYtCa8afd2vLn3hrzZXqa86WiGvSk8Vr0595a9SU5GvYlPlr25bRa9+femvrn3xr7J97a++ffmvzn31sCJ+BbA+OgWwRlq9sE5+CbBSfg2wXi0NsG5+EbCOfhmwkn4VsNJCFbDeVWGw4iWlsPpTDbECS82xBj2BsQouBbE6UxGxQjqxsVZ+IbFeKvmxaiZhsXZPwbF6fh2xfjV1sYJJybGKfiWxon5Fsap+KbHCRv2xyi4Jsc5+SbHqMiGx9i0Rsfp+QbIGfjmyCn4tsg5eAbIiSvmyMk9dsjZ+MbJCflGySn5Nsk4xCbJaJq2yZjblsmp+NbJufj2yhlnZsopHybKuWl2yun5xssZ+dbLOJzWy4laZsuZb7bLqfn2y7jqFsvI/AbL2fmGy+n55sv4mIbMGLtWzEn5VsxZ+abMmQ8mzKlJFszJTlbNOfl2zVlkBs15+ZbNmfomzbn6Bs3Z+bbOGWQWzilGds44uDbOWTRGzoko1s6p+jbO+foWzwkdds8Z+WbPOJam0Ll21tDJ+ubRKfrW0XkPRtGZ+qbRuXjG0ek7RtH5+kbSWSw20piWttKo1ebSufp20yj0ZtM5+sbTWfq202n6ZtOJ+pbTuKiG09n6htPpRobUGXrG1Ej/JtRZDzbVmftG1an7JtXJVsbWOfr21kn7FtZolZbWmNX21qmFFtbIpcbW6Vgm10l4Ftd4pDbXiQWm15n7NthZ+4bYiPwW2Ml09tjp+1bZOfsG2Vn7ZtmZfcbZuTk22ck8Btr4pVbbKJdG21n7xtuJ+/bbyXwW3Al4RtxZ/GbcafwG3Hn71ty5fS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hWmToIVqlZOFbeVKhXflUIV+5VGFgOVEhYSUloWH5U6FiOVGhYrlSIWQ5VKFkeVHhZTlS4WXiZKFmZPjhZvlTIWc5U+FpOVFhaaRRYWo5UmFqY5GhaqQZIWrjE+FrJbyha6W94Wvj5KFueVWhbrlVIXBmG2FyeVThc2XlYXP5VWF0OVXhdXlWIXc5VuF3eVZheSToYXl5VqF6ZTLherlTYX3j5OF+eVchfrlYYX7kZSF/uVghgLlQYYG5WKGB5FohgrlXYYL5V+GE+VehhafUIYXn0GGGuVkhiLlY4Ytl5aGL+G6hjDlZYY/5WaGTeVnhk6M1YZQi3OGVOVphlWZfIZai5WGXJe4hl6L8YZf5WqGZ+VrhmuSjoZx5WyGeZP4hnuIuIaKieGGi+VxhozlcoaT5W2GlY5chqPlboaklGGGqeVvhqrlcIar5XqGr+V0hrDld4a25XOGxOV1hsbldobHjtaGyeV4hsuSYIbNjHWGzophhtTle4bZil6G2+WBht7lfIbf5YCG5JS4hunlfYbs5X6G7ZVnhu6U2Ibv5YKG+JH7hvnljIb75YiG/onphwDlhocClkmHA+WHhwblhIcI5YWHCeWKhwrljYcN5YuHEeWJhxLlg4cYkneHGuWUhxyWqIcl5ZKHKeWThzTljoc35ZCHO+WRhz/lj4dJkOSHS5hYh0zlmIdO5ZmHU+Wfh1WQSYdX5ZuHWeWeh1/llodg5ZWHY+Wgh2aJ2odo5ZyHauWhh27lnYd05ZqHdpKxh3jll4d/lIiHguWlh42XWoef5aSHouWjh6vlrIev5aaHs+Wuh7qXhoe75bGHveWoh8DlqYfE5a2HxuWwh8flr4fL5aeH0OWqh9Llu4fg5bSH7+Wyh/Lls4f25biH9+W5h/mKSYf7i2GH/uW3iAXloogN5baIDuW6iA/ltYgR5byIFeW+iBblvYgh5cCIIuW/iCPleYgn5cSIMeXBiDblwog55cOIO+XFiECMjIhC5ceIROXGiEaPT4hMjXOITZ+liFLlyIhTj3CIV4pYiFnlyYhbiXGIXY/ViF7lyohhjXSIYuXLiGOI34holVyIa+XMiHCQiohy5dOIdeXQiHeSj4h95dGIfuXOiH+L3IiB5c2IguXUiIiMVYiLkdyIjeXaiJLl1oiWkbOIl+XViJnl2Iie5c+IouXZiKTl24irlO2IruXX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ljKWaJY7kWqWP4iilkCRyZZC6JiWRJWNlkvom5ZM6JmWTY1+lk/ompZQjMCWW5XDllzonZZd6J+WXuiell/ooJZiiUCWY5B3lmSPnJZliteWZuihlmqUhpZs6KOWcIlBlnLoopZzksKWdZfLlnaTqZZ36JyWeJeklnqMr5Z9l3qWhYv3loaXspaIjEeWipHglovkQJaN6KSWjopLlo+Qj5aUinWWleimlpfop5aY6KWWmYyElpuN25acj+GWoIlClqOX15an6KmWqOeslqroqJaw6KyWseiqlrLoq5a06K2WtuiulreX6pa46K+WueiwlruQx5a8lLmWwJCdlsGK5ZbEl1mWxYnrlsaPV5bHjNmWyeizlsvospbMjpOWzei0ls7osZbRjkeW1ei4ltblq5bZmdSW25CXltzotpbil6OW45PvluiJSpbqkOGW6460lvCVtZbyiV+W9pfrlveXi5b56LmW+5NklwCO+ZcE6LqXBui7lweQa5cI6LyXCpfslw3ot5cO6L6XD+jAlxHov5cT6L2XFujBlxnowpcckZqXHonglyTow5cnlraXKujElzDoxZcymEmXOJ5Qlznoxpc96MeXPujIl0LozJdE6MmXRujKl0joy5dJ6M2XUpDCl1aW9ZdZkMOXXOjOl16U8Zdg6M+XYepyl2KWypdk6NCXZujRl2jo0pdpinaXa+jUl22QeJdx6NWXdIxDl3no1pd66NqXfOjYl4Ho2ZeEipOXhejXl4bo25eL6NyXjYjGl4/o3ZeQ6N6XmI/il5zo35egi2aXo+jil6bo4Zeo6OCXq+aRl62V2pez6OOXtOjkl8Po5ZfG6OaXyOjnl8vo6JfTitiX3Ojpl+3o6pfulEKX8ujsl/OJuZf16O+X9ujul/uJQ5f/i7+YAZXFmAKSuJgDjaCYBY2AmAaPh5gIkHuYDOjxmA/o8JgQl2GYEYrmmBKU0JgTk9qYF5CcmBiXzJgajHqYIej0mCTo85gslmqYLZOqmDSJb5g36PWYOOjymDuVcJg8l4qYPej2mEbo95hL6PmYTJHomE2KephOinuYT+j4mFSK55hVjLCYWIromFuTXphel96YZ4zamGvo+phv6PuYcOj8mHHpQJhz6UKYdOlBmKiVl5iq6UOYr+lEmLHpRZi26UaYw+lImMTpR5jG6UmY25TymNzjypjfkEiY4otRmOnpSpjr6UuY7ZmqmO6fWpjvlNGY8oj5mPSIuZj8jpSY/ZZPmP6P/JkD6UyZBZbdmQnpTZkKl3uZDIlhmRCOYJkS6U6ZE4nsmRTpT5kY6VCZHelSmR7pU5kg6VWZIelRmSTpVJkoitmZLOlWmS7pV5k96ViZPulZmULpWplF6VyZSelbmUvpXplM6WGZUOldmVHpX5lS6WCZVelimVeLwJmWjvGZl+ljmZjpZJmZjYGZpellmaiKXZmslG6Zrelmma7pZ5mzknmZtJPpmbzpaJnBlJ2ZxJHKmcWJd5nGi+yZyIvtmdCSk5nR6W2Z0ovumdWJ7ZnY6WyZ2+lqmd3pa5nf6WmZ4ul3me3pbpnu6W+Z8elwmfLpcZn46XOZ++lymf+PeJoB6XSaBel2mg6LUpoP6XWaEpGbmhOMsZoZ6XiaKJHLmivpeZowk6uaN+l6mj7pgJpA6X2aQul8mkPpfppF6XuaTemCmlXpgZpX6YSaWovBmlvpg5pf6YWaYumGmmTpiJpl6YeaaemJmmrpi5pr6YqaqI2cmq3pjJqw6Y2auIpbmrzpjprA6Y+axJCRms/pkJrR6ZGa0+mSmtTpk5rYjYKa3umUmt/plZri6Zaa4+mXmubpmJrqlK+a6+mamu2VRZru6Zua7+mZmvHpnZr06Zya9+memvvpn5sG6aCbGOmhmxrpopsf6aObIumkmyPppZsl6aabJ+mnmyjpqJsp6ambKumqmy7pq5sv6aybMZ9UmzLprZs74vabPItTm0GKQJtCjbCbQ+mvm0TprptFlqObTemxm07psptP6bCbUemzm1SWgptY6bSbWoubm2+YRJt06bWbg+m3m46IvJuR6bibkpWpm5PptpuW6bmbl+m6m5/pu5ug6bybqOm9m6qWjpurjkybrY34m66RTpu06b6buenBm8Dpv5vG6cKbyYzvm8rpwJvP6cOb0enEm9LpxZvU6cmb1o5Jm9uR4pvh6cqb4unHm+Ppxpvk6cib6Ix+m/Dpzpvx6c2b8unMm/WIsZwE6dicBunUnAjp1ZwJ6dGcCunXnAzp05wNioKcEJhrnBLp1pwT6dKcFOnQnBXpz5wb6dqcIendnCTp3Jwl6ducLZVonC7p2ZwviPGcMOnenDLp4Jw5io+cOunLnDuJVpw+6eKcRunhnEfp35xIkkycUpaQnFeX2Jxa6eOcYOnknGfp5Zx26eaceOnnnOWSuZzn6eic6ZS1nOvp7Zzs6emc8OnqnPOWUJz0lsKc9pPOnQPp7p0G6e+dB5O8nQjp7J0J6eudDomonRLp950V6fadG4mVnR/p9J0j6fOdJunxnSiKm50q6fCdK46wnSyJp507jYOdPun6nT/p+Z1B6fidROn1nUbp+51I6fydUOpEnVHqQ51Z6kWdXIlMnV3qQJ1e6kGdYI2UnWGWt51k6kKdbJZRnW/qSp1y6kadeupLnYfqSJ2J6kedj4x7nZrqTJ2k6k2dqepOnavqSZ2v6fKdsupPnbSS35246lOduupUnbvqUp3B6lGdwupXncTqUJ3G6lWdz+pWndPqWZ3Z6lid5upbne3qXJ3v6l2d8phonfjqWp35kemd+o3rnf3qXp4a6l+eG+pgnh7qYZ516mKeeIyynnnqY5596mSef46tnoHqZZ6I6maei+pnnozqaJ6R6muekuppnpOYW56V6mqel5ftnp3qbJ6fl9mepeptnqaUnp6p6m6equpwnq3qcZ646m+euY2NnrqWy567loOevJv1nr6fgJ6/lpuexImpnszqc57Ni2+ezup0ns/qdZ7Q6nae0o2VntTqd57Y4NKe2ZbZntuR4Z7c6nie3ep6nt7qeZ7g6nue5ep8nujqfZ7v6n6e9OqAnvbqgZ736oKe+eqDnvvqhJ786oWe/eqGnwfqh58I6oifDpNDnxOM258V6oqfIJFsnyHqi58s6oyfO5VAnz7qjZ9K6o6fS+JWn07m2J9P6OufUuqPn1TqkJ9f6pKfYOqTn2HqlJ9il+6fY+qRn2bqlZ9n6pafauqYn2zql59y6pqfduqbn3fqmZ+Nl7Sfleqcn5zqnZ+d4nOfoOqe/wGBSf8DgZT/BIGQ/wWBk/8GgZX/CIFp/wmBav8KgZb/C4F7/wyBQ/8OgUT/D4Fe/xCCT/8RglD/EoJR/xOCUv8UglP/FYJU/xaCVf8Xglb/GIJX/xmCWP8agUb/G4FH/xyBg/8dgYH/HoGE/x+BSP8ggZf/IYJg/yKCYf8jgmL/JIJj/yWCZP8mgmX/J4Jm/yiCZ/8pgmj/KoJp/yuCav8sgmv/LYJs/y6Cbf8vgm7/MIJv/zGCcP8ygnH/M4Jy/zSCc/81gnT/NoJ1/zeCdv84gnf/OYJ4/zqCef87gW3/PIFf/z2Bbv8+gU//P4FR/0CBTf9BgoH/QoKC/0OCg/9EgoT/RYKF/0aChv9Hgof/SIKI/0mCif9Kgor/S4KL/0yCjP9Ngo3/ToKO/0+Cj/9QgpD/UYKR/1KCkv9TgpP/VIKU/1WClf9Wgpb/V4KX/1iCmP9Zgpn/WoKa/1uBb/9cgWL/XYFw/2EAof9iAKL/YwCj/2QApP9lAKX/ZgCm/2cAp/9oAKj/aQCp/2oAqv9rAKv/bACs/20Arf9uAK7/bwCv/3AAsP9xALH/cgCy/3MAs/90ALT/dQC1/3YAtv93ALf/eAC4/3kAuf96ALr/ewC7/3wAvP99AL3/fgC+/38Av/+AAMD/gQDB/4IAwv+DAMP/hADE/4UAxf+GAMb/hwDH/4gAyP+JAMn/igDK/4sAy/+MAMz/jQDN/44Azv+PAM//kADQ/5EA0f+SANL/kwDT/5QA1P+VANX/lgDW/5cA1/+YANj/mQDZ/5oA2v+bANv/nADc/50A3f+eAN7/nwDf/+OBUP/lgY8=",7070),
l.qrcode.stringToBytesFuncs["UTF-8"]=function(n){function e(n){for(var e=[],t=0;t<n.length;t++){var r=n.charCodeAt(t);r<128?e.push(r):r<2048?e.push(192|r>>6,128|63&r):r<55296||r>=57344?e.push(224|r>>12,128|r>>6&63,128|63&r):(t++,r=65536+((1023&r)<<10|1023&n.charCodeAt(t)),e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r))}return e}return e(n)}}(),function(t){o=[],i=t,u="function"==typeof i?i.apply(e,o):i,!(void 0!==u&&(n.exports=u))}(function(){return{QRCode:l.qrcode,QRUtil:l.QRUtil}})},function(n,e,t){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}e.__esModule=!0;var i=t(23),o=r(i),u=t(59),a=r(u),l="function"==typeof a.default&&"symbol"==typeof o.default?function(n){return typeof n}:function(n){return n&&"function"==typeof a.default&&n.constructor===a.default&&n!==a.default.prototype?"symbol":typeof n};e.default="function"==typeof a.default&&"symbol"===l(o.default)?function(n){return"undefined"==typeof n?"undefined":l(n)}:function(n){return n&&"function"==typeof a.default&&n.constructor===a.default&&n!==a.default.prototype?"symbol":"undefined"==typeof n?"undefined":l(n)}},function(n,e,t){n.exports={default:t(24),__esModule:!0}},function(n,e,t){t(25),t(54),n.exports=t(58).f("iterator")},function(n,e,t){"use strict";var r=t(26)(!0);t(29)(String,"String",function(n){this._t=String(n),this._i=0},function(){var n,e=this._t,t=this._i;return t>=e.length?{value:void 0,done:!0}:(n=r(e,t),this._i+=n.length,{value:n,done:!1})})},function(n,e,t){var r=t(27),i=t(28);n.exports=function(n){return function(e,t){var o,u,a=String(i(e)),l=r(t),f=a.length;return l<0||l>=f?n?"":void 0:(o=a.charCodeAt(l),o<55296||o>56319||l+1===f||(u=a.charCodeAt(l+1))<56320||u>57343?n?a.charAt(l):o:n?a.slice(l,l+2):(o-55296<<10)+(u-56320)+65536)}}},function(n,e){var t=Math.ceil,r=Math.floor;n.exports=function(n){return isNaN(n=+n)?0:(n>0?r:t)(n)}},function(n,e){n.exports=function(n){if(void 0==n)throw TypeError("Can't call method on  "+n);return n}},function(n,e,t){"use strict";var r=t(30),i=t(6),o=t(31),u=t(11),a=t(32),l=t(33),f=t(34),m=t(50),p=t(52),c=t(51)("iterator"),g=!([].keys&&"next"in[].keys()),Z="@@iterator",h="keys",d="values",s=function(){return this};n.exports=function(n,e,t,j,W,O,k){f(t,e,j);var Y,J,y,b=function(n){if(!g&&n in A)return A[n];switch(n){case h:return function(){return new t(this,n)};case d:return function(){return new t(this,n)}}return function(){return new t(this,n)}},V=e+" Iterator",v=W==d,X=!1,A=n.prototype,I=A[c]||A[Z]||W&&A[W],T=I||b(W),C=W?v?b("entries"):T:void 0,B="Array"==e?A.entries||I:I;if(B&&(y=p(B.call(new n)),y!==Object.prototype&&(m(y,V,!0),r||a(y,c)||u(y,c,s))),v&&I&&I.name!==d&&(X=!0,T=function(){return I.call(this)}),r&&!k||!g&&!X&&A[c]||u(A,c,T),l[e]=T,l[V]=s,W)if(Y={values:v?T:b(d),keys:O?T:b(h),entries:C},k)for(J in Y)J in A||o(A,J,Y[J]);else i(i.P+i.F*(g||X),e,Y);return Y}},function(n,e){n.exports=!0},function(n,e,t){n.exports=t(11)},function(n,e){var t={}.hasOwnProperty;n.exports=function(n,e){return t.call(n,e)}},function(n,e){n.exports={}},function(n,e,t){"use strict";var r=t(35),i=t(20),o=t(50),u={};t(11)(u,t(51)("iterator"),function(){return this}),n.exports=function(n,e,t){n.prototype=r(u,{next:i(1,t)}),o(n,e+" Iterator")}},function(n,e,t){var r=t(13),i=t(36),o=t(48),u=t(45)("IE_PROTO"),a=function(){},l="prototype",f=function(){var n,e=t(18)("iframe"),r=o.length,i="<",u=">";for(e.style.display="none",t(49).appendChild(e),e.src="javascript:",n=e.contentWindow.document,n.open(),n.write(i+"script"+u+"document.F=Object"+i+"/script"+u),n.close(),f=n.F;r--;)delete f[l][o[r]];return f()};n.exports=Object.create||function(n,e){var t;return null!==n?(a[l]=r(n),t=new a,a[l]=null,t[u]=n):t=f(),void 0===e?t:i(t,e)}},function(n,e,t){var r=t(12),i=t(13),o=t(37);n.exports=t(16)?Object.defineProperties:function(n,e){i(n);for(var t,u=o(e),a=u.length,l=0;a>l;)r.f(n,t=u[l++],e[t]);return n}},function(n,e,t){var r=t(38),i=t(48);n.exports=Object.keys||function(n){return r(n,i)}},function(n,e,t){var r=t(32),i=t(39),o=t(42)(!1),u=t(45)("IE_PROTO");n.exports=function(n,e){var t,a=i(n),l=0,f=[];for(t in a)t!=u&&r(a,t)&&f.push(t);for(;e.length>l;)r(a,t=e[l++])&&(~o(f,t)||f.push(t));return f}},function(n,e,t){var r=t(40),i=t(28);n.exports=function(n){return r(i(n))}},function(n,e,t){var r=t(41);n.exports=Object("z").propertyIsEnumerable(0)?Object:function(n){return"String"==r(n)?n.split(""):Object(n)}},function(n,e){var t={}.toString;n.exports=function(n){return t.call(n).slice(8,-1)}},function(n,e,t){var r=t(39),i=t(43),o=t(44);n.exports=function(n){return function(e,t,u){var a,l=r(e),f=i(l.length),m=o(u,f);if(n&&t!=t){for(;f>m;)if(a=l[m++],a!=a)return!0}else for(;f>m;m++)if((n||m in l)&&l[m]===t)return n||m||0;return!n&&-1}}},function(n,e,t){var r=t(27),i=Math.min;n.exports=function(n){return n>0?i(r(n),9007199254740991):0}},function(n,e,t){var r=t(27),i=Math.max,o=Math.min;n.exports=function(n,e){return n=r(n),n<0?i(n+e,0):o(n,e)}},function(n,e,t){var r=t(46)("keys"),i=t(47);n.exports=function(n){return r[n]||(r[n]=i(n))}},function(n,e,t){var r=t(7),i="__core-js_shared__",o=r[i]||(r[i]={});n.exports=function(n){return o[n]||(o[n]={})}},function(n,e){var t=0,r=Math.random();n.exports=function(n){return"Symbol(".concat(void 0===n?"":n,")_",(++t+r).toString(36))}},function(n,e){n.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(n,e,t){n.exports=t(7).document&&document.documentElement},function(n,e,t){var r=t(12).f,i=t(32),o=t(51)("toStringTag");n.exports=function(n,e,t){n&&!i(n=t?n:n.prototype,o)&&r(n,o,{configurable:!0,value:e})}},function(n,e,t){var r=t(46)("wks"),i=t(47),o=t(7).Symbol,u="function"==typeof o,a=n.exports=function(n){return r[n]||(r[n]=u&&o[n]||(u?o:i)("Symbol."+n))};a.store=r},function(n,e,t){var r=t(32),i=t(53),o=t(45)("IE_PROTO"),u=Object.prototype;n.exports=Object.getPrototypeOf||function(n){return n=i(n),r(n,o)?n[o]:"function"==typeof n.constructor&&n instanceof n.constructor?n.constructor.prototype:n instanceof Object?u:null}},function(n,e,t){var r=t(28);n.exports=function(n){return Object(r(n))}},function(n,e,t){t(55);for(var r=t(7),i=t(11),o=t(33),u=t(51)("toStringTag"),a=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],l=0;l<5;l++){var f=a[l],m=r[f],p=m&&m.prototype;p&&!p[u]&&i(p,u,f),o[f]=o.Array}},function(n,e,t){"use strict";var r=t(56),i=t(57),o=t(33),u=t(39);n.exports=t(29)(Array,"Array",function(n,e){this._t=u(n),this._i=0,this._k=e},function(){var n=this._t,e=this._k,t=this._i++;return!n||t>=n.length?(this._t=void 0,i(1)):"keys"==e?i(0,t):"values"==e?i(0,n[t]):i(0,[t,n[t]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(n,e){n.exports=function(){}},function(n,e){n.exports=function(n,e){return{value:e,done:!!n}}},function(n,e,t){e.f=t(51)},function(n,e,t){n.exports={default:t(60),__esModule:!0}},function(n,e,t){t(61),t(72),t(73),t(74),n.exports=t(8).Symbol},function(n,e,t){"use strict";var r=t(7),i=t(32),o=t(16),u=t(6),a=t(31),l=t(62).KEY,f=t(17),m=t(46),p=t(50),c=t(47),g=t(51),Z=t(58),h=t(63),d=t(64),s=t(65),j=t(68),W=t(13),O=t(39),k=t(19),Y=t(20),J=t(35),y=t(69),b=t(71),V=t(12),v=t(37),X=b.f,A=V.f,I=y.f,T=r.Symbol,C=r.JSON,B=C&&C.stringify,G="prototype",S=g("_hidden"),U=g("toPrimitive"),F={}.propertyIsEnumerable,w=m("symbol-registry"),R=m("symbols"),q=m("op-symbols"),K=Object[G],P="function"==typeof T,L=r.QObject,M=!L||!L[G]||!L[G].findChild,N=o&&f(function(){return 7!=J(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(n,e,t){var r=X(K,e);r&&delete K[e],A(n,e,t),r&&n!==K&&A(K,e,r)}:A,x=function(n){var e=R[n]=J(T[G]);return e._k=n,e},D=P&&"symbol"==typeof T.iterator?function(n){return"symbol"==typeof n}:function(n){return n instanceof T},H=function(n,e,t){return n===K&&H(q,e,t),W(n),e=k(e,!0),W(t),i(R,e)?(t.enumerable?(i(n,S)&&n[S][e]&&(n[S][e]=!1),t=J(t,{enumerable:Y(0,!1)})):(i(n,S)||A(n,S,Y(1,{})),n[S][e]=!0),N(n,e,t)):A(n,e,t)},E=function(n,e){W(n);for(var t,r=s(e=O(e)),i=0,o=r.length;o>i;)H(n,t=r[i++],e[t]);return n},Q=function(n,e){return void 0===e?J(n):E(J(n),e)},z=function(n){var e=F.call(this,n=k(n,!0));return!(this===K&&i(R,n)&&!i(q,n))&&(!(e||!i(this,n)||!i(R,n)||i(this,S)&&this[S][n])||e)},_=function(n,e){if(n=O(n),e=k(e,!0),n!==K||!i(R,e)||i(q,e)){var t=X(n,e);return!t||!i(R,e)||i(n,S)&&n[S][e]||(t.enumerable=!0),t}},$=function(n){for(var e,t=I(O(n)),r=[],o=0;t.length>o;)i(R,e=t[o++])||e==S||e==l||r.push(e);return r},nn=function(n){for(var e,t=n===K,r=I(t?q:O(n)),o=[],u=0;r.length>u;)!i(R,e=r[u++])||t&&!i(K,e)||o.push(R[e]);return o};P||(T=function(){if(this instanceof T)throw TypeError("Symbol is not a constructor!");var n=c(arguments.length>0?arguments[0]:void 0),e=function(t){this===K&&e.call(q,t),i(this,S)&&i(this[S],n)&&(this[S][n]=!1),N(this,n,Y(1,t))};return o&&M&&N(K,n,{configurable:!0,set:e}),x(n)},a(T[G],"toString",function(){return this._k}),b.f=_,V.f=H,t(70).f=y.f=$,t(67).f=z,t(66).f=nn,o&&!t(30)&&a(K,"propertyIsEnumerable",z,!0),Z.f=function(n){return x(g(n))}),u(u.G+u.W+u.F*!P,{Symbol:T});for(var en="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tn=0;en.length>tn;)g(en[tn++]);for(var en=v(g.store),tn=0;en.length>tn;)h(en[tn++]);u(u.S+u.F*!P,"Symbol",{for:function(n){return i(w,n+="")?w[n]:w[n]=T(n)},keyFor:function(n){if(D(n))return d(w,n);throw TypeError(n+" is not a symbol!")},useSetter:function(){M=!0},useSimple:function(){M=!1}}),u(u.S+u.F*!P,"Object",{create:Q,defineProperty:H,defineProperties:E,getOwnPropertyDescriptor:_,getOwnPropertyNames:$,getOwnPropertySymbols:nn}),C&&u(u.S+u.F*(!P||f(function(){var n=T();return"[null]"!=B([n])||"{}"!=B({a:n})||"{}"!=B(Object(n))})),"JSON",{stringify:function(n){if(void 0!==n&&!D(n)){for(var e,t,r=[n],i=1;arguments.length>i;)r.push(arguments[i++]);return e=r[1],"function"==typeof e&&(t=e),!t&&j(e)||(e=function(n,e){if(t&&(e=t.call(this,n,e)),!D(e))return e}),r[1]=e,B.apply(C,r)}}}),T[G][U]||t(11)(T[G],U,T[G].valueOf),p(T,"Symbol"),p(Math,"Math",!0),p(r.JSON,"JSON",!0)},function(n,e,t){var r=t(47)("meta"),i=t(14),o=t(32),u=t(12).f,a=0,l=Object.isExtensible||function(){return!0},f=!t(17)(function(){return l(Object.preventExtensions({}))}),m=function(n){u(n,r,{value:{i:"O"+ ++a,w:{}}})},p=function(n,e){if(!i(n))return"symbol"==typeof n?n:("string"==typeof n?"S":"P")+n;if(!o(n,r)){if(!l(n))return"F";if(!e)return"E";m(n)}return n[r].i},c=function(n,e){if(!o(n,r)){if(!l(n))return!0;if(!e)return!1;m(n)}return n[r].w},g=function(n){return f&&Z.NEED&&l(n)&&!o(n,r)&&m(n),n},Z=n.exports={KEY:r,NEED:!1,fastKey:p,getWeak:c,onFreeze:g}},function(n,e,t){var r=t(7),i=t(8),o=t(30),u=t(58),a=t(12).f;n.exports=function(n){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==n.charAt(0)||n in e||a(e,n,{value:u.f(n)})}},function(n,e,t){var r=t(37),i=t(39);n.exports=function(n,e){for(var t,o=i(n),u=r(o),a=u.length,l=0;a>l;)if(o[t=u[l++]]===e)return t}},function(n,e,t){var r=t(37),i=t(66),o=t(67);n.exports=function(n){var e=r(n),t=i.f;if(t)for(var u,a=t(n),l=o.f,f=0;a.length>f;)l.call(n,u=a[f++])&&e.push(u);return e}},function(n,e){e.f=Object.getOwnPropertySymbols},function(n,e){e.f={}.propertyIsEnumerable},function(n,e,t){var r=t(41);n.exports=Array.isArray||function(n){return"Array"==r(n)}},function(n,e,t){var r=t(39),i=t(70).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(n){try{return i(n)}catch(n){return u.slice()}};n.exports.f=function(n){return u&&"[object Window]"==o.call(n)?a(n):i(r(n))}},function(n,e,t){var r=t(38),i=t(48).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(n){return r(n,i)}},function(n,e,t){var r=t(67),i=t(20),o=t(39),u=t(19),a=t(32),l=t(15),f=Object.getOwnPropertyDescriptor;e.f=t(16)?f:function(n,e){if(n=o(n),e=u(e,!0),l)try{return f(n,e)}catch(n){}if(a(n,e))return i(!r.f.call(n,e),n[e])}},function(n,e){},function(n,e,t){t(63)("asyncIterator")},function(n,e,t){t(63)("observable")},function(n,e,t){"use strict";function r(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(e,"__esModule",{value:!0});var i=t(1),o=r(i),u=t(2),a=r(u),l=function(){function n(){(0,o.default)(this,n)}return(0,a.default)(n,null,[{key:"createCanvas",value:function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"fill",r=document.createElement("canvas");switch(r.width=n,r.height=n,t){case"fill":r.getContext("2d").drawImage(e,0,0,n,n);break;case"scale_to_fit":var i=e.width/e.height,o=r.width,u=o/i;u>r.height&&(u=r.height,o=u*i);var a=.5*(r.width-o),l=.5*(r.height-u);r.getContext("2d").drawImage(e,a,l,o,u)}return r}},{key:"threshold",value:function(n,e,t,r){return.2126*n+.7152*e+.0722*t>=r?255:0}}]),n}();e.default=l}])});
//# sourceMappingURL=qart.min.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// ---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
// ---------------------------------------------------------------------

var qrcode = (function () {
  // ---------------------------------------------------------------------
  // qrcode
  // ---------------------------------------------------------------------

  /**
   * qrcode
   * @param typeNumber 1 to 40
   * @param errorCorrectionLevel 'L','M','Q','H'
   */
  var qrcode = function (typeNumber, errorCorrectionLevel) {
    var PAD0 = 0xEC
    var PAD1 = 0x11

    var _typeNumber = typeNumber
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel]
    var _modules = null
    var _moduleCount = 0
    var _dataCache = null
    var _dataList = new Array()

    var _this = {}

    var makeImpl = function (test, maskPattern) {
      _moduleCount = _typeNumber * 4 + 17
      _modules = (function (moduleCount) {
        var modules = new Array(moduleCount)
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount)
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null
          }
        }
        return modules
      }(_moduleCount))

      setupPositionProbePattern(0, 0)
      setupPositionProbePattern(_moduleCount - 7, 0)
      setupPositionProbePattern(0, _moduleCount - 7)
      setupPositionAdjustPattern()
      setupTimingPattern()
      setupTypeInfo(test, maskPattern)

      if (_typeNumber >= 7) {
        setupTypeNumber(test)
      }

      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList)
      }

      mapData(_dataCache, maskPattern)
    }

    var setupPositionProbePattern = function (row, col) {
      for (var r = -1; r <= 7; r += 1) {
        if (row + r <= -1 || _moduleCount <= row + r) continue

        for (var c = -1; c <= 7; c += 1) {
          if (col + c <= -1 || _moduleCount <= col + c) continue

          if ((r >= 0 && r <= 6 && (c == 0 || c == 6)) ||
              (c >= 0 && c <= 6 && (r == 0 || r == 6)) ||
              (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            _modules[row + r][col + c] = true
          } else {
            _modules[row + r][col + c] = false
          }
        }
      }
    }

    var getBestMaskPattern = function () {
      var minLostPoint = 0
      var pattern = 0

      for (var i = 0; i < 8; i += 1) {
        makeImpl(true, i)

        var lostPoint = QRUtil.getLostPoint(_this)

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint
          pattern = i
        }
      }

      return pattern
    }

    var setupTimingPattern = function () {
      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue
        }
        _modules[r][6] = (r % 2 == 0)
      }

      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue
        }
        _modules[6][c] = (c % 2 == 0)
      }
    }

    var setupPositionAdjustPattern = function () {
      var pos = QRUtil.getPatternPosition(_typeNumber)

      for (var i = 0; i < pos.length; i += 1) {
        for (var j = 0; j < pos.length; j += 1) {
          var row = pos[i]
          var col = pos[j]

          if (_modules[row][col] != null) {
            continue
          }

          for (var r = -2; r <= 2; r += 1) {
            for (var c = -2; c <= 2; c += 1) {
              if (r == -2 || r == 2 || c == -2 || c == 2 ||
                  (r == 0 && c == 0)) {
                _modules[row + r][col + c] = true
              } else {
                _modules[row + r][col + c] = false
              }
            }
          }
        }
      }
    }

    var setupTypeNumber = function (test) {
      var bits = QRUtil.getBCHTypeNumber(_typeNumber)

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ((bits >> i) & 1) == 1)
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod
      }

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ((bits >> i) & 1) == 1)
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod
      }
    }

    var setupTypeInfo = function (test, maskPattern) {
      var data = (_errorCorrectionLevel << 3) | maskPattern
      var bits = QRUtil.getBCHTypeInfo(data)

      // vertical
      for (var i = 0; i < 15; i += 1) {
        var mod = (!test && ((bits >> i) & 1) == 1)

        if (i < 6) {
          _modules[i][8] = mod
        } else if (i < 8) {
          _modules[i + 1][8] = mod
        } else {
          _modules[_moduleCount - 15 + i][8] = mod
        }
      }

      // horizontal
      for (var i = 0; i < 15; i += 1) {
        var mod = (!test && ((bits >> i) & 1) == 1)

        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod
        } else {
          _modules[8][15 - i - 1] = mod
        }
      }

      // fixed module
      _modules[_moduleCount - 8][8] = (!test)
    }

    var mapData = function (data, maskPattern) {
      var inc = -1
      var row = _moduleCount - 1
      var bitIndex = 7
      var byteIndex = 0
      var maskFunc = QRUtil.getMaskFunction(maskPattern)

      for (var col = _moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col -= 1

        while (true) {
          for (var c = 0; c < 2; c += 1) {
            if (_modules[row][col - c] == null) {
              var dark = false

              if (byteIndex < data.length) {
                dark = (((data[byteIndex] >>> bitIndex) & 1) == 1)
              }

              var mask = maskFunc(row, col - c)

              if (mask) {
                dark = !dark
              }

              _modules[row][col - c] = dark
              bitIndex -= 1

              if (bitIndex == -1) {
                byteIndex += 1
                bitIndex = 7
              }
            }
          }

          row += inc

          if (row < 0 || _moduleCount <= row) {
            row -= inc
            inc = -inc
            break
          }
        }
      }
    }

    var createBytes = function (buffer, rsBlocks) {
      var offset = 0

      var maxDcCount = 0
      var maxEcCount = 0

      var dcdata = new Array(rsBlocks.length)
      var ecdata = new Array(rsBlocks.length)

      for (var r = 0; r < rsBlocks.length; r += 1) {
        var dcCount = rsBlocks[r].dataCount
        var ecCount = rsBlocks[r].totalCount - dcCount

        maxDcCount = Math.max(maxDcCount, dcCount)
        maxEcCount = Math.max(maxEcCount, ecCount)

        dcdata[r] = new Array(dcCount)

        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset]
        }
        offset += dcCount

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount)
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1)

        var modPoly = rawPoly.mod(rsPoly)
        ecdata[r] = new Array(rsPoly.getLength() - 1)
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length
          ecdata[r][i] = (modIndex >= 0) ? modPoly.getAt(modIndex) : 0
        }
      }

      var totalCodeCount = 0
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount
      }

      var data = new Array(totalCodeCount)
      var index = 0

      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i]
            index += 1
          }
        }
      }

      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i]
            index += 1
          }
        }
      }

      return data
    }

    function CodeLengthOverflow (message) {
      this.message = message
      this.name = 'CodeLengthOverflow'
    }

    // CodeLengthOverflow.prototype = new Error();

    var createData = function (typeNumber, errorCorrectionLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel)

      var buffer = qrBitBuffer()

      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i]
        buffer.put(data.getMode(), 4)
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber))
        data.write(buffer)
      }

      // calc num max data.
      var totalDataCount = 0
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount
      }

      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new CodeLengthOverflow('code length overflow. (' +
          buffer.getLengthInBits() +
          '>' +
          totalDataCount * 8 +
          ')')
      }

      // end code
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4)
      }

      // padding
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false)
      }

      // padding
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break
        }
        buffer.put(PAD0, 8)

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break
        }
        buffer.put(PAD1, 8)
      }

      return createBytes(buffer, rsBlocks)
    }

    _this.addData = function (data, mode) {
      mode = mode || 'Byte'

      var newData = null

      switch (mode) {
        case 'Numeric' :
          newData = qrNumber(data)
          break
        case 'Alphanumeric' :
          newData = qrAlphaNum(data)
          break
        case 'Byte' :
          newData = qr8BitByte(data)
          break
        case 'Kanji' :
          newData = qrKanji(data)
          break
        default :
          throw 'mode:' + mode
      }

      _dataList.push(newData)
      _dataCache = null
    }

    _this.isDark = function (row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw new Error(row + ',' + col)
      }
      return _modules[row][col]
    }

    _this.getModuleCount = function () {
      return _moduleCount
    }

    _this.make = function () {
      makeImpl(false, getBestMaskPattern())
    }

    _this.createTableTag = function (cellSize, margin) {
      cellSize = cellSize || 2
      margin = (typeof margin === 'undefined') ? cellSize * 4 : margin

      var qrHtml = ''

      qrHtml += '<table style="'
      qrHtml += ' border-width: 0px; border-style: none;'
      qrHtml += ' border-collapse: collapse;'
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;'
      qrHtml += '">'
      qrHtml += '<tbody>'

      for (var r = 0; r < _this.getModuleCount(); r += 1) {
        qrHtml += '<tr>'

        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="'
          qrHtml += ' border-width: 0px; border-style: none;'
          qrHtml += ' border-collapse: collapse;'
          qrHtml += ' padding: 0px; margin: 0px;'
          qrHtml += ' width: ' + cellSize + 'px;'
          qrHtml += ' height: ' + cellSize + 'px;'
          qrHtml += ' background-color: '
          qrHtml += _this.isDark(r, c) ? '#000000' : '#ffffff'
          qrHtml += ';'
          qrHtml += '"/>'
        }

        qrHtml += '</tr>'
      }

      qrHtml += '</tbody>'
      qrHtml += '</table>'

      return qrHtml
    }

    _this.createSvgTag = function (cellSize, margin) {
      cellSize = cellSize || 2
      margin = (typeof margin === 'undefined') ? cellSize * 4 : margin
      var size = _this.getModuleCount() * cellSize + margin * 2
      var c, mc, r, mr, qrSvg = '', rect

      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z '

      qrSvg += '<svg'
      qrSvg += ' width="' + size + 'px"'
      qrSvg += ' height="' + size + 'px"'
      qrSvg += ' xmlns="http://www.w3.org/2000/svg"'
      qrSvg += '>'
      qrSvg += '<path d="'

      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c)) {
            mc = c * cellSize + margin
            qrSvg += 'M' + mc + ',' + mr + rect
          }
        }
      }

      qrSvg += '" stroke="transparent" fill="black"/>'
      qrSvg += '</svg>'

      return qrSvg
    }

    _this.createImgTag = function (cellSize, margin) {
      cellSize = cellSize || 2
      margin = (typeof margin === 'undefined') ? cellSize * 4 : margin

      var size = _this.getModuleCount() * cellSize + margin * 2
      var min = margin
      var max = size - margin

      return createImgTag(size, size, function (x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor((x - min) / cellSize)
          var r = Math.floor((y - min) / cellSize)
          return _this.isDark(r, c) ? 0 : 1
        } else {
          return 1
        }
      })
    }

    _this.createImgObject = function (cellSize, margin) {
      cellSize = cellSize || 2
      margin = (typeof margin === 'undefined') ? cellSize * 4 : margin

      var size = _this.getModuleCount() * cellSize + margin * 2
      var min = margin
      var max = size - margin

      return createImgObject(size, size, function (x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor((x - min) / cellSize)
          var r = Math.floor((y - min) / cellSize)
          return _this.isDark(r, c) ? 0 : 1
        } else {
          return 1
        }
      })
    }

    return _this
  }

  var createImgObject = function (width, height, getPixel) {
    var gif = gifImage(width, height)
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y))
      }
    }

    var b = byteArrayOutputStream()
    gif.write(b)

    var base64 = base64EncodeOutputStream()
    var bytes = b.toByteArray()
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i])
    }
    base64.flush()

    var img = new Image()
    img.src = 'data:image/gif;base64,' + base64
    img.width = width
    img.height = height

    return img
  }

  // ---------------------------------------------------------------------
  // qrcode.stringToBytes
  // ---------------------------------------------------------------------

  qrcode.stringToBytesFuncs = {
    'default': function (s) {
      var bytes = []
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i)
        bytes.push(c & 0xff)
      }
      return bytes
    }
  }

  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default']

  // ---------------------------------------------------------------------
  // qrcode.createStringToBytes
  // ---------------------------------------------------------------------

  /**
   * @param unicodeData base64 string of byte array.
   * [16bit Unicode],[16bit Bytes], ...
   * @param numChars
   */
  qrcode.createStringToBytes = function (unicodeData, numChars) {
    // create conversion map.

    var unicodeMap = (function () {
      var bin = base64DecodeInputStream(unicodeData)
      var read = function () {
        var b = bin.read()
        if (b == -1) throw new Error()
        return b
      }

      var count = 0
      var unicodeMap = {}
      while (true) {
        var b0 = bin.read()
        if (b0 == -1) break
        var b1 = read()
        var b2 = read()
        var b3 = read()
        var k = String.fromCharCode((b0 << 8) | b1)
        var v = (b2 << 8) | b3
        unicodeMap[k] = v
        count += 1
      }
      if (count != numChars) {
        throw new Error(count + ' != ' + numChars)
      }

      return unicodeMap
    }())

    var unknownChar = '?'.charCodeAt(0)

    return function (s) {
      var bytes = new Array()
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i)
        if (c < 128) {
          bytes.push(c)
        } else {
          var b = unicodeMap[s.charAt(i)]
          if (typeof b === 'number') {
            if ((b & 0xff) == b) {
              // 1byte
              bytes.push(b)
            } else {
              // 2bytes
              bytes.push(b >>> 8)
              bytes.push(b & 0xff)
            }
          } else {
            bytes.push(unknownChar)
          }
        }
      }
      return bytes
    }
  }

  // ---------------------------------------------------------------------
  // QRMode
  // ---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3
  }

  // ---------------------------------------------------------------------
  // QRErrorCorrectionLevel
  // ---------------------------------------------------------------------

  var QRErrorCorrectionLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
  }

  // ---------------------------------------------------------------------
  // QRMaskPattern
  // ---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  }

  // ---------------------------------------------------------------------
  // QRUtil
  // ---------------------------------------------------------------------

  var QRUtil = (function () {
    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ]
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)

    var _this = {}

    var getBCHDigit = function (data) {
      var digit = 0
      while (data != 0) {
        digit += 1
        data >>>= 1
      }
      return digit
    }

    _this.getBCHTypeInfo = function (data) {
      var d = data << 10
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15)))
      }
      return ((data << 10) | d) ^ G15_MASK
    }

    _this.getBCHTypeNumber = function (data) {
      var d = data << 12
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18)))
      }
      return (data << 12) | d
    }

    _this.getPatternPosition = function (typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1]
    }

    _this.getMaskFunction = function (maskPattern) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000 :
          return function (i, j) { return (i + j) % 2 == 0 }
        case QRMaskPattern.PATTERN001 :
          return function (i, j) { return i % 2 == 0 }
        case QRMaskPattern.PATTERN010 :
          return function (i, j) { return j % 3 == 0 }
        case QRMaskPattern.PATTERN011 :
          return function (i, j) { return (i + j) % 3 == 0 }
        case QRMaskPattern.PATTERN100 :
          return function (i, j) { return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0 }
        case QRMaskPattern.PATTERN101 :
          return function (i, j) { return (i * j) % 2 + (i * j) % 3 == 0 }
        case QRMaskPattern.PATTERN110 :
          return function (i, j) { return ((i * j) % 2 + (i * j) % 3) % 2 == 0 }
        case QRMaskPattern.PATTERN111 :
          return function (i, j) { return ((i * j) % 3 + (i + j) % 2) % 2 == 0 }

        default :
          throw new Error('bad maskPattern:' + maskPattern)
      }
    }

    _this.getErrorCorrectPolynomial = function (errorCorrectLength) {
      var a = qrPolynomial([1], 0)
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0))
      }
      return a
    }

    _this.getLengthInBits = function (mode, type) {
      if (type >= 1 && type < 10) {
        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER : return 10
          case QRMode.MODE_ALPHA_NUM : return 9
          case QRMode.MODE_8BIT_BYTE : return 8
          case QRMode.MODE_KANJI : return 8
          default :
            throw new Error('mode:' + mode)
        }
      } else if (type < 27) {
        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER : return 12
          case QRMode.MODE_ALPHA_NUM : return 11
          case QRMode.MODE_8BIT_BYTE : return 16
          case QRMode.MODE_KANJI : return 10
          default :
            throw new Error('mode:' + mode)
        }
      } else if (type < 41) {
        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER : return 14
          case QRMode.MODE_ALPHA_NUM : return 13
          case QRMode.MODE_8BIT_BYTE : return 16
          case QRMode.MODE_KANJI : return 12
          default :
            throw new Error('mode:' + mode)
        }
      } else {
        throw new Error('type:' + type)
      }
    }

    _this.getLostPoint = function (qrcode) {
      var moduleCount = qrcode.getModuleCount()

      var lostPoint = 0

      // LEVEL1

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {
          var sameCount = 0
          var dark = qrcode.isDark(row, col)

          for (var r = -1; r <= 1; r += 1) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue
            }

            for (var c = -1; c <= 1; c += 1) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue
              }

              if (r == 0 && c == 0) {
                continue
              }

              if (dark == qrcode.isDark(row + r, col + c)) {
                sameCount += 1
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5)
          }
        }
      };

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0
          if (qrcode.isDark(row, col)) count += 1
          if (qrcode.isDark(row + 1, col)) count += 1
          if (qrcode.isDark(row, col + 1)) count += 1
          if (qrcode.isDark(row + 1, col + 1)) count += 1
          if (count == 0 || count == 4) {
            lostPoint += 3
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col) &&
              !qrcode.isDark(row, col + 1) &&
              qrcode.isDark(row, col + 2) &&
              qrcode.isDark(row, col + 3) &&
              qrcode.isDark(row, col + 4) &&
              !qrcode.isDark(row, col + 5) &&
              qrcode.isDark(row, col + 6)) {
            lostPoint += 40
          }
        }
      }

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col) &&
              !qrcode.isDark(row + 1, col) &&
              qrcode.isDark(row + 2, col) &&
              qrcode.isDark(row + 3, col) &&
              qrcode.isDark(row + 4, col) &&
              !qrcode.isDark(row + 5, col) &&
              qrcode.isDark(row + 6, col)) {
            lostPoint += 40
          }
        }
      }

      // LEVEL4

      var darkCount = 0

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col)) {
            darkCount += 1
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5
      lostPoint += ratio * 10

      return lostPoint
    }

    return _this
  }())

  // ---------------------------------------------------------------------
  // QRMath
  // ---------------------------------------------------------------------

  var QRMath = (function () {
    var EXP_TABLE = new Array(256)
    var LOG_TABLE = new Array(256)

    // initialize tables
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4] ^
        EXP_TABLE[i - 5] ^
        EXP_TABLE[i - 6] ^
        EXP_TABLE[i - 8]
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i
    }

    var _this = {}

    _this.glog = function (n) {
      if (n < 1) {
        throw new Error('glog(' + n + ')')
      }

      return LOG_TABLE[n]
    }

    _this.gexp = function (n) {
      while (n < 0) {
        n += 255
      }

      while (n >= 256) {
        n -= 255
      }

      return EXP_TABLE[n]
    }

    return _this
  }())

  // ---------------------------------------------------------------------
  // qrPolynomial
  // ---------------------------------------------------------------------

  function qrPolynomial (num, shift) {
    if (typeof num.length === 'undefined') {
      throw new Error(num.length + '/' + shift)
    }

    var _num = (function () {
      var offset = 0
      while (offset < num.length && num[offset] == 0) {
        offset += 1
      }
      var _num = new Array(num.length - offset + shift)
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset]
      }
      return _num
    }())

    var _this = {}

    _this.getAt = function (index) {
      return _num[index]
    }

    _this.getLength = function () {
      return _num.length
    }

    _this.multiply = function (e) {
      var num = new Array(_this.getLength() + e.getLength() - 1)

      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)))
        }
      }

      return qrPolynomial(num, 0)
    }

    _this.mod = function (e) {
      if (_this.getLength() - e.getLength() < 0) {
        return _this
      }

      var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0))

      var num = new Array(_this.getLength())
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i)
      }

      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio)
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e)
    }

    return _this
  };

  // ---------------------------------------------------------------------
  // QRRSBlock
  // ---------------------------------------------------------------------

  var QRRSBlock = (function () {
    var RS_BLOCK_TABLE = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ]

    var qrRSBlock = function (totalCount, dataCount) {
      var _this = {}
      _this.totalCount = totalCount
      _this.dataCount = dataCount
      return _this
    }

    var _this = {}

    var getRsBlockTable = function (typeNumber, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case QRErrorCorrectionLevel.L :
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0]
        case QRErrorCorrectionLevel.M :
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1]
        case QRErrorCorrectionLevel.Q :
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2]
        case QRErrorCorrectionLevel.H :
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3]
        default :
          return undefined
      }
    }

    _this.getRSBlocks = function (typeNumber, errorCorrectionLevel) {
      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel)

      if (typeof rsBlock === 'undefined') {
        throw new Error('bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel)
      }

      var length = rsBlock.length / 3

      var list = new Array()

      for (var i = 0; i < length; i += 1) {
        var count = rsBlock[i * 3 + 0]
        var totalCount = rsBlock[i * 3 + 1]
        var dataCount = rsBlock[i * 3 + 2]

        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount))
        }
      }

      return list
    }

    return _this
  }())

  // ---------------------------------------------------------------------
  // qrBitBuffer
  // ---------------------------------------------------------------------

  var qrBitBuffer = function () {
    var _buffer = new Array()
    var _length = 0

    var _this = {}

    _this.getBuffer = function () {
      return _buffer
    }

    _this.getAt = function (index) {
      var bufIndex = Math.floor(index / 8)
      return ((_buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1
    }

    _this.put = function (num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit(((num >>> (length - i - 1)) & 1) == 1)
      }
    }

    _this.getLengthInBits = function () {
      return _length
    }

    _this.putBit = function (bit) {
      var bufIndex = Math.floor(_length / 8)
      if (_buffer.length <= bufIndex) {
        _buffer.push(0)
      }

      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8))
      }

      _length += 1
    }

    return _this
  }

  // ---------------------------------------------------------------------
  // qrNumber
  // ---------------------------------------------------------------------

  var qrNumber = function (data) {
    var _mode = QRMode.MODE_NUMBER
    var _data = data

    var _this = {}

    _this.getMode = function () {
      return _mode
    }

    _this.getLength = function (buffer) {
      return _data.length
    }

    _this.write = function (buffer) {
      var data = _data

      var i = 0

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3)), 10)
        i += 3
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1)), 4)
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2)), 7)
        }
      }
    }

    var strToNum = function (s) {
      var num = 0
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i))
      }
      return num
    }

    var chatToNum = function (c) {
      if (c >= '0' && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0)
      }
      throw 'illegal char :' + c
    }

    return _this
  }

  // ---------------------------------------------------------------------
  // qrAlphaNum
  // ---------------------------------------------------------------------

  var qrAlphaNum = function (data) {
    var _mode = QRMode.MODE_ALPHA_NUM
    var _data = data

    var _this = {}

    _this.getMode = function () {
      return _mode
    }

    _this.getLength = function (buffer) {
      return _data.length
    }

    _this.write = function (buffer) {
      var s = _data

      var i = 0

      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i)) * 45 +
          getCode(s.charAt(i + 1)), 11)
        i += 2
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i)), 6)
      }
    }

    var getCode = function (c) {
      if (c >= '0' && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0)
      } else if (c >= 'A' && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10
      } else {
        switch (c) {
          case ' ' : return 36
          case '$' : return 37
          case '%' : return 38
          case '*' : return 39
          case '+' : return 40
          case '-' : return 41
          case '.' : return 42
          case '/' : return 43
          case ':' : return 44
          default :
            throw 'illegal char :' + c
        }
      }
    }

    return _this
  }

  // ---------------------------------------------------------------------
  // qr8BitByte
  // ---------------------------------------------------------------------

  var qr8BitByte = function (data) {
    var _mode = QRMode.MODE_8BIT_BYTE
    var _data = data
    var _bytes = qrcode.stringToBytes(data)

    var _this = {}

    _this.getMode = function () {
      return _mode
    }

    _this.getLength = function (buffer) {
      return _bytes.length
    }

    _this.write = function (buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8)
      }
    }

    return _this
  }

  // ---------------------------------------------------------------------
  // qrKanji
  // ---------------------------------------------------------------------

  var qrKanji = function (data) {
    var _mode = QRMode.MODE_KANJI
    var _data = data
    var _bytes = qrcode.stringToBytesFuncs['SJIS']

    !(function (c, code) {
      // self test for sjis support.
      var test = qrcode.stringToBytes(c)
      if (test.length != 2 || ((test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.'
      }
    }('\u53cb', 0x9746))

    var _this = {}

    _this.getMode = function () {
      return _mode
    }

    _this.getLength = function (buffer) {
      return ~~(_bytes.length / 2)
    }

    _this.write = function (buffer) {
      var data = _bytes

      var i = 0

      while (i + 1 < data.length) {
        var c = ((0xff & data[i]) << 8) | (0xff & data[i + 1])

        if (c >= 0x8140 && c <= 0x9FFC) {
          c -= 0x8140
        } else if (c >= 0xE040 && c <= 0xEBBF) {
          c -= 0xC140
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c
        }

        c = ((c >>> 8) & 0xff) * 0xC0 + (c & 0xff)

        buffer.put(c, 13)

        i += 2
      }

      if (i < data.length) {
        throw 'illegal char at ' + (i + 1)
      }
    }

    return _this
  }

  // =====================================================================
  // GIF Support etc.
  //

  // ---------------------------------------------------------------------
  // byteArrayOutputStream
  // ---------------------------------------------------------------------

  var byteArrayOutputStream = function () {
    var _bytes = new Array()

    var _this = {}

    _this.writeByte = function (b) {
      _bytes.push(b & 0xff)
    }

    _this.writeShort = function (i) {
      _this.writeByte(i)
      _this.writeByte(i >>> 8)
    }

    _this.writeBytes = function (b, off, len) {
      off = off || 0
      len = len || b.length
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off])
      }
    }

    _this.writeString = function (s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i))
      }
    }

    _this.toByteArray = function () {
      return _bytes
    }

    _this.toString = function () {
      var s = ''
      s += '['
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ','
        }
        s += _bytes[i]
      }
      s += ']'
      return s
    }

    return _this
  }

  // ---------------------------------------------------------------------
  // base64EncodeOutputStream
  // ---------------------------------------------------------------------

  var base64EncodeOutputStream = function () {
    var _buffer = 0
    var _buflen = 0
    var _length = 0
    var _base64 = ''

    var _this = {}

    var writeEncoded = function (b) {
      _base64 += String.fromCharCode(encode(b & 0x3f))
    }

    var encode = function (n) {
      if (n < 0) {
        // error.
      } else if (n < 26) {
        return 0x41 + n
      } else if (n < 52) {
        return 0x61 + (n - 26)
      } else if (n < 62) {
        return 0x30 + (n - 52)
      } else if (n == 62) {
        return 0x2b
      } else if (n == 63) {
        return 0x2f
      }
      throw new Error('n:' + n)
    }

    _this.writeByte = function (n) {
      _buffer = (_buffer << 8) | (n & 0xff)
      _buflen += 8
      _length += 1

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6))
        _buflen -= 6
      }
    }

    _this.flush = function () {
      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen))
        _buffer = 0
        _buflen = 0
      }

      if (_length % 3 != 0) {
        // padding
        var padlen = 3 - _length % 3
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '='
        }
      }
    }

    _this.toString = function () {
      return _base64
    }

    return _this
  }

  // ---------------------------------------------------------------------
  // base64DecodeInputStream
  // ---------------------------------------------------------------------

  var base64DecodeInputStream = function (str) {
    var _str = str
    var _pos = 0
    var _buffer = 0
    var _buflen = 0

    var _this = {}

    _this.read = function () {
      while (_buflen < 8) {
        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1
          }
          throw new Error('unexpected end of file./' + _buflen)
        }

        var c = _str.charAt(_pos)
        _pos += 1

        if (c == '=') {
          _buflen = 0
          return -1
        } else if (c.match(/^\s$/)) {
          // ignore if whitespace.
          continue
        }

        _buffer = (_buffer << 6) | decode(c.charCodeAt(0))
        _buflen += 6
      }

      var n = (_buffer >>> (_buflen - 8)) & 0xff
      _buflen -= 8
      return n
    }

    var decode = function (c) {
      if (c >= 0x41 && c <= 0x5a) {
        return c - 0x41
      } else if (c >= 0x61 && c <= 0x7a) {
        return c - 0x61 + 26
      } else if (c >= 0x30 && c <= 0x39) {
        return c - 0x30 + 52
      } else if (c == 0x2b) {
        return 62
      } else if (c == 0x2f) {
        return 63
      } else {
        throw new Error('c:' + c)
      }
    }

    return _this
  }

  // ---------------------------------------------------------------------
  // gifImage (B/W)
  // ---------------------------------------------------------------------

  var gifImage = function (width, height) {
    var _width = width
    var _height = height
    var _data = new Array(width * height)

    var _this = {}

    _this.setPixel = function (x, y, pixel) {
      _data[y * _width + x] = pixel
    }

    _this.write = function (out) {
      // ---------------------------------
      // GIF Signature

      out.writeString('GIF87a')

      // ---------------------------------
      // Screen Descriptor

      out.writeShort(_width)
      out.writeShort(_height)

      out.writeByte(0x80) // 2bit
      out.writeByte(0)
      out.writeByte(0)

      // ---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00)
      out.writeByte(0x00)
      out.writeByte(0x00)

      // white
      out.writeByte(0xff)
      out.writeByte(0xff)
      out.writeByte(0xff)

      // ---------------------------------
      // Image Descriptor

      out.writeString(',')
      out.writeShort(0)
      out.writeShort(0)
      out.writeShort(_width)
      out.writeShort(_height)
      out.writeByte(0)

      // ---------------------------------
      // Local Color Map

      // ---------------------------------
      // Raster Data

      var lzwMinCodeSize = 2
      var raster = getLZWRaster(lzwMinCodeSize)

      out.writeByte(lzwMinCodeSize)

      var offset = 0

      while (raster.length - offset > 255) {
        out.writeByte(255)
        out.writeBytes(raster, offset, 255)
        offset += 255
      }

      out.writeByte(raster.length - offset)
      out.writeBytes(raster, offset, raster.length - offset)
      out.writeByte(0x00)

      // ---------------------------------
      // GIF Terminator
      out.writeString(';')
    }

    var bitOutputStream = function (out) {
      var _out = out
      var _bitLength = 0
      var _bitBuffer = 0

      var _this = {}

      _this.write = function (data, length) {
        if ((data >>> length) != 0) {
          throw new Error('length over')
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ((data << _bitLength) | _bitBuffer))
          length -= (8 - _bitLength)
          data >>>= (8 - _bitLength)
          _bitBuffer = 0
          _bitLength = 0
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer
        _bitLength = _bitLength + length
      }

      _this.flush = function () {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer)
        }
      }

      return _this
    }

    var getLZWRaster = function (lzwMinCodeSize) {
      var clearCode = 1 << lzwMinCodeSize
      var endCode = (1 << lzwMinCodeSize) + 1
      var bitLength = lzwMinCodeSize + 1

      // Setup LZWTable
      var table = lzwTable()

      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i))
      }
      table.add(String.fromCharCode(clearCode))
      table.add(String.fromCharCode(endCode))

      var byteOut = byteArrayOutputStream()
      var bitOut = bitOutputStream(byteOut)

      // clear code
      bitOut.write(clearCode, bitLength)

      var dataIndex = 0

      var s = String.fromCharCode(_data[dataIndex])
      dataIndex += 1

      while (dataIndex < _data.length) {
        var c = String.fromCharCode(_data[dataIndex])
        dataIndex += 1

        if (table.contains(s + c)) {
          s = s + c
        } else {
          bitOut.write(table.indexOf(s), bitLength)

          if (table.size() < 0xfff) {
            if (table.size() == (1 << bitLength)) {
              bitLength += 1
            }

            table.add(s + c)
          }

          s = c
        }
      }

      bitOut.write(table.indexOf(s), bitLength)

      // end code
      bitOut.write(endCode, bitLength)

      bitOut.flush()

      return byteOut.toByteArray()
    }

    var lzwTable = function () {
      var _map = {}
      var _size = 0

      var _this = {}

      _this.add = function (key) {
        if (_this.contains(key)) {
          throw new Error('dup key:' + key)
        }
        _map[key] = _size
        _size += 1
      }

      _this.size = function () {
        return _size
      }

      _this.indexOf = function (key) {
        return _map[key]
      }

      _this.contains = function (key) {
        return typeof _map[key] !== 'undefined'
      }

      return _this
    }

    return _this
  }

  var createImgTag = function (width, height, getPixel, alt) {
    var gif = gifImage(width, height)
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y))
      }
    }

    var b = byteArrayOutputStream()
    gif.write(b)

    var base64 = base64EncodeOutputStream()
    var bytes = b.toByteArray()
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i])
    }
    base64.flush()

    var img = ''
    img += '<img'
    img += '\u0020src="'
    img += 'data:image/gif;base64,'
    img += base64
    img += '"'
    img += '\u0020width="'
    img += width
    img += '"'
    img += '\u0020height="'
    img += height
    img += '"'
    if (alt) {
      img += '\u0020alt="'
      img += alt
      img += '"'
    }
    img += '/>'

    return img
  }

  // ---------------------------------------------------------------------
  // returns qrcode function.

  return {
    qrcode: qrcode,
    QRUtil: QRUtil
  }
}())

// multibyte support
!(function () {
  qrcode.qrcode.stringToBytesFuncs['SJIS'] = qrcode.qrcode.createStringToBytes(
    'AAAAAAABAAEAAgACAAMAAwAEAAQABQAFAAYABgAHAAcACAAIAAkACQAKAAoACwALAAwADAANAA0ADgAOAA8ADwAQABAAEQARABIAEgATABMAFAAUABUAFQAWABYAFwAXABgAGAAZABkAGgAaABsAGwAcABwAHQAdAB4AHgAfAB8AIAAgACEAIQAiACIAIwAjACQAJAAlACUAJgAmACcAJwAoACgAKQApACoAKgArACsALAAsAC0ALQAuAC4ALwAvADAAMAAxADEAMgAyADMAMwA0ADQANQA1ADYANgA3ADcAOAA4ADkAOQA6ADoAOwA7ADwAPAA9AD0APgA+AD8APwBAAEAAQQBBAEIAQgBDAEMARABEAEUARQBGAEYARwBHAEgASABJAEkASgBKAEsASwBMAEwATQBNAE4ATgBPAE8AUABQAFEAUQBSAFIAUwBTAFQAVABVAFUAVgBWAFcAVwBYAFgAWQBZAFoAWgBbAFsAXABcAF0AXQBeAF4AXwBfAGAAYABhAGEAYgBiAGMAYwBkAGQAZQBlAGYAZgBnAGcAaABoAGkAaQBqAGoAawBrAGwAbABtAG0AbgBuAG8AbwBwAHAAcQBxAHIAcgBzAHMAdAB0AHUAdQB2AHYAdwB3AHgAeAB5AHkAegB6AHsAewB8AHwAfQB9AH4AfgB\/AH8AooGRAKOBkgCngZgAqIFOAKyBygCwgYsAsYF9ALSBTAC2gfcA14F+APeBgAORg58DkoOgA5ODoQOUg6IDlYOjA5aDpAOXg6UDmIOmA5mDpwOag6gDm4OpA5yDqgOdg6sDnoOsA5+DrQOgg64DoYOvA6ODsAOkg7EDpYOyA6aDswOng7QDqIO1A6mDtgOxg78DsoPAA7ODwQO0g8IDtYPDA7aDxAO3g8UDuIPGA7mDxwO6g8gDu4PJA7yDygO9g8sDvoPMA7+DzQPAg84DwYPPA8OD0APEg9EDxYPSA8aD0wPHg9QDyIPVA8mD1gQBhEYEEIRABBGEQQQShEIEE4RDBBSERAQVhEUEFoRHBBeESAQYhEkEGYRKBBqESwQbhEwEHIRNBB2ETgQehE8EH4RQBCCEUQQhhFIEIoRTBCOEVAQkhFUEJYRWBCaEVwQnhFgEKIRZBCmEWgQqhFsEK4RcBCyEXQQthF4ELoRfBC+EYAQwhHAEMYRxBDKEcgQzhHMENIR0BDWEdQQ2hHcEN4R4BDiEeQQ5hHoEOoR7BDuEfAQ8hH0EPYR+BD6EgAQ\/hIEEQISCBEGEgwRChIQEQ4SFBESEhgRFhIcERoSIBEeEiQRIhIoESYSLBEqEjARLhI0ETISOBE2EjwROhJAET4SRBFGEdiAQgV0gFIFcIBaBYSAYgWUgGYFmIByBZyAdgWggIIH1ICGB9iAlgWQgJoFjIDCB8SAygYwgM4GNIDuBpiEDgY4hK4HwIZCBqSGRgaohkoGoIZOBqyHSgcsh1IHMIgCBzSICgd0iA4HOIgeB3iIIgbgiC4G5IhKBfCIageMiHYHlIh6BhyIggdoiJ4HIIiiBySIpgb8iKoG+IiuB5yIsgegiNIGIIjWB5iI9geQiUoHgImCBgiJhgd8iZoGFImeBhiJqgeEia4HiIoKBvCKDgb0ihoG6IoeBuyKlgdsjEoHcJQCEnyUBhKolAoSgJQOEqyUMhKElD4SsJRCEoiUThK0lFISkJReEryUYhKMlG4SuJRyEpSUdhLolIIS1JSOEsCUkhKclJYS8JSiEtyUrhLIlLISmJS+EtiUwhLslM4SxJTSEqCU3hLglOIS9JTuEsyU8hKklP4S5JUKEviVLhLQloIGhJaGBoCWygaMls4GiJbyBpSW9gaQlxoGfJceBniXLgZslzoGdJc+BnCXvgfwmBYGaJgaBmSZAgYomQoGJJmqB9CZtgfMmb4HyMACBQDABgUEwAoFCMAOBVjAFgVgwBoFZMAeBWjAIgXEwCYFyMAqBczALgXQwDIF1MA2BdjAOgXcwD4F4MBCBeTARgXowEoGnMBOBrDAUgWswFYFsMByBYDBBgp8wQoKgMEOCoTBEgqIwRYKjMEaCpDBHgqUwSIKmMEmCpzBKgqgwS4KpMEyCqjBNgqswToKsME+CrTBQgq4wUYKvMFKCsDBTgrEwVIKyMFWCszBWgrQwV4K1MFiCtjBZgrcwWoK4MFuCuTBcgrowXYK7MF6CvDBfgr0wYIK+MGGCvzBigsAwY4LBMGSCwjBlgsMwZoLEMGeCxTBogsYwaYLHMGqCyDBrgskwbILKMG2CyzBugswwb4LNMHCCzjBxgs8wcoLQMHOC0TB0gtIwdYLTMHaC1DB3gtUweILWMHmC1zB6gtgwe4LZMHyC2jB9gtswfoLcMH+C3TCAgt4wgYLfMIKC4DCDguEwhILiMIWC4zCGguQwh4LlMIiC5jCJgucwioLoMIuC6TCMguowjYLrMI6C7DCPgu0wkILuMJGC7zCSgvAwk4LxMJuBSjCcgUswnYFUMJ6BVTChg0AwooNBMKODQjCkg0MwpYNEMKaDRTCng0YwqINHMKmDSDCqg0kwq4NKMKyDSzCtg0wwroNNMK+DTjCwg08wsYNQMLKDUTCzg1IwtINTMLWDVDC2g1Uwt4NWMLiDVzC5g1gwuoNZMLuDWjC8g1swvYNcML6DXTC\/g14wwINfMMGDYDDCg2Eww4NiMMSDYzDFg2QwxoNlMMeDZjDIg2cwyYNoMMqDaTDLg2owzINrMM2DbDDOg20wz4NuMNCDbzDRg3Aw0oNxMNODcjDUg3Mw1YN0MNaDdTDXg3Yw2IN3MNmDeDDag3kw24N6MNyDezDdg3ww3oN9MN+DfjDgg4Aw4YOBMOKDgjDjg4Mw5IOEMOWDhTDmg4Yw54OHMOiDiDDpg4kw6oOKMOuDizDsg4ww7YONMO6DjjDvg48w8IOQMPGDkTDyg5Iw84OTMPSDlDD1g5Uw9oOWMPuBRTD8gVsw\/YFSMP6BU04AiOpOAZKaTgOOtU4HlpxOCI\/kTgmOT04Kj+NOC4m6Tg2Vc04Ol15OEJigThGJTk4Uio5OFZihThaQok4XmcBOGIt1ThmVuE4ej+VOIZe8TiaVwE4qmKJOLZKGTjGYo04yi\/hONpikTjiK2045kk9OO47lTjyYpU4\/mKZOQpinTkOUVE5Fi3ZOS5RWTk2T4U5OjMFOT5ZSTlXlaE5WmKhOV4\/mTliYqU5ZibNOXYvjTl6M7k5fludOYpukTnGXkE5zk\/tOfoqjToCLVE6CmKpOhZirToaXuU6Il1xOiZGIToqYrU6LjpZOjJPxTo6YsE6RiV1OkozdTpSM3E6ViOROmJhqTpmYaU6bjbFOnIifTp6YsU6fmLJOoJizTqGWU06imLROpIzwTqWI5U6mlpJOqIucTquLnU6si55OrZLgTq6Xuk6wmLVOs5i2TraYt066kGxOwI9ZTsGQbU7CmLxOxJi6TsaYu07Hi3dOyo2hTsuJ7k7NmLlOzpi4Ts+Vp07UjmVO1Y5kTtaRvE7XmL1O2JV0TtmQ5U7dgVdO3pi+Tt+YwE7jkeNO5JffTuWIyE7tmL9O7om8TvCLwk7ykodO9oyPTveYwU77lENPAYrpTwmYwk8KiMlPDYzeTw6K6k8PlZpPEJSwTxGLeE8aie9PHJjlTx2TYE8vlIxPMJjETzSUuk82l+BPOJBMTzqOZk88jpdPPYm+T0OSz09GkkFPR5jIT02Iyk9OkuFPT49aT1CNsk9Rl0NPU5HMT1WJvU9XmMdPWZddT1qYw09bmMVPXI3sT12Yxk9em0NPaZjOT2+Y0U9wmM9Pc4nAT3WVuU92mMlPe5jNT3yM8U9\/jmdPg4qkT4aY0k+ImMpPi5fhT42OmE+PmMtPkZjQT5aY00+YmMxPm4ufT52Iy0+gi6BPoYm\/T6ubRE+tlplPrpWOT6+M8k+1kE5Ptpe1T7+V1k\/CjFdPw5GjT8SJ4k\/Kj3JPzpjXT9CY3E\/RmNpP1JjVT9eRrU\/YmNhP2pjbT9uY2U\/dldtP35jWT+GQTU\/jlpNP5JjdT+WY3k\/uj0NP75jrT\/OUb0\/1lVVP9pjmT\/iV7k\/6ibRP\/pjqUAWY5FAGmO1QCZFxUAuMwlANlHtQD+DFUBGY7FASk3xQFJjhUBaM9FAZjPNQGpjfUB+O2FAhmOdQI5XtUCSSbFAlmONQJoyRUCiY4FApmOhQKpjiUCuXz1AsmOlQLZhgUDaL5FA5jJBQQ5juUEeY71BImPNQSYjMUE+VzlBQmPJQVZjxUFaY9VBamPRQXJLiUGWMklBsmPZQco7DUHSRpFB1kuNQdov0UHiY91B9i1VQgJj4UIWY+lCNllRQkYyGUJiOUFCZlPVQmpj5UKyNw1Ctl2JQspj8ULOZQlC0mPtQtY3CULePnVC+jFhQwplDUMWLzVDJmUBQyplBUM2TrVDPkZxQ0YuhUNWWbFDWmURQ2pe7UN6ZRVDjmUhQ5ZlGUOeRbVDtmUdQ7plJUPWZS1D5mUpQ+5XGUQCLVlEBmU1RAplOUQSJrVEJmUxREo7yURSZUVEVmVBRFplPURiY1FEamVJRH4+eUSGZU1Eql0RRMpbXUTeZVVE6mVRRO5lXUTyZVlE\/mVhRQJlZUUGI8lFDjLNRRIxaUUWPW1FGkptRR4uiUUiQ5lFJjPVRS42OUUyZW1FNlsZRTpNlUVCOmVFSmVpRVJlcUVqTfVFcipVRYpldUWWT\/FFokVNRaZlfUWqZYFFrlKpRbIz2UW2YWlFumWFRcYukUXWVulF2kbRRd4vvUXiTVFF8jJNRgJliUYKZY1GFk+BRhol+UYmZZlGKjftRjJllUY2NxFGPmWdRkOPsUZGZaFGSlmBRk5lpUZWZalGWmWtRl4\/nUZmOylGgiqVRopluUaSZbFGllrtRppltUaiVeVGpmW9RqplwUauZcVGsk35RsJl1UbGZc1GymXRRs5lyUbSN4VG1mXZRtpboUbeX4lG9mXdRxJCmUcWZeFHGj3lRyZl5UcuSnFHMl71RzZOAUdaZw1HbmXpR3OqjUd2Lw1HgmXtR4ZZ9UeaPiFHnkfpR6Zl9UeqT4lHtmX5R8JmAUfGKTVH1mYFR9oulUfiTylH5iZpR+o9vUf2Un1H+mYJSAJOBUgOQblIEmYNSBpWqUgeQ2FIIiqBSCoqnUguZhFIOmYZSEYxZUhSZhVIXl\/FSHY+JUiSUu1IllcpSJ5mHUimXmFIqmYhSLpmJUjCTnlIzmYpSNpCnUjeN\/FI4jJRSOZmLUjqOaFI7jY9SQ5LkUkSZjVJHkaVSSo3tUkuZjlJMmY9STZFPUk+ZjFJUmZFSVpZVUluNhFJemZBSY4yVUmSN3FJllI1SaZmUUmqZklJvlZtScI\/oUnGZm1JyioRSc5mVUnSZk1J1kW5SfZmXUn+ZllKDimNSh4yAUoiZnFKJl6tSjZmYUpGZnVKSmZpSlJmZUpuXzVKfjPdSoInBUqOX8lKpj5VSqpN3UquNhVKsmaBSrZmhUrGX41K0mEpStZmjUrmM+FK8maJSvopOUsGZpFLDlnVSxZK6UseXRVLJlddSzZmlUtLo01LVk65S15mmUtiKqFLZlrFS3Y+fUt6Zp1LfleVS4JmrUuKQqFLjmahS5IvOUuaZqVLniqlS8oxNUvOZrFL1ma1S+JmuUvmZr1L6jtlS\/oz5Uv+W3FMBluZTApP1UwWV71MGmbBTCJmxUw2Zs1MPmbVTEJm0UxWZtlMWibtTF5ZrUxmN+lMambdTHZF4UyCPoFMhi6dTI5m4UyqU2VMvmblTMZm6UzOZu1M4mbxTOZVDUzqL5lM7iONTP5O9U0CZvVNBj1xTQ5DnU0WZv1NGmb5TR4+hU0iM31NJmcFTSpS8U02ZwlNRlNpTUpGyU1OR7FNUi6ZTV5PsU1iSUFNalI5TXJZtU16ZxFNgkOhTZoxUU2mZxVNumcZTb4lLU3CI81NxiutTc5GmU3SLcFN1l5FTd5nJU3iJtVN7mchTf4uoU4KZylOElu9TlpnLU5iX0FOajPpTn4y0U6CZzFOlmc5TppnNU6iQflOpiVhTrYl9U66Zz1OwmdBTs4y1U7aZ0VO7i45Two5RU8OZ0lPIlpRTyY2zU8qLeVPLl0ZTzJFvU82UvVPOjvtT1I9mU9aO5lPXjvNT2Y+WU9uUvlPfmdVT4YliU+KRcFPjjPtT5IzDU+WL5VPomdlT6ZJAU+qR\/FPri6lT7I+iU+2Z2lPumdhT74nCU\/CR5FPxjrZT8o5qU\/OJRVP2ipBT942GU\/iOaVP6mdtUAZncVAOLaFQEimVUCI2HVAmLZ1QKkt1UC4lEVAyTr1QNlrxUDo1AVA+XmVQQk2ZUEYz8VBuMTlQdmeVUH4vhVCCWaVQmlNtUKZnkVCuK3FQsmd9ULZngVC6Z4lQ2meNUOIt6VDmQgVQ7latUPJnhVD2Z3VQ+jOFUQJneVEKYQ1RGlfBUSJLmVEmM4FRKjZBUTpnmVFGT21RfmepUaI78VGqO9FRwme1UcZnrVHOWoVR1mehUdpnxVHeZ7FR7me9UfIzEVH2WvVSAmfBUhJnyVIaZ9FSLje5UjJhhVI6Z6VSPmedUkJnzVJKZ7lSimfZUpJpCVKWZ+FSomfxUq5pAVKyZ+VSvml1Uso3nVLOKUFS4mfdUvJpEVL2I9FS+mkNUwIijVMGVaVTCmkFUxJn6VMeZ9VTImftUyY3GVNiaRVThiPVU4ppOVOWaRlTmmkdU6I+jVOmWiVTtmkxU7ppLVPKTTlT6mk1U\/ZpKVQSJU1UGjbRVB5BPVQ+aSFUQk4JVFJpJVRaIoFUumlNVL5dCVTGPpVUzmllVOJpYVTmaT1U+kcFVQJpQVUSR7VVFmlVVRo+kVUyaUlVPluJVU4xbVVaaVlVXmldVXJpUVV2aWlVjmlFVe5pgVXyaZVV+mmFVgJpcVYOaZlWEkVBVh5poVYmNQVWKml5Vi5KdVZiaYlWZmltVmoqrVZyK7FWdioVVnppjVZ+aX1WnjJZVqJppVamaZ1WqkXJVq4tpVayLqlWummRVsIvyVbaJY1XEmm1VxZprVceapVXUmnBV2ppqVdyablXfmmxV445rVeSab1X3mnJV+Zp3Vf2adVX+mnRWBpJRVgmJw1YUmnFWFppzVhePplYYiVJWG5p2VimJ3FYvmoJWMY\/6VjKafVY0mntWNpp8VjiaflZCiVxWTJFYVk6aeFZQmnlWW4qaVmSagVZoiu1WapqEVmuagFZsmoNWdJWsVniT01Z6lLZWgJqGVoaahVaHimRWipqHVo+ailaUmolWoJqIVqKUWFalmotWrpqMVrSajla2mo1WvJqQVsCak1bBmpFWwpqPVsOaklbImpRWzpqVVtGallbTmpdW15qYVtiZZFbajvpW245sVt6J8VbgiPZW45JjVu6amVbwjaJW8ojNVvOQfVb5mppW+ozFVv2NkVb\/mpxXAJqbVwOV3lcEmp1XCJqfVwmanlcLmqBXDZqhVw+Ml1cSiYBXE5qiVxaapFcYmqNXHJqmVx+TeVcmmqdXJ4izVyiN3VctjFxXMJJuVzeaqFc4mqlXO5qrV0CarFdCjeJXR4vPV0qWVldOmqpXT5qtV1CNv1dRjUJXYZqxV2SNo1dmklJXaZquV2qS2Fd\/mrJXgpCCV4iasFeJmrNXi4xeV5OatFegmrVXoo1DV6OKX1ekmrdXqpq4V7CauVezmrZXwJqvV8OaulfGmrtXy5aEV86P6VfSmr1X05q+V9SavFfWmsBX3JRXV9+I5lfglXVX45rBV\/SP+1f3jrdX+ZR8V\/qK7lf8jelYAJZ4WAKTsFgFjJhYBpHNWAqav1gLmsJYFZHCWBmaw1gdmsRYIZrGWCSS51gqiqxYL+qfWDCJgVgxlfFYNI\/qWDWTZ1g6jeRYPZrMWECVu1hBl9tYSonyWEuayFhRkVlYUprLWFSTg1hXk2hYWJOEWFmUt1hakstYXo3HWGKax1hpiZZYa5NVWHCayVhymsVYdZBvWHmazVh+j21Yg4urWIWazliTleZYl5GdWJySxFifmtBYqJZuWKua0ViumtZYs5WtWLia1Vi5ms9YuprSWLua1Fi+jaRYwZXHWMWa11jHkmRYyonzWMyP61jRmtlY05rYWNWNiFjXmtpY2JrcWNma21jcmt5Y3prTWN+a4Fjkmt9Y5ZrdWOuObVjskHBY7pFzWO+a4VjwkLpY8YjrWPKUhFj3ktlY+ZrjWPqa4lj7muRY\/JrlWP2a5lkCmudZCZXPWQqa6FkPicRZEJrpWRWXW1kWik9ZGJnHWRmPZ1kakb1ZG5rqWRyW6VkilrJZJZrsWSeR5Vkpk1ZZKpG+WSuVdlksmu1ZLZruWS6Jm1kxjrhZMprvWTeIzlk4mvBZPprxWUSJgllHiu9ZSJPeWUmV8llOmvVZT5F0WVCa9FlRjF9ZVJZ6WVWa81lXk4VZWJr3WVqa9llgmvlZYpr4WWWJnFlnmvpZaI+nWWma\/FlqkkRZbJr7WW6VsVlzj5dZdJN6WXibQFl9jURZgZtBWYKUQFmDlNxZhJbPWYqURFmNm0pZk4tXWZaXZFmZlq1Zm5uqWZ2bQlmjm0VZpZHDWaiWV1msk2lZsptGWbmWhVm7jchZvo+oWcabR1nJjm9Zy45uWdCIt1nRjMZZ05CpWdSIz1nZm0tZ2ptMWdybSVnliVdZ5oqtWeibSFnqlsNZ65VQWfaIpln7iPdZ\/45wWgGI0FoDiKFaCZtRWhGbT1oYlrpaGptSWhybUFofm05aIJBQWiWbTVopldhaL4ziWjWbVlo2m1daPI+pWkCbU1pBmEtaRpRrWkmbVVpajaVaYptYWmaVd1pqm1labJtUWn+WuVqSlH1amptaWpuVUVq8m1tavZtfWr6bXFrBicVawpteWsmOuVrLm11azIyZWtCba1rWm2Ra15thWuGShFrjm2Ba5ptiWumbY1r6m2Va+5tmWwmK8FsLm2hbDJtnWxabaVsij+xbKptsWyyS2lswiWRbMptqWzabbVs+m25bQJtxW0Obb1tFm3BbUI5xW1GbcltUjUVbVZtzW1eOmltYkbZbWpt0W1ubdVtcjnlbXY1GW1+W0Ftji0dbZIzHW2WbdltmindbaZt3W2uRt1twm3hbcZuhW3ObeVt1m3pbeJt7W3qbfVuAm35bg5uAW4WR7luHiUZbiI7nW4mIwFuLkXZbjIquW42Os1uPjUdblZOGW5ePQFuYiq9bmZKIW5qS6FubiLZbnItYW52V81ufjsBbootxW6OQ6VukjrpbpZdHW6abgVuui3tbsI3JW7OKUVu0iYNbtY+qW7aJxlu4m4JbuZdlW7+PaFvCjuJbw5uDW8SK8VvFk9BbxpanW8ebhFvJm4VbzJV4W9Cbh1vSiqZb04v1W9SbhlvbirBb3ZBRW96bi1vfjkBb4YnHW+Kbilvkm4hb5ZuMW+abiVvnlEpb6J7LW+mQUlvrm41b7pe+W\/Cbjlvzm5Bb9ZKeW\/abj1v4kKFb+o6bW\/6Rzlv\/jvVcAZWVXAKQ6lwEjstcBZuRXAaPq1wHm5JcCJuTXAmI0VwKkbhcC5BxXA2blFwOk7FcD4+sXBGPrVwTm5VcFpDrXBqPrlwgm5ZcIpuXXCSW3lwom5hcLYvEXDGPQVw4m5lcOZuaXDqO2lw7kEtcPJPyXD2Qc1w+lPZcP5RBXECLx1xBm5tcRYuPXEabnFxIi\/xcSpPNXEuJrlxNjnJcTpudXE+boFxQm59cUYv7XFObnlxVk1dcXpGuXGCTalxhjsZcZJF3XGWXmlxsm6JcbpujXG+T1FxxjlJcdpulXHmbplyMm6dckIryXJGbqFyUm6lcoYmqXKiRWlypiuJcq5urXKyWplyxkdBcs4p4XLabrVy3m69cuIrdXLubrFy8m65cvpuxXMWbsFzHm7Jc2ZuzXOCTu1zhi6xc6InjXOmbtFzqm7lc7Zu3XO+V9VzwlfRc9pOHXPqbtlz7j3Nc\/Zu1XQeQkl0Lm7pdDo3oXRGbwF0Um8FdFZu7XRaKUl0Xm7xdGJvFXRmbxF0am8NdG5u\/XR+bvl0im8JdKZX2XUubyV1Mm8ZdTpvIXVCXkl1Sm8ddXJu9XWmQk11sm8pdb421XXOby112m8xdgpvPXYSbzl2Hm81di5OIXYybuF2Qm9VdnZvRXaKb0F2sm9JdrpvTXbeb1l26l+RdvJvXXb2b1F3Jm9hdzIreXc2b2V3Sm9td05vaXdab3F3bm91d3ZDsXd6PQl3hj4Rd45GDXeWNSF3mjbZd541JXeiLkF3rm95d7o23XfGMyF3ym99d85akXfSUYl31m+Bd941KXfuKql39kkZd\/ovQXgKOc14DlXpeBpS\/Xgub4V4MivNeEZvkXhaSn14Zm+NeGpviXhub5V4dkuleJZCDXiuOdF4tkMheL5HRXjCLQV4zkqBeNpvmXjeb5144j+1ePZZYXkCb6l5Dm+leRJvoXkWVnV5Hm\/FeTJZ5Xk6b615Um+1eVZaLXleb7F5fm+5eYZSmXmKb715jlbxeZJvwXnKKsV5zlb1edJROXnWb8l52m\/NeeI1LXnmKsl56m\/Ree4y2XnyXY159l0hefor0Xn+b9l6BkqFeg41MXoSPr16HlN1eio+wXo+PmF6VkupelpX3XpeTWF6ajU1enJV7XqCb916mk3hep43AXquMyV6tkutetYjBXraPjl63jU5euJdmXsGb+F7Cm\/lew5RwXsib+l7Jl\/VeyphMXs+b\/F7Qm\/te04pmXtacQF7anENe25xEXt2cQl7flV9e4I+xXuGcRl7inEVe45xBXuicR17pnEhe7JxJXvCcTF7xnEpe85xLXvScTV72iYRe95LsXvicTl76jJpe+4n0XvyUVV7+nE9e\/5P5XwGV2V8DnFBfBJhNXwmcUV8Klb5fC5xUXwyYn18NmK9fD46uXxCT818RnFVfE4t8XxSSol8ViPhfFpxWXxeVpF8YjU9fG5JvXx+S7V8llu1fJoy3XyeMyl8pnFdfLZxYXy+cXl8xjuNfNZKjXzeLrV84nFlfPJVKXz6SZV9BnFpfSJxbX0qLrl9MnFxfTpxdX1GcX19Tk5ZfVpxgX1ecYV9ZnGJfXJxTX12cUl9hnGNfYoxgX2aVRl9pjcpfapVWX2uSpF9slWpfbZxkX3CPsl9xiWVfc5xlX3ecZl95lvBffJTeX3+caV+AiZ1fgZCqX4KcaF+DnGdfhIxhX4WR0l+HnG1fiJxrX4qcal+Ll6VfjIzjX5CPmV+RnGxfkpNrX5OPXV+Xk75fmJxwX5mcb1+enG5foJxxX6GM5F+onHJfqZWcX6qPel+tnHNfrpT3X7OTv1+0kqVfuZNPX7ycdF+9i0pfw5BTX8WVS1\/MivVfzZRFX9acdV\/XjnVf2JZZX9mWWl\/ciZ5f3Zx6X+CSiV\/knHdf64n1X\/Ccq1\/xnHlf9ZRPX\/iceF\/7nHZf\/Y2aX\/+cfGAOnINgD5yJYBCcgWASk3tgFZyGYBaVfGAZnIBgG5yFYByX5WAdjnZgIJHTYCGcfWAli31gJpyIYCeQq2AoiYVgKZyCYCqJ9mArnIdgL4uvYDGchGA6nIpgQZyMYEKclmBDnJRgRpyRYEqckGBLl\/ZgTZySYFCLsGBSjVBgVY+aYFmcmWBanItgX5yPYGCcfmBiifhgY5yTYGSclWBlknBgaI2mYGmJtmBqnI1ga5yYYGycl2Bti7Fgb5GnYHCKhmB1jGJgd5yOYIGcmmCDnJ1ghJyfYImOu2CLnKVgjJLuYI2cm2CSnKNglIn3YJacoWCXnKJgmpyeYJucoGCfjOVgoJdJYKOKs2CmiXhgp5ykYKmUWWCqiKtgspTfYLOce2C0nKpgtZyuYLaW42C4nKdgvJOJYL2crGDFj+5gxpytYMeT1WDRmGZg05ypYNicr2DajZtg3JDJYN+I0mDgnKhg4ZymYOOReWDnnJxg6I5TYPCRxGDxnLtg85F6YPSctmD2nLNg95y0YPmO5GD6nLdg+5y6YQCctWEBj0RhA5y4YQacsmEIlvphCZb5YQ2cvGEOnL1hD4jTYRWcsWEai\/BhG4ikYR+KtGEhnLlhJ5zBYSicwGEsnMVhNJzGYTycxGE9nMdhPpy\/YT+cw2FCnMhhRJzJYUecvmFIjpxhSpzCYUuR1GFMjVFhTZywYU6QVGFTnNZhVZXnYViczGFZnM1hWpzOYV2c1WFfnNRhYpadYWOKtWFlnNJhZ4xkYWiKU2FrnM9hbpe2YW+c0WFwiNRhcZzTYXOcymF0nNBhdZzXYXaMY2F3nMthfpd8YYKXSmGHnNphipzeYY6RnmGQl\/dhkZzfYZSc3GGWnNlhmZzYYZqc3WGkla5hp5OyYamMZWGrnOBhrJzbYa6c4WGyjJthtomvYbqc6WG+irZhw5znYcac6GHHjadhyJzmYcmc5GHKnONhy5zqYcyc4mHNnOxh0In5YeOc7mHmnO1h8pKmYfSc8WH2nO9h95zlYfiMnGH6nPBh\/Jz0Yf2c82H+nPVh\/5zyYgCc9mIInPdiCZz4YgqV6GIMnPpiDZz5Yg6PXmIQkKxiEYnkYhKJ+mIUnPtiFoi9YhqQymIbnPxiHebBYh6dQGIfjIFiIZ1BYiaQ7WIqnUJiLp1DYi+LWWIwnURiMp1FYjOdRmI0kdViOIzLYjuW32I\/lltiQI+KYkGdR2JHkO5iSOe7YkmU4GJLjuhiTY3LYk6dSGJTkcViVZWlYliR72JbnUtiXp1JYmCdTGJjnUpiaJ1NYm6Vr2JxiLVidpV9YnmU4WJ8nU5ifp1RYn+Ps2KAi1pigp1PYoOdVmKEj7RiiZ1QYoqUY2KRl31ikp1SYpOdU2KUnVdilZOKYpadVGKXjVJimJDcYpudZWKclLJinpHwYquU4mKsnatisZX4YrWS72K5lpViu51aYryJn2K9kopiwp1jYsWSU2LGnV1ix51kYsidX2LJnWZiyp1iYsydYWLNlI9iz51bYtCJ+2LRnVli0ouRYtOR8WLUnVVi151YYtiNU2LZkNli24+1YtydYGLdlHFi4IuSYuGKZ2Lsiodi7ZBAYu6daGLvnW1i8Z1pYvOMnWL1nW5i9o5BYveNiWL+j0Vi\/51cYwGOnWMCnWtjB453YwidbGMJiMJjDJ1nYxGSp2MZi5NjH4uyYyedamMoiKVjK43BYy+QVWM6kvBjPZTSYz6dcGM\/kX1jSZGoY0yOSmNNnXFjT51zY1Cdb2NVld9jV5K7Y1yRe2NnlfljaI7MY2mdgGNrnX5jbpCYY3KMnmN2nXhjd4+3Y3qT5mN7lFBjgJ12Y4ORfGOIjvZjiZ17Y4yPtmOOnXVjj516Y5KUcmOWnXRjmIxAY5uKfGOfnXxjoJepY6GNzGOiklRjo515Y6WQ2mOnjVRjqJCEY6mJhmOqkVtjq513Y6yLZGOyjGZjtJLNY7WdfWO7kX5jvp2BY8Cdg2PDkbVjxJ2JY8adhGPJnYZjz5VgY9CS8WPSnYdj1pdLY9qXZ2Pbirdj4YisY+OdhWPpnYJj7or2Y\/SJh2P2nYhj+pdoZAadjGQNkblkD52TZBOdjWQWnYpkF52RZBydcmQmnY5kKJ2SZCyUwGQtk4tkNJ2LZDadj2Q6jGdkPo3vZEKQ22ROnZdkWJNFZGedlGRploBkb52VZHadlmR4lsxkepCgZIOMgmSInZ1kko5UZJOdmmSVnZlkmpRRZJ6Ts2Skk1BkpZ2bZKmdnGSrlY9krZRkZK6OQmSwkO9kspZvZLmKaGS7naNkvJ2eZMGXaWTCnaVkxZ2hZMedomTNkYBk0p2gZNSdXmTYnaRk2p2fZOCdqWThnapk4pNGZOOdrGTmjkNk552nZOyLW2Tvna1k8Z2mZPKdsWT0nbBk9p2vZPqdsmT9nbRk\/o\/vZQCds2UFnbdlGJ21ZRydtmUdnZBlI525ZSSduGUqnZhlK526ZSydrmUvjnhlNJ27ZTWdvGU2nb5lN529ZTidv2U5ifxlO41VZT6V+mU\/kK1lRYzMZUidwWVNncRlT5VxZVGLfmVVncNlVp3CZVeUc2VYncVlWYuzZV2dx2VencZlYoq4ZWOOVWVmk9ZlbIxoZXCQlGVynchldJCuZXWTR2V3lX5leJ3JZYKdymWDnctlh5W2ZYibfGWJkMRljJVrZY6N1mWQlONlkZTBZZeTbGWZl79lm53NZZyOzmWfnc5loYi0ZaSL0mWlkMtlp5WAZaudz2WsjmFlrZJmZa+OemWwkFZlt53QZbmV+2W8iZdlvY57ZcGd02XDndFlxJ3UZcWXt2XGndJly5D5Zcyd1WXPkbBl0p3WZdeK+GXZndhl253XZeCd2WXhndpl4or5ZeWT+mXmklVl54uMZeiOfGXpkYFl7I97Ze2IrmXxndtl+omgZfud32YCjVZmA53eZgaNqWYHj7hmCp3dZgyPuWYOlr5mD42oZhOI1WYUkMxmHJ3kZh+Qr2YgiWZmJY90ZieWhmYojfBmLY+6Zi+QpWY0neNmNZ3hZjad4mY8kotmP55FZkGd6GZCjp5mQ41XZkSd5mZJnedmS5BXZk+d5WZSjk5mXZ3qZl6d6WZfne5mYp3vZmSd62ZmikFmZ53sZmid7WZplNNmbpWBZm+MaWZwnfBmdJCwZnaPu2Z6knFmgYvFZoOd8WaEnfVmh4nJZoid8maJnfRmjp3zZpGPi2aWkmdml4jDZpid9madnfdmopKoZqaX72arjmJmrpXpZrSWXGa4nkFmuZ35Zryd\/Ga+nftmwZ34ZsSeQGbHk9xmyZ36ZtaeQmbZj4xm2p5DZtyXambdlJhm4J5EZuaeRmbpnkdm8J5IZvKLyGbziWdm9I1YZvWeSWb3nkpm+I+RZvmRgmb8mdZm\/ZFdZv6RXGb\/kdZnAI3FZwOY8GcIjI5nCZdMZwuV\/GcNlZ5nD55LZxSN8WcVkr1nFp5MZxeYTmcbll1nHZKpZx6eTWcfivpnJp5OZyeeT2colthnKpaiZyuWlmcslntnLY5EZy6eUWcxjulnNJZwZzaeU2c3nlZnOJ5VZzqK92c9i4BnP55SZ0GeVGdGnldnSZCZZ06Xm2dPiMdnUI3eZ1GRumdTjttnVo\/xZ1meWmdck21nXp5YZ1+RqWdgnllnYY\/wZ2KW22djnltnZJ5cZ2WXiGdqnmFnbY1ZZ2+UdGdwnl5ncZOMZ3Kd3GdzneBndYtuZ3eUZmd8nmBnfo+8Z3+UwmeFnmZnh5T4Z4meXWeLnmNnjJ5iZ5CQzWeVlo1nl5fRZ5qWh2ecicpnnY59Z6CYZ2ehnmVnopCVZ6aeZGepnl9nr4zNZ7Oea2e0nmlntonLZ7eeZ2e4nm1nuZ5zZ8GRxmfElb9nxp51Z8qVQWfOnnRnz5SQZ9CWXmfRirln05D1Z9SPX2fYktFn2pdNZ92ecGfenm9n4p5xZ+SebmfnnnZn6Z5sZ+yeamfunnJn755oZ\/GSjGfzlvZn9I7EZ\/WN8mf7jbhn\/paPZ\/+KYGgCksxoA5PIaASJaGgTkPBoFpCyaBeMSWgennhoIY1aaCKKnGgpnnpoKoqUaCuegWgynn1oNJDxaDiKamg5japoPIppaD2NzWhAnntoQYyFaEKMamhDk41oRp55aEiIxGhNnnxoTp5+aFCLy2hRjEtoU4q6aFSLamhZnoJoXI33aF2WkWhfjlZoY56DaGeVT2h0no9odomxaHeehGh+npVof56FaIGXwGiDnoxohZR+aI2elGiPnodok4iyaJSeiWiXjVtom56LaJ2eimifnoZooJ6RaKKPvWimmutop4zmaKiXnGitnohor5LyaLCKQmixjatos56AaLWekGi2ioFouZ6OaLqekmi8k45oxIr8aMaesGjJlsdoyp6XaMuK+2jNnp5o0pZfaNSen2jVnqFo156laNiemWjakklo35OPaOCeqWjhnpxo456maOeeoGjukFho756qaPKQsWj5nqho+oq7aQCYb2kBnpZpBJ6kaQWI1mkInphpC5a4aQyenWkNkEFpDpLFaQ+ek2kSnqNpGZCaaRqerWkbipFpHIyfaSGer2kinpppI56uaSWep2kmnptpKJ6raSqerGkwnr1pNJPMaTaeomk5nrlpPZ67aT+S1mlKl2tpU5WWaVSetmlVkchpWZ68aVqRXmlcnrNpXZ7AaV6ev2lgk+1pYZ6+aWKT6GlqnsJpa561aW2Lxmlunrhpb498aXOUgGl0nrppdYvJaXeesml4nrRpeZ6xaXyYT2l9inlpfp63aYGewWmCilRpio3laY6JfGmRntJplJhQaZWe1WmbkFlpnJ7UaaCe02mnntBprp7EabGe4WmynsNptJ7Wabuezmm+nslpv57GacGex2nDns9px+qgacqezGnLjVxpzJLGac2RhGnOnspp0J7FadOeyGnYl2xp2ZaKad2ezWnentdp557faeie2GnrnuVp7Z7jafKe3mn5nt1p+5LOaf2RhWn\/nttqAp7ZagWe4GoKnuZqC5Tzagye7GoSnudqE57qahSe5GoXkpRqGZVXahue2moenuJqH4++aiGWzWoinvZqI57paimMoGoqiaFqK4p+ai6e0Wo1j79qNp7uajie9Wo5jvdqOoqSaj2STWpEnutqR57wakie9GpLi7RqWItralme8mpfi0BqYZPJamKe8WpmnvNqcp7tanie72p\/ioBqgJJoaoSe+mqNnvhqjoznapCe92qXn0BqnJ53aqCe+Wqinvtqo578aqqfS2qsn0dqrp6NarOfRmq4n0Vqu59CasGe6GrCn0Rqw59DatGfSWrTmEVq2p9MatuL+Wren0hq359KauiUpWrqn01q+p9RavufTmsEl5NrBZ9Pawqe3GsSn1JrFp9Tax2JVGsfn1VrIIyHayGOn2sji9NrJ4miazKXfms3n1drOJ9WazmfWWs6i1xrPYvUaz6KvGtDn1xrR59ba0mfXWtMicxrTpJWa1CfXmtTir1rVJ9ga1mfX2tbn2FrX59ia2GfY2tijn5rY5Cza2SNn2tmlZBraZXga2qYY2tvjpVrc43Oa3SX8Gt4n2RreZ9la3uOgGt\/n2ZrgJ9na4OfaWuEn2hrhpZ3a4mPfWuKjupri45ja42famuVn2xrlpBCa5ifa2uen21rpJ9ua6qfb2urn3Brr59xa7Gfc2uyn3Jrs590a7SJo2u1kmlrt591a7qORWu7imtrvJ92a7+TYWvAmsprxYtCa8afd2vLn3hrzZXqa86WiGvSk8Vr0595a9SU5GvYlPlr25bRa9+femvrn3xr7J97a++ffmvzn31sCJ+BbA+OgWwRlq9sE5+CbBSfg2wXi0NsG5+EbCOfhmwkn4VsNJCFbDeVWGw4iWlsPpTDbECS82xBj2BsQouBbE6UxGxQjqxsVZ+IbFeKvmxaiZhsXZPwbF6fh2xfjV1sYJJybGKfiWxon5Fsap+KbHCRv2xyi4Jsc5+SbHqMiGx9i0Rsfp+QbIGfjmyCn4tsg5eAbIiSvmyMk9dsjZ+MbJCflGySn5Nsk4xCbJaJq2yZjblsmp+NbJufj2yhlnZsopHybKuWl2yun5xssZ+dbLOJzWy4laZsuZb7bLqfn2y7jqFsvI\/AbL2fmGy+n55sv4mIbMGLtWzEn5VsxZ+abMmQ8mzKlJFszJTlbNOfl2zVlkBs15+ZbNmfomzbn6Bs3Z+bbOGWQWzilGds44uDbOWTRGzoko1s6p+jbO+foWzwkdds8Z+WbPOJam0Ll21tDJ+ubRKfrW0XkPRtGZ+qbRuXjG0ek7RtH5+kbSWSw20piWttKo1ebSufp20yj0ZtM5+sbTWfq202n6ZtOJ+pbTuKiG09n6htPpRobUGXrG1Ej\/JtRZDzbVmftG1an7JtXJVsbWOfr21kn7FtZolZbWmNX21qmFFtbIpcbW6Vgm10l4Ftd4pDbXiQWm15n7NthZ+4bYiPwW2Ml09tjp+1bZOfsG2Vn7ZtmZfcbZuTk22ck8Btr4pVbbKJdG21n7xtuJ+\/bbyXwW3Al4RtxZ\/GbcafwG3Hn71ty5fSbcyfw23Rj2lt0p\/FbdWfym3Yk5Ft2Z\/Ibd6fwm3hkldt5J\/Jbeafvm3on8Rt6p\/LbeuI+m3sn8Ft7p\/MbfGQW23zj35t9ZWjbfeNrG35n7lt+p\/HbfuTWW4FkLRuB4qJbgiNz24Jj8JuCp+7bguPYW4TjGtuFZ+6bhmf0G4aj41uG4y4bh2f324fn9luIIuUbiGTbm4jn9RuJJ\/dbiWIrW4miVFuKYm3biuf1m4skapuLZ\/Nbi6fz24vjWBuOJ\/gbjqf224+n9NuQ5\/abkqWqW5Nn9huTp\/cblaMzm5Yj8NuW5JYbl+f0m5nl05ua5\/Vbm6fzm5vk5Jucp\/Rbnaf125+mHBuf468boCWnm6Cn+FujJSsbo+f7W6QjLlulo+Abpif426cl61unY1hbp+f8G6iiOxupZ\/ubqqf4m6vn+husp\/qbraXbm63n+VuupNNbr2f527Cn+9uxJ\/pbsWWxW7Jn+Ruy46gbsyf\/G7Riopu05\/mbtSf627Vn+xu3ZHqbt6R2G7sn\/Ru75\/6bvKf+G70k0hu9+BCbvif9W7+n\/Zu\/5\/ebwGLmW8ClVlvBo69bwmNl28PmFJvEZ\/ybxPgQW8UiYlvFZGGbyCUmW8iir9vI5f4byuWn28sktBvMZ\/5bzKf+284kVFvPuBAbz+f929Bn\/FvRYrBb1SMiW9Y4E5vW+BJb1yQ9m9fioNvZI+Bb2bgUm9t4EtvbpKqb2\/gSG9wktdvdOBrb3jgRW964ERvfOBNb4DgR2+B4EZvguBMb4SQn2+G4ENvjuBPb5HgUG+XisBvoeBVb6PgVG+k4FZvquBZb7GTYm+z4FNvueBXb8CMg2\/BkfdvwuBRb8OUWm\/G4Fhv1OBdb9XgW2\/Y4F5v2+Bhb9\/gWm\/gjYpv4ZRHb+Sft2\/rl5Rv7OBcb+7gYG\/vkfNv8eBfb\/PgSm\/26Ilv+uBkb\/7gaHAB4GZwCeBicAvgY3AP4GdwEeBlcBWVbXAY4G1wGuBqcBvgaXAd4GxwHpPScB\/gbnAmkpVwJ5HrcCyQo3Aw4G9wMuBxcD7gcHBMn\/NwUeBycFiT5XBj4HNwa4nOcG+TlHBwikRweIuEcHyO3HB9jdBwiZhGcIqQhnCOiYpwkuB1cJngdHCs4HhwrZJZcK7ge3Cv4HZws+B6cLjgeXC5k19wuojXcMiX83DL4H1wz4lHcNnggHDd4H5w3+B8cPHgd3D5lkJw\/eCCcQnggXEUiYtxGeCEcRqVsHEc4INxIZazcSaPxXE2kVJxPI\/EcUmX+XFM4IpxTpD3cVXghnFW4ItxWYmMcWLgiXFklIFxZeCFcWbgiHFnj8ZxaZTPcWzgjHFujs9xfZD4cYTgj3GI4IdxioxGcY\/gjXGUl29xleCQcZnqpHGfj25xqOCRcazgknGxlE1xueCUcb7glXHDlFJxyJOVccngl3HO4Jlx0JfTcdLglnHU4Jhx1YmNcdfgk3Hfmnpx4OCaceWRh3Hmjldx5+Cccezgm3HtkENx7pnXcfXgnXH54J9x++COcfzgnnH\/4KByBpSacg3goXIQ4KJyG+CjcijgpHIqktxyLOCmci3gpXIw4KdyMuCocjWO3XI2lYNyOpbqcjvgqXI84KpyPZF1cj6OonI\/4KtyQOCsckbgrXJHldBySJTFckvgrnJMlHZyUpKrcljgr3JZieVyW4uNcl2WxHJflrRyYYmycmKYU3JnlnFyaZWocnKQtXJ04LByeZPBcn2MoXJ+4LFygI3ScoHgs3KC4LJyh+C0cpLgtXKW4LZyoItdcqLgt3Kn4LhyrIyicq+UxnKy4Lpyto\/zcrnguXLCi7Zyw+C7csTgvXLG4LxyzuC+ctCMz3LS4L9y14vnctmRX3LbjZ1y4ODBcuHgwnLi4MBy6Y7rcuyTxnLti7dy9+DEcviSS3L54MNy\/JhUcv2UgnMK4MdzFuDJcxfgxnMbltJzHODIcx3gynMfl8JzJeDOcyngzXMqkpZzK5RMcy6Mo3Mv4MxzNODLczaXUHM3l1FzPuDPcz+JjnNEjZZzRY6Cc07g0HNP4NFzV+DTc2OPYnNo4NVzauDUc3Dg1nNyimxzdeDYc3jg13N64Npze+DZc4SMunOHl6ZziYvKc4uJpHOWi+hzqYrfc7KX5nOz4Nxzu+Dec8Dg33PCic9zyODbc8qOWHPNkr9zzuDdc97g4nPgjuxz5eDgc+qMXXPtlMdz7uDhc\/Hg\/HP44Odz\/oy7dAOLhXQF4OR0BpeddAmXrnQikfR0JeDmdDLg6HQzl9R0NIvVdDWU+nQ2lGl0OuDpdD\/g63RB4O50VeDqdFng7XRajOh0W4lsdFzg73RekJB0X+DsdGCX2nRj4PJ0ZOqidGng8HRq4PN0b+DldHDg8XRzjbp0duD0dH7g9XSDl550i+D2dJ7g93Si4ON0p+D4dLCKwnS9jqN0yuD5dM\/g+nTU4Pt03IladODhQHTilVp04+FBdOaKonTn4UJ06eFDdO7hRHTw4UZ08eFHdPLhRXT2lXJ09+FJdPjhSHUD4Ut1BOFKdQXhTHUM4U11DeFPdQ7hTnURjZl1E+FRdRXhUHUYisN1GpBydRyTW3Ue4VJ1H5C2dSOOWXUliZl1JuFTdSiXcHUrleF1LOFUdTCTY3Uxl1J1Mo1idTOQXHU3kmp1OJmydTqSrHU7ieZ1POFVdUThVnVG4Vt1SeFZdUrhWHVLncB1TIpFdU3hV3VPiNh1UZSodVSUyHVZl691WuFcdVvhWnVcknt1XZCkdWCUqXVilUx1ZOFedWWXqnVmjGx1Z+FfdWnhXXVqlNR1a+FgdW3hYXVwiNl1c4\/0dXThZnV24WN1d5PrdXjhYnV\/i0V1guFpdYbhZHWH4WV1ieFodYrhZ3WLlUR1jpFhdY+RYHWRi151lOFqdZrha3Wd4Wx1o+FudaXhbXWriXV1seF2dbKU5nWz4XB1teFydbjhdHW5kF11vOF1db3hc3W+jr51wuFvdcPhcXXFlWF1x4\/HdcrheHXN4Xd10uF5ddSOpHXVja112JOXddnhenXbksl13uF8deKXn3Xj4Xt16ZGJdfDhgnXy4YR18+GFdfSSc3X64YN1\/OGAdf7hfXX\/4X52AeGBdgnhiHYL4YZ2DeGHdh\/hiXYg4Yt2IeGMdiLhjXYk4Y52J+GKdjDhkHY04Y92O+GRdkKXw3ZG4ZR2R+GSdkjhk3ZMiuB2Upb8dlaVyHZY4ZZ2XOGVdmHhl3Zi4Zh2Z+GcdmjhmXZp4Zp2auGbdmzhnXZw4Z52cuGfdnbhoHZ44aF2epStdnuTb3Z84aJ2fZSSdn6VU3aA4aN2g+GkdoSTSXaGikZ2h41jdojhpXaL4aZ2juGndpCOSHaT4al2luGodpnhqnaa4at2rpTndrDhrHa04a12t+qJdrjhrna54a92uuGwdr+OTXbC4bF2w5R1dsaWfnbIiW12yol2ds3hsnbS4bR21uGzdteTkHbbkLd23J9Ydt7htXbflr924eG2duOKxHbklNV25eG3dufhuHbq4bl27pbadvKW03b0krx2+JGKdvvhu3b+j4J3AY\/IdwThvncH4b13COG8dwmU+3cLisV3DIyndxvhxHce4cF3H5BedyCWsHck4cB3JeHCdybhw3cp4b93N+HFdzjhxnc6kq13PIrhd0CShXdH4cd3WuHId1vhy3dhkId3Y5PCd2XhzHdmlnJ3aOHJd2vhynd54c93fuHOd3\/hzXeL4dF3juHQd5Hh0nee4dR3oOHTd6WVy3esj3V3rZfEd7Dh1Xezk7V3tuHWd7nh13e74dt3vOHZd73h2ne\/4dh3x+Hcd83h3XfX4d532uHfd9uWtXfc4eB34pbud+Ph4Xflkm1355SKd+mL6Xftklp37uHid++LuHfzkM53\/OHjeAKNu3gM4eR4EuHleBSMpHgVjdN4IOHneCWTdXgmjdR4J4tteDKWQ3g0lGp4OpN2eD+Ne3hF4el4XY\/JeGuXsHhsjWR4b4yleHKUoXh04et4fOHteIGM6XiG4ex4h5L0eIzh73iNilZ4juHqeJGU6HiTiU94lY3qeJeYcXia4e54o+HweKeVyXipkNd4quHyeK\/h83i14fF4uopteLzh+Xi+4fh4wY6leMXh+njG4fV4yuH7eMvh9njQlNZ40eH0eNTh93ja4kF45+JAeOiWgXjs4fx474jpePTiQ3j94kJ5AY\/KeQfiRHkOkWJ5EeJGeRLiRXkZ4kd5JuHmeSrh6Hkr4kl5LOJIeTqOpnk8l+d5Po7QeUDiSnlBjFZ5R4tfeUiLRnlJjoN5UJdTeVPiUHlV4k95VpFjeVfiTHla4k55XY9qeV6QX3lf4k15YOJLeWKUSXllj8t5aJVbeW2N1Xl3k5h5euJReX\/iUnmA4mh5gYvWeYSYXHmFkVR5iuJTeY2J0HmOkvV5j5WfeZ3iVHmmi5p5p+JVeariV3mu4lh5sJRIebPiWXm54lp5uuJbeb2L13m+idF5v5PDecCPR3nBjoR5yeJcecuPSHnRich50pViedXiXXnYlOl535FkeeHiYHnj4mF55JSJeeaQYHnn4l556ZKBeeziX3nwj8x5+4jaegCLSHoI4mJ6C5L2eg3iY3oOkMV6FJareheVQnoY4mR6GeJlehqSdHocl8V6H+JneiDiZnouju16MeJpejKI7no34mx6O+JqejyJ0no9jG16PuJrej+NZXpAjZJ6QpXkekPibXpGlnN6SeJvek2Qz3pOiW56T4m4elCIqnpX4m56YeJwemLicXpjj\/V6aeJyemuKbnpw4nR6dIyKenaLhnp54nV6eovzen3idnp\/kPp6gZPLeoOQ3nqEjfN6iOJ3epKSgnqTkYt6leJ5epbie3qX4nh6mOJ6ep+MQXqp4nx6qoxFeq6Lh3qvl3F6sOJ+erbigHq6iU16v+KDesOKlnrE4oJ6xeKBesfihXrI4n16yuKGesuXp3rN4od6z+KIetKa8nrT4op61eKJetnii3ra4ox63Jezet3ijXrf6O164I\/NeuHijnri4o964492euWTtnrm4pB66pJHeu3ikXrvklt68OKSevaLo3r4mV56+ZJ8evqOsXr\/isZ7AuKTewTioHsG4pZ7CIuIewrilXsL4qJ7D+KUexGPznsY4ph7GeKZexuTSnse4pp7IIp9eyWQeXsmlYR7KOKceyyR5nsz4pd7NeKbezbinXs5jfl7ReKke0aVTXtIlKR7SZOZe0uL2HtM4qN7TeKhe0+Us3tQ4p57UZJ9e1KTm3tUk5p7Vo30e13itntl4qZ7Z+Koe2ziq3tu4qx7cOKpe3Hiqnt04qd7deKle3rin3uGlc17h4nTe4vis3uN4rB7j+K1e5LitHuUlJN7lZale5eOWnuY4q57meK3e5risnuc4rF7neKte5\/ir3uhisd7qpJce62Q+3uxlKB7tOK8e7iUonvAkN97weK5e8SUzXvG4r17x5XRe8mSenvL4rh7zOK6e8\/iu3vd4r574I7Ce+STxHvl4sN75uLCe+niv3vtmFV78+LIe\/bizHv34sl8AOLFfAfixnwN4st8EeLAfBKZ03wT4sd8FOLBfBfiynwf4tB8IYrIfCPizXwn4s58KuLPfCvi0nw34tF8OJT0fD3i03w+l\/p8P5XrfEDi2HxD4tV8TOLUfE2Q0HxP4td8UOLZfFTi1nxW4t18WOLafF\/i23xg4sR8ZOLcfGXi3nxs4t98c5XEfHXi4Hx+luB8gYvMfIKMSHyD4uF8iZWyfIuQiHyNlq58kOLifJKXsXyVlJR8l5FlfJiUU3ybj2x8n4i+fKHi53yi4uV8pOLjfKWKn3ynj898qOLofKvi5nyt4uR8ruLsfLHi63yy4up8s+LpfLni7Xy94u58vpC4fMDi73zC4vF8xeLwfMqM0HzOkVd80uLzfNaTnHzY4vJ83OL0fN6Vs3zfkYx84I1mfOLi9Xznl8Z87+L3fPLi+Hz04vl89uL6fPiOhXz64vt8+4xufP6Lin0Ai0l9AuNAfQSW8X0FjWd9BuL8fQrjQ30LluR9DZRbfRCVUn0Uj4N9FeNCfReO0X0YjWh9GY6GfRqLiX0blbR9HONBfSCRZn0hlmF9Io31fSuOh30sktt9LuNGfS+X3X0wjdd9MuNHfTOQYX0140l9OY\/QfTqNrn0\/40h9Qo9JfUOMvH1EkWd9ReNEfUbjSn1L40V9TIxvfU7jTX1P41F9UIyLfVbjTH1b41V9Xo1pfWGXjX1iiLp9Y+NSfWaLi31o4099buNQfXGTnX1y4059c+NLfXWKR312kOJ9eYymfX3jV32J41R9j+NWfZPjU32ZjHB9mpGxfZvjWH2ckY59n+NlfaLjYX2j41t9q+NffayO+H2tiNt9ruNafa\/jYn2w42Z9sY1qfbKW1H20ktR9teNcfbjjZH2641l9u5Jdfb3jXn2+iLt9v5bIfcfjXX3Ki9l9y5Tqfc+RjX3Rl8590o+PfdXjjn3Y42d92pD8fdzjY33d42h93uNqfeCS933h42195ONpfeiV0n3pisl97JbJfe+I3H3y42x99Jf7ffvja34BiY9+BJPqfgXjbn4J43V+CuNvfgvjdn4S43J+G5Sbfh6OyH4f43R+IeNxfiLjd34j43B+Jo9jfiuWRH4uj2t+MeNzfjLjgH4143t+N+N+fjnjfH4644F+O+N6fj3jYH4+kNF+QZTJfkPjfX5G43h+SpFAfkuMcX5Nj0p+VJBEflWRVX5W44R+WeOGflrjh35d44N+XuOFfmbjeX5n44J+aeOKfmrjiX5tlpp+cIxKfnnjiH5744x+fOOLfn3jj35\/45F+go5bfoPjjX6I45J+ieOTfozjlH6O45p+j5NafpDjln6S45V+k+OXfpTjmH6W45l+m+ObfpzjnH82isp\/OOOdfzrjnn9F459\/TOOgf03joX9O46J\/UOOjf1HjpH9U46Z\/VeOlf1jjp39f46h\/YOOpf2fjrH9o46p\/aeOrf2qN339rjHJ\/bpJ1f3CUsX9yj5B\/dZRsf3eU6394461\/eZzrf4Ljrn+D47B\/hZeFf4bjr3+H47J\/iOOxf4qXcn+M47N\/jpT8f5TjtH+a47d\/neO2f57jtX+j47h\/pIxRf6iRQX+pi2B\/ruO8f6\/juX+y47p\/tuO9f7jjvn+547t\/vYlIf8GJpX\/F48B\/xuPBf8rjwn\/Ml4J\/0o9Lf9TjxH\/V48N\/4JCJf+HjxX\/m48Z\/6ePHf+uK43\/wist\/8+PIf\/njyX\/7lnx\/\/JeDgACXc4ABmFaAA41sgATjzIAFjtKABuPLgAvjzYAMjqeAEJHPgBLjzoAVjWuAF5bVgBjjz4AZ49CAHOPRgCHj0oAo49OAM46ogDaW64A749WAPZJegD\/j1IBG49eASuPWgFLj2IBWkLmAWOPZgFrj2oBelbeAX+PbgGGRj4Bi49yAaOPdgG+X\/IBw4+CAcuPfgHPj3oB0kq6AduPhgHeQRYB54+KAfePjgH6YV4B\/4+SAhOPlgIXj54CG4+aAh5SjgImT94CLmF2AjJSngJPj6YCWj9GAmJVJgJrj6oCb4+iAnYrMgKGM0oCijoiApZTsgKmMqICqlmKArOPtgK3j64CvjW2AsY1ugLKI54C0jeaAupR4gMOI3YDE4\/KAxpJfgMyUd4DOkdmA1uP0gNnj8IDa4\/OA2+PugN3j8YDelkWA4YzTgOSI+4Dl4++A7+P2gPHj94D0k7eA+Iu5gPzkRYD9lFyBAo6JgQWLuoEGkMaBB5hlgQiWrIEJ4\/WBCpDSgRqLcoEb4\/iBI+P6gSnj+YEv4\/uBMZJFgTOUXYE5kq+BPuRCgUbkQYFL4\/yBTpB0gVCVhYFR5ESBU+RDgVSNb4FVmHKBX+RUgWXkSIFm5EmBa47ugW7kR4FwjZiBceRGgXTkSoF4krCBeZWggXqRQoF\/kdqBgOROgYLkT4GD5EuBiORMgYrkTYGPjXCBk+RVgZXkUYGalYaBnJaMgZ2VR4Gg5FCBo+RTgaTkUoGolmOBqeRWgbDkV4GzkVaBteRYgbjkWoG65F6BveRbgb7kWYG\/lF6BwORcgcLkXYHGibCByORkgcnkX4HN5GCB0eRhgdORn4HY5GOB2eRigdrkZYHf5GaB4ORngeOQYoHlieeB5+RogeiX1YHqjqmB7Y9MgfOOioH0knaB+uRpgfvkaoH8iVCB\/uRrggHkbIIC5G2CBeRuggfkb4IIi7uCCZ2oggrkcIIMkOOCDeRxgg6OyYIQ5HKCEpiughbkc4IXldyCGIraghuRQ4Icj3eCHpWRgh+PTYIp5HSCKo1xgivkdYIslMqCLuSEgjPkd4I1kceCNpSVgjeMvYI45HaCOZFEgkDkeIJHkviCWOR6glnkeYJa5HyCXeR7gl\/kfYJi5ICCZOR+gmaKzYJo5IGCauSCgmvkg4Juja+Cb5fHgnHkhYJykEaCdomQgnfkhoJ45IeCfuSIgouI8IKN5ImCkuSKgpmVh4KdjsWCn+SMgqWKSIKmiLCCq+SLgqzkjoKtlG2Cr5BjgrGJ1IKzlkaCuIx8grmL2oK75I2CvYnogsWKoYLRiZGC0uSSgtOX6ILUkduC15VjgtnknoLbidWC3OScgt7kmoLf5JGC4eSPguPkkILljuGC5ovqgueSl4Lrk8+C8YlwgvPklIL05JOC+eSZgvrklYL75JiDApbOgwPkl4MEidaDBYqdgwbkm4MJ5J2DDoxzgxbkoYMX5KqDGOSrgxyIqYMj5LKDKIjvgyvkqYMv5KiDMeSjgzLkooM05KCDNeSfgzaSg4M4kfmDOeSlg0DkpINF5KeDSZGQg0qMdINPiWCDUOSmg1KNcoNYkZGDc+S4g3XkuYN3ideDe4msg3zktoOF5KyDh+S0g4nku4OK5LWDjuSzg5PkloOW5LGDmuStg56KzoOf5K+DoOS6g6LksIOo5LyDquSug6uUnIOxl4mDteS3g73kzYPB5MWDxZCbg8qLZYPMi9uDzuTAg9OJ2YPWj9KD2OTDg9yN2IPfk3CD4OTIg+mV7IPr5L+D74nYg\/CM1IPxlUiD8uTJg\/TkvYP35MaD++TQg\/3kwYQD5MKEBJO4hAfkx4QL5MSEDJZHhA3kyoQOiN6EE+S+hCDkzIQi5MuEKZSLhCrk0oQs5N2EMYqehDXk4IQ45M6EPOTThD2XjoRG5NyESZd0hE6XqIRXkpiEW4qLhGGVkoRi5OKEY5OfhGaIr4Rp5NuEa+TXhGyRkoRt5NGEbuTZhG\/k3oRxlEuEdYiohHfk1oR55N+EepWYhILk2oSE5NWEi4\/ThJCPToSUjqqEmZbWhJyVZoSf5OWEoeTuhK3k2ISyipeEuI\/2hLnk44S75OiEvJGThL\/k5ITB5OuExJJ+hMbk7ITJl3WEyuThhMuKV4TN5OeE0OTqhNGWqoTW5O2E2eTmhNrk6YTslkiE7phAhPTk8YT85PiE\/+TwhQCOwYUG5M+FEZXMhROWoIUU5PeFFeT2hRfk8oUY5POFGolVhR\/k9YUh5O+FJpLThSzk9IUtiPyFNZGghT2VwYVA5PmFQeVAhUOU14VI5PyFSY\/UhUqOx4VL5UKFTou8hVXlQ4VXlZmFWOT7hVrk1IVj5PqFaJhuhWmToIVqlZOFbeVKhXflUIV+5VGFgOVEhYSUloWH5U6FiOVGhYrlSIWQ5VKFkeVHhZTlS4WXiZKFmZPjhZvlTIWc5U+FpOVFhaaRRYWo5UmFqY5GhaqQZIWrjE+FrJbyha6W94Wvj5KFueVWhbrlVIXBmG2FyeVThc2XlYXP5VWF0OVXhdXlWIXc5VuF3eVZheSToYXl5VqF6ZTLherlTYX3j5OF+eVchfrlYYX7kZSF\/uVghgLlQYYG5WKGB5FohgrlXYYL5V+GE+VehhafUIYXn0GGGuVkhiLlY4Ytl5aGL+G6hjDlZYY\/5WaGTeVnhk6M1YZQi3OGVOVphlWZfIZai5WGXJe4hl6L8YZf5WqGZ+VrhmuSjoZx5WyGeZP4hnuIuIaKieGGi+VxhozlcoaT5W2GlY5chqPlboaklGGGqeVvhqrlcIar5XqGr+V0hrDld4a25XOGxOV1hsbldobHjtaGyeV4hsuSYIbNjHWGzophhtTle4bZil6G2+WBht7lfIbf5YCG5JS4hunlfYbs5X6G7ZVnhu6U2Ibv5YKG+JH7hvnljIb75YiG\/onphwDlhocClkmHA+WHhwblhIcI5YWHCeWKhwrljYcN5YuHEeWJhxLlg4cYkneHGuWUhxyWqIcl5ZKHKeWThzTljoc35ZCHO+WRhz\/lj4dJkOSHS5hYh0zlmIdO5ZmHU+Wfh1WQSYdX5ZuHWeWeh1\/llodg5ZWHY+Wgh2aJ2odo5ZyHauWhh27lnYd05ZqHdpKxh3jll4d\/lIiHguWlh42XWoef5aSHouWjh6vlrIev5aaHs+Wuh7qXhoe75bGHveWoh8DlqYfE5a2HxuWwh8flr4fL5aeH0OWqh9Llu4fg5bSH7+Wyh\/Lls4f25biH9+W5h\/mKSYf7i2GH\/uW3iAXloogN5baIDuW6iA\/ltYgR5byIFeW+iBblvYgh5cCIIuW\/iCPleYgn5cSIMeXBiDblwog55cOIO+XFiECMjIhC5ceIROXGiEaPT4hMjXOITZ+liFLlyIhTj3CIV4pYiFnlyYhbiXGIXY\/ViF7lyohhjXSIYuXLiGOI34holVyIa+XMiHCQiohy5dOIdeXQiHeSj4h95dGIfuXOiH+L3IiB5c2IguXUiIiMVYiLkdyIjeXaiJLl1oiWkbOIl+XViJnl2Iie5c+IouXZiKTl24irlO2IruXXiLDl3Iix5d6ItIzRiLXl0oi3iL+Iv+XdiMGN2YjCl\/SIw+XfiMTl4IjFkZWIz5egiNTl4YjVl1SI2OXiiNnl44jcleKI3eXkiN+Nvojhl6GI6OXpiPLl6ojzj9aI9OXoiPiXh4j55eWI\/OXniP2Qu4j+kJ6JAuXmiQTl64kHlaGJCuXtiQzl7IkQioyJEpZKiRPl7okd5fqJHuXwiSXl8Ykq5fKJK+XziTbl94k45fiJO+X2iUHl9IlD5e+JROX1iUzl+YlN6LWJVommiV7l\/Ilfi92JYOX7iWTmQYlm5kCJauZDiW3mQolv5kSJco9QiXTmRYl35kaJfuZHiX+QvImBl3aJg+ZIiYaVoomHlGWJiOZJiYrmSomLjKmJj4tLiZPmS4mWjouJl5RgiZjmTImaim+JoeZNiabmT4mnl5eJqeZOiaqQZYms5lCJr+ZRibLmUomzis+JuuZTib3mVIm\/5lWJwOZWidKKcIna5leJ3OZYid3mWYnjifCJ5pBHiefmWon05luJ+OZcigCMvooCkvmKA+ZdigiMdooKkHWKDOZgig6ToooQ5l+KE4xQihbmXooXkfWKGItMihvmYYod5mKKH4\/XiiOMjYol5mOKKpZLii2Q3Yoxi5aKM5bzijSRaYo25mSKOpBmijuSkIo8j9iKQeZlikbmaIpI5mmKUI28ilGRwIpS5meKVI\/ZilWVXYpb5maKXo6MimCJcopi5m2KY4x3imaOjoppjo2Ka5hsimzmbIpt5muKbpFGinCLbIpxmGKKcopZinOP2op85mqKguZvioTmcIqF5m6Kh4zWiomXX4qMjo+KjZRGipHmc4qTkL6KlZJhipiXVYqa5naKnozqiqCQvYqh5nKKo+Z3iqSM64ql5nSKpuZ1iqjmcYqskOCKrZPHirCSToqyiduKuZTuiryLYoq\/krKKwuZ6isTmeIrHkmuKy5C\/isyK0IrN5nmKz5B6itKXyIrWmF+K2uZ7itvmh4rckrOK3uaGiuDmg4rh5ouK4uaEiuTmgIrmkvqK5+Z+iuvmfIrtl0CK7o6QivHmgYrz5n2K9+aFiviPlIr6jL+K\/pH4iwCWZIsBiXmLAojgiwSTo4sH5omLDOaIiw6T5IsQ5o2LFOaCixbmjIsX5o6LGYyqixrmiosbjXWLHY7TiyDmj4shl3eLJuaSiyjmlYsr5pOLLJVUizPmkIs5i96LPuaUi0HmlotJ5pqLTOaXi07mmYtP5piLVuabi1iOr4ta5p2LW+aci1yViItf5p+LZox4i2vmnots5qCLb+ahi3CLY4tx47+Lco\/3i3Tmoot3jOyLfeaji4DmpIuDjl2Lip3Mi4zmpYuO5qaLkI9Ri5Lmp4uT5qiLluapi5nmqoua5quMN5JKjDrmrIw\/5q6MQeatjEaTpIxI5q+MSpZMjEzmsIxO5rGMUOayjFXms4xak9iMYY\/bjGLmtIxqjYuMa5isjGzmtYx45raMeZVejHrmt4x85r+Mgua4jIXmuoyJ5rmMiua7jIyWZYyN5ryMjua9jJTmvoyY5sCMnYpMjJ6S5YyglYmMoY3gjKKNdoynlW6MqIndjKmUzIyq5sOMq4rRjKyQ04yt5sKMrubHjK+SmYywluGMsubFjLPmxoy0i02MtubIjLeUg4y4kd2Mu5TvjLyTXIy95sSMv5ZmjMCJ6ozB5sqMwphHjMOSwIzEmGSMx46RjMjmyYzKka+MzebajM6RR4zRk\/aM05VvjNrmzYzbjl6M3I6SjN6P3IzglIWM4oyrjOPmzIzk5suM5pWKjOqOv4ztk3GM+ubPjPvm0Iz8jXeM\/ebOjQTm0Y0F5tKNB+bUjQiRoY0K5tONC4rkjQ3m1o0P5tWNEObXjRPm2Y0U5tuNFubcjWSQ1I1mjs2NZ+bdjWuKcY1t5t6NcJGWjXHm341z5uCNdJWLjXeLTo2B5uGNhZK0jYqJeo2Z5uKNo47vjaiQlo2zkauNuubljb7m5I3C5uONy+brjczm6Y3P5uaN1ubojdrm543b5uqN3YuXjd\/m7o3hkNWN4+bvjeiM143q5uyN6+btje+YSI3zkrWN9ZFIjfzm8I3\/5vOOCObxjgnm8o4Kl3iOD5OljhDm9o4d5vSOHub1jh\/m944q50iOMOb6jjTm+4415vmOQub4jkSS+45H50COSOdEjknnQY5K5vyOTOdCjlDnQ45V50qOWedFjl+Q1o5g50eOY+dJjmTnRo5y50yOdI9SjnbnS458502OgedOjoTnUY6F51COh+dPjornU46L51KOjZb0jpHnVY6T51SOlOdWjpnnV46h51mOqudYjquQZ46s51qOr4vrjrDnW46x512OvudejsXnX47G51yOyOdgjsqO1I7L52GOzItPjs2MUo7SjKyO2+dijt+T7o7ik12O4+djjuvnZo74jrKO++dljvznZI79jHmO\/udnjwOKco8F52mPCY3ajwrnaI8M53GPEudrjxPnbY8UleOPFedqjxnnbI8b53CPHOdujx2LUI8f52+PJudyjymUeY8ql9aPL49TjzPnc484l0GPOed1jzvndI8+53iPP5dgj0Lnd49Eio2PRed2j0bne49J53qPTOd5j02TUY9O53yPV+d9j1znfo9fjYyPYYxEj2LngI9j54GPZOeCj5uQaI+c54OPno6rj5\/nhI+j54WPp5mfj6iZno+t54aPruOQj6\/nh4+wkkOPsZBKj7KUX4+354iPupXTj7uS0o+8jZ6Pv5JIj8KJSY\/ElpiPxZB2j86MfY\/Ri9+P1JXUj9rniY\/i54uP5eeKj+aJ3o\/pk\/SP6ueMj+uUl4\/tk1KP7+eNj\/CPcY\/054+P95bAj\/jnno\/555GP+ueSj\/2Sx5AAkd6QAZGXkAOTppAF55CQBot0kAvnmZAN55aQDuejkA+Tp5AQkoCQEeeTkBOS\/JAUk3KQFeeUkBbnmJAXkICQGZSHkBqSypAdkMCQHueXkB+RrJAgkaKQIeeVkCKIp5AjmEGQJ+eakC6R35Axj1SQMpBpkDXnnJA255uQOIjtkDnnnZA8lU6QPuelkEGT2ZBCkIuQRZJ4kEeL9pBJ56SQSpdWkEuJXpBNldWQTonfkE\/nn5BQ56CQUeehkFLnopBTk7mQVJJCkFWI4ZBW56aQWOenkFnqoZBckbuQXueokGCJk5BhkWuQY4ytkGWXeZBo56mQaZNLkG2RmJBujtWQb+eqkHLnrZB1j4WQduerkHeRSpB4kUmQeojikHyXyZB956+Qf5TwkIDnsZCB57CQgueukIPihJCEitKQh+eOkInns5CK57KQj+e0kJGXV5Cjk9+QppZNkKjntZCqjteQr+e2kLHnt5C157iQuJNAkMGI6JDKjXiQzphZkNvnvJDhjFOQ4ue5kOTnupDolZSQ7YpzkPWXWJD3i72Q\/ZNzkQLnvZES576RGee\/kS2TQZEw58GRMufAkUmT0ZFK58KRS49VkUyO3pFNlHqRTpKRkVKO8JFUkIyRVufDkVjnxJFikHyRY+fFkWXnxpFp58eRapePkWyPVpFy58mRc+fIkXWNeZF3jZOReI5fkYLnzJGHj4aRiefLkYvnypGNkeeRkIztkZKQwZGXlK6RnI9YkaLnzZGkj92RqufQkavnzpGv58+RtOfSkbXn0ZG4j\/iRuufTkcDn1JHB59WRxpTOkceN0ZHIjt+RyefWkcvn15HMl6KRzY9kkc6W7JHPl8qR0OfYkdGL4JHW59mR2JNCkdvn3JHcipiR3ZBqkd\/n2pHh59uR45LekeaWdJHni\/qR9efekfbn35H8592R\/+fhkg2T3ZIOimKSEeflkhTn4pIV5+SSHufgkinobpIs5+OSNJfpkjeM2JI\/5+2SRJNTkkXn6JJI5+uSSefpkkvn7pJQ5++SV+fnklrn9JJbiZSSXufmkmKUq5Jk5+qSZo\/eknGNepJ+lmeSgIvikoOPZZKFk7qSkZFMkpPn8pKV5+ySlufxkpiWwZKakraSm+fzkpzn8JKtkUuSt+f3krnn9pLP5\/WS0pZOkuSPm5Lp5\/iS6pXdku2Jc5LylWWS85KSkviLmJL65\/qS\/I18kwaOS5MP5\/mTEJCNkxiQjpMZ6ECTGuhCkyCP+ZMi6EGTI+hDkyaL0ZMolWSTK47gkyyYQpMu5\/yTL432kzKYXpM16EWTOuhEkzvoRpNE5\/uTS5Pnk02TdJNUktWTVuhLk1uSYpNc6EeTYOhIk2yMTJNu6EqTdYyuk3zoSZN+j9+TjIqZk5ToT5OWjb2Tl5GZk5qSyJOnilqTrOhNk63oTpOuksGTsOhMk7noUJPD6FaTyOhZk9DoWJPRk0yT1uhRk9foUpPY6FWT3ehXk+GLvpPk6FqT5ehUk+joU5QD6F6UB+hflBDoYJQT6F2UFOhclBiP4JQZk6iUGuhblCHoZJQr6GKUNehjlDboYZQ4kfaUOuhllEHoZpRE6GiUUYrTlFLoZ5RTlviUWuhzlFvoaZRe6GyUYOhqlGLoa5Rq6G2UcOhvlHXocJR36HGUfOh0lH3ocpR+6HWUf+h3lIHodpV3kreVgJbllYLoeJWDkU2Vh+h5lYmVwpWK6HqVi4pKlY+JW5WRitWVk4rUlZToe5WW6HyVmOh9lZnofpWg6ICVoorWlaOKdJWkjX2VpZS0lafogpWo6IGVreiDlbKJe5W56IaVu+iFlbzohJW+6IeVw+iKlceIxZXK6IiVzOiMlc3oi5XU6I6V1eiNldboj5XYk6yV3OiQleHokZXi6JOV5eiSlhyVjJYh6JSWKOiVliqN45Yu6JaWL+iXljKWaJY7kWqWP4iilkCRyZZC6JiWRJWNlkvom5ZM6JmWTY1+lk\/ompZQjMCWW5XDllzonZZd6J+WXuiell\/ooJZiiUCWY5B3lmSPnJZliteWZuihlmqUhpZs6KOWcIlBlnLoopZzksKWdZfLlnaTqZZ36JyWeJeklnqMr5Z9l3qWhYv3loaXspaIjEeWipHglovkQJaN6KSWjopLlo+Qj5aUinWWleimlpfop5aY6KWWmYyElpuN25acj+GWoIlClqOX15an6KmWqOeslqroqJaw6KyWseiqlrLoq5a06K2WtuiulreX6pa46K+WueiwlruQx5a8lLmWwJCdlsGK5ZbEl1mWxYnrlsaPV5bHjNmWyeizlsvospbMjpOWzei0ls7osZbRjkeW1ei4ltblq5bZmdSW25CXltzotpbil6OW45PvluiJSpbqkOGW6460lvCVtZbyiV+W9pfrlveXi5b56LmW+5NklwCO+ZcE6LqXBui7lweQa5cI6LyXCpfslw3ot5cO6L6XD+jAlxHov5cT6L2XFujBlxnowpcckZqXHonglyTow5cnlraXKujElzDoxZcymEmXOJ5Qlznoxpc96MeXPujIl0LozJdE6MmXRujKl0joy5dJ6M2XUpDCl1aW9ZdZkMOXXOjOl16U8Zdg6M+XYepyl2KWypdk6NCXZujRl2jo0pdpinaXa+jUl22QeJdx6NWXdIxDl3no1pd66NqXfOjYl4Ho2ZeEipOXhejXl4bo25eL6NyXjYjGl4\/o3ZeQ6N6XmI\/il5zo35egi2aXo+jil6bo4Zeo6OCXq+aRl62V2pez6OOXtOjkl8Po5ZfG6OaXyOjnl8vo6JfTitiX3Ojpl+3o6pfulEKX8ujsl\/OJuZf16O+X9ujul\/uJQ5f\/i7+YAZXFmAKSuJgDjaCYBY2AmAaPh5gIkHuYDOjxmA\/o8JgQl2GYEYrmmBKU0JgTk9qYF5CcmBiXzJgajHqYIej0mCTo85gslmqYLZOqmDSJb5g36PWYOOjymDuVcJg8l4qYPej2mEbo95hL6PmYTJHomE2KephOinuYT+j4mFSK55hVjLCYWIromFuTXphel96YZ4zamGvo+phv6PuYcOj8mHHpQJhz6UKYdOlBmKiVl5iq6UOYr+lEmLHpRZi26UaYw+lImMTpR5jG6UmY25TymNzjypjfkEiY4otRmOnpSpjr6UuY7ZmqmO6fWpjvlNGY8oj5mPSIuZj8jpSY\/ZZPmP6P\/JkD6UyZBZbdmQnpTZkKl3uZDIlhmRCOYJkS6U6ZE4nsmRTpT5kY6VCZHelSmR7pU5kg6VWZIelRmSTpVJkoitmZLOlWmS7pV5k96ViZPulZmULpWplF6VyZSelbmUvpXplM6WGZUOldmVHpX5lS6WCZVelimVeLwJmWjvGZl+ljmZjpZJmZjYGZpellmaiKXZmslG6Zrelmma7pZ5mzknmZtJPpmbzpaJnBlJ2ZxJHKmcWJd5nGi+yZyIvtmdCSk5nR6W2Z0ovumdWJ7ZnY6WyZ2+lqmd3pa5nf6WmZ4ul3me3pbpnu6W+Z8elwmfLpcZn46XOZ++lymf+PeJoB6XSaBel2mg6LUpoP6XWaEpGbmhOMsZoZ6XiaKJHLmivpeZowk6uaN+l6mj7pgJpA6X2aQul8mkPpfppF6XuaTemCmlXpgZpX6YSaWovBmlvpg5pf6YWaYumGmmTpiJpl6YeaaemJmmrpi5pr6YqaqI2cmq3pjJqw6Y2auIpbmrzpjprA6Y+axJCRms\/pkJrR6ZGa0+mSmtTpk5rYjYKa3umUmt\/plZri6Zaa4+mXmubpmJrqlK+a6+mamu2VRZru6Zua7+mZmvHpnZr06Zya9+memvvpn5sG6aCbGOmhmxrpopsf6aObIumkmyPppZsl6aabJ+mnmyjpqJsp6ambKumqmy7pq5sv6aybMZ9UmzLprZs74vabPItTm0GKQJtCjbCbQ+mvm0TprptFlqObTemxm07psptP6bCbUemzm1SWgptY6bSbWoubm2+YRJt06bWbg+m3m46IvJuR6bibkpWpm5PptpuW6bmbl+m6m5\/pu5ug6bybqOm9m6qWjpurjkybrY34m66RTpu06b6buenBm8Dpv5vG6cKbyYzvm8rpwJvP6cOb0enEm9LpxZvU6cmb1o5Jm9uR4pvh6cqb4unHm+Ppxpvk6cib6Ix+m\/Dpzpvx6c2b8unMm\/WIsZwE6dicBunUnAjp1ZwJ6dGcCunXnAzp05wNioKcEJhrnBLp1pwT6dKcFOnQnBXpz5wb6dqcIendnCTp3Jwl6ducLZVonC7p2ZwviPGcMOnenDLp4Jw5io+cOunLnDuJVpw+6eKcRunhnEfp35xIkkycUpaQnFeX2Jxa6eOcYOnknGfp5Zx26eaceOnnnOWSuZzn6eic6ZS1nOvp7Zzs6emc8OnqnPOWUJz0lsKc9pPOnQPp7p0G6e+dB5O8nQjp7J0J6eudDomonRLp950V6fadG4mVnR\/p9J0j6fOdJunxnSiKm50q6fCdK46wnSyJp507jYOdPun6nT\/p+Z1B6fidROn1nUbp+51I6fydUOpEnVHqQ51Z6kWdXIlMnV3qQJ1e6kGdYI2UnWGWt51k6kKdbJZRnW\/qSp1y6kadeupLnYfqSJ2J6kedj4x7nZrqTJ2k6k2dqepOnavqSZ2v6fKdsupPnbSS35246lOduupUnbvqUp3B6lGdwupXncTqUJ3G6lWdz+pWndPqWZ3Z6lid5upbne3qXJ3v6l2d8phonfjqWp35kemd+o3rnf3qXp4a6l+eG+pgnh7qYZ516mKeeIyynnnqY5596mSef46tnoHqZZ6I6maei+pnnozqaJ6R6muekuppnpOYW56V6mqel5ftnp3qbJ6fl9mepeptnqaUnp6p6m6equpwnq3qcZ646m+euY2NnrqWy567loOevJv1nr6fgJ6\/lpuexImpnszqc57Ni2+ezup0ns\/qdZ7Q6nae0o2VntTqd57Y4NKe2ZbZntuR4Z7c6nie3ep6nt7qeZ7g6nue5ep8nujqfZ7v6n6e9OqAnvbqgZ736oKe+eqDnvvqhJ786oWe\/eqGnwfqh58I6oifDpNDnxOM258V6oqfIJFsnyHqi58s6oyfO5VAnz7qjZ9K6o6fS+JWn07m2J9P6OufUuqPn1TqkJ9f6pKfYOqTn2HqlJ9il+6fY+qRn2bqlZ9n6pafauqYn2zql59y6pqfduqbn3fqmZ+Nl7Sfleqcn5zqnZ+d4nOfoOqe\/wGBSf8DgZT\/BIGQ\/wWBk\/8GgZX\/CIFp\/wmBav8KgZb\/C4F7\/wyBQ\/8OgUT\/D4Fe\/xCCT\/8RglD\/EoJR\/xOCUv8UglP\/FYJU\/xaCVf8Xglb\/GIJX\/xmCWP8agUb\/G4FH\/xyBg\/8dgYH\/HoGE\/x+BSP8ggZf\/IYJg\/yKCYf8jgmL\/JIJj\/yWCZP8mgmX\/J4Jm\/yiCZ\/8pgmj\/KoJp\/yuCav8sgmv\/LYJs\/y6Cbf8vgm7\/MIJv\/zGCcP8ygnH\/M4Jy\/zSCc\/81gnT\/NoJ1\/zeCdv84gnf\/OYJ4\/zqCef87gW3\/PIFf\/z2Bbv8+gU\/\/P4FR\/0CBTf9BgoH\/QoKC\/0OCg\/9EgoT\/RYKF\/0aChv9Hgof\/SIKI\/0mCif9Kgor\/S4KL\/0yCjP9Ngo3\/ToKO\/0+Cj\/9QgpD\/UYKR\/1KCkv9TgpP\/VIKU\/1WClf9Wgpb\/V4KX\/1iCmP9Zgpn\/WoKa\/1uBb\/9cgWL\/XYFw\/2EAof9iAKL\/YwCj\/2QApP9lAKX\/ZgCm\/2cAp\/9oAKj\/aQCp\/2oAqv9rAKv\/bACs\/20Arf9uAK7\/bwCv\/3AAsP9xALH\/cgCy\/3MAs\/90ALT\/dQC1\/3YAtv93ALf\/eAC4\/3kAuf96ALr\/ewC7\/3wAvP99AL3\/fgC+\/38Av\/+AAMD\/gQDB\/4IAwv+DAMP\/hADE\/4UAxf+GAMb\/hwDH\/4gAyP+JAMn\/igDK\/4sAy\/+MAMz\/jQDN\/44Azv+PAM\/\/kADQ\/5EA0f+SANL\/kwDT\/5QA1P+VANX\/lgDW\/5cA1\/+YANj\/mQDZ\/5oA2v+bANv\/nADc\/50A3f+eAN7\/nwDf\/+OBUP\/lgY8=',
    7070
  )

  qrcode.qrcode.stringToBytesFuncs['UTF-8'] = function (s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array (str) {
      var utf8 = []
      for (var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i)
        if (charcode < 0x80) utf8.push(charcode)
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f))
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode >> 6) & 0x3f),
              0x80 | (charcode & 0x3f))
        }
        // surrogate pair
        else {
          i++
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff) << 10) |
            (str.charCodeAt(i) & 0x3ff))
          utf8.push(0xf0 | (charcode >> 18),
              0x80 | ((charcode >> 12) & 0x3f),
              0x80 | ((charcode >> 6) & 0x3f),
              0x80 | (charcode & 0x3f))
        }
      }
      return utf8
    }
    return toUTF8Array(s)
  }
}());

(function (factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof exports === 'object') {
    module.exports = factory()
  }
}(function () {
  return {
    QRCode: qrcode.qrcode,
    QRUtil: qrcode.QRUtil
  }
}))


/***/ })
/******/ ]);