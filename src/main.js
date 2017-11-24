import QArt from 'qartjs/src/qart';
import {
  QRCode,
  QRUtil,
} from 'qartjs/src/qrcode';
import QrCode from 'qrcode-reader';

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
      QRCode.stringToBytes = QRCode.stringToBytesFuncs['UTF-8']
      var qr = QRCode(version, 'H');
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
      new QArt({
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
        var qr = new QrCode();

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