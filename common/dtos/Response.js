/**
 *  Date    : 2017/12/14
 *  Author  : PACO
 *  Declare : response
 *
 */

'use strict';

class Response {

  constructor(props) {

    this.errCode = props.errCode || Response.SUCCESS;
    this.message = props.message || Response.SUCCESS_MSG;
    this.data = props.data || Response.data
  }

}

Response.SUCCESS = 0;

Response.SUCCESS_MSG = "操作成功";

Response.data = {};

module.exports = Response;