"use strict";

var userContainer = require("./userContainer");

var express = require("express");

var router = express.Router();
router.post("/add-new", userContainer.addNewUser);
router.get("/", userContainer.getAllUser);
router.get("/:id", userContainer.findSingleUser);
router.post("/login-user", userContainer.loginUser);
router.post("/updateCard/:id", userContainer.updateCard);
router.post("/updateWishlist/:id", userContainer.updateWishList); // router.post("/updatePostedProducts/:id", userContainer.updatePostedAds)

router.post("/update/:id", userContainer.updateUserInfo);
router.post("/deleteSpecificCardItem/:id", userContainer.removeCardItem);
router.post("/deleteSpecificWishItem/:id", userContainer.removeWishlistItem);
router.get("/delete-user/:id", userContainer.delSpecificUser);
module.exports = router;