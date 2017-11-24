var options = {}
var qrdecoder = require('node-zxing')(options);
var path = "/Users/linwei.peng/Desktop/2.png";
qrdecoder.decode(path,
  function(err, out) {
    console.log(err,out);
  }
);