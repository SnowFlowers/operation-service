/*
 * @Author: Paco
 * @Date:   2017-12-10 14:11:38
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-21 09:12:58
 */
const Router = require('koa-router');
const User = require('./models');
const {
  LoginDto,
  GetInfo
} = require('./dtos');

const {InvalidQuery} = require('../../../common/dtos/InvalidDto');

const UserRouter = new Router();

//创建缺少参数实例
const invalidQuery = new InvalidQuery();

UserRouter.get('/login', async function(ctx, next) {
  const {name, pwd} = ctx.query;
  if(!name || !pwd) {
    ctx.resp = invalidQuery;
    return next();
  }
  var user = await User.findByName(name);
  if(user && user.pwd == pwd) {
    ctx.resp = {
      data: new LoginDto(user)
    }
  } else {
    ctx.resp = new InvalidQuery({message: "请输入正确的账号密码"})
  }
  next();
});

UserRouter.get('/getInfo', async function(ctx, next) {
  const {userId} = ctx.query;
  if(!userId) {
    ctx.resp = invalidQuery;
    return next();
  }
  var user = await User.findById(userId);
  if(user) {
    ctx.resp = {
      data: new GetInfo(user)
    }
  } else {
    ctx.resp = new InvalidQuery({message: "没有该用户信息 ！"})
  }
  next();
});

UserRouter.post('/register', async function(ctx, next) {
  const newUser = ctx.request.body;
  if(!newUser.name || !newUser.pwd) {
    ctx.resp = new InvalidQuery({message: "请输入合法的账号密码!"});
    return next();
  }
  var oldUser = await User.findByName(newUser.name);
  if(oldUser && oldUser.pwd) {
    ctx.resp = new InvalidQuery({message: "该账号已经有人注册过!"});
    return next();
  }
  const user = new User(newUser, true);
  const result = await user.save();
  ctx.resp = {};
  next();
});

UserRouter.post('/deleteUser', async function(ctx, next) {
  const {users} = ctx.request.body;
  if(!users || !(users instanceof Array)) {
    ctx.resp = new InvalidQuery({message: "请传入users数组"});
    return next();
  }
  let message = "";
  for(let i = 0;i < users.length; i++) {
    let result = await User.deleteById(users[i])
      .catch(err => {
        message = message + `id${users[i]}未能删除`;
      });
  }
  ctx.resp = message ? new InvalidQuery({message}) : {};
  next();
});

UserRouter.post('/updateUserLevel', async function(ctx, next) {
  const {users, level} = ctx.request.body;
  if(!users instanceof Array || !level) {
    ctx.resp = new InvalidQuery({message: "请传入users数组和level等级"});
    return next();
  }
  let message = "", result;
  for(let i = 0;i < users.length; i++) {
    result = await User.updateById(users[i], {level})
      .catch(err => {
        message = message + `id${users[i]}未能更新`;
      });

  }
  ctx.resp = message ? new InvalidQuery({message}) : {message: '修改成功'};
  next();
});

UserRouter.post('/updateUserType', async function(ctx, next) {
  const {users, type} = ctx.request.body;
  if(!users instanceof Array || !type) {
    ctx.resp = new InvalidQuery({message: "请传入users数组和type类型"});
    return next();
  }
  let message = "", result;
  for(let i = 0;i < users.length; i++) {
    result = await User.updateById(users[i], {type})
      .catch(err => {
        message = message + `id${users[i]}未能更新`;
      });

  }
  ctx.resp = message ? new InvalidQuery({message}) : {message: '修改成功'};
  next();
});

UserRouter.get('/allUser', async function(ctx, next) {
  const result = await User.findAll();
  ctx.resp = {
    data: result
  };
  next();
});

module.exports = UserRouter;