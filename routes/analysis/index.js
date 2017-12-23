/*
 * @Author: Paco
 * @Date:   2017-12-10 15:07:05
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-10 15:11:39
 */
'use strict';
const Router  = require('koa-router');
const record = require('./record/router');

const RecordCenter = new Router();

RecordCenter.use('/record', record.routes(), record.allowedMethods());

module.exports = RecordCenter;