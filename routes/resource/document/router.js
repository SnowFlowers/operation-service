/**
 *  Date    : 2017/12/23
 *  Author  : PACO
 *  Declare : router
 *
 */

'use strict';
const config = require('../../../config');
const Router = require('koa-router');
const Document = require('./models');
const User = require('../../usercenter/user/models');
const {
  DocumentDto
} = require('./dtos');

const DocumentRouter = new Router();

const {InvalidQuery} = require('../../../common/dtos/InvalidDto');


DocumentRouter.post('/addDocument', async(ctx, next) => {
  const body = ctx.request.body;
  const userId = ctx.cookie[config.cookieName];
  if(!userId) {
    ctx.resp = new InvalidQuery({message: "参数缺失"});
  } else {
    let result = await User.findById(userId)
      .catch(err => {
        return false;
      });
    if(result) {
      const document = new Document(Object.assign({}, body, {authorId: userId}, true));
      const resp = await document.save();
      ctx.resp = {
        message: "保存成功",
        data: resp
      };
    } else {
      ctx.resp = new InvalidQuery({message: "cookie参数错误，用户信息获取不到"});
    }
  }
  next();
});

DocumentRouter.post('/updateDocument', async(ctx, next) => {
  const body = ctx.request.body || {};
  const userId = ctx.cookie[config.cookieName];
  if(!userId || !body.documentId) {
    ctx.resp = new InvalidQuery({message: "参数缺失"});
  } else {
    let result = await User.findById(userId)
      .catch(err => {
        return false;
      });
    if(result) {
      const id = body.documentId;
      delete body.documentId;
      console.log(body);
      const resp = await Document.updateById(id, Object.assign({}, body, {authorId: userId}));
      ctx.resp = {
        message: "保存成功",
        data: resp
      };
    } else {
      ctx.resp = new InvalidQuery({message: "cookie参数错误，用户信息获取不到"});
    }
  }
  next();
});

DocumentRouter.get('/getDocumentById', async(ctx, next) => {
  const {id} = ctx.query;
  if(!id) {
    ctx.resp = new InvalidQuery({message: "参数缺失"});
  } else {
    let document = await Document.findById(id)
      .catch(err => {
        return false;
      });

    let user = await User.findById(document.authorId)
      .catch(err => {
        return false;
      });

    if(document && user) {
      const newDocument = new DocumentDto(document, user);
      ctx.resp = {
        data: newDocument
      }
    } else {
      ctx.resp = new InvalidQuery({message: "查询不到信息"});
    }
  }
  next();
});

DocumentRouter.get('/deleteById', async(ctx, next) => {
  const {id} = ctx.query;
  if(!id) {
    ctx.resp = new InvalidQuery({message: "参数缺失"});
  } else {
    let result = await Document.deleteById(id)
      .catch(err => {
        return false
      });
    if(result) {
      ctx.resp = {
        data: result
      }
    } else {
      ctx.resp = new InvalidQuery({message: "删除失败，未能找到该资源"});
    }
  }
  next();
});

module.exports = DocumentRouter;