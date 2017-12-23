/**
 * @Author: Paco
 * @Date:   2017-12-10 14:12:21
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-12 11:20:17
 */

const mongoose = require('mongoose');
const RecordSchema = require('./schemas');

const Record = mongoose.model('analysis', RecordSchema);

module.exports = Record;