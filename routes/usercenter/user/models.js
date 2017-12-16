/**
 * @Author: Paco
 * @Date:   2017-12-10 14:12:21
 * @Last Modified by:   Paco
 * @Last Modified time: 2017-12-12 11:20:17
 */

const mongoose = require('mongoose');
const UserSchema = require('./schemas');

const User = mongoose.model('user', UserSchema);

module.exports = User; 