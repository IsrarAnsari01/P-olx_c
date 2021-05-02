"use strict";

var mongoose = require('mongoose');

var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"];
var date = new Date();
var currentHour = date.getHours();
var formatter = "AM";

if (date.getHours() > 12) {
  currentHour -= 12;
  formatter = "PM";
}

var currentTimeIn12HrFormat = "".concat(currentHour, ":").concat(date.getMinutes(), ":").concat(date.getSeconds(), " ").concat(formatter);
var TodayDate = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear() + ": " + currentTimeIn12HrFormat;
var messageSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  text: String,
  rn_chat_gift_id: String,
  createdAt: String,
  user: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    avatar: String
  },
  sendAt: {
    type: String,
    "default": TodayDate
  }
});
var messageModel = new mongoose.model('message', messageSchema);

module.exports.saveNewMessage = function (msgDetails) {
  return new Promise(function (resolve, reject) {
    var newMsg = new messageModel(msgDetails);
    newMsg.save(function (err, msgValue) {
      if (err) {
        console.log("Unable to create new Msg");
        console.log(err);
        reject(err);
      }

      resolve(msgValue);
    });
  });
};

module.exports.getMessages = function (productId) {
  return new Promise(function (resolve, reject) {
    messageModel.find({
      productId: productId
    }).then(function (messages) {
      resolve(messages);
    })["catch"](function (err) {
      console.log("Unable to find messgae, query ", query);
      console.log(err);
      reject(err);
    });
  });
};