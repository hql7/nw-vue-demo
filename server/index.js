const Koa = require('koa');
const staticServer = require('koa-static');
const app = new Koa();
app.use(staticServer('.'))
app.listen(3000);