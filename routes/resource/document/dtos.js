/**
 *  Date    : 2017/12/23
 *  Author  : PACO
 *  Declare : dtos.js
 *
 */

'use strict';

class DocumentDto {
  constructor(document, user) {
    return {
      author: user.name,
      title: document.title,
      coverImg: document.coverImg,
      content: document.content,
      createDate: new Date(document.createDate),
      documentId: document._id,
      authorId: document.authorId,
      updateDate: new Date(document.updateDate)
    }
  }
}

module.exports = {
  DocumentDto
};