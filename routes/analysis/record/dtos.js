/**
 *  Date    : 2017/12/23
 *  Author  : PACO
 *  Declare : dtos
 *
 */

'use strict';

class RecordDto {
  constructor(props = {}) {
    this.userId = props.userId;
    this.type = props.type;
    this.createDate = new Date(Math.floor(props.createDate))
  }
}

class SearchType {
 constructor(props = {}) {
   for(let item in props) {
     if(SearchType.types.includes(item) && props[item]) {
       this[item] = props[item];
     }
   }
 }
}

SearchType.types = ['userId', 'type'];

module.exports = {
  RecordDto,
  SearchType
};