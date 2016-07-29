# paeonia-server
基于koa的简单mvc框架，以js文件路径和该文件js方法作为router

## 快速开始

1.新建文件夹

```
mkdir paeonia-demo
cd paeonia-demo
```

2.安装 npm 包

```
npm install paeonia-server
```

3.新建项目

```
mkdir demo
```


4.新建 config.json

```
{
  "appPath": "./",
  "hosts": {
    "127.0.0.1:9007" : "demo"
  },
  "onPort": 9007
}
```

5.新建 app.js

```
var server = require('paeonia-server')
var config = require('./config.json')

config.dirname = __dirname
server.start(config)
```

6.启动服务

```
node app.js
```

7.浏览器访问

http://127.0.0.1:9007/


