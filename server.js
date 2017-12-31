/*
 * @Author: Paco
 * @Date:   2017-12-02 13:41:11
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-10 16:11:45
 */
const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const mount = require('koa-mount');
const router = require('koa-router');
const cookie = require('koa-cookie');
const mongoose = require('mongoose');
const queryparaser = require('./middlewares/queryParser');
const response = require('./middlewares/response');

const config = require('./config');

const Router = require('./routes');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb, {
  useMongoClient: true
});

const app = new Koa();

//请求body解析器
app.use(bodyParser({
  enableTypes: ['json', 'form'],
  formLimit: '10mb',
  jsonLimit: '10mb'
}));

app.use(cookie.default());

app.use(queryparaser);

//路由
app.use(Router.routes());

app.use(response);


//开启服务
app.listen(config.port, function() {
  console.log(`this serveices start on port ${config.port}`)
});
