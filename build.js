var inline = require('inline-source').sync
, fs = require('fs')
, path = require('path')
, htmlpath = path.resolve('index.html');

var html = inline(htmlpath, {
  compress: true,
  rootpath: path.resolve('./'),
  // Skip all script tags
  // ignore: 'script'
});

fs.writeFileSync('tool.html', html);