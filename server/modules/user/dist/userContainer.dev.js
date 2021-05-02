"use strict";

var userModel = require("./userModel");

var encryption = require("../../encriptionPassword/EncryptionPassword");

module.exports.addNewUser = function (req, res) {
  var userDetails = req.body.userInfo;
  encryption.EncryptionPassword(userDetails.password).then(function (encryptedPassword) {
    userDetails.password = encryptedPassword;
    return userModel.createNewUser(userDetails).then(function (succ) {
      res.send({
        status: true,
        user: succ
      });
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.getAllUser = function (req, res) {
  userModel.findMultipleWithQuery().then(function (allUser) {
    res.send({
      status: true,
      users: allUser
    });
  })["catch"](function (err) {
    res.send({
      status: true,
      err: err
    });
  });
};

module.exports.loginUser = function (req, res) {
  var userDetails = req.body.userInfo;
  userModel.loginWithQuery(userDetails).then(function (succ) {
    res.send({
      status: true,
      user: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.updateCard = function (req, res) {
  var userId = req.params.id;
  var update = {
    $push: {
      card: {
        productId: req.body.productId,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage
      }
    }
  };
  userModel.updateSpecficUser(userId, update).then(function (succ) {
    res.send({
      status: true,
      succ: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.updateWishList = function (req, res) {
  var userId = req.params.id;
  var update = {
    $push: {
      wishlist: {
        productId: req.body.productId,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage
      }
    }
  };
  userModel.updateSpecficUser(userId, update).then(function (succ) {
    res.send({
      status: true,
      succ: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.updatePostedAds = function (req, res) {
  var userId = req.params.id;
  var update = {
    $push: {
      postedAds: {
        productId: req.body.productId,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage
      }
    }
  };
  userModel.updateSpecficUserAds(userId, update).then(function (succ) {
    res.send({
      status: true,
      updatedProfile: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.updateUserInfo = function (req, res) {
  var userId = req.params.id;
  var update = {
    name: req.body.name,
    email: req.body.email,
    whatsapp: req.body.whatsapp,
    homeAddress: req.body.homeAddress,
    userImageUrl: req.body.userImageUrl,
    password: req.body.password
  };
  userModel.updateUserInformation(userId, update).then(function (student) {
    res.send({
      status: true,
      updatedStudent: student
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.findSingleUser = function (req, res) {
  var userId = req.params.id;
  userModel.findSingleWithQuery(userId).then(function (succ) {
    res.send({
      status: true,
      succ: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.removeCardItem = function (req, res) {
  var userId = req.params.id;
  var productId = req.body.productId;
  userModel.updateSpecficUserCard(userId, productId).then(function (succ) {
    res.send({
      status: true,
      succ: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.removeWishlistItem = function (req, res) {
  var userId = req.params.id;
  var productId = req.body.productId;
  userModel.updateSpecficUserWishlist(userId, productId).then(function (succ) {
    res.send({
      status: true,
      succ: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.delSpecificUser = function (req, res) {
  var userId = req.params.id;
  userModel.deleteSingleWithQuery(userId).then(function (succ) {
    res.send({
      status: true,
      deleted: "Ok"
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};