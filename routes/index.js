/*
* @Author: Paco
* @Date:   2017-12-10 14:57:20
* @Last Modified by:   Paco
* @Last Modified time: 2017-12-10 15:11:06
*/

const Router = require('koa-router');
const rootRouter = new Router();

const usercenter = require('./usercenter');
const analysis = require('./analysis');
const resource = require('./resource');

rootRouter.use('/usercenter', usercenter.routes(), usercenter.allowedMethods());
rootRouter.use('/analysiscenter', analysis.routes(), analysis.allowedMethods());
rootRouter.use('/resourcecenter', resource.routes(), resource.allowedMethods());


module.exports = rootRouter;