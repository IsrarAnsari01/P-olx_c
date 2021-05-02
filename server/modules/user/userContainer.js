const userModel = require("./userModel")
const encryption = require("../../encriptionPassword/EncryptionPassword")
module.exports.addNewUser = (req, res) => {
    const userDetails = req.body.userInfo;
    encryption.EncryptionPassword(userDetails.password)
        .then(encryptedPassword => {
            userDetails.password = encryptedPassword
            return userModel.createNewUser(userDetails)
                .then(succ => {
                    res.send({ status: true, user: succ })
                })
        })
        .catch(err => {
            res.send({ status: false, err: err })
        })

}
module.exports.getAllUser = (req, res) => {
    userModel.findMultipleWithQuery()
        .then(allUser => {
            res.send({ status: true, users: allUser })
        })
        .catch(err => {
            res.send({ status: true, err: err })
        })
}
module.exports.loginUser = (req, res) => {
    const userDetails = req.body.userInfo
    userModel.loginWithQuery(userDetails)
        .then(succ => {
            res.send({ status: true, user: succ })
        })
        .catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.updateCard = (req, res) => {
    const userId = req.params.id;
    const update = {
        $push: {
            card: {
                productId: req.body.productId,
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productImage: req.body.productImage
            }

        }
    }
    userModel.updateSpecficUser(userId, update)
        .then(succ => {
            res.send({ status: true, succ: succ })
        }).catch(err => {
            res.send({ status: false, err: err })
        })

}
module.exports.updateWishList = (req, res) => {
    const userId = req.params.id;
    const update = {
        $push: {
            wishlist: {
                productId: req.body.productId,
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productImage: req.body.productImage
            }

        }
    }
    userModel.updateSpecficUser(userId, update)
        .then(succ => {
            res.send({ status: true, succ: succ })
        }).catch(err => {
            res.send({ status: false, err: err })
        })

}
module.exports.updatePostedAds = (req, res) => {
    const userId = req.params.id;
    const update = {
        $push: {
            postedAds: {
                productId: req.body.productId,
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productImage: req.body.productImage
            }

        }
    }
    userModel.updateSpecficUserAds(userId, update)
        .then(succ => {
            res.send({ status: true, updatedProfile: succ })
        }).catch(err => {
            res.send({ status: false, err: err })
        })

}

module.exports.updateUserInfo = (req, res) => {
    const userId = req.params.id
    const update = {
        name: req.body.name,
        email: req.body.email,
        whatsapp: req.body.whatsapp,
        homeAddress: req.body.homeAddress,
        userImageUrl: req.body.userImageUrl,
        password: req.body.password
    }
    userModel.updateUserInformation(userId, update)
        .then(student => {
            res.send({ status: true, updatedStudent: student })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.findSingleUser = (req, res) => {
    const userId = req.params.id
    userModel.findSingleWithQuery(userId)
        .then(succ => {
            res.send({ status: true, succ: succ })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.removeCardItem = (req, res) => {
    const userId = req.params.id
    const productId = req.body.productId
    userModel.updateSpecficUserCard(userId, productId)
        .then(succ => {
            res.send({ status: true, succ: succ })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.removeWishlistItem = (req, res) => {
    const userId = req.params.id
    const productId = req.body.productId
    userModel.updateSpecficUserWishlist(userId, productId)
        .then(succ => {
            res.send({ status: true, succ: succ })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.delSpecificUser = (req, res) => {
    const userId = req.params.id
    userModel.deleteSingleWithQuery(userId)
        .then(succ => {
            res.send({ status: true, deleted: "Ok" })
        })
        .catch(err => {
            res.send({ status: false, err: err })
        })
}