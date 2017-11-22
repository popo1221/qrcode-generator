import QArt from 'qartjs';
import {
  QRCode,
  QRUtil,
} from 'qartjs/src/qrcode';


$(document).ready(function() {

    $('.pastable').pastableNonInputable();
    $(document).on('pasteImage', function (ev, data){
        console.log("dataURL: " + data.dataURL);
        console.log("width: " + data.width);
        console.log("height: " + data.height);
        console.log(data.blob);

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