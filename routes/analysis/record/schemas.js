/**
 * @Author: Paco
 * @Date:   2017-12-10 14:04:25
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-11 22:16:32
 */
'use strict';

const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  userId: String,
  type: String,
  createDate: {
    type: Number,
    default: Date.now()
  }
});

// RecordSchema.pre('save', function(next) {
//   this.createDate = Date.now();
// });

RecordSchema.statics = {
  findByName: function(name) {
    return this.findOne({name: name})
  },
  findRecordList: function(searchType) {
    return this.find(searchType).sort({createDate: -1});
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

module.exports = RecordSchema;
