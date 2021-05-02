"use strict";

var bcrypt = require("bcrypt");

var userPassword;

function encryptedPwd(pwd) {
  userPassword = pwd;
}

module.exports.EncryptionPassword = function (password) {
  return new Promise(function (res, rej) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) {
        throw error;
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            console.log("Error in Encrypting Password", err);
            rej(err);
          }

          encryptedPwd(hash);
          res(userPassword);
        });
      }
    });
  });
};