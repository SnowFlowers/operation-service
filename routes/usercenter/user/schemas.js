/**
 * @Author: Paco
 * @Date:   2017-12-10 14:04:25
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-11 22:16:32
 */
'use strict';

const mongoose = require('mongoose');
const {
  USER_TYPE,
  USER_LEVEL
} = require('./constants');

const UserSchema = new mongoose.Schema({
  name: String,
  pwd: String,
  avatar: String,
  email: String,
  level: String,
  type: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

UserSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  if(!this.level) {
    this.level = USER_LEVEL.MEMBER;
  }
  if(!this.type) {
    this.type = USER_TYPE.TOURIST
  }
  next();
});

UserSchema.statics = {
  findByName: function(name) {
    return this.findOne({name: name})
  },
  findById: function(id) {
    return this.findOne({_id: id})
  },
  deleteById: function(id) {
    return this.remove({_id: id})
  },
  updateById: function(id, data) {
    return this.findByIdAndUpdate(id, data);
  },
  findAll: function() {
    return this.find({})
  }
};

module.exports = UserSchema;
