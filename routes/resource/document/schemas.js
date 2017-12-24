/**
 * @Author: Paco
 * @Date:   2017-12-10 14:04:25
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-11 22:16:32
 */
'use strict';

const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: String,
  authorId: String,
  coverImg: String,
  content: String,
  type: String,
  createDate: {
    type: Number,
    default: Date.now()
  },
  updateDate: {
    type: Number,
    default: Date.now()
  }
});

DocumentSchema.pre('save', function(next) {
  if(!this.isNew) {
    this.updateDate = Date.now();
  }
  next();
});

DocumentSchema.statics = {
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

module.exports = DocumentSchema;
