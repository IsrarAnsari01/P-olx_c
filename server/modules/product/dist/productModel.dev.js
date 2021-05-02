"use strict";

var mongoose = require('mongoose');

var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"];
var date = new Date();
var TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
var productSchema = new mongoose.Schema({
  productName: String,
  price: String,
  number: String,
  homeAddress: String,
  details: String,
  cetagory: String,
  subcetagory: String,
  coverImageUrl: String,
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  addedOn: {
    type: String,
    "default": TodayDate
  }
});
var productModel = new mongoose.model('products', productSchema);

module.exports.createNewAd = function (productDetails) {
  return new Promise(function (resolve, reject) {
    var newAd = new productModel(productDetails);
    newAd.save(function (err, ad) {
      if (err) {
        console.log("Unable to create new Ad");
        console.log(err);
        reject(err);
      }

      resolve(ad);
    });
  });
};

module.exports.findMultipleWithQuery = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resolve, reject) {
    productModel.find(query).then(function (users) {
      resolve(users);
    })["catch"](function (err) {
      console.log("Unable to find reader, query ", query);
      console.log(err);
      reject(err);
    });
  });
};

module.exports.findSingleWithQuery = function (query) {
  return new Promise(function (resolve, reject) {
    productModel.findOne({
      _id: query
    }).populate("userInfo").then(function (ad) {
      resolve(ad);
    })["catch"](function (err) {
      console.log("Unable to find Ad, query ", query);
      console.log(err);
      reject(err);
    });
  });
};

module.exports.updateSpecficAd = function (query, data) {
  return new Promise(function (resolve, reject) {
    productModel.updateOne({
      _id: query
    }, data).then(function (updateAd) {
      resolve(updateAd);
    })["catch"](function (err) {
      console.log("Something went Wrong Error in Updating data", err);
      reject(err);
    });
  });
};

module.exports.fintSpecificUserAds = function (userInfo) {
  return new Promise(function (resolve, reject) {
    productModel.find({
      userInfo: userInfo
    }).populate("userInfo").then(function (specificUserJob) {
      resolve(specificUserJob);
    })["catch"](function (err) {
      console.log("Something went Wrong Error in finding data", err);
      reject(err);
    });
  });
};

module.exports.findSpecificCetagoryAd = function (cetagory) {
  return new Promise(function (resolve, reject) {
    productModel.find({
      cetagory: cetagory
    }).then(function (sortedAds) {
      resolve(sortedAds);
    })["catch"](function (err) {
      console.log("Something went Wrong Error in finding data", err);
      reject(err);
    });
  });
};

module.exports.findSpecificCetagoryAndSubCetagoryAd = function (query) {
  return new Promise(function (resolve, reject) {
    productModel.find({
      cetagory: query.cetagory,
      subcetagory: query.subCetagory
    }).then(function (sortedAds) {
      resolve(sortedAds);
    })["catch"](function (err) {
      console.log("Something went Wrong Error in finding data", err);
      reject(err);
    });
  });
};

module.exports.deleteSingleWithQuery = function (query) {
  return new Promise(function (resolve, reject) {
    productModel.deleteOne({
      _id: query
    }).then(function (ad) {
      resolve(ad);
    })["catch"](function (err) {
      console.log("Unable to Delete Ad, query ", query);
      console.log(err);
      reject(err);
    });
  });
};