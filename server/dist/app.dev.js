"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var dbHelper = require("./dbHelper/dbHelper");

var app = express(); // const port = process.env.PORT || 9000;

var port = 9000;

var chatHelper = require("./modules/chat/chatModel");

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  limit: "20mb"
}));
app.use("/user", require("./modules/user/userRoutes"));
app.use("/product", require("./modules/product/productRoutes"));
app.use("/chat", require("./modules/chat/chatRouter"));
app.get("*", function (req, res) {
  res.send("<h1>Welcome to OLX SERVER.</h1>");
});
var server = app.listen(port, function (err) {
  if (err) {
    console.log("Error in listening at " + port);
    console.log(err);
    return;
  }

  console.log("Server Started Successfully..!");
  dbHelper.connectWithDB();
});

var socket = require("socket.io")(server);

socket.on("connection", function (socket) {
  console.log("Client Connected");
  socket.on("GET_MSG_DETAILS_FROM_CLIENT", function (msgDetails) {
    var dataToBeSend = {
      productId: msgDetails.productId,
      text: msgDetails.text,
      rn_chat_gift_id: msgDetails.rn_chat_gift_id,
      createdAt: msgDetails.createdAt,
      user: {
        _id: msgDetails.user._id,
        name: msgDetails.user.name,
        avatar: msgDetails.user.avatar
      }
    };
    chatHelper.saveNewMessage(dataToBeSend).then(function (success) {
      console.log("Successfully same new Msg in db");
      socket.emit("GET_CURRENT_MSG_OF_THIS_PRODUCT", success);
      socket.broadcast.emit("GET_CURRENT_MSG_OF_THIS_PRODUCT", success);
    })["catch"](function (err) {
      console.log("Unable to save Message in DB", err);
    });
  });
});