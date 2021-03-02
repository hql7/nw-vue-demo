const Koa = require('koa');
const staticServer = require('koa-static');
const cors = require('koa2-cors');
const app = new Koa();

// 设置开启跨域
app.use(cors({
  origin: function (ctx) {
    return ctx.header.origin
  }, // 允许发来请求的域名
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的 HTTP请求方法
  credentials: true, // 标示该响应是合法的
}));
// 设置开启静态文件读取
app.use(staticServer('.'))
// 开启端口监听
app.listen(3003);