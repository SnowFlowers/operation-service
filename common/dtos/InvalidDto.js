/**
 *  Date    : 2017/12/14
 *  Author  : PACO
 *  Declare : InvalidDto
 *
 */

'use strict';

const obj = {}, arr = [];

const dtoFunc = function(errCode, message, data) {
  return function (props = {}) {
    return {
      errCode: props.errCode || errCode,
      message: props.message || message,
      data: props.data || data
    }
  }
};

module.exports = {
  InvalidQuery: dtoFunc(101, '请输入正确的参数', obj),
  InvalidServer: dtoFunc(100, '服务器内部错误，请稍后重试', obj)
};