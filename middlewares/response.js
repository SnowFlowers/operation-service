/**
 *  Date    : 2017/12/14
 *  Author  : PACO
 *  Declare : response
 *
 */

'use strict';

const Response  = require('../common/dtos/Response');
const {
  InvalidServer
} = require('../common/dtos/InvalidDto');

module.exports = function(ctx) {
  if(ctx.resp) {
    ctx.body = new Response(ctx.resp);
  } else if(!ctx.body){
    ctx.body = new InvalidServer();
  }
};