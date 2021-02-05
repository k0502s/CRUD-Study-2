const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.tutorials = require("../models/DB")(mongoose, mongoosePaginate);

module.exports = db;