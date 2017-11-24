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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return qrcode; });
/* harmony export (immutable) */ __webpack_exports__["b"] = QrCode;
/* harmony export (immutable) */ __webpack_exports__["a"] = URShift;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__detector__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__decoder__ = __webpack_require__(16);
/*
   Copyright 2011 Lazar Laszlo (lazarsoft@gmail.com, www.lazarsoft.info)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/




var qrcode = {};
qrcode.sizeOfDataLengthInfo =  [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]];

function QrCode() {

  this.imagedata = null;
  this.width = 0;
  this.height = 0;
  this.qrCodeSymbol = null;
  this.debug = false;

  this.callback = null;
}


QrCode.prototype.decode = function(src, data) {

  var decode = (function() {

    try {
      this.error = undefined;
      this.result = this.process(this.imagedata);
    } catch (e) {
      this.error = e;
      this.result = undefined;
    }

    if (this.callback != null) {
      this.callback(this.error, this.result);
    }

    return this.result;

  }).bind(this);

  if (src != undefined && src.width != undefined) {
    /* decode from canvas canvas.context.getImageData */
    this.width = src.width;
    this.height = src.height;
    this.imagedata = {"data": data || src.data};
    this.imagedata.width = src.width;
    this.imagedata.height = src.height;

    decode();
  } else {
    if (typeof Image === "undefined") {
      throw new Error("This source format is not supported in your environment, you need to pass an image buffer with width and height (see https://github.com/edi9999/jsqrcode/blob/master/test/qrcode.js)");
    }
    /* decode from URL */

    var image = new Image();
    image.crossOrigin = "Anonymous";

    image.onload = (function() {

      var canvas_qr = document.createElement('canvas');
      var context = canvas_qr.getContext('2d');
      var canvas_out = document.getElementById("out-canvas");

      if (canvas_out != null) {

        var outctx = canvas_out.getContext('2d');
        outctx.clearRect(0, 0, 320, 240);
        outctx.drawImage(image, 0, 0, 320, 240);
      }

      canvas_qr.width = image.width;
      canvas_qr.height = image.height;
      context.drawImage(image, 0, 0);
      this.width = image.width;
      this.height = image.height;

      try {
        this.imagedata = context.getImageData(0, 0, image.width, image.height);
      } catch (e) {
        this.result = "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!";
        if (this.callback != null) return this.callback(null, this.result);
      }

      decode();

    }).bind(this);

    image.src = src;
  }
};

QrCode.prototype.decode_utf8 = function(s) {

  return decodeURIComponent(escape(s));
};

QrCode.prototype.process = function(imageData) {

  var start = new Date().getTime();

  var image = this.grayScaleToBitmap(this.grayscale(imageData));

  var detector = new __WEBPACK_IMPORTED_MODULE_0__detector__["a" /* default */](image);

  var qRCodeMatrix = detector.detect();

  /*for (var y = 0; y < qRCodeMatrix.bits.height; y++)
   {
   for (var x = 0; x < qRCodeMatrix.bits.width; x++)
   {
   var point = (x * 4*2) + (y*2 * imageData.width * 4);
   imageData.data[point] = qRCodeMatrix.bits.get_Renamed(x,y)?0:0;
   imageData.data[point+1] = qRCodeMatrix.bits.get_Renamed(x,y)?0:0;
   imageData.data[point+2] = qRCodeMatrix.bits.get_Renamed(x,y)?255:0;
   }
   }*/

  var reader = __WEBPACK_IMPORTED_MODULE_1__decoder__["a" /* default */].decode(qRCodeMatrix.bits);
  var data = reader.DataByte;
  var str = "";
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++)
      str += String.fromCharCode(data[i][j]);
  }

  var end = new Date().getTime();
  var time = end - start;
  if (this.debug) {
    console.log('QR Code processing time (ms): ' + time);
  }

  return {result: this.decode_utf8(str), points: qRCodeMatrix.points};
};

QrCode.prototype.getPixel = function(imageData, x, y) {
  if (imageData.width < x) {
    throw "point error";
  }
  if (imageData.height < y) {
    throw "point error";
  }
  var point = (x * 4) + (y * imageData.width * 4);
  return (imageData.data[point] * 33 + imageData.data[point + 1] * 34 + imageData.data[point + 2] * 33) / 100;
};

QrCode.prototype.binarize = function(th) {
  var ret = new Array(this.width * this.height);
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var gray = this.getPixel(x, y);

      ret[x + y * this.width] = gray <= th;
    }
  }
  return ret;
};

QrCode.prototype.getMiddleBrightnessPerArea = function(imageData) {
  var numSqrtArea = 4;
  //obtain middle brightness((min + max) / 2) per area
  var areaWidth = Math.floor(imageData.width / numSqrtArea);
  var areaHeight = Math.floor(imageData.height / numSqrtArea);
  var minmax = new Array(numSqrtArea);
  for (var i = 0; i < numSqrtArea; i++) {
    minmax[i] = new Array(numSqrtArea);
    for (var i2 = 0; i2 < numSqrtArea; i2++) {
      minmax[i][i2] = [0, 0];
    }
  }
  for (var ay = 0; ay < numSqrtArea; ay++) {
    for (var ax = 0; ax < numSqrtArea; ax++) {
      minmax[ax][ay][0] = 0xFF;
      for (var dy = 0; dy < areaHeight; dy++) {
        for (var dx = 0; dx < areaWidth; dx++) {
          var target = imageData.data[areaWidth * ax + dx + (areaHeight * ay + dy) * imageData.width];
          if (target < minmax[ax][ay][0])
            minmax[ax][ay][0] = target;
          if (target > minmax[ax][ay][1])
            minmax[ax][ay][1] = target;
        }
      }
    }
  }
  var middle = new Array(numSqrtArea);
  for (var i3 = 0; i3 < numSqrtArea; i3++) {
    middle[i3] = new Array(numSqrtArea);
  }
  for (var ay = 0; ay < numSqrtArea; ay++) {
    for (var ax = 0; ax < numSqrtArea; ax++) {
      middle[ax][ay] = Math.floor((minmax[ax][ay][0] + minmax[ax][ay][1]) / 2);
    }
  }

  return middle;
};

QrCode.prototype.grayScaleToBitmap = function(grayScaleImageData) {
  var middle = this.getMiddleBrightnessPerArea(grayScaleImageData);
  var sqrtNumArea = middle.length;
  var areaWidth = Math.floor(grayScaleImageData.width / sqrtNumArea);
  var areaHeight = Math.floor(grayScaleImageData.height / sqrtNumArea);

  for (var ay = 0; ay < sqrtNumArea; ay++) {
    for (var ax = 0; ax < sqrtNumArea; ax++) {
      for (var dy = 0; dy < areaHeight; dy++) {
        for (var dx = 0; dx < areaWidth; dx++) {
          grayScaleImageData.data[areaWidth * ax + dx + (areaHeight * ay + dy) * grayScaleImageData.width] = (grayScaleImageData.data[areaWidth * ax + dx + (areaHeight * ay + dy) * grayScaleImageData.width] < middle[ax][ay]);
        }
      }
    }
  }
  return grayScaleImageData;
};

QrCode.prototype.grayscale = function(imageData) {
  var ret = new Array(imageData.width * imageData.height);

  for (var y = 0; y < imageData.height; y++) {
    for (var x = 0; x < imageData.width; x++) {
      var gray = this.getPixel(imageData, x, y);

      ret[x + y * imageData.width] = gray;
    }
  }

  return {
    height: imageData.height,
    width: imageData.width,
    data: ret
  };
};

function URShift(number,  bits) {
  if (number >= 0)
    return number >> bits;
  else
    return (number >> bits) + (2 << ~bits);
}


/***/ }),
/* 1 */
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Version;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formatinf__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bitmat__ = __webpack_require__(4);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/




function ECB(count,  dataCodewords) {
  this.count = count;
  this.dataCodewords = dataCodewords;
}

function ECBlocks(ecCodewordsPerBlock,  ecBlocks1,  ecBlocks2) {
  this.ecCodewordsPerBlock = ecCodewordsPerBlock;
  if (ecBlocks2)
    this.ecBlocks = [ecBlocks1, ecBlocks2];
  else
    this.ecBlocks = [ecBlocks1];
}

Object.defineProperty(ECBlocks.prototype, "TotalECCodewords", {
  get: function() {
    return  this.ecCodewordsPerBlock * this.NumBlocks;
  }
});

Object.defineProperty(ECBlocks.prototype, "NumBlocks", {
  get: function() {
    var total = 0;
    for (var i = 0; i < this.ecBlocks.length; i++) {
      total += this.ecBlocks[i].length;
    }
    return total;
  }
});

ECBlocks.prototype.getECBlocks = function() {
  return this.ecBlocks;
};

function Version(versionNumber,  alignmentPatternCenters,  ecBlocks1,  ecBlocks2,  ecBlocks3,  ecBlocks4) {
  this.versionNumber = versionNumber;
  this.alignmentPatternCenters = alignmentPatternCenters;
  this.ecBlocks = [ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4];

  var total = 0;
  var ecCodewords = ecBlocks1.ecCodewordsPerBlock;
  var ecbArray = ecBlocks1.getECBlocks();
  for (var i = 0; i < ecbArray.length; i++) {
    var ecBlock = ecbArray[i];
    total += ecBlock.count * (ecBlock.dataCodewords + ecCodewords);
  }
  this.totalCodewords = total;
}

Object.defineProperty(Version.prototype, "DimensionForVersion", {
  get: function() {
    return  17 + 4 * this.versionNumber;
  }
});

Version.prototype.buildFunctionPattern = function() {
  var dimension = this.DimensionForVersion;
  var bitMatrix = new __WEBPACK_IMPORTED_MODULE_1__bitmat__["a" /* default */](dimension);

  // Top left finder pattern + separator + format
  bitMatrix.setRegion(0, 0, 9, 9);
  // Top right finder pattern + separator + format
  bitMatrix.setRegion(dimension - 8, 0, 8, 9);
  // Bottom left finder pattern + separator + format
  bitMatrix.setRegion(0, dimension - 8, 9, 8);

  // Alignment patterns
  var max = this.alignmentPatternCenters.length;
  for (var x = 0; x < max; x++) {
    var i = this.alignmentPatternCenters[x] - 2;
    for (var y = 0; y < max; y++) {
      if ((x == 0 && (y == 0 || y == max - 1)) || (x == max - 1 && y == 0)) {
        // No alignment patterns near the three finder paterns
        continue;
      }
      bitMatrix.setRegion(this.alignmentPatternCenters[y] - 2, i, 5, 5);
    }
  }

  // Vertical timing pattern
  bitMatrix.setRegion(6, 9, 1, dimension - 17);
  // Horizontal timing pattern
  bitMatrix.setRegion(9, 6, dimension - 17, 1);

  if (this.versionNumber > 6) {
    // Version info, top right
    bitMatrix.setRegion(dimension - 11, 0, 3, 6);
    // Version info, bottom left
    bitMatrix.setRegion(0, dimension - 11, 6, 3);
  }

  return bitMatrix;
};

Version.prototype.getECBlocksForLevel = function(ecLevel) {
  return this.ecBlocks[ecLevel.ordinal()];
};

Version.VERSION_DECODE_INFO = [
  0x07C94,
  0x085BC,
  0x09A99,
  0x0A4D3,
  0x0BBF6,
  0x0C762,
  0x0D847,
  0x0E60D,
  0x0F928,
  0x10B78,
  0x1145D,
  0x12A17,
  0x13532,
  0x149A6,
  0x15683,
  0x168C9,
  0x177EC,
  0x18EC4,
  0x191E1,
  0x1AFAB,
  0x1B08E,
  0x1CC1A,
  0x1D33F,
  0x1ED75,
  0x1F250,
  0x209D5,
  0x216F0,
  0x228BA,
  0x2379F,
  0x24B0B,
  0x2542E,
  0x26A64,
  0x27541,
  0x28C69
];

Version.VERSIONS = buildVersions();

Version.getVersionForNumber = function(versionNumber) {
  if (versionNumber < 1 || versionNumber > 40) {
    throw "ArgumentException";
  }
  return Version.VERSIONS[versionNumber - 1];
};

Version.getProvisionalVersionForDimension = function(dimension) {
  if (dimension % 4 != 1) {
    throw "Error getProvisionalVersionForDimension";
  }
  try {
    return Version.getVersionForNumber((dimension - 17) >> 2);
  } catch (iae) {
    throw "Error getVersionForNumber";
  }
};

Version.decodeVersionInformation = function(versionBits) {
  var bestDifference = 0xffffffff;
  var bestVersion = 0;
  for (var i = 0; i < Version.VERSION_DECODE_INFO.length; i++) {
    var targetVersion = Version.VERSION_DECODE_INFO[i];
    // Do the version info bits match exactly? done.
    if (targetVersion == versionBits) {
      return this.getVersionForNumber(i + 7);
    }
    // Otherwise see if this is the closest to a real version info bit string
    // we have seen so far
    var bitsDifference = __WEBPACK_IMPORTED_MODULE_0__formatinf__["a" /* default */].numBitsDiffering(versionBits, targetVersion);
    if (bitsDifference < bestDifference) {
      bestVersion = i + 7;
      bestDifference = bitsDifference;
    }
  }
  // We can tolerate up to 3 bits of error since no two version info codewords will
  // differ in less than 4 bits.
  if (bestDifference <= 3) {
    return this.getVersionForNumber(bestVersion);
  }
  // If we didn't find a close enough match, fail
  return null;
};

function buildVersions() {
  return [
    new Version(1, [], new ECBlocks(7, new ECB(1, 19)), new ECBlocks(10, new ECB(1, 16)), new ECBlocks(13, new ECB(1, 13)), new ECBlocks(17, new ECB(1, 9))),
    new Version(2, [6, 18], new ECBlocks(10, new ECB(1, 34)), new ECBlocks(16, new ECB(1, 28)), new ECBlocks(22, new ECB(1, 22)), new ECBlocks(28, new ECB(1, 16))),
    new Version(3, [6, 22], new ECBlocks(15, new ECB(1, 55)), new ECBlocks(26, new ECB(1, 44)), new ECBlocks(18, new ECB(2, 17)), new ECBlocks(22, new ECB(2, 13))),
    new Version(4, [6, 26], new ECBlocks(20, new ECB(1, 80)), new ECBlocks(18, new ECB(2, 32)), new ECBlocks(26, new ECB(2, 24)), new ECBlocks(16, new ECB(4, 9))),
    new Version(5, [6, 30], new ECBlocks(26, new ECB(1, 108)), new ECBlocks(24, new ECB(2, 43)), new ECBlocks(18, new ECB(2, 15), new ECB(2, 16)), new ECBlocks(22, new ECB(2, 11), new ECB(2, 12))),
    new Version(6, [6, 34], new ECBlocks(18, new ECB(2, 68)), new ECBlocks(16, new ECB(4, 27)), new ECBlocks(24, new ECB(4, 19)), new ECBlocks(28, new ECB(4, 15))),
    new Version(7, [6, 22, 38], new ECBlocks(20, new ECB(2, 78)), new ECBlocks(18, new ECB(4, 31)), new ECBlocks(18, new ECB(2, 14), new ECB(4, 15)), new ECBlocks(26, new ECB(4, 13), new ECB(1, 14))),
    new Version(8, [6, 24, 42], new ECBlocks(24, new ECB(2, 97)), new ECBlocks(22, new ECB(2, 38), new ECB(2, 39)), new ECBlocks(22, new ECB(4, 18), new ECB(2, 19)), new ECBlocks(26, new ECB(4, 14), new ECB(2, 15))),
    new Version(9, [6, 26, 46], new ECBlocks(30, new ECB(2, 116)), new ECBlocks(22, new ECB(3, 36), new ECB(2, 37)), new ECBlocks(20, new ECB(4, 16), new ECB(4, 17)), new ECBlocks(24, new ECB(4, 12), new ECB(4, 13))),
    new Version(10, [6, 28, 50], new ECBlocks(18, new ECB(2, 68), new ECB(2, 69)), new ECBlocks(26, new ECB(4, 43), new ECB(1, 44)), new ECBlocks(24, new ECB(6, 19), new ECB(2, 20)), new ECBlocks(28, new ECB(6, 15), new ECB(2, 16))),
    new Version(11, [6, 30, 54], new ECBlocks(20, new ECB(4, 81)), new ECBlocks(30, new ECB(1, 50), new ECB(4, 51)), new ECBlocks(28, new ECB(4, 22), new ECB(4, 23)), new ECBlocks(24, new ECB(3, 12), new ECB(8, 13))),
    new Version(12, [6, 32, 58], new ECBlocks(24, new ECB(2, 92), new ECB(2, 93)), new ECBlocks(22, new ECB(6, 36), new ECB(2, 37)), new ECBlocks(26, new ECB(4, 20), new ECB(6, 21)), new ECBlocks(28, new ECB(7, 14), new ECB(4, 15))),
    new Version(13, [6, 34, 62], new ECBlocks(26, new ECB(4, 107)), new ECBlocks(22, new ECB(8, 37), new ECB(1, 38)), new ECBlocks(24, new ECB(8, 20), new ECB(4, 21)), new ECBlocks(22, new ECB(12, 11), new ECB(4, 12))),
    new Version(14, [6, 26, 46, 66], new ECBlocks(30, new ECB(3, 115), new ECB(1, 116)), new ECBlocks(24, new ECB(4, 40), new ECB(5, 41)), new ECBlocks(20, new ECB(11, 16), new ECB(5, 17)), new ECBlocks(24, new ECB(11, 12), new ECB(5, 13))),
    new Version(15, [6, 26, 48, 70], new ECBlocks(22, new ECB(5, 87), new ECB(1, 88)), new ECBlocks(24, new ECB(5, 41), new ECB(5, 42)), new ECBlocks(30, new ECB(5, 24), new ECB(7, 25)), new ECBlocks(24, new ECB(11, 12), new ECB(7, 13))),
    new Version(16, [6, 26, 50, 74], new ECBlocks(24, new ECB(5, 98), new ECB(1, 99)), new ECBlocks(28, new ECB(7, 45), new ECB(3, 46)), new ECBlocks(24, new ECB(15, 19), new ECB(2, 20)), new ECBlocks(30, new ECB(3, 15), new ECB(13, 16))),
    new Version(17, [6, 30, 54, 78], new ECBlocks(28, new ECB(1, 107), new ECB(5, 108)), new ECBlocks(28, new ECB(10, 46), new ECB(1, 47)), new ECBlocks(28, new ECB(1, 22), new ECB(15, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(17, 15))),
    new Version(18, [6, 30, 56, 82], new ECBlocks(30, new ECB(5, 120), new ECB(1, 121)), new ECBlocks(26, new ECB(9, 43), new ECB(4, 44)), new ECBlocks(28, new ECB(17, 22), new ECB(1, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(19, 15))),
    new Version(19, [6, 30, 58, 86], new ECBlocks(28, new ECB(3, 113), new ECB(4, 114)), new ECBlocks(26, new ECB(3, 44), new ECB(11, 45)), new ECBlocks(26, new ECB(17, 21), new ECB(4, 22)), new ECBlocks(26, new ECB(9, 13), new ECB(16, 14))),
    new Version(20, [6, 34, 62, 90], new ECBlocks(28, new ECB(3, 107), new ECB(5, 108)), new ECBlocks(26, new ECB(3, 41), new ECB(13, 42)), new ECBlocks(30, new ECB(15, 24), new ECB(5, 25)), new ECBlocks(28, new ECB(15, 15), new ECB(10, 16))),
    new Version(21, [6, 28, 50, 72, 94], new ECBlocks(28, new ECB(4, 116), new ECB(4, 117)), new ECBlocks(26, new ECB(17, 42)), new ECBlocks(28, new ECB(17, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(19, 16), new ECB(6, 17))),
    new Version(22, [6, 26, 50, 74, 98], new ECBlocks(28, new ECB(2, 111), new ECB(7, 112)), new ECBlocks(28, new ECB(17, 46)), new ECBlocks(30, new ECB(7, 24), new ECB(16, 25)), new ECBlocks(24, new ECB(34, 13))),
    new Version(23, [6, 30, 54, 74, 102], new ECBlocks(30, new ECB(4, 121), new ECB(5, 122)), new ECBlocks(28, new ECB(4, 47), new ECB(14, 48)), new ECBlocks(30, new ECB(11, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(16, 15), new ECB(14, 16))),
    new Version(24, [6, 28, 54, 80, 106], new ECBlocks(30, new ECB(6, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(6, 45), new ECB(14, 46)), new ECBlocks(30, new ECB(11, 24), new ECB(16, 25)), new ECBlocks(30, new ECB(30, 16), new ECB(2, 17))),
    new Version(25, [6, 32, 58, 84, 110], new ECBlocks(26, new ECB(8, 106), new ECB(4, 107)), new ECBlocks(28, new ECB(8, 47), new ECB(13, 48)), new ECBlocks(30, new ECB(7, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(13, 16))),
    new Version(26, [6, 30, 58, 86, 114], new ECBlocks(28, new ECB(10, 114), new ECB(2, 115)), new ECBlocks(28, new ECB(19, 46), new ECB(4, 47)), new ECBlocks(28, new ECB(28, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(33, 16), new ECB(4, 17))),
    new Version(27, [6, 34, 62, 90, 118], new ECBlocks(30, new ECB(8, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(22, 45), new ECB(3, 46)), new ECBlocks(30, new ECB(8, 23), new ECB(26, 24)), new ECBlocks(30, new ECB(12, 15),     new ECB(28, 16))),
    new Version(28, [6, 26, 50, 74, 98, 122], new ECBlocks(30, new ECB(3, 117), new ECB(10, 118)), new ECBlocks(28, new ECB(3, 45), new ECB(23, 46)), new ECBlocks(30, new ECB(4, 24), new ECB(31, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(31, 16))),
    new Version(29, [6, 30, 54, 78, 102, 126], new ECBlocks(30, new ECB(7, 116), new ECB(7, 117)), new ECBlocks(28, new ECB(21, 45), new ECB(7, 46)), new ECBlocks(30, new ECB(1, 23), new ECB(37, 24)), new ECBlocks(30, new ECB(19, 15), new ECB(26, 16))),
    new Version(30, [6, 26, 52, 78, 104, 130], new ECBlocks(30, new ECB(5, 115), new ECB(10, 116)), new ECBlocks(28, new ECB(19, 47), new ECB(10, 48)), new ECBlocks(30, new ECB(15, 24), new ECB(25, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(25, 16))),
    new Version(31, [6, 30, 56, 82, 108, 134], new ECBlocks(30, new ECB(13, 115), new ECB(3, 116)), new ECBlocks(28, new ECB(2, 46), new ECB(29, 47)), new ECBlocks(30, new ECB(42, 24), new ECB(1, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(28, 16))),
    new Version(32, [6, 34, 60, 86, 112, 138], new ECBlocks(30, new ECB(17, 115)), new ECBlocks(28, new ECB(10, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(10, 24), new ECB(35, 25)), new ECBlocks(30, new ECB(19, 15), new ECB(35, 16))),
    new Version(33, [6, 30, 58, 86, 114, 142], new ECBlocks(30, new ECB(17, 115), new ECB(1, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(21, 47)), new ECBlocks(30, new ECB(29, 24), new ECB(19, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(46, 16))),
    new Version(34, [6, 34, 62, 90, 118, 146], new ECBlocks(30, new ECB(13, 115), new ECB(6, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(44, 24), new ECB(7, 25)), new ECBlocks(30, new ECB(59, 16), new ECB(1, 17))),
    new Version(35, [6, 30, 54, 78, 102, 126, 150], new ECBlocks(30, new ECB(12, 121), new ECB(7, 122)), new ECBlocks(28, new ECB(12, 47), new ECB(26, 48)), new ECBlocks(30, new ECB(39, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(41, 16))),
    new Version(36, [6, 24, 50, 76, 102, 128, 154], new ECBlocks(30, new ECB(6, 121), new ECB(14, 122)), new ECBlocks(28, new ECB(6, 47), new ECB(34, 48)), new ECBlocks(30, new ECB(46, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(2, 15), new ECB(64, 16))),
    new Version(37, [6, 28, 54, 80, 106, 132, 158], new ECBlocks(30, new ECB(17, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(29, 46), new ECB(14, 47)), new ECBlocks(30, new ECB(49, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(24, 15), new ECB(46, 16))),
    new Version(38, [6, 32, 58, 84, 110, 136, 162], new ECBlocks(30, new ECB(4, 122), new ECB(18, 123)), new ECBlocks(28, new ECB(13, 46), new ECB(32, 47)), new ECBlocks(30, new ECB(48, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(42, 15), new ECB(32, 16))),
    new Version(39, [6, 26, 54, 82, 110, 138, 166], new ECBlocks(30, new ECB(20, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(40, 47), new ECB(7, 48)), new ECBlocks(30, new ECB(43, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(10, 15), new ECB(67, 16))),
    new Version(40, [6, 30, 58, 86, 114, 142, 170], new ECBlocks(30, new ECB(19, 118), new ECB(6, 119)), new ECBlocks(28, new ECB(18, 47), new ECB(31, 48)), new ECBlocks(30, new ECB(34, 24), new ECB(34, 25)), new ECBlocks(30, new ECB(20, 15), new ECB(61, 16))),
  ];
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = FormatInformation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qrcode__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorlevel__ = __webpack_require__(12);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/




var FORMAT_INFO_MASK_QR = 0x5412;
var FORMAT_INFO_DECODE_LOOKUP = [
  [0x5412, 0x00],
  [0x5125, 0x01],
  [0x5E7C, 0x02],
  [0x5B4B, 0x03],
  [0x45F9, 0x04],
  [0x40CE, 0x05],
  [0x4F97, 0x06],
  [0x4AA0, 0x07],
  [0x77C4, 0x08],
  [0x72F3, 0x09],
  [0x7DAA, 0x0A],
  [0x789D, 0x0B],
  [0x662F, 0x0C],
  [0x6318, 0x0D],
  [0x6C41, 0x0E],
  [0x6976, 0x0F],
  [0x1689, 0x10],
  [0x13BE, 0x11],
  [0x1CE7, 0x12],
  [0x19D0, 0x13],
  [0x0762, 0x14],
  [0x0255, 0x15],
  [0x0D0C, 0x16],
  [0x083B, 0x17],
  [0x355F, 0x18],
  [0x3068, 0x19],
  [0x3F31, 0x1A],
  [0x3A06, 0x1B],
  [0x24B4, 0x1C],
  [0x2183, 0x1D],
  [0x2EDA, 0x1E],
  [0x2BED, 0x1F],
];
var BITS_SET_IN_HALF_BYTE = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];


function FormatInformation(formatInfo) {
  this.errorCorrectionLevel = __WEBPACK_IMPORTED_MODULE_1__errorlevel__["a" /* default */].forBits((formatInfo >> 3) & 0x03);
  this.dataMask =  (formatInfo & 0x07);
}

FormatInformation.prototype.GetHashCode = function() {
  return (this.errorCorrectionLevel.ordinal() << 3) |  this.dataMask;
};

FormatInformation.prototype.Equals = function(o) {
  var other =  o;
  return this.errorCorrectionLevel == other.errorCorrectionLevel && this.dataMask == other.dataMask;
};

FormatInformation.numBitsDiffering = function(a,  b) {
  a ^= b; // a now has a 1 bit exactly where its bit differs with b's
  // Count bits set quickly with a series of lookups:
  return BITS_SET_IN_HALF_BYTE[a & 0x0F] + BITS_SET_IN_HALF_BYTE[(Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(a, 4) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(a, 8) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(a, 12) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(a, 16) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(a, 20) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(a, 24) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(a, 28) & 0x0F)];
};

FormatInformation.decodeFormatInformation = function(maskedFormatInfo) {
  var formatInfo = FormatInformation.doDecodeFormatInformation(maskedFormatInfo);
  if (formatInfo != null) {
    return formatInfo;
  }
  // Should return null, but, some QR codes apparently
  // do not mask this info. Try again by actually masking the pattern
  // first
  return FormatInformation.doDecodeFormatInformation(maskedFormatInfo ^ FORMAT_INFO_MASK_QR);
};
FormatInformation.doDecodeFormatInformation = function(maskedFormatInfo) {
  // Find the int in FORMAT_INFO_DECODE_LOOKUP with fewest bits differing
  var bestDifference = 0xffffffff;
  var bestFormatInfo = 0;
  for (var i = 0; i < FORMAT_INFO_DECODE_LOOKUP.length; i++) {
    var decodeInfo = FORMAT_INFO_DECODE_LOOKUP[i];
    var targetInfo = decodeInfo[0];
    if (targetInfo == maskedFormatInfo) {
      // Found an exact match
      return new FormatInformation(decodeInfo[1]);
    }
    var bitsDifference = this.numBitsDiffering(maskedFormatInfo, targetInfo);
    if (bitsDifference < bestDifference) {
      bestFormatInfo = decodeInfo[1];
      bestDifference = bitsDifference;
    }
  }
  // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits
  // differing means we found a match
  if (bestDifference <= 3) {
    return new FormatInformation(bestFormatInfo);
  }
  return null;
};




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = BitMatrix;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qrcode__ = __webpack_require__(0);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



function BitMatrix(width,  height) {
  if (!height)
    height = width;
  if (width < 1 || height < 1) {
    throw "Both dimensions must be greater than 0";
  }
  this.width = width;
  this.height = height;
  var rowSize = width >> 5;
  if ((width & 0x1f) != 0) {
    rowSize++;
  }
  this.rowSize = rowSize;
  this.bits = new Array(rowSize * height);
  for (var i = 0; i < this.bits.length; i++)
    this.bits[i] = 0;
}

Object.defineProperty(BitMatrix.prototype, "Dimension", {
  get: function() {
    if (this.width != this.height) {
      throw "Can't call getDimension() on a non-square matrix";
    }
    return this.width;
  }
});

BitMatrix.prototype.get_Renamed = function(x, y) {
  var offset = y * this.rowSize + (x >> 5);
  return ((Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(this.bits[offset], (x & 0x1f))) & 1) != 0;
};

BitMatrix.prototype.set_Renamed = function(x, y) {
  var offset = y * this.rowSize + (x >> 5);
  this.bits[offset] |= 1 << (x & 0x1f);
};

BitMatrix.prototype.flip = function(x, y) {
  var offset = y * this.rowSize + (x >> 5);
  this.bits[offset] ^= 1 << (x & 0x1f);
};

BitMatrix.prototype.clear = function() {
  var max = this.bits.length;
  for (var i = 0; i < max; i++) {
    this.bits[i] = 0;
  }
};

BitMatrix.prototype.setRegion = function(left, top, width, height) {
  if (top < 0 || left < 0) {
    throw "Left and top must be nonnegative";
  }
  if (height < 1 || width < 1) {
    throw "Height and width must be at least 1";
  }
  var right = left + width;
  var bottom = top + height;
  if (bottom > this.height || right > this.width) {
    throw "The region must fit inside the matrix";
  }
  for (var y = top; y < bottom; y++) {
    var offset = y * this.rowSize;
    for (var x = left; x < right; x++) {
      this.bits[offset + (x >> 5)] |= 1 << (x & 0x1f);
    }
  }
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = GF256;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gf256poly__ = __webpack_require__(6);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



function GF256(primitive) {
  this.expTable = new Array(256);
  this.logTable = new Array(256);
  var x = 1;
  for (var i = 0; i < 256; i++) {
    this.expTable[i] = x;
    x <<= 1; // x = x * 2; we're assuming the generator alpha is 2
    if (x >= 0x100) {
      x ^= primitive;
    }
  }
  for (var i = 0; i < 255; i++) {
    this.logTable[this.expTable[i]] = i;
  }
  // logTable[0] == 0 but this should never be used
  var at0 = new Array(1); at0[0] = 0;
  this.zero = new __WEBPACK_IMPORTED_MODULE_0__gf256poly__["a" /* default */](this, new Array(at0));
  var at1 = new Array(1); at1[0] = 1;
  this.one = new __WEBPACK_IMPORTED_MODULE_0__gf256poly__["a" /* default */](this, new Array(at1));
}

Object.defineProperty(GF256.prototype, "Zero", {
  get: function() {
    return this.zero;
  }
});

Object.defineProperty(GF256.prototype, "One", {
  get: function() {
    return this.one;
  }
});

GF256.prototype.buildMonomial = function(degree,  coefficient) {
  if (degree < 0) {
    throw "System.ArgumentException";
  }
  if (coefficient == 0) {
    return this.zero;
  }
  var coefficients = new Array(degree + 1);
  for (var i = 0; i < coefficients.length; i++)coefficients[i] = 0;
  coefficients[0] = coefficient;
  return new __WEBPACK_IMPORTED_MODULE_0__gf256poly__["a" /* default */](this, coefficients);
};

GF256.prototype.exp = function(a) {
  return this.expTable[a];
};

GF256.prototype.log = function(a) {
  if (a == 0) {
    throw "System.ArgumentException";
  }
  return this.logTable[a];
};

GF256.prototype.inverse = function(a) {
  if (a == 0) {
    throw "System.ArithmeticException";
  }
  return this.expTable[255 - this.logTable[a]];
};

GF256.prototype.addOrSubtract = function(a,  b) {
  return a ^ b;
};

GF256.prototype.multiply = function(a,  b) {
  if (a == 0 || b == 0) {
    return 0;
  }
  if (a == 1) {
    return b;
  }
  if (b == 1) {
    return a;
  }
  return this.expTable[(this.logTable[a] + this.logTable[b]) % 255];
};

GF256.QR_CODE_FIELD = new GF256(0x011D);
GF256.DATA_MATRIX_FIELD = new GF256(0x012D);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = GF256Poly;
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function GF256Poly(field,  coefficients) {
  if (coefficients == null || coefficients.length == 0) {
    throw "System.ArgumentException";
  }
  this.field = field;
  var coefficientsLength = coefficients.length;
  if (coefficientsLength > 1 && coefficients[0] == 0) {
    // Leading term must be non-zero for anything except the constant polynomial "0"
    var firstNonZero = 1;
    while (firstNonZero < coefficientsLength && coefficients[firstNonZero] == 0) {
      firstNonZero++;
    }
    if (firstNonZero == coefficientsLength) {
      this.coefficients = field.Zero.coefficients;
    } else {
      this.coefficients = new Array(coefficientsLength - firstNonZero);
      for (var i = 0; i < this.coefficients.length; i++) this.coefficients[i] = 0;
      for (var ci = 0; ci < this.coefficients.length; ci++) this.coefficients[ci] = coefficients[firstNonZero + ci];
    }
  } else {
    this.coefficients = coefficients;
  }
}

Object.defineProperty(GF256Poly.prototype, "Zero", {
  get: function() {
    return this.coefficients[0] == 0;
  }
});

Object.defineProperty(GF256Poly.prototype, "Degree", {
  get: function() {
    return this.coefficients.length - 1;
  }
});

GF256Poly.prototype.getCoefficient = function(degree) {
  return this.coefficients[this.coefficients.length - 1 - degree];
};

GF256Poly.prototype.evaluateAt = function(a) {
  if (a == 0) {
    // Just return the x^0 coefficient
    return this.getCoefficient(0);
  }
  var size = this.coefficients.length;
  if (a == 1) {
    // Just the sum of the coefficients
    var result = 0;
    for (var i = 0; i < size; i++) {
      result = this.field.addOrSubtract(result, this.coefficients[i]);
    }
    return result;
  }
  var result2 = this.coefficients[0];
  for (var i = 1; i < size; i++) {
    result2 = this.field.addOrSubtract(this.field.multiply(a, result2), this.coefficients[i]);
  }
  return result2;
};

GF256Poly.prototype.addOrSubtract = function(other) {
  if (this.field != other.field) {
    throw "GF256Polys do not have same GF256 field";
  }
  if (this.Zero) {
    return other;
  }
  if (other.Zero) {
    return this;
  }

  var smallerCoefficients = this.coefficients;
  var largerCoefficients = other.coefficients;
  if (smallerCoefficients.length > largerCoefficients.length) {
    var temp = smallerCoefficients;
    smallerCoefficients = largerCoefficients;
    largerCoefficients = temp;
  }
  var sumDiff = new Array(largerCoefficients.length);
  var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
  // Copy high-order terms only found in higher-degree polynomial's coefficients
  for (var ci = 0; ci < lengthDiff; ci++)sumDiff[ci] = largerCoefficients[ci];

  for (var i = lengthDiff; i < largerCoefficients.length; i++) {
    sumDiff[i] = this.field.addOrSubtract(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
  }

  return new GF256Poly(this.field, sumDiff);
};

GF256Poly.prototype.multiply1 = function(other) {
  if (this.field != other.field) {
    throw "GF256Polys do not have same GF256 field";
  }
  if (this.Zero || other.Zero) {
    return this.field.Zero;
  }
  var aCoefficients = this.coefficients;
  var aLength = aCoefficients.length;
  var bCoefficients = other.coefficients;
  var bLength = bCoefficients.length;
  var product = new Array(aLength + bLength - 1);
  for (var i = 0; i < aLength; i++) {
    var aCoeff = aCoefficients[i];
    for (var j = 0; j < bLength; j++) {
      product[i + j] = this.field.addOrSubtract(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
    }
  }
  return new GF256Poly(this.field, product);
};

GF256Poly.prototype.multiply2 = function(scalar) {
  if (scalar == 0) {
    return this.field.Zero;
  }
  if (scalar == 1) {
    return this;
  }
  var size = this.coefficients.length;
  var product = new Array(size);
  for (var i = 0; i < size; i++) {
    product[i] = this.field.multiply(this.coefficients[i], scalar);
  }
  return new GF256Poly(this.field, product);
};

GF256Poly.prototype.multiplyByMonomial = function(degree,  coefficient) {
  if (degree < 0) {
    throw "System.ArgumentException";
  }
  if (coefficient == 0) {
    return this.field.Zero;
  }
  var size = this.coefficients.length;
  var product = new Array(size + degree);
  for (var i = 0; i < product.length; i++)product[i] = 0;
  for (var i = 0; i < size; i++) {
    product[i] = this.field.multiply(this.coefficients[i], coefficient);
  }
  return new GF256Poly(this.field, product);
};

GF256Poly.prototype.divide = function(other) {
  if (this.field != other.field) {
    throw "GF256Polys do not have same GF256 field";
  }
  if (other.Zero) {
    throw "Divide by 0";
  }

  var quotient = this.field.Zero;
  var remainder = this;

  var denominatorLeadingTerm = other.getCoefficient(other.Degree);
  var inverseDenominatorLeadingTerm = this.field.inverse(denominatorLeadingTerm);

  while (remainder.Degree >= other.Degree && !remainder.Zero) {
    var degreeDifference = remainder.Degree - other.Degree;
    var scale = this.field.multiply(remainder.getCoefficient(remainder.Degree), inverseDenominatorLeadingTerm);
    var term = other.multiplyByMonomial(degreeDifference, scale);
    var iterationQuotient = this.field.buildMonomial(degreeDifference, scale);
    quotient = quotient.addOrSubtract(iterationQuotient);
    remainder = remainder.addOrSubtract(term);
  }

  return [quotient, remainder];
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qartjs_src_qart__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_qartjs_src_qrcode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qrcode_reader__ = __webpack_require__(10);




(function($){
    $.fn.serializeObject = function () {
        "use strict";

        var result = {};
        var extend = function (i, element) {
            var node = result[element.name];
            // If node with same name exists already, need to convert it to an array as it
            // is a multi-value field (i.e., checkboxes)
            if ('undefined' !== typeof node && node !== null) {
                if ($.isArray(node)) {
                    node.push(element.value);
                } else {
                    result[element.name] = [node, element.value];
                }
            } else {
                result[element.name] = element.value;
            }
        };

        $.each(this.serializeArray(), extend);
        return result;
    };
})(jQuery);

$(function() {

    $('.pastable').pastableNonInputable();
    $(document).on('pasteImage', function (ev, data){
        imagePath = data.dataURL;
        $('#image img').attr('src', imagePath);
        makeQArt();
    }).on('pasteImageError', function(ev, data){
        alert('Oops: ' + data.message);
        if(data.url){
            alert('But we got its url anyway:' + data.url)
        }
    }).on('pasteText', function (ev, data){
        console.log("text: " + data.text);
    });

    var $form = $('#form');
    var defaultImage = $('#default-image').attr('src');
    var value = 'envisioncn';
    var filter = 'threshold';
    var imagePath = defaultImage;
    var version = 10;
    var imageSize = 75 + (version * 12) - 24;
    var bg = "#C2C";
    var size = "175";
    var fillType = 'scale_to_fit';
    var desc = '';
    var self = this;
    var $canvas = $('#canvas');
    var $maskText = $('#mask-text');
    var maskElem = $('#mask')[0];
    var canvasRenderer = document.getElementById('canvas-renderer');

    setValues();

    function setValues() {
        var rObj = $form.serializeObject();
        value = rObj.value;
        filter = rObj.filter;
        version = 10;
        imageSize = 75 + (version * 12) - 24;
        bg = rObj.bg;
        size = rObj.size;
        fillType = rObj.fillType;
        desc = rObj.desc;
        $('#image img').width(imageSize);
    }

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
      new __WEBPACK_IMPORTED_MODULE_0_qartjs_src_qart__["a" /* default */]({
          value: value,
          imagePath: imagePath,
          filter: filter,
          version: version,
          background: bg,
          size: size,
          fillType: fillType,
          embedText: true,
      }).make(document.getElementById('combine'));

      setTimeout(function() {
        var $canvas = $('#combine canvas');

        var context = $canvas[0].getContext("2d"); 
        // var data = context.getImageData(0, 0, $canvas[0].width, $canvas[0].height);
        var qr = new __WEBPACK_IMPORTED_MODULE_2_qrcode_reader__["a" /* default */]();

        qr.callback = function(error, result) {
            if(error) {
                console.log(error)
                return;
            }
            console.log(result)
        }


        qr.decode($canvas[0].toDataURL());


      }, 1000);
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

    $('#filter').bind('change', function() {
        filter = $(this).val();
        console.log(filter);
        makeQArt();
    });
    
    makeQR();
    makeQArt();
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qrcode__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qrcode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__qrcode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(9);




class QArt {
  constructor (options) {
    if (typeof options === 'undefined') {
      throw new TypeError('QArt required `options`.')
    } else if (typeof options.value === 'undefined') {
      throw new TypeError('QArt required `value` option.')
    } else if (typeof options.imagePath === 'undefined') {
      throw new TypeError('QArt required `imagePath` option.')
    }

    this.size = (typeof options.size === 'undefined') ? QArt.DEFAULTS.size : options.size
    this.filter = (typeof options.filter === 'undefined') ? QArt.DEFAULTS.filter : options.filter
    this.value = options.value
    this.imagePath = options.imagePath
    this.version = (typeof options.version === 'undefined') ? QArt.DEFAULTS.version : options.version
    this.fillType = (typeof options.fillType === 'undefined') ? QArt.DEFAULTS.fillType : options.fillType
    this.background = options.background
    this.embedText = (typeof options.embedText === 'undefined') ? QArt.DEFAULTS.embedText : options.embedText
  }

  static get DEFAULTS () {
    return {
      size: 195,
      value: '',
      filter: 'threshold',
      version: 10,
      fillType: 'scale_to_fit',
      embedText: true
    }
  }

  findWorkingVersion (currentVersion) {
    var version = currentVersion
    __WEBPACK_IMPORTED_MODULE_0__qrcode__["QRCode"].stringToBytes = __WEBPACK_IMPORTED_MODULE_0__qrcode__["QRCode"].stringToBytesFuncs['UTF-8']
    var qr = Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["QRCode"])(currentVersion, 'H')
    for (var i = currentVersion; i <= 40; i++) {
      try {
        qr = Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["QRCode"])(version, 'H')
        qr.addData(this.value)
        qr.make()
      } catch (e) {
        console.log('Error: ', e)
        if (e.name === 'CodeLengthOverflow') {
          version += 1
          console.log('Can\'t create QRCode need up version, current version', version)
          continue
        } else { throw e }
      }
      return version
    }
  }

  make (el) {
    var version = this.findWorkingVersion(this.version)

    var qr = Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["QRCode"])(version, 'H')
    qr.addData(this.value)
    qr.make()
    __WEBPACK_IMPORTED_MODULE_0__qrcode__["QRCode"].stringToBytes = __WEBPACK_IMPORTED_MODULE_0__qrcode__["QRCode"].stringToBytesFuncs['UTF-8']
    var qrImage = qr.createImgObject(3)

    var imageSize = 75 + (version * 12)
    var padding = 12
    var scaledPadding = (padding * this.size) / imageSize

    var self = this
    qrImage.onload = function () {
      var coverImage = new Image()
      coverImage.src = self.imagePath

      // handle image by fillType
      var imageCanvas = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].createCanvas(imageSize - padding * 2, coverImage, self.fillType)
      coverImage.src = imageCanvas.toDataURL()

      var resultCanvas = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].createCanvas(imageSize, qrImage)
      var qrCanvas = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].createCanvas(imageSize, qrImage)

      if (typeof self.background !== 'undefined') {
        var bgCanvas = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].createCanvas(self.size, new Image())
        var bgCtx = bgCanvas.getContext('2d')
        bgCtx.fillStyle = self.background
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height)
      }

      coverImage.onload = function () {
        if (coverImage.width < coverImage.height) {
          coverImage.height = (imageSize - padding * 2) * (1.0 * coverImage.height / coverImage.width)
          coverImage.width = imageSize - padding * 2
        } else {
          coverImage.width = (imageSize - padding * 2) * (1.0 * coverImage.width / coverImage.height)
          coverImage.height = imageSize - padding * 2
        }

        var coverCanvas = document.createElement('canvas')
        coverCanvas.width = imageSize
        coverCanvas.height = imageSize

        var coverImageData = coverCanvas.getContext('2d').getImageData(0, 0, imageSize, imageSize)
        var coverImageBinary = coverImageData.data
        var resultImageData = resultCanvas.getContext('2d').getImageData(0, 0, imageSize, imageSize)
        var resultImageBinary = resultImageData.data

        for (var i = 0; i < coverImageBinary.length; i += 4) {
          var x = Math.floor(i / 4) % imageSize
          var y = Math.floor(Math.floor(i / 4) / imageSize)

          if (x < padding || y < padding || x >= imageSize - padding || y >= imageSize - padding) {
            resultImageBinary[i + 3] = 0
            continue
          }
          if (x % 3 === 1 && y % 3 === 1) {
            continue
          }
          if (x < 36 && (y < 36 || y >= imageSize - 36)) {
            continue
          }
          if (x >= imageSize - 36 && y < 36) {
            continue
          }

          if (self.filter === 'threshold') {
            var factor = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].threshold(coverImageBinary[i], coverImageBinary[i + 1], coverImageBinary[i + 2], 127)
            resultImageBinary[i] = factor
            resultImageBinary[i + 1] = factor
            resultImageBinary[i + 2] = factor
          } else if (self.filter === 'color') {
            resultImageBinary[i] = coverImageBinary[i]
            resultImageBinary[i + 1] = coverImageBinary[i + 1]
            resultImageBinary[i + 2] = coverImageBinary[i + 2]
          }
          resultImageBinary[i + 3] = coverImageBinary[i + 3]
        }

        resultCanvas.getContext('2d').putImageData(resultImageData, 0, 0)

        var patternPostion = __WEBPACK_IMPORTED_MODULE_0__qrcode__["QRUtil"].getPatternPosition(version)
        for (var i = 0; i < patternPostion.length; i += 1) {
          for (var j = 0; j < patternPostion.length; j += 1) {
            var x = patternPostion[i]
            var y = patternPostion[j]
            if (!((x === 6 && y === 50) || (y === 6 && x === 50) || (x === 6 && y === 6))) {
              var rectX = 3 * (x - 2) + 12
              var rectY = 3 * (y - 2) + 12
              var rectWidth = (3 * (x + 3) + 12) - rectX
              var rectHeight = (3 * (y + 3) + 12) - rectY

              var rectData = qrCanvas.getContext('2d').getImageData(rectX, rectY, rectWidth, rectHeight)
              resultCanvas.getContext('2d').putImageData(rectData, rectX, rectY)
            }
          }
        }

        var scaledCanvas = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].createCanvas(self.size, new Image())
        if (typeof self.background !== 'undefined') {
          scaledCanvas.getContext('2d').drawImage(bgCanvas, scaledPadding, scaledPadding, self.size - scaledPadding * 2, self.size - scaledPadding * 2)
        }
        scaledCanvas.getContext('2d').drawImage(coverImage, scaledPadding, scaledPadding, self.size - scaledPadding * 2, self.size - scaledPadding * 2)
        scaledCanvas.getContext('2d').drawImage(resultCanvas, 0, 0, self.size, self.size)
        if (self.embedText) {
          scaledCanvas.getContext('2d').font = "12px Verdana";
          scaledCanvas.getContext('2d').textAlign = 'center';
          scaledCanvas.getContext('2d').textBaseline = 'middle';
          scaledCanvas.getContext('2d').fillText(self.value, self.size / 2, self.size / 2);
        }
        el.innerHTML = ''
        el.appendChild(scaledCanvas)
      }
    }
  }
}

window.QArt = QArt
/* harmony default export */ __webpack_exports__["a"] = (window.QArt);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Util {
  static createCanvas (size, image, fillType = 'fill') {
    var canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    switch (fillType) {
      case 'fill' :
        canvas.getContext('2d').drawImage(image, 0, 0, size, size)
        break
      case 'scale_to_fit':
        var wrh = image.width / image.height
        var newWidth = canvas.width
        var newHeight = newWidth / wrh
        if (newHeight > canvas.height) {
          newHeight = canvas.height
          newWidth = newHeight * wrh
        }
        var x = (canvas.width - newWidth) * 0.5
        var y = (canvas.height - newHeight) * 0.5
        canvas.getContext('2d').drawImage(image, x, y, newWidth, newHeight)

        break
    }
    return canvas
  }

  static threshold (r, g, b, value) {
    return (0.2126 * r + 0.7152 * g + 0.0722 * b >= value) ? 255 : 0
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qrcode__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__qrcode__["b" /* default */]);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Detector;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__version__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alignpat__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grid__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__findpat__ = __webpack_require__(15);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/






function PerspectiveTransform(a11,  a21,  a31,  a12,  a22,  a32,  a13,  a23,  a33) {
  this.a11 = a11;
  this.a12 = a12;
  this.a13 = a13;
  this.a21 = a21;
  this.a22 = a22;
  this.a23 = a23;
  this.a31 = a31;
  this.a32 = a32;
  this.a33 = a33;
}

PerspectiveTransform.prototype.transformPoints1 = function(points) {
  var max = points.length;
  var a11 = this.a11;
  var a12 = this.a12;
  var a13 = this.a13;
  var a21 = this.a21;
  var a22 = this.a22;
  var a23 = this.a23;
  var a31 = this.a31;
  var a32 = this.a32;
  var a33 = this.a33;
  for (var i = 0; i < max; i += 2) {
    var x = points[i];
    var y = points[i + 1];
    var denominator = a13 * x + a23 * y + a33;
    points[i] = (a11 * x + a21 * y + a31) / denominator;
    points[i + 1] = (a12 * x + a22 * y + a32) / denominator;
  }
};

PerspectiveTransform.prototype.transformPoints2 = function(xValues, yValues) {
  var n = xValues.length;
  for (var i = 0; i < n; i++) {
    var x = xValues[i];
    var y = yValues[i];
    var denominator = this.a13 * x + this.a23 * y + this.a33;
    xValues[i] = (this.a11 * x + this.a21 * y + this.a31) / denominator;
    yValues[i] = (this.a12 * x + this.a22 * y + this.a32) / denominator;
  }
};

PerspectiveTransform.prototype.buildAdjoint = function() {
  // Adjoint is the transpose of the cofactor matrix:
  return new PerspectiveTransform(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21);
};

PerspectiveTransform.prototype.times = function(other) {
  return new PerspectiveTransform(this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * other.a22 + this.a31 * other.a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * other.a33, this.a12 * other.a11 + this.a22 * other.a12 + this.a32 * other.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * other.a31 + this.a22 * other.a32 + this.a32 * other.a33, this.a13 * other.a11 + this.a23 * other.a12 + this.a33 * other.a13, this.a13 * other.a21 + this.a23 * other.a22 + this.a33 * other.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33);
};

PerspectiveTransform.quadrilateralToQuadrilateral = function(x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3,  x0p,  y0p,  x1p,  y1p,  x2p,  y2p,  x3p,  y3p) {

  var qToS = this.quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3);
  var sToQ = this.squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);
  return sToQ.times(qToS);
};

PerspectiveTransform.squareToQuadrilateral = function(x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3) {
  var dy2 = y3 - y2;
  var dy3 = y0 - y1 + y2 - y3;
  if (dy2 == 0.0 && dy3 == 0.0) {
    return new PerspectiveTransform(x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0.0, 0.0, 1.0);
  } else {
    var dx1 = x1 - x2;
    var dx2 = x3 - x2;
    var dx3 = x0 - x1 + x2 - x3;
    var dy1 = y1 - y2;
    var denominator = dx1 * dy2 - dx2 * dy1;
    var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
    var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
    return new PerspectiveTransform(x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1.0);
  }
};

PerspectiveTransform.quadrilateralToSquare = function(x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3) {
  // Here, the adjoint serves as the inverse:
  return this.squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3).buildAdjoint();
};

function DetectorResult(bits,  points) {
  this.bits = bits;
  this.points = points;
}

function Detector(image) {
  this.image = image;
  this.resultPointCallback = null;
}

Detector.prototype.sizeOfBlackWhiteBlackRun = function(fromX,  fromY,  toX,  toY) {
  // Mild variant of Bresenham's algorithm;
  // see http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
  var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
  if (steep) {
    var temp = fromX;
    fromX = fromY;
    fromY = temp;
    temp = toX;
    toX = toY;
    toY = temp;
  }

  var dx = Math.abs(toX - fromX);
  var dy = Math.abs(toY - fromY);
  var error = -dx >> 1;
  var ystep = fromY < toY ? 1 : -1;
  var xstep = fromX < toX ? 1 : -1;
  var state = 0; // In black pixels, looking for white, first or second time
  for (var x = fromX, y = fromY; x != toX; x += xstep) {

    var realX = steep ? y : x;
    var realY = steep ? x : y;
    if (state == 1) {
      // In white pixels, looking for black
      if (this.image.data[realX + realY * this.image.width]) {
        state++;
      }
    } else {
      if (!this.image.data[realX + realY * this.image.width]) {
        state++;
      }
    }

    if (state == 3) {
      // Found black, white, black, and stumbled back onto white; done
      var diffX = x - fromX;
      var diffY = y - fromY;
      return  Math.sqrt((diffX * diffX + diffY * diffY));
    }
    error += dy;
    if (error > 0) {
      if (y == toY) {
        break;
      }
      y += ystep;
      error -= dx;
    }
  }
  var diffX2 = toX - fromX;
  var diffY2 = toY - fromY;
  return  Math.sqrt((diffX2 * diffX2 + diffY2 * diffY2));
};

Detector.prototype.sizeOfBlackWhiteBlackRunBothWays = function(fromX,  fromY,  toX,  toY) {

  var result = this.sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY);

  // Now count other way -- don't run off image though of course
  var scale = 1.0;
  var otherToX = fromX - (toX - fromX);
  if (otherToX < 0) {
    scale =  fromX /  (fromX - otherToX);
    otherToX = 0;
  } else if (otherToX >= this.image.width) {
    scale =  (this.image.width - 1 - fromX) /  (otherToX - fromX);
    otherToX = this.image.width - 1;
  }
  var otherToY = Math.floor(fromY - (toY - fromY) * scale);

  scale = 1.0;
  if (otherToY < 0) {
    scale =  fromY /  (fromY - otherToY);
    otherToY = 0;
  } else if (otherToY >= this.image.height) {
    scale =  (this.image.height - 1 - fromY) /  (otherToY - fromY);
    otherToY = this.image.height - 1;
  }
  otherToX = Math.floor(fromX + (otherToX - fromX) * scale);

  result += this.sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY);
  return result - 1.0; // -1 because we counted the middle pixel twice
};

Detector.prototype.calculateModuleSizeOneWay = function(pattern,  otherPattern) {
  var moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(pattern.X), Math.floor(pattern.Y), Math.floor(otherPattern.X), Math.floor(otherPattern.Y));
  var moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(otherPattern.X), Math.floor(otherPattern.Y), Math.floor(pattern.X), Math.floor(pattern.Y));
  if (isNaN(moduleSizeEst1)) {
    return moduleSizeEst2 / 7.0;
  }
  if (isNaN(moduleSizeEst2)) {
    return moduleSizeEst1 / 7.0;
  }
  // Average them, and divide by 7 since we've counted the width of 3 black modules,
  // and 1 white and 1 black module on either side. Ergo, divide sum by 14.
  return (moduleSizeEst1 + moduleSizeEst2) / 14.0;
};

Detector.prototype.calculateModuleSize = function(topLeft,  topRight,  bottomLeft) {
  // Take the average
  return (this.calculateModuleSizeOneWay(topLeft, topRight) + this.calculateModuleSizeOneWay(topLeft, bottomLeft)) / 2.0;
};

Detector.prototype.distance = function(pattern1,  pattern2) {
  var xDiff = pattern1.X - pattern2.X;
  var yDiff = pattern1.Y - pattern2.Y;
  return  Math.sqrt((xDiff * xDiff + yDiff * yDiff));
};

Detector.prototype.computeDimension = function(topLeft,  topRight,  bottomLeft,  moduleSize) {
  var tltrCentersDimension = Math.round(this.distance(topLeft, topRight) / moduleSize);
  var tlblCentersDimension = Math.round(this.distance(topLeft, bottomLeft) / moduleSize);
  var dimension = ((tltrCentersDimension + tlblCentersDimension) >> 1) + 7;
  switch (dimension & 0x03) {
  // mod 4
  case 0:
    dimension++;
    break;
  // 1? do nothing

  case 2:
    dimension--;
    break;

  case 3:
    throw "Error";
  }
  return dimension;
};

Detector.prototype.findAlignmentInRegion = function(overallEstModuleSize,  estAlignmentX,  estAlignmentY,  allowanceFactor) {
  // Look for an alignment pattern (3 modules in size) around where it
  // should be
  var allowance = Math.floor(allowanceFactor * overallEstModuleSize);
  var alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance);
  var alignmentAreaRightX = Math.min(this.image.width - 1, estAlignmentX + allowance);
  if (alignmentAreaRightX - alignmentAreaLeftX < overallEstModuleSize * 3) {
    throw "Error";
  }

  var alignmentAreaTopY = Math.max(0, estAlignmentY - allowance);
  var alignmentAreaBottomY = Math.min(this.image.height - 1, estAlignmentY + allowance);

  var alignmentFinder = new __WEBPACK_IMPORTED_MODULE_1__alignpat__["a" /* AlignmentPatternFinder */](this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.resultPointCallback);
  return alignmentFinder.find();
};

Detector.prototype.createTransform = function(topLeft,  topRight,  bottomLeft, alignmentPattern, dimension) {
  var dimMinusThree =  dimension - 3.5;
  var bottomRightX;
  var bottomRightY;
  var sourceBottomRightX;
  var sourceBottomRightY;
  if (alignmentPattern != null) {
    bottomRightX = alignmentPattern.X;
    bottomRightY = alignmentPattern.Y;
    sourceBottomRightX = sourceBottomRightY = dimMinusThree - 3.0;
  } else {
    // Don't have an alignment pattern, just make up the bottom-right point
    bottomRightX = (topRight.X - topLeft.X) + bottomLeft.X;
    bottomRightY = (topRight.Y - topLeft.Y) + bottomLeft.Y;
    sourceBottomRightX = sourceBottomRightY = dimMinusThree;
  }

  var transform = PerspectiveTransform.quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.X, topLeft.Y, topRight.X, topRight.Y, bottomRightX, bottomRightY, bottomLeft.X, bottomLeft.Y);

  return transform;
};

Detector.prototype.sampleGrid = function(image,  transform,  dimension) {

  var sampler = __WEBPACK_IMPORTED_MODULE_2__grid__["a" /* default */];
  return sampler.sampleGrid3(image, dimension, transform);
};

Detector.prototype.processFinderPatternInfo = function(info) {

  var topLeft = info.topLeft;
  var topRight = info.topRight;
  var bottomLeft = info.bottomLeft;

  var moduleSize = this.calculateModuleSize(topLeft, topRight, bottomLeft);
  if (moduleSize < 1.0) {
    throw "Error";
  }
  var dimension = this.computeDimension(topLeft, topRight, bottomLeft, moduleSize);
  var provisionalVersion = __WEBPACK_IMPORTED_MODULE_0__version__["a" /* default */].getProvisionalVersionForDimension(dimension);
  var modulesBetweenFPCenters = provisionalVersion.DimensionForVersion - 7;

  var alignmentPattern = null;
  // Anything above version 1 has an alignment pattern
  if (provisionalVersion.alignmentPatternCenters.length > 0) {

    // Guess where a "bottom right" finder pattern would have been
    var bottomRightX = topRight.X - topLeft.X + bottomLeft.X;
    var bottomRightY = topRight.Y - topLeft.Y + bottomLeft.Y;

    // Estimate that alignment pattern is closer by 3 modules
    // from "bottom right" to known top left location
    var correctionToTopLeft = 1.0 - 3.0 /  modulesBetweenFPCenters;
    var estAlignmentX = Math.floor(topLeft.X + correctionToTopLeft * (bottomRightX - topLeft.X));
    var estAlignmentY = Math.floor(topLeft.Y + correctionToTopLeft * (bottomRightY - topLeft.Y));

    // Kind of arbitrary -- expand search radius before giving up
    for (var i = 4; i <= 16; i <<= 1) {
      //try
      //{
      alignmentPattern = this.findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY,  i);
      break;
      //}
      //catch (re)
      //{
      // try next round
      //}
    }
    // If we didn't find alignment pattern... well try anyway without it
  }

  var transform = this.createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension);

  var bits = this.sampleGrid(this.image, transform, dimension);

  var points;
  if (alignmentPattern == null) {
    points = [bottomLeft, topLeft, topRight];
  } else {
    points = [bottomLeft, topLeft, topRight, alignmentPattern];
  }
  return new DetectorResult(bits, points);
};

Detector.prototype.detect = function() {
  var info =  new __WEBPACK_IMPORTED_MODULE_3__findpat__["a" /* FinderPatternFinder */]().findFinderPattern(this.image);

  return this.processFinderPatternInfo(info);
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ErrorCorrectionLevel;
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


function ErrorCorrectionLevel(ordinal,  bits, name) {
  this.ordinal_Renamed_Field = ordinal;
  this.bits = bits;
  this.name = name;
}

ErrorCorrectionLevel.prototype.ordinal = function() {
  return this.ordinal_Renamed_Field;
};

ErrorCorrectionLevel.forBits = function(bits) {
  if (bits < 0 || bits >= FOR_BITS.length) {
    throw "ArgumentException";
  }
  return FOR_BITS[bits];
};

var FOR_BITS = [
  new ErrorCorrectionLevel(1, 0x00, "M"),
  new ErrorCorrectionLevel(0, 0x01, "L"),
  new ErrorCorrectionLevel(3, 0x02, "H"),
  new ErrorCorrectionLevel(2, 0x03, "Q"),
];


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony export (immutable) */ __webpack_exports__["a"] = AlignmentPatternFinder;
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


function AlignmentPattern(posX, posY,  estimatedModuleSize) {
  this.x = posX;
  this.y = posY;
  this.count = 1;
  this.estimatedModuleSize = estimatedModuleSize;
}

Object.defineProperty(AlignmentPattern.prototype, "X", {
  get: function() {
    return Math.floor(this.x);
  }
});

Object.defineProperty(AlignmentPattern.prototype, "Y", {
  get: function() {
    return Math.floor(this.y);
  }
});

AlignmentPattern.prototype.incrementCount = function() {
  this.count++;
};

AlignmentPattern.prototype.aboutEquals = function(moduleSize,  i,  j) {
  if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
    var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
    return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0;
  }
  return false;
};

function AlignmentPatternFinder(image,  startX,  startY,  width,  height,  moduleSize,  resultPointCallback) {
  this.image = image;
  this.possibleCenters = [];
  this.startX = startX;
  this.startY = startY;
  this.width = width;
  this.height = height;
  this.moduleSize = moduleSize;
  this.crossCheckStateCount = [0, 0, 0];
  this.resultPointCallback = resultPointCallback;
}

AlignmentPatternFinder.prototype.centerFromEnd = function(stateCount,  end) {
  return  (end - stateCount[2]) - stateCount[1] / 2.0;
};

AlignmentPatternFinder.prototype.foundPatternCross = function(stateCount) {
  var moduleSize = this.moduleSize;
  var maxVariance = moduleSize / 2.0;
  for (var i = 0; i < 3; i++) {
    if (Math.abs(moduleSize - stateCount[i]) >= maxVariance) {
      return false;
    }
  }
  return true;
};

AlignmentPatternFinder.prototype.crossCheckVertical = function(startI,  centerJ,  maxCount,  originalStateCountTotal) {
  var image = this.image;

  var maxI = image.height;
  var stateCount = this.crossCheckStateCount;
  stateCount[0] = 0;
  stateCount[1] = 0;
  stateCount[2] = 0;

  // Start counting up from center
  var i = startI;
  while (i >= 0 && image.data[centerJ + i * image.width] && stateCount[1] <= maxCount) {
    stateCount[1]++;
    i--;
  }
  // If already too many modules in this state or ran off the edge:
  if (i < 0 || stateCount[1] > maxCount) {
    return NaN;
  }
  while (i >= 0 && !image.data[centerJ + i * image.width] && stateCount[0] <= maxCount) {
    stateCount[0]++;
    i--;
  }
  if (stateCount[0] > maxCount) {
    return NaN;
  }

  // Now also count down from center
  i = startI + 1;
  while (i < maxI && image.data[centerJ + i * image.width] && stateCount[1] <= maxCount) {
    stateCount[1]++;
    i++;
  }
  if (i == maxI || stateCount[1] > maxCount) {
    return NaN;
  }
  while (i < maxI && !image.data[centerJ + i * image.width] && stateCount[2] <= maxCount) {
    stateCount[2]++;
    i++;
  }
  if (stateCount[2] > maxCount) {
    return NaN;
  }

  var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
  if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
    return NaN;
  }

  return this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, i) : NaN;
};

AlignmentPatternFinder.prototype.handlePossibleCenter = function(stateCount,  i,  j) {
  var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
  var centerJ = this.centerFromEnd(stateCount, j);
  var centerI = this.crossCheckVertical(i, Math.floor(centerJ), 2 * stateCount[1], stateCountTotal);
  if (!isNaN(centerI)) {
    var estimatedModuleSize = (stateCount[0] + stateCount[1] + stateCount[2]) / 3.0;
    var max = this.possibleCenters.length;
    for (var index = 0; index < max; index++) {
      var center =  this.possibleCenters[index];
      // Look for about the same center and module size:
      if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
        return new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
      }
    }
    // Hadn't found this before; save it
    var point = new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
    this.possibleCenters.push(point);
    if (this.resultPointCallback != null) {
      this.resultPointCallback.foundPossibleResultPoint(point);
    }
  }
  return null;
};

AlignmentPatternFinder.prototype.find = function() {
  var image = this.image;
  var startX = this.startX;
  var height = this.height;
  var maxJ = startX + this.width;
  var middleI = this.startY + (height >> 1);
  // We are looking for black/white/black modules in 1:1:1 ratio;
  // this tracks the number of black/white/black modules seen so far
  var stateCount = [0, 0, 0];
  for (var iGen = 0; iGen < height; iGen++) {
    // Search from middle outwards
    var i = middleI + ((iGen & 0x01) == 0 ? ((iGen + 1) >> 1) : -((iGen + 1) >> 1));
    stateCount[0] = 0;
    stateCount[1] = 0;
    stateCount[2] = 0;
    var j = startX;
    // Burn off leading white pixels before anything else; if we start in the middle of
    // a white run, it doesn't make sense to count its length, since we don't know if the
    // white run continued to the left of the start point
    while (j < maxJ && !image.data[j + image.width * i]) {
      j++;
    }
    var currentState = 0;
    while (j < maxJ) {
      if (image.data[j + i * image.width]) {
        // Black pixel
        if (currentState == 1) {
          // Counting black pixels
          stateCount[currentState]++;
        } else {
          // Counting white pixels
          if (currentState == 2) {
            // A winner?
            if (this.foundPatternCross(stateCount)) {
              // Yes
              var confirmed = this.handlePossibleCenter(stateCount, i, j);
              if (confirmed != null) {
                return confirmed;
              }
            }
            stateCount[0] = stateCount[2];
            stateCount[1] = 1;
            stateCount[2] = 0;
            currentState = 1;
          } else {
            stateCount[++currentState]++;
          }
        }
      } else {
        // White pixel
        if (currentState == 1) {
          // Counting black pixels
          currentState++;
        }
        stateCount[currentState]++;
      }
      j++;
    }
    if (this.foundPatternCross(stateCount)) {
      var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
      if (confirmed != null) {
        return confirmed;
      }
    }
  }

  // Hmm, nothing we saw was observed and confirmed twice. If we had
  // any guess at all, return it.
  if (!(this.possibleCenters.length == 0)) {
    return  this.possibleCenters[0];
  }

  throw "Couldn't find enough alignment patterns";
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bitmat__ = __webpack_require__(4);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



var GridSampler = {};

GridSampler.checkAndNudgePoints = function(image,  points) {
  var width = image.width;
  var height = image.height;
  // Check and nudge points from start until we see some that are OK:
  var nudged = true;
  for (var offset = 0; offset < points.length && nudged; offset += 2) {
    var x = Math.floor(points[offset]);
    var y = Math.floor(points[offset + 1]);
    if (x < -1 || x > width || y < -1 || y > height) {
      throw "Error.checkAndNudgePoints ";
    }
    nudged = false;
    if (x == -1) {
      points[offset] = 0.0;
      nudged = true;
    } else if (x == width) {
      points[offset] = width - 1;
      nudged = true;
    }
    if (y == -1) {
      points[offset + 1] = 0.0;
      nudged = true;
    } else if (y == height) {
      points[offset + 1] = height - 1;
      nudged = true;
    }
  }
  // Check and nudge points from end:
  nudged = true;
  for (var offset = points.length - 2; offset >= 0 && nudged; offset -= 2) {
    var x = Math.floor(points[offset]);
    var y = Math.floor(points[offset + 1]);
    if (x < -1 || x > width || y < -1 || y > height) {
      throw "Error.checkAndNudgePoints ";
    }
    nudged = false;
    if (x == -1) {
      points[offset] = 0.0;
      nudged = true;
    } else if (x == width) {
      points[offset] = width - 1;
      nudged = true;
    }
    if (y == -1) {
      points[offset + 1] = 0.0;
      nudged = true;
    } else if (y == height) {
      points[offset + 1] = height - 1;
      nudged = true;
    }
  }
};



GridSampler.sampleGrid3 = function(image,  dimension,  transform) {
  var bits = new __WEBPACK_IMPORTED_MODULE_0__bitmat__["a" /* default */](dimension);
  var points = new Array(dimension << 1);
  for (var y = 0; y < dimension; y++) {
    var max = points.length;
    var iValue =  y + 0.5;
    for (var x = 0; x < max; x += 2) {
      points[x] =  (x >> 1) + 0.5;
      points[x + 1] = iValue;
    }
    transform.transformPoints1(points);
    // Quick check to see if points transformed to something inside the image
    // sufficient to check the endpoints
    GridSampler.checkAndNudgePoints(image, points);
    try {
      for (var x = 0; x < max; x += 2) {
        var bit = image.data[Math.floor(points[x]) + image.width * Math.floor(points[x + 1])];
        if (bit)
          bits.set_Renamed(x >> 1, y);
      }
    } catch (aioobe) {
      // This feels wrong, but, sometimes if the finder patterns are misidentified, the resulting
      // transform gets "twisted" such that it maps a straight line of points to a set of points
      // whose endpoints are in bounds, but others are not. There is probably some mathematical
      // way to detect this about the transformation that I don't know yet.
      // This results in an ugly runtime exception despite our clever checks above -- can't have
      // that. We could check each point's coordinates but that feels duplicative. We settle for
      // catching and wrapping ArrayIndexOutOfBoundsException.
      throw "Error.checkAndNudgePoints";
    }
  }
  return bits;
};

/* harmony default export */ __webpack_exports__["a"] = (GridSampler);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = FinderPatternFinder;
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var MIN_SKIP = 3;
var MAX_MODULES = 57;
var INTEGER_MATH_SHIFT = 8;
var CENTER_QUORUM = 2;

function orderBestPatterns(patterns) {

  function distance(pattern1,  pattern2) {
    var xDiff = pattern1.X - pattern2.X;
    var yDiff = pattern1.Y - pattern2.Y;
    return  Math.sqrt((xDiff * xDiff + yDiff * yDiff));
  }

  /// <summary> Returns the z component of the cross product between vectors BC and BA.</summary>
  function crossProductZ(pointA,  pointB,  pointC) {
    var bX = pointB.x;
    var bY = pointB.y;
    return ((pointC.x - bX) * (pointA.y - bY)) - ((pointC.y - bY) * (pointA.x - bX));
  }


  // Find distances between pattern centers
  var zeroOneDistance = distance(patterns[0], patterns[1]);
  var oneTwoDistance = distance(patterns[1], patterns[2]);
  var zeroTwoDistance = distance(patterns[0], patterns[2]);

  var pointA, pointB, pointC;
  // Assume one closest to other two is B; A and C will just be guesses at first
  if (oneTwoDistance >= zeroOneDistance && oneTwoDistance >= zeroTwoDistance) {
    pointB = patterns[0];
    pointA = patterns[1];
    pointC = patterns[2];
  } else if (zeroTwoDistance >= oneTwoDistance && zeroTwoDistance >= zeroOneDistance) {
    pointB = patterns[1];
    pointA = patterns[0];
    pointC = patterns[2];
  } else {
    pointB = patterns[2];
    pointA = patterns[0];
    pointC = patterns[1];
  }

  // Use cross product to figure out whether A and C are correct or flipped.
  // This asks whether BC x BA has a positive z component, which is the arrangement
  // we want for A, B, C. If it's negative, then we've got it flipped around and
  // should swap A and C.
  if (crossProductZ(pointA, pointB, pointC) < 0.0) {
    var temp = pointA;
    pointA = pointC;
    pointC = temp;
  }

  patterns[0] = pointA;
  patterns[1] = pointB;
  patterns[2] = pointC;
}


function FinderPattern(posX, posY,  estimatedModuleSize) {
  this.x = posX;
  this.y = posY;
  this.count = 1;
  this.estimatedModuleSize = estimatedModuleSize;
}

Object.defineProperty(FinderPattern.prototype, "X", {
  get: function() {
    return this.x;
  }
});

Object.defineProperty(FinderPattern.prototype, "Y", {
  get: function() {
    return this.y;
  }
});

FinderPattern.prototype.incrementCount = function() {
  this.count++;
};

FinderPattern.prototype.aboutEquals = function(moduleSize, i, j) {
  if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
    var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
    return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0;
  }
  return false;
};

function FinderPatternInfo(patternCenters) {
  this.bottomLeft = patternCenters[0];
  this.topLeft = patternCenters[1];
  this.topRight = patternCenters[2];
}

function FinderPatternFinder() {
  this.image = null;
  this.possibleCenters = [];
  this.hasSkipped = false;
  this.crossCheckStateCount = [0, 0, 0, 0, 0];
  this.resultPointCallback = null;
}

Object.defineProperty(FinderPatternFinder.prototype, "CrossCheckStateCount", {
  get: function() {
    this.crossCheckStateCount[0] = 0;
    this.crossCheckStateCount[1] = 0;
    this.crossCheckStateCount[2] = 0;
    this.crossCheckStateCount[3] = 0;
    this.crossCheckStateCount[4] = 0;
    return this.crossCheckStateCount;
  }
});

FinderPatternFinder.prototype.foundPatternCross = function(stateCount) {
  var totalModuleSize = 0;
  for (var i = 0; i < 5; i++) {
    var count = stateCount[i];
    if (count == 0) {
      return false;
    }
    totalModuleSize += count;
  }
  if (totalModuleSize < 7) {
    return false;
  }
  var moduleSize = Math.floor((totalModuleSize << INTEGER_MATH_SHIFT) / 7);
  var maxVariance = Math.floor(moduleSize / 2);
  // Allow less than 50% variance from 1-1-3-1-1 proportions
  return Math.abs(moduleSize - (stateCount[0] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(moduleSize - (stateCount[1] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(3 * moduleSize - (stateCount[2] << INTEGER_MATH_SHIFT)) < 3 * maxVariance && Math.abs(moduleSize - (stateCount[3] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(moduleSize - (stateCount[4] << INTEGER_MATH_SHIFT)) < maxVariance;
};

FinderPatternFinder.prototype.centerFromEnd = function(stateCount,  end) {
  return  (end - stateCount[4] - stateCount[3]) - stateCount[2] / 2.0;
};

FinderPatternFinder.prototype.crossCheckVertical = function(startI,  centerJ,  maxCount,  originalStateCountTotal) {
  var image = this.image;

  var maxI = image.height;
  var stateCount = this.CrossCheckStateCount;

  // Start counting up from center
  var i = startI;
  while (i >= 0 && image.data[centerJ + i * image.width]) {
    stateCount[2]++;
    i--;
  }
  if (i < 0) {
    return NaN;
  }
  while (i >= 0 && !image.data[centerJ + i * image.width] && stateCount[1] <= maxCount) {
    stateCount[1]++;
    i--;
  }
  // If already too many modules in this state or ran off the edge:
  if (i < 0 || stateCount[1] > maxCount) {
    return NaN;
  }
  while (i >= 0 && image.data[centerJ + i * image.width] && stateCount[0] <= maxCount) {
    stateCount[0]++;
    i--;
  }
  if (stateCount[0] > maxCount) {
    return NaN;
  }

  // Now also count down from center
  i = startI + 1;
  while (i < maxI && image.data[centerJ + i * image.width]) {
    stateCount[2]++;
    i++;
  }
  if (i == maxI) {
    return NaN;
  }
  while (i < maxI && !image.data[centerJ + i * image.width] && stateCount[3] < maxCount) {
    stateCount[3]++;
    i++;
  }
  if (i == maxI || stateCount[3] >= maxCount) {
    return NaN;
  }
  while (i < maxI && image.data[centerJ + i * image.width] && stateCount[4] < maxCount) {
    stateCount[4]++;
    i++;
  }
  if (stateCount[4] >= maxCount) {
    return NaN;
  }

  // If we found a finder-pattern-like section, but its size is more than 40% different than
  // the original, assume it's a false positive
  var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
  if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
    return NaN;
  }

  return this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, i) : NaN;
};

FinderPatternFinder.prototype.crossCheckHorizontal = function(startJ,  centerI,  maxCount, originalStateCountTotal) {
  var image = this.image;

  var maxJ = image.width;
  var stateCount = this.CrossCheckStateCount;

  var j = startJ;
  while (j >= 0 && image.data[j + centerI * image.width]) {
    stateCount[2]++;
    j--;
  }
  if (j < 0) {
    return NaN;
  }
  while (j >= 0 && !image.data[j + centerI * image.width] && stateCount[1] <= maxCount) {
    stateCount[1]++;
    j--;
  }
  if (j < 0 || stateCount[1] > maxCount) {
    return NaN;
  }
  while (j >= 0 && image.data[j + centerI * image.width] && stateCount[0] <= maxCount) {
    stateCount[0]++;
    j--;
  }
  if (stateCount[0] > maxCount) {
    return NaN;
  }

  j = startJ + 1;
  while (j < maxJ && image.data[j + centerI * image.width]) {
    stateCount[2]++;
    j++;
  }
  if (j == maxJ) {
    return NaN;
  }
  while (j < maxJ && !image.data[j + centerI * image.width] && stateCount[3] < maxCount) {
    stateCount[3]++;
    j++;
  }
  if (j == maxJ || stateCount[3] >= maxCount) {
    return NaN;
  }
  while (j < maxJ && image.data[j + centerI * image.width] && stateCount[4] < maxCount) {
    stateCount[4]++;
    j++;
  }
  if (stateCount[4] >= maxCount) {
    return NaN;
  }

  // If we found a finder-pattern-like section, but its size is significantly different than
  // the original, assume it's a false positive
  var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
  if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= originalStateCountTotal) {
    return NaN;
  }

  return this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, j) : NaN;
};

FinderPatternFinder.prototype.handlePossibleCenter = function(stateCount,  i,  j) {
  var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
  var centerJ = this.centerFromEnd(stateCount, j); //float
  var centerI = this.crossCheckVertical(i, Math.floor(centerJ), stateCount[2], stateCountTotal); //float
  if (!isNaN(centerI)) {
    // Re-cross check
    centerJ = this.crossCheckHorizontal(Math.floor(centerJ), Math.floor(centerI), stateCount[2], stateCountTotal);
    if (!isNaN(centerJ)) {
      var estimatedModuleSize =   stateCountTotal / 7.0;
      var found = false;
      var max = this.possibleCenters.length;
      for (var index = 0; index < max; index++) {
        var center = this.possibleCenters[index];
        // Look for about the same center and module size:
        if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
          center.incrementCount();
          found = true;
          break;
        }
      }
      if (!found) {
        var point = new FinderPattern(centerJ, centerI, estimatedModuleSize);
        this.possibleCenters.push(point);
        if (this.resultPointCallback != null) {
          this.resultPointCallback.foundPossibleResultPoint(point);
        }
      }
      return true;
    }
  }
  return false;
};

FinderPatternFinder.prototype.selectBestPatterns = function() {

  var startSize = this.possibleCenters.length;
  if (startSize < 3) {
    // Couldn't find enough finder patterns
    throw "Couldn't find enough finder patterns:" + startSize + " patterns found";
  }

  // Filter outlier possibilities whose module size is too different
  if (startSize > 3) {
    // But we can only afford to do so if we have at least 4 possibilities to choose from
    var totalModuleSize = 0.0;
    var square = 0.0;
    for (var i = 0; i < startSize; i++) {
      var  centerValue = this.possibleCenters[i].estimatedModuleSize;
      totalModuleSize += centerValue;
      square += (centerValue * centerValue);
    }
    var average = totalModuleSize /  startSize;
    this.possibleCenters.sort(function(center1, center2) {
      var dA = Math.abs(center2.estimatedModuleSize - average);
      var dB = Math.abs(center1.estimatedModuleSize - average);
      if (dA < dB) {
        return (-1);
      } else if (dA == dB) {
        return 0;
      } else {
        return 1;
      }
    });

    var stdDev = Math.sqrt(square / startSize - average * average);
    var limit = Math.max(0.2 * average, stdDev);
    for (var i = this.possibleCenters - 1; i >= 0; i--) {
      var pattern =  this.possibleCenters[i];
      if (Math.abs(pattern.estimatedModuleSize - average) > limit) {
        this.possibleCenters.splice(i, 1);
      }
    }
  }

  if (this.possibleCenters.length > 3) {
    // Throw away all but those first size candidate points we found.
    this.possibleCenters.sort(function(a, b) {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    });
  }

  return [this.possibleCenters[0],  this.possibleCenters[1],  this.possibleCenters[2]];
};

FinderPatternFinder.prototype.findRowSkip = function() {
  var max = this.possibleCenters.length;
  if (max <= 1) {
    return 0;
  }
  var firstConfirmedCenter = null;
  for (var i = 0; i < max; i++) {
    var center =  this.possibleCenters[i];
    if (center.count >= CENTER_QUORUM) {
      if (firstConfirmedCenter == null) {
        firstConfirmedCenter = center;
      } else {
        // We have two confirmed centers
        // How far down can we skip before resuming looking for the next
        // pattern? In the worst case, only the difference between the
        // difference in the x / y coordinates of the two centers.
        // This is the case where you find top left last.
        this.hasSkipped = true;
        return Math.floor((Math.abs(firstConfirmedCenter.X - center.X) - Math.abs(firstConfirmedCenter.Y - center.Y)) / 2);
      }
    }
  }
  return 0;
};

FinderPatternFinder.prototype.haveMultiplyConfirmedCenters = function() {
  var confirmedCount = 0;
  var totalModuleSize = 0.0;
  var max = this.possibleCenters.length;
  for (var i = 0; i < max; i++) {
    var pattern =  this.possibleCenters[i];
    if (pattern.count >= CENTER_QUORUM) {
      confirmedCount++;
      totalModuleSize += pattern.estimatedModuleSize;
    }
  }
  if (confirmedCount < 3) {
    return false;
  }
  // OK, we have at least 3 confirmed centers, but, it's possible that one is a "false positive"
  // and that we need to keep looking. We detect this by asking if the estimated module sizes
  // vary too much. We arbitrarily say that when the total deviation from average exceeds
  // 5% of the total module size estimates, it's too much.
  var average = totalModuleSize / max;
  var totalDeviation = 0.0;
  for (var i = 0; i < max; i++) {
    pattern = this.possibleCenters[i];
    totalDeviation += Math.abs(pattern.estimatedModuleSize - average);
  }
  return totalDeviation <= 0.05 * totalModuleSize;
};

FinderPatternFinder.prototype.findFinderPattern = function(image) {
  var tryHarder = false;
  this.image = image;
  var maxI = image.height;
  var maxJ = image.width;
  var iSkip = Math.floor((3 * maxI) / (4 * MAX_MODULES));
  if (iSkip < MIN_SKIP || tryHarder) {
    iSkip = MIN_SKIP;
  }

  var done = false;
  var stateCount = new Array(5);
  for (var i = iSkip - 1; i < maxI && !done; i += iSkip) {
    // Get a row of black/white values
    stateCount[0] = 0;
    stateCount[1] = 0;
    stateCount[2] = 0;
    stateCount[3] = 0;
    stateCount[4] = 0;
    var currentState = 0;
    for (var j = 0; j < maxJ; j++) {
      if (image.data[j + i * image.width]) {
        // Black pixel
        if ((currentState & 1) == 1) {
          // Counting white pixels
          currentState++;
        }
        stateCount[currentState]++;
      } else {
        // White pixel
        if ((currentState & 1) == 0) {
          // Counting black pixels
          if (currentState == 4) {
            // A winner?
            if (this.foundPatternCross(stateCount)) {
              // Yes
              var confirmed = this.handlePossibleCenter(stateCount, i, j);
              if (confirmed) {
                // Start examining every other line. Checking each line turned out to be too
                // expensive and didn't improve performance.
                iSkip = 2;
                if (this.hasSkipped) {
                  done = this.haveMultiplyConfirmedCenters();
                } else {
                  var rowSkip = this.findRowSkip();
                  if (rowSkip > stateCount[2]) {
                    // Skip rows between row of lower confirmed center
                    // and top of presumed third confirmed center
                    // but back up a bit to get a full chance of detecting
                    // it, entire width of center of finder pattern

                    // Skip by rowSkip, but back off by stateCount[2] (size of last center
                    // of pattern we saw) to be conservative, and also back off by iSkip which
                    // is about to be re-added
                    i += rowSkip - stateCount[2] - iSkip;
                    j = maxJ - 1;
                  }
                }
              } else {
                // Advance to next black pixel
                do {
                  j++;
                } while (j < maxJ && !image.data[j + i * image.width]);
                j--; // back up to that last white pixel
              }
              // Clear state to start looking again
              currentState = 0;
              stateCount[0] = 0;
              stateCount[1] = 0;
              stateCount[2] = 0;
              stateCount[3] = 0;
              stateCount[4] = 0;
            } else {
              // No, shift counts back by two
              stateCount[0] = stateCount[2];
              stateCount[1] = stateCount[3];
              stateCount[2] = stateCount[4];
              stateCount[3] = 1;
              stateCount[4] = 0;
              currentState = 3;
            }
          } else {
            stateCount[++currentState]++;
          }
        } else {
          // Counting white pixels
          stateCount[currentState]++;
        }
      }
    }
    if (this.foundPatternCross(stateCount)) {
      var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
      if (confirmed) {
        iSkip = stateCount[0];
        if (this.hasSkipped) {
          // Found a third one
          done = this.haveMultiplyConfirmedCenters();
        }
      }
    }
  }

  var patternInfo = this.selectBestPatterns();
  orderBestPatterns(patternInfo);

  return new FinderPatternInfo(patternInfo);
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rsdecoder__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gf256__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bmparser__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__datablock__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__databr__ = __webpack_require__(21);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/







var Decoder = {};
Decoder.rsDecoder = new __WEBPACK_IMPORTED_MODULE_0__rsdecoder__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__gf256__["a" /* default */].QR_CODE_FIELD);

Decoder.correctErrors = function(codewordBytes,  numDataCodewords) {
  var numCodewords = codewordBytes.length;
  // First read into an array of ints
  var codewordsInts = new Array(numCodewords);
  for (var i = 0; i < numCodewords; i++) {
    codewordsInts[i] = codewordBytes[i] & 0xFF;
  }
  var numECCodewords = codewordBytes.length - numDataCodewords;
  try {
    Decoder.rsDecoder.decode(codewordsInts, numECCodewords);
  } catch (rse) {
    throw rse;
  }
  // Copy back into array of bytes -- only need to worry about the bytes that were data
  // We don't care about errors in the error-correction codewords
  for (var i = 0; i < numDataCodewords; i++) {
    codewordBytes[i] =  codewordsInts[i];
  }
};

Decoder.decode = function(bits) {
  var parser = new __WEBPACK_IMPORTED_MODULE_2__bmparser__["a" /* default */](bits);
  var version = parser.readVersion();
  var ecLevel = parser.readFormatInformation().errorCorrectionLevel;

  // Read codewords
  var codewords = parser.readCodewords();

  // Separate into data blocks
  var dataBlocks = __WEBPACK_IMPORTED_MODULE_3__datablock__["a" /* default */].getDataBlocks(codewords, version, ecLevel);

  // Count total number of data bytes
  var totalBytes = 0;
  for (var i = 0; i < dataBlocks.length; i++) {
    totalBytes += dataBlocks[i].numDataCodewords;
  }
  var resultBytes = new Array(totalBytes);
  var resultOffset = 0;

  // Error-correct and copy data blocks together into a stream of bytes
  for (var j = 0; j < dataBlocks.length; j++) {
    var dataBlock = dataBlocks[j];
    var codewordBytes = dataBlock.codewords;
    var numDataCodewords = dataBlock.numDataCodewords;
    Decoder.correctErrors(codewordBytes, numDataCodewords);
    for (var i = 0; i < numDataCodewords; i++) {
      resultBytes[resultOffset++] = codewordBytes[i];
    }
  }

  // Decode the contents of that stream of bytes
  var reader = new __WEBPACK_IMPORTED_MODULE_4__databr__["a" /* default */](resultBytes, version.versionNumber, ecLevel.bits);
  return reader;
};

/* harmony default export */ __webpack_exports__["a"] = (Decoder);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ReedSolomonDecoder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gf256__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gf256poly__ = __webpack_require__(6);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/




function ReedSolomonDecoder(field) {
  this.field = field;
}

ReedSolomonDecoder.prototype.decode = function(received, twoS) {
  var poly = new __WEBPACK_IMPORTED_MODULE_1__gf256poly__["a" /* default */](this.field, received);
  var syndromeCoefficients = new Array(twoS);
  for (var i = 0; i < syndromeCoefficients.length; i++)syndromeCoefficients[i] = 0;
  var dataMatrix = false;//this.field.Equals(GF256.DATA_MATRIX_FIELD);
  var noError = true;
  for (var i = 0; i < twoS; i++) {
    // Thanks to sanfordsquires for this fix:
    var _eval = poly.evaluateAt(this.field.exp(dataMatrix ? i + 1 : i));
    syndromeCoefficients[syndromeCoefficients.length - 1 - i] = _eval;
    if (_eval != 0) {
      noError = false;
    }
  }
  if (noError) {
    return;
  }
  var syndrome = new __WEBPACK_IMPORTED_MODULE_1__gf256poly__["a" /* default */](this.field, syndromeCoefficients);
  var sigmaOmega = this.runEuclideanAlgorithm(this.field.buildMonomial(twoS, 1), syndrome, twoS);
  var sigma = sigmaOmega[0];
  var omega = sigmaOmega[1];
  var errorLocations = this.findErrorLocations(sigma);
  var errorMagnitudes = this.findErrorMagnitudes(omega, errorLocations, dataMatrix);
  for (var i = 0; i < errorLocations.length; i++) {
    var position = received.length - 1 - this.field.log(errorLocations[i]);
    if (position < 0) {
      throw "ReedSolomonException Bad error location";
    }
    received[position] = __WEBPACK_IMPORTED_MODULE_0__gf256__["a" /* default */].prototype.addOrSubtract(received[position], errorMagnitudes[i]);
  }
};

ReedSolomonDecoder.prototype.runEuclideanAlgorithm = function(a,  b,  R) {
  // Assume a's degree is >= b's
  if (a.Degree < b.Degree) {
    var temp = a;
    a = b;
    b = temp;
  }

  var rLast = a;
  var r = b;
  var sLast = this.field.One;
  var s = this.field.Zero;
  var tLast = this.field.Zero;
  var t = this.field.One;

  // Run Euclidean algorithm until r's degree is less than R/2
  while (r.Degree >= Math.floor(R / 2)) {
    var rLastLast = rLast;
    var sLastLast = sLast;
    var tLastLast = tLast;
    rLast = r;
    sLast = s;
    tLast = t;

    // Divide rLastLast by rLast, with quotient in q and remainder in r
    if (rLast.Zero) {
      // Oops, Euclidean algorithm already terminated?
      throw "r_{i-1} was zero";
    }
    r = rLastLast;
    var q = this.field.Zero;
    var denominatorLeadingTerm = rLast.getCoefficient(rLast.Degree);
    var dltInverse = this.field.inverse(denominatorLeadingTerm);
    while (r.Degree >= rLast.Degree && !r.Zero) {
      var degreeDiff = r.Degree - rLast.Degree;
      var scale = this.field.multiply(r.getCoefficient(r.Degree), dltInverse);
      q = q.addOrSubtract(this.field.buildMonomial(degreeDiff, scale));
      r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
    }

    s = q.multiply1(sLast).addOrSubtract(sLastLast);
    t = q.multiply1(tLast).addOrSubtract(tLastLast);
  }

  var sigmaTildeAtZero = t.getCoefficient(0);
  if (sigmaTildeAtZero == 0) {
    throw "ReedSolomonException sigmaTilde(0) was zero";
  }

  var inverse = this.field.inverse(sigmaTildeAtZero);
  var sigma = t.multiply2(inverse);
  var omega = r.multiply2(inverse);
  return [sigma, omega];
};

ReedSolomonDecoder.prototype.findErrorLocations = function(errorLocator) {
  // This is a direct application of Chien's search
  var numErrors = errorLocator.Degree;
  if (numErrors == 1) {
    // shortcut
    return new Array(errorLocator.getCoefficient(1));
  }
  var result = new Array(numErrors);
  var e = 0;
  for (var i = 1; i < 256 && e < numErrors; i++) {
    if (errorLocator.evaluateAt(i) == 0) {
      result[e] = this.field.inverse(i);
      e++;
    }
  }
  if (e != numErrors) {
    throw "Error locator degree does not match number of roots";
  }
  return result;
};

ReedSolomonDecoder.prototype.findErrorMagnitudes = function(errorEvaluator, errorLocations, dataMatrix) {
  // This is directly applying Forney's Formula
  var s = errorLocations.length;
  var result = new Array(s);
  for (var i = 0; i < s; i++) {
    var xiInverse = this.field.inverse(errorLocations[i]);
    var denominator = 1;
    for (var j = 0; j < s; j++) {
      if (i != j) {
        denominator = this.field.multiply(denominator, __WEBPACK_IMPORTED_MODULE_0__gf256__["a" /* default */].prototype.addOrSubtract(1, this.field.multiply(errorLocations[j], xiInverse)));
      }
    }
    result[i] = this.field.multiply(errorEvaluator.evaluateAt(xiInverse), this.field.inverse(denominator));
    // Thanks to sanfordsquires for this fix:
    if (dataMatrix) {
      result[i] = this.field.multiply(result[i], xiInverse);
    }
  }
  return result;
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = BitMatrixParser;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formatinf__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__version__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datamask__ = __webpack_require__(19);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/





function BitMatrixParser(bitMatrix) {
  var dimension = bitMatrix.Dimension;
  if (dimension < 21 || (dimension & 0x03) != 1) {
    throw "Error BitMatrixParser";
  }
  this.bitMatrix = bitMatrix;
  this.parsedVersion = null;
  this.parsedFormatInfo = null;
}

BitMatrixParser.prototype.copyBit = function(i,  j,  versionBits) {
  return this.bitMatrix.get_Renamed(i, j) ? (versionBits << 1) | 0x1 : versionBits << 1;
};

BitMatrixParser.prototype.readFormatInformation = function() {
  if (this.parsedFormatInfo != null) {
    return this.parsedFormatInfo;
  }

  // Read top-left format info bits
  var formatInfoBits = 0;
  for (var i = 0; i < 6; i++) {
    formatInfoBits = this.copyBit(i, 8, formatInfoBits);
  }
  // .. and skip a bit in the timing pattern ...
  formatInfoBits = this.copyBit(7, 8, formatInfoBits);
  formatInfoBits = this.copyBit(8, 8, formatInfoBits);
  formatInfoBits = this.copyBit(8, 7, formatInfoBits);
  // .. and skip a bit in the timing pattern ...
  for (var j = 5; j >= 0; j--) {
    formatInfoBits = this.copyBit(8, j, formatInfoBits);
  }

  this.parsedFormatInfo = __WEBPACK_IMPORTED_MODULE_0__formatinf__["a" /* default */].decodeFormatInformation(formatInfoBits);
  if (this.parsedFormatInfo != null) {
    return this.parsedFormatInfo;
  }

  // Hmm, failed. Try the top-right/bottom-left pattern
  var dimension = this.bitMatrix.Dimension;
  formatInfoBits = 0;
  var iMin = dimension - 8;
  for (var i = dimension - 1; i >= iMin; i--) {
    formatInfoBits = this.copyBit(i, 8, formatInfoBits);
  }
  for (var j = dimension - 7; j < dimension; j++) {
    formatInfoBits = this.copyBit(8, j, formatInfoBits);
  }

  this.parsedFormatInfo = __WEBPACK_IMPORTED_MODULE_0__formatinf__["a" /* default */].decodeFormatInformation(formatInfoBits);
  if (this.parsedFormatInfo != null) {
    return this.parsedFormatInfo;
  }
  throw "Error readFormatInformation";
};

BitMatrixParser.prototype.readVersion = function() {
  if (this.parsedVersion != null) {
    return this.parsedVersion;
  }

  var dimension = this.bitMatrix.Dimension;

  var provisionalVersion = (dimension - 17) >> 2;
  if (provisionalVersion <= 6) {
    return __WEBPACK_IMPORTED_MODULE_1__version__["a" /* default */].getVersionForNumber(provisionalVersion);
  }

  // Read top-right version info: 3 wide by 6 tall
  var versionBits = 0;
  var ijMin = dimension - 11;
  for (var j = 5; j >= 0; j--) {
    for (var i = dimension - 9; i >= ijMin; i--) {
      versionBits = this.copyBit(i, j, versionBits);
    }
  }

  this.parsedVersion = __WEBPACK_IMPORTED_MODULE_1__version__["a" /* default */].decodeVersionInformation(versionBits);
  if (this.parsedVersion != null && this.parsedVersion.DimensionForVersion == dimension) {
    return this.parsedVersion;
  }

  // Hmm, failed. Try bottom left: 6 wide by 3 tall
  versionBits = 0;
  for (var i = 5; i >= 0; i--) {
    for (var j = dimension - 9; j >= ijMin; j--) {
      versionBits = this.copyBit(i, j, versionBits);
    }
  }

  this.parsedVersion = __WEBPACK_IMPORTED_MODULE_1__version__["a" /* default */].decodeVersionInformation(versionBits);
  if (this.parsedVersion != null && this.parsedVersion.DimensionForVersion == dimension) {
    return this.parsedVersion;
  }
  throw "Error readVersion";
};

BitMatrixParser.prototype.readCodewords = function() {
  var formatInfo = this.readFormatInformation();
  var version = this.readVersion();

  // Get the data mask for the format used in this QR Code. This will exclude
  // some bits from reading as we wind through the bit matrix.
  var dataMask = __WEBPACK_IMPORTED_MODULE_2__datamask__["a" /* default */].forReference(formatInfo.dataMask);
  var dimension = this.bitMatrix.Dimension;
  dataMask.unmaskBitMatrix(this.bitMatrix, dimension);

  var functionPattern = version.buildFunctionPattern();

  var readingUp = true;
  var result = new Array(version.totalCodewords);
  var resultOffset = 0;
  var currentByte = 0;
  var bitsRead = 0;
  // Read columns in pairs, from right to left
  for (var j = dimension - 1; j > 0; j -= 2) {
    if (j == 6) {
      // Skip whole column with vertical alignment pattern;
      // saves time and makes the other code proceed more cleanly
      j--;
    }
    // Read alternatingly from bottom to top then top to bottom
    for (var count = 0; count < dimension; count++) {
      var i = readingUp ? dimension - 1 - count : count;
      for (var col = 0; col < 2; col++) {
        // Ignore bits covered by the function pattern
        if (!functionPattern.get_Renamed(j - col, i)) {
          // Read a bit
          bitsRead++;
          currentByte <<= 1;
          if (this.bitMatrix.get_Renamed(j - col, i)) {
            currentByte |= 1;
          }
          // If we've made a whole byte, save it off
          if (bitsRead == 8) {
            result[resultOffset++] =  currentByte;
            bitsRead = 0;
            currentByte = 0;
          }
        }
      }
    }
    readingUp ^= true; // readingUp = !readingUp; // switch directions
  }
  if (resultOffset != version.totalCodewords) {
    throw "Error readCodewords";
  }
  return result;
};


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qrcode__ = __webpack_require__(0);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



var DataMask = {};

DataMask.forReference = function(reference) {
  if (reference < 0 || reference > 7) {
    throw "System.ArgumentException";
  }
  return DataMask.DATA_MASKS[reference];
};

function DataMask000() {
  this.unmaskBitMatrix = function(bits,  dimension) {
    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        if (this.isMasked(i, j)) {
          bits.flip(j, i);
        }
      }
    }
  };
  this.isMasked = function(i,  j) {
    return ((i + j) & 0x01) == 0;
  };
}

function DataMask001() {
  this.unmaskBitMatrix = function(bits,  dimension) {
    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        if (this.isMasked(i, j)) {
          bits.flip(j, i);
        }
      }
    }
  };
  this.isMasked = function(i,  j) {
    return (i & 0x01) == 0;
  };
}

function DataMask010() {
  this.unmaskBitMatrix = function(bits,  dimension) {
    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        if (this.isMasked(i, j)) {
          bits.flip(j, i);
        }
      }
    }
  };
  this.isMasked = function(i,  j) {
    return j % 3 == 0;
  };
}

function DataMask011() {
  this.unmaskBitMatrix = function(bits,  dimension) {
    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        if (this.isMasked(i, j)) {
          bits.flip(j, i);
        }
      }
    }
  };
  this.isMasked = function(i,  j) {
    return (i + j) % 3 == 0;
  };
}

function DataMask100() {
  this.unmaskBitMatrix = function(bits,  dimension) {
    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        if (this.isMasked(i, j)) {
          bits.flip(j, i);
        }
      }
    }
  };
  this.isMasked = function(i,  j) {
    return (((Object(__WEBPACK_IMPORTED_MODULE_0__qrcode__["a" /* URShift */])(i, 1)) + (j / 3)) & 0x01) == 0;
  };
}

function DataMask101() {
  this.unmaskBitMatrix = function(bits,  dimension) {
    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        if (this.isMasked(i, j)) {
          bits.flip(j, i);
        }
      }
    }
  };
  this.isMasked = function(i,  j) {
    var temp = i * j;
    return (temp & 0x01) + (temp % 3) == 0;
  };
}

function DataMask110() {
  this.unmaskBitMatrix = function(bits,  dimension) {
    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        if (this.isMasked(i, j)) {
          bits.flip(j, i);
        }
      }
    }
  };
  this.isMasked = function(i,  j) {
    var temp = i * j;
    return (((temp & 0x01) + (temp % 3)) & 0x01) == 0;
  };
}
function DataMask111() {
  this.unmaskBitMatrix = function(bits,  dimension) {
    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        if (this.isMasked(i, j)) {
          bits.flip(j, i);
        }
      }
    }
  };
  this.isMasked = function(i,  j) {
    return ((((i + j) & 0x01) + ((i * j) % 3)) & 0x01) == 0;
  };
}

DataMask.DATA_MASKS = [new DataMask000(), new DataMask001(), new DataMask010(), new DataMask011(), new DataMask100(), new DataMask101(), new DataMask110(), new DataMask111()];

/* harmony default export */ __webpack_exports__["a"] = (DataMask);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DataBlock;
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


function DataBlock(numDataCodewords,  codewords) {
  this.numDataCodewords = numDataCodewords;
  this.codewords = codewords;
}

DataBlock.getDataBlocks = function(rawCodewords,  version,  ecLevel) {

  if (rawCodewords.length != version.totalCodewords) {
    throw "ArgumentException";
  }

  // Figure out the number and size of data blocks used by this version and
  // error correction level
  var ecBlocks = version.getECBlocksForLevel(ecLevel);

  // First count the total number of data blocks
  var totalBlocks = 0;
  var ecBlockArray = ecBlocks.getECBlocks();
  for (var i = 0; i < ecBlockArray.length; i++) {
    totalBlocks += ecBlockArray[i].count;
  }

  // Now establish DataBlocks of the appropriate size and number of data codewords
  var result = new Array(totalBlocks);
  var numResultBlocks = 0;
  for (var j = 0; j < ecBlockArray.length; j++) {
    var ecBlock = ecBlockArray[j];
    for (var i = 0; i < ecBlock.count; i++) {
      var numDataCodewords = ecBlock.dataCodewords;
      var numBlockCodewords = ecBlocks.ecCodewordsPerBlock + numDataCodewords;
      result[numResultBlocks++] = new DataBlock(numDataCodewords, new Array(numBlockCodewords));
    }
  }

  // All blocks have the same amount of data, except that the last n
  // (where n may be 0) have 1 more byte. Figure out where these start.
  var shorterBlocksTotalCodewords = result[0].codewords.length;
  var longerBlocksStartAt = result.length - 1;
  while (longerBlocksStartAt >= 0) {
    var numCodewords = result[longerBlocksStartAt].codewords.length;
    if (numCodewords == shorterBlocksTotalCodewords) {
      break;
    }
    longerBlocksStartAt--;
  }
  longerBlocksStartAt++;

  var shorterBlocksNumDataCodewords = shorterBlocksTotalCodewords - ecBlocks.ecCodewordsPerBlock;
  // The last elements of result may be 1 element longer;
  // first fill out as many elements as all of them have
  var rawCodewordsOffset = 0;
  for (var i = 0; i < shorterBlocksNumDataCodewords; i++) {
    for (var j = 0; j < numResultBlocks; j++) {
      result[j].codewords[i] = rawCodewords[rawCodewordsOffset++];
    }
  }
  // Fill out the last data block in the longer ones
  for (var j = longerBlocksStartAt; j < numResultBlocks; j++) {
    result[j].codewords[shorterBlocksNumDataCodewords] = rawCodewords[rawCodewordsOffset++];
  }
  // Now add in error correction blocks
  var max = result[0].codewords.length;
  for (var i = shorterBlocksNumDataCodewords; i < max; i++) {
    for (var j = 0; j < numResultBlocks; j++) {
      var iOffset = j < longerBlocksStartAt ? i : i + 1;
      result[j].codewords[iOffset] = rawCodewords[rawCodewordsOffset++];
    }
  }
  return result;
};


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = QRCodeDataBlockReader;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__qrcode__ = __webpack_require__(0);
/*
  Ported to JavaScript by Lazar Laszlo 2011

  lazarsoft@gmail.com, www.lazarsoft.info

*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/



function QRCodeDataBlockReader(blocks,  version,  numErrorCorrectionCode) {
  this.blockPointer = 0;
  this.bitPointer = 7;
  this.dataLength = 0;
  this.blocks = blocks;
  this.numErrorCorrectionCode = numErrorCorrectionCode;
  if (version <= 9)
    this.dataLengthMode = 0;
  else if (version >= 10 && version <= 26)
    this.dataLengthMode = 1;
  else if (version >= 27 && version <= 40)
    this.dataLengthMode = 2;
}

QRCodeDataBlockReader.prototype.getNextBits = function(numBits) {
  var bits = 0;
  if (numBits < this.bitPointer + 1) {
    // next word fits into current data block
    var mask = 0;
    for (var i = 0; i < numBits; i++) {
      mask += (1 << i);
    }
    mask <<= (this.bitPointer - numBits + 1);

    bits = (this.blocks[this.blockPointer] & mask) >> (this.bitPointer - numBits + 1);
    this.bitPointer -= numBits;
    return bits;
  } else if (numBits < this.bitPointer + 1 + 8) {
    // next word crosses 2 data blocks
    var mask1 = 0;
    for (var i = 0; i < this.bitPointer + 1; i++) {
      mask1 += (1 << i);
    }
    bits = (this.blocks[this.blockPointer] & mask1) << (numBits - (this.bitPointer + 1));
    this.blockPointer++;
    bits += ((this.blocks[this.blockPointer]) >> (8 - (numBits - (this.bitPointer + 1))));

    this.bitPointer = this.bitPointer - numBits % 8;
    if (this.bitPointer < 0) {
      this.bitPointer = 8 + this.bitPointer;
    }
    return bits;
  } else if (numBits < this.bitPointer + 1 + 16) {
    // next word crosses 3 data blocks
    var mask1 = 0; // mask of first block
    var mask3 = 0; // mask of 3rd block
    //bitPointer + 1 : number of bits of the 1st block
    //8 : number of the 2nd block (note that use already 8bits because next word uses 3 data blocks)
    //numBits - (bitPointer + 1 + 8) : number of bits of the 3rd block
    for (var i = 0; i < this.bitPointer + 1; i++) {
      mask1 += (1 << i);
    }
    var bitsFirstBlock = (this.blocks[this.blockPointer] & mask1) << (numBits - (this.bitPointer + 1));
    this.blockPointer++;

    var bitsSecondBlock = this.blocks[this.blockPointer] << (numBits - (this.bitPointer + 1 + 8));
    this.blockPointer++;

    for (var i = 0; i < numBits - (this.bitPointer + 1 + 8); i++) {
      mask3 += (1 << i);
    }
    mask3 <<= 8 - (numBits - (this.bitPointer + 1 + 8));
    var bitsThirdBlock = (this.blocks[this.blockPointer] & mask3) >> (8 - (numBits - (this.bitPointer + 1 + 8)));

    bits = bitsFirstBlock + bitsSecondBlock + bitsThirdBlock;
    this.bitPointer = this.bitPointer - (numBits - 8) % 8;
    if (this.bitPointer < 0) {
      this.bitPointer = 8 + this.bitPointer;
    }
    return bits;
  } else {
    return 0;
  }
};

QRCodeDataBlockReader.prototype.NextMode = function() {
  if ((this.blockPointer > this.blocks.length - this.numErrorCorrectionCode - 2))
    return 0;
  else
    return this.getNextBits(4);
};

QRCodeDataBlockReader.prototype.getDataLength = function(modeIndicator) {
  var index = 0;
  while (true) {
    if ((modeIndicator >> index) == 1)
      break;
    index++;
  }

  return this.getNextBits(__WEBPACK_IMPORTED_MODULE_0__qrcode__["c" /* qrcode */].sizeOfDataLengthInfo[this.dataLengthMode][index]);
};

QRCodeDataBlockReader.prototype.getRomanAndFigureString = function(dataLength) {
  var length = dataLength;
  var intData = 0;
  var strData = "";
  var tableRomanAndFigure = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];
  do {
    if (length > 1) {
      intData = this.getNextBits(11);
      var firstLetter = Math.floor(intData / 45);
      var secondLetter = intData % 45;
      strData += tableRomanAndFigure[firstLetter];
      strData += tableRomanAndFigure[secondLetter];
      length -= 2;
    } else if (length == 1) {
      intData = this.getNextBits(6);
      strData += tableRomanAndFigure[intData];
      length -= 1;
    }
  }
  while (length > 0);

  return strData;
};

QRCodeDataBlockReader.prototype.getFigureString = function(dataLength) {
  var length = dataLength;
  var intData = 0;
  var strData = "";
  do {
    if (length >= 3) {
      intData = this.getNextBits(10);
      if (intData < 100)
        strData += "0";
      if (intData < 10)
        strData += "0";
      length -= 3;
    } else if (length == 2) {
      intData = this.getNextBits(7);
      if (intData < 10)
        strData += "0";
      length -= 2;
    } else if (length == 1) {
      intData = this.getNextBits(4);
      length -= 1;
    }
    strData += intData;
  }
  while (length > 0);

  return strData;
};

QRCodeDataBlockReader.prototype.get8bitByteArray = function(dataLength) {
  var length = dataLength;
  var intData = 0;
  var output = [];

  do {
    intData = this.getNextBits(8);
    output.push(intData);
    length--;
  }
  while (length > 0);
  return output;
};

QRCodeDataBlockReader.prototype.getKanjiString = function(dataLength) {
  var length = dataLength;
  var intData = 0;
  var unicodeString = "";
  do {
    intData = this.getNextBits(13);
    var lowerByte = intData % 0xC0;
    var higherByte = intData / 0xC0;

    var tempWord = (higherByte << 8) + lowerByte;
    var shiftjisWord = 0;
    if (tempWord + 0x8140 <= 0x9FFC) {
      // between 8140 - 9FFC on Shift_JIS character set
      shiftjisWord = tempWord + 0x8140;
    } else {
      // between E040 - EBBF on Shift_JIS character set
      shiftjisWord = tempWord + 0xC140;
    }

    unicodeString += String.fromCharCode(shiftjisWord);
    length--;
  }
  while (length > 0);


  return unicodeString;
};

Object.defineProperty(QRCodeDataBlockReader.prototype, "DataByte", {
  get: function() {
    var output = [];
    var MODE_NUMBER = 1;
    var MODE_ROMAN_AND_NUMBER = 2;
    var MODE_8BIT_BYTE = 4;
    var MODE_KANJI = 8;
    do {
      var mode = this.NextMode();
      if (mode == 0) {
        if (output.length > 0)
          break;
        else
          throw "Empty data block";
      }
      //if (mode != 1 && mode != 2 && mode != 4 && mode != 8)
      //}
      if (mode != MODE_NUMBER && mode != MODE_ROMAN_AND_NUMBER && mode != MODE_8BIT_BYTE && mode != MODE_KANJI && mode != 7) {
        /*          canvas.println("Invalid mode: " + mode);
         mode = guessMode(mode);
         canvas.println("Guessed mode: " + mode); */
        throw "Invalid mode: " + mode + " in (block:" + this.blockPointer + " bit:" + this.bitPointer + ")";
      }
      var dataLength = this.getDataLength(mode);
      if (dataLength < 1)
        throw "Invalid data length: " + dataLength;
      switch (mode) {

      case MODE_NUMBER:
        var temp_str = this.getFigureString(dataLength);
        var ta = new Array(temp_str.length);
        for (var j = 0; j < temp_str.length; j++)
          ta[j] = temp_str.charCodeAt(j);
        output.push(ta);
        break;

      case MODE_ROMAN_AND_NUMBER:
        var temp_str = this.getRomanAndFigureString(dataLength);
        var ta = new Array(temp_str.length);
        for (var j = 0; j < temp_str.length; j++)
          ta[j] = temp_str.charCodeAt(j);
        output.push(ta);
        break;

      case MODE_8BIT_BYTE:
        var temp_sbyteArray3 = this.get8bitByteArray(dataLength);
        output.push(temp_sbyteArray3);
        break;

      case MODE_KANJI:
        var temp_str = this.getKanjiString(dataLength);
        output.push(temp_str);
        break;
      }
      //
    }
    while (true);
    return output;
  }
});


/***/ })
/******/ ]);