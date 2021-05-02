"use strict";

var adModel = require("./productModel");

module.exports.addNewAd = function (req, res) {
  var adDetails = req.body.adDetails;
  adModel.createNewAd(adDetails).then(function (succ) {
    res.send({
      status: true,
      ad: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.getAllProducts = function (req, res) {
  adModel.findMultipleWithQuery().then(function (allProducts) {
    res.send({
      status: true,
      products: allProducts
    });
  })["catch"](function (err) {
    res.send({
      status: true,
      err: err
    });
  });
};

module.exports.findSingleAd = function (req, res) {
  var adId = req.params.id;
  adModel.findSingleWithQuery(adId).then(function (ad) {
    res.send({
      status: true,
      ad: ad
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.updateSpecficAd = function (req, res) {
  var adId = req.params.id;
  var update = {
    productName: req.body.productName,
    price: req.body.price,
    number: req.body.number,
    homeAddress: req.body.homeAddress,
    cetagory: req.body.cetagory,
    subcetagory: req.body.subcetagory,
    details: req.body.details,
    coverImageUrl: req.body.coverImageUrl
  };
  adModel.updateSpecficAd(adId, update).then(function (updatedAd) {
    res.send({
      status: true,
      updatedAd: updatedAd
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.delSpecificadd = function (req, res) {
  var adId = req.params.id;
  adModel.deleteSingleWithQuery(adId).then(function (succ) {
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

module.exports.findSpecficCetagoryProduct = function (req, res) {
  var cetagory = req.body.cetagory;
  adModel.findSpecificCetagoryAd(cetagory).then(function (succ) {
    res.send({
      status: true,
      Ads: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.findSpecficCetagoryAndSubCetagoryProduct = function (req, res) {
  var query = req.body.details;
  adModel.findSpecificCetagoryAndSubCetagoryAd(query).then(function (succ) {
    res.send({
      status: true,
      sortedArray: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
};

module.exports.specificUserAds = function (req, res) {
  var userId = req.params.id;
  adModel.fintSpecificUserAds(userId).then(function (succ) {
    res.send({
      status: true,
      specficUserAd: succ
    });
  })["catch"](function (err) {
    res.send({
      status: false,
      err: err
    });
  });
}; // module.exports.updateCard = (req, res) => {
//     const userId = req.params.id;
//     const update = {
//         $push: {
//             card: {
//                 productId: req.body.productId,
//                 productName: req.body.productName,
//                 productPrice: req.body.productPrice
//             }
//         }
//     }
//     userModel.updateSpecficUser(userId, update)
//         .then(succ => {
//             res.send({ status: true, succ: succ })
//         }).catch(err => {
//             res.send({ status: false, err: err })
//         })
// }
// module.exports.updateWishList = (req, res) => {
//     const userId = req.params.id;
//     const update = {
//         $push: {
//             wishlist: {
//                 productId: req.body.productId,
//                 productName: req.body.productName,
//                 productPrice: req.body.productPrice
//             }
//         }
//     }
//     userModel.updateSpecficUser(userId, update)
//         .then(succ => {
//             res.send({ status: true, succ: succ })
//         }).catch(err => {
//             res.send({ status: false, err: err })
//         })
// }
// module.exports.removeWishlistItem = (req, res) => {
//     const userId = req.params.id
//     const productId = req.body.productId
//     userModel.updateSpecficUserWishlist(userId, productId)
//         .then(succ => {
//             res.send({ status: true, succ: succ })
//         }).catch(err => {
//             res.send({ status: false, err: err })
//         })
// }