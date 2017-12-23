/*
 * @Author: Paco
 * @Date:   2017-12-10 15:07:05
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-10 15:11:39
 */
'use strict';
const Router  = require('koa-router');
const document = require('./document/router');

const resourcecenter = new Router();

resourcecenter.use('/document', document.routes(), document.allowedMethods());

module.exports = resourcecenter;