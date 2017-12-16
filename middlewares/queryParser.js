/*
 * @Author: Paco
 * @Date:   2017-12-10 16:06:51
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-10 16:19:47
 */
'use strict';
const queryString = require('query-string');

module.exports = async function(ctx, next) {
  const quertIndex = ctx.path.indexOf('?');
  if(quertIndex > -1) {
    const query = queryString.parse(ctx.path.slice(quertIndex));
    ctx.query = query;
    await next();
  } else {
    await next();
  }
};