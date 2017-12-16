/**
 *  Date    : 2017/12/14
 *  Author  : PACO
 *  Declare : dots.js
 *
 */
'use strict';

const {USER_LEVEL, USER_TYPE} = require('./constants');

class LoginDto {
  constructor(props = {}) {
    this.userId = props._id;
  }
}

class GetInfo {
  constructor(props = {}) {
    this.userId = props._id;
    this.level = props.level || USER_LEVEL.MEMBER;
    this.type = props.type || USER_TYPE.TOURIST
  }
}

module.exports = {
  LoginDto,
  GetInfo
};

