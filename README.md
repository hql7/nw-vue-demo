## 前情提要
在[nw.js入门最如丝般润滑的教程](https://juejin.cn/post/6889239490423242759)一文中，作者介绍了简单的使用nw运行html文件为桌面程序以及将html文件打包为桌面可执行文件exe。
看vuecli创建的工程打包成exe文件可直接从【在vuecli创建的项目基础上增加nw插件无缝转化为桌面程序】目录开始。

## 本文主题
1. 以上文运行和打包方式将vue项目打包为桌面可执行程序	
2. 在vuecli创建的项目基础上增加nw插件无缝转化为桌面程序
2. 可在xp系统运行		
3. 支持自动更新	

### 将vue项目打包为桌面可执行程序	
1. 将vue项目打包生成的dist目录下的所有文件复制到app及package.nw目录下
	> 注意：笔者尝试了下将dist文件夹放在app及package.nw目录下，然后修改package.json中的main路径，但是出现异常；而将dist目录去掉把index.html和其他文件直接放在app及package.nw目录下可以正常启动成功。可能是缓存原因

2. 将app目录拖动至nw.exe上方运行
3. 执行打包命令生成桌面软件
	```shall
	copy /b nw.exe+package.nw yourname.exe
	```

### 在vuecli创建的项目基础上增加nw插件无缝转化为桌面程序
#### 运行vue项目为桌面程序
1. 创建vue项目
	```js
    vue create yourname  // vuecli3+
    
    or
    
    vue init webpack yourname // vuecli2
    
    ```
2. 添加nw插件依赖
 	```js
    cnpm install nw@0.14.7-sdk --save-dev  // 官方文档说要支持xp系统请使用0.14.7版本，不考虑xp则可安装最新版
    ```
    注意：推荐使用cnpm安装，npm安装基本失败，yarn安装也难得的不稳定！因此推荐cnpm安装
3. 运行项目
	先运行vue项目，如果出现依赖错误，删除node_modules目录然后重新`cnpm install`即可
4. 以桌面软件的方式运行项目

	在package.json中增加一行nwjs的文件入口代码
	``` json
    "main": "http://localhost:8080/", // 因为nw入口可以是.html,.js和线上地址。因为是本地运行，将main设置为你上一步中运行起来的项目地址
    ```
    在package.json中scripts下增加一行脚本命令
    ```
    "serve:nw": "nw",
    ```
 	然后在编辑器终端输入 npm run serve:nw 即可启动桌面版vue项目
#### 打包vue项目为桌面程序
1. 使用插件打包：nw中文网推荐nwjs-builder-phoenix（虽然已封存，但是按官方推荐来吧，坑少）
	```shall
    cnpm install nwjs-builder-phoenix --save-dev
	```
    在package.json中scripts下增加一行脚本命令
    ```json
    "build:nw": "npm run build && build --tasks win-x64 --mirror https://npm.taobao.org/mirrors/nwjs/ .", // win-x64版
    "build:nw:all": "npm run build && build --tasks win-x86,win-x64,linux-x86,linux-x64,mac-x64 --mirror https://npm.taobao.org/mirrors/nwjs/ .", // 打包多版本
    ```
2. 在package.json中配置基本打包参数
	```json
    "build": {
    	"files": [
      		"dist/**/*"  // 文件路径，你vue打包后的文件夹
    	],
    	"output": "./releases", // 输出路径，打包后的软件输出位置
    	"nwVersion": "0.14.7", // 跟你下载的nw版本匹配
    	"nwPlatforms": [
      		"win" // 平台
    	],
    	"nwArchs": [
      		"x64" // 和上面打包命令后面的版本参数匹配
    	],
    	"overriddenProperties": {
     	    "main": "./dist/index.html" // 设置软件入口文件，其实这里可以是一个网址
    	}	
  	},
    ```
3. 修改vue.config.js，将打包路径设置为相对路径,cli2版本不再赘述
	```js
    module.exports = {
    	publicPath: './',
    	productionSourceMap: false,
	}
    ```
	完成这三步之后，在终端运行`npm run build:nw`即可生成打包后的桌面软件文件夹。找到里面的`your name.exe`然后双击运行即可。
### 自动更新
***
## 常见问题（踩坑）
1. vuecli3+默认的路由模式为history，使用nw打包后会报错，将router.js中的`mode: history`注释即可。
2. 如果将`build/overriddenProperties/mian`的值设置为一个网址打包后软件也是可运行的，在xp上也没问题，是不是理论上只要网站一直保持运行和最新内容，这个软件包就无须更新永远是最新的？
## 完整配置、打包后目录及效果
### nw配置主要在package.json，完整配置如下
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df20e665ef2f404ab480a0fd398f984d~tplv-k3u1fbpfcp-watermark.image)	

文件见[package.json](https://github.com/hql7/nw-vue-demo/blob/main/package.json)
### 打包后目录
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54886178d39d4ed1957152ff83eeaa39~tplv-k3u1fbpfcp-watermark.image)
### 运行效果
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47a2ef25198e4d1a8dfa52e85543886d~tplv-k3u1fbpfcp-watermark.image)

### Github地址
[nw-vue-demo](https://github.com/hql7/nw-vue-demo)	

目前js打包桌面程序最流行的是electron，但是这个入门交简单文章也多，暂不赘述，同有项目地址：[electron-vue-demo](https://github.com/hql7/electron-vue-demo)