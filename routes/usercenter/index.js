/*
* @Author: Paco
* @Date:   2017-12-10 15:07:05
* @Last Modified by:   Paco
* @Last Modified time: 2017-12-10 15:11:39
*/
'use strict';
const Router  = require('koa-router');
const user = require('./user/router');

const usercenter = new Router();

usercenter.use('/user', user.routes(), user.allowedMethods());

module.exports = usercenter;