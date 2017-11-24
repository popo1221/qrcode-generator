## 应用命名规范
- 静态应用: gw-modulename-static
- node应用: gw-modulename-node

## 应用部署方式: 
静态应用: 
1. 以nginx作为服务器，nginx服务器上以/home/envuser/nginx作为静态文件的根目录；
2. 在静态文件根目录下，以模块名创建目录，作为应用模块的根目录，存放该模块静态文件；

node应用: 
1. node服务器必须安装node LTS、pm2工具，并以pm2作为启动工具
2. 以/home/nodeweb作为所部署的根目录，在该目录下以应用名创建目录，作为应用的根目录
3. 起停应用
pm2 stop process.json
pm2 start process.json

## 发布包结构: 
静态应用: 
1. 采用zip格式，后缀名为.zip
2. 根目录下包含index.html文件

node应用: 
1. 采用zip格式，后缀名为.zip
2. 根目录下包含process.json文件

## node应用端口
统一由姚凯规划，并记录。

/home/nodeweb/gw-report-engine-node
process.json
