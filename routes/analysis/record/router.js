/*
 * @Author: Paco
 * @Date:   2017-12-10 14:11:38
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-21 09:12:58
 */
const Router = require('koa-router');
const Record = require('./models');
const {
  RecordDto,
  SearchType
} = require('./dtos');

const {InvalidQuery} = require('../../../common/dtos/InvalidDto');

const RecordRouter = new Router();

//创建缺少参数实例
const invalidQuery = new InvalidQuery();

RecordRouter.post('/addRecord', async function(ctx, next) {
  const body = ctx.request.body;
  if(!body.userId) {
    ctx.resp = invalidQuery;
    next();
  } else {
    const record = new Record(body, true);
    try {
      let result = await record.save();
      ctx.resp = {
        data: result
      };
    } catch (err) {
      console.log(err);
    }
    next();
  }

});

RecordRouter.get('/getRecord', async function(ctx, next) {
  const {userId, type} = ctx.query;
  const searchType = new SearchType({userId, type});
  var recordList = await Record.findRecordList(searchType);
  if(recordList) {
    ctx.resp = {
      data: recordList.map(item => new RecordDto(item))
    }
  } else {
    ctx.resp = new InvalidQuery({message: "没有该用户信息 ！"})
  }
  next();
});


module.exports = RecordRouter;