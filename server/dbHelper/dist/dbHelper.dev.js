"use strict";

var mongoose = require('mongoose');

module.exports.connectWithDB = function () {
  mongoose.connect('mongodb+srv://new_user_02:new_user_022@cluster0.e46ff.mongodb.net/OLX?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  var db = mongoose.connection;
  db.once('error', function (err) {
    console.log("Error in connecting to DB");
    console.log(err);
  });
  db.once('open', function () {
    console.log("Connected to DB successfully..!");
  });
};