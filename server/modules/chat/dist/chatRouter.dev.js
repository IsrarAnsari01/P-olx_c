"use strict";

var chatModel = require('./chatModel');

var express = require("express");

var router = express.Router();
router.get("/getAllMessage/:id", function (req, res) {
  var productId = req.params.id;
  chatModel.getMessages(productId).then(function (messages) {
    res.send({
      status: true,
      messages: messages
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
});
module.exports = router;