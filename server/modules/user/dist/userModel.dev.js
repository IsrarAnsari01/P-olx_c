"use strict";

var mongoose = require('mongoose');

var bcrypt = require("bcrypt");

var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"];
var date = new Date();
var TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
var userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String
  },
  whatsapp: String,
  homeAddress: String,
  password: String,
  userImageUrl: String,
  addedOn: {
    type: String,
    "default": TodayDate
  },
  card: [{
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    productPrice: String,
    productImage: String
  }],
  wishlist: [{
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    productPrice: String,
    productImage: String
  }]
});
var userModel = new mongoose.model('user', userSchema);

module.exports.createNewUser = function (userDetails) {
  return new Promise(function (resolve, reject) {
    var newUser = new userModel(userDetails);
    newUser.save(function (err, student) {
      if (err) {
        console.log("Unable to create new Student");
        console.log(err);
        reject(err);
      }

      resolve(student);
    });
  });
};

module.exports.findMultipleWithQuery = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resolve, reject) {
    userModel.find(query).then(function (users) {
      resolve(users);
    })["catch"](function (err) {
      console.log("Unable to find reader, query ", query);
      console.log(err);
      reject(err);
    });
  });
};

module.exports.loginWithQuery = function (userDetails) {
  return new Promise(function (resolve, reject) {
    userModel.findOne({
      email: userDetails.email
    }).then(function (user) {
      return bcrypt.compare(userDetails.password, user.password, function (err, isMatch) {
        if (!isMatch) {
          console.log("Password does not match");
          return;
        }

        resolve(user);
      });
    })["catch"](function (err) {
      console.log("Unable to find User, query ", err);
      console.log(err);
      reject(err);
    });
  });
};

module.exports.findSingleWithQuery = function (query) {
  return new Promise(function (resolve, reject) {
    userModel.findOne({
      _id: query
    }).then(function (user) {
      resolve(user);
    })["catch"](function (err) {
      console.log("Unable to find User, query ", query);
      console.log(err);
      reject(err);
    });
  });
};

module.exports.updateSpecficUser = function (query, data) {
  return new Promise(function (rej, res) {
    userModel.updateOne({
      _id: query
    }, data).then(function (updatedUser) {
      res(updatedUser);
    })["catch"](function (err) {
      console.log("Something went Wrong Error in Updating data", err);
      rej(err);
    });
  });
};

module.exports.updateSpecficUserAds = function (query, data) {
  return new Promise(function (resolve, reject) {
    userModel.updateOne({
      _id: query
    }, data).then(function (updatedUser) {
      resolve(updatedUser);
    })["catch"](function (err) {
      console.log("Something went Wrong Error in Updating data", err);
      reject(err);
    });
  });
};

module.exports.updateSpecficUserCard = function (query, productId) {
  return new Promise(function (resolve, reject) {
    userModel.update({
      _id: query
    }, {
      $pull: {
        card: {
          productId: productId
        }
      }
    }, {
      multi: true
    }).then(function (updatedUser) {
      resolve(updatedUser);
    })["catch"](function (err) {
      console.log("Something went Wrong Error in Updating data", err);
      reject(err);
    });
  });
};

module.exports.updateSpecficUserWishlist = function (query, productId) {
  return new Promise(function (resolve, reject) {
    userModel.update({
      _id: query
    }, {
      $pull: {
        wishlist: {
          productId: productId
        }
      }
    }, {
      multi: true
    }).then(function (updatedUser) {
      resolve(updatedUser);
    })["catch"](function (err) {
      console.log("Something went Wrong Error in Updating data", err);
      reject(err);
    });
  });
};

module.exports.updateUserInformation = function (query, dataToBeUpdate) {
  return new Promise(function (resolve, reject) {
    userModel.updateOne({
      _id: query
    }, dataToBeUpdate).then(function (succ) {
      resolve(succ);
    })["catch"](function (err) {
      console.log("Error in updating data ", err);
      reject(err);
    });
  });
};

module.exports.deleteSingleWithQuery = function (query) {
  return new Promise(function (resolve, reject) {
    userModel.deleteOne({
      _id: query
    }).then(function (user) {
      resolve(user);
    })["catch"](function (err) {
      console.log("Unable to Delete Student, query ", query);
      console.log(err);
      reject(err);
    });
  });
};