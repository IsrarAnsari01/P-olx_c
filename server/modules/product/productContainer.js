const adModel = require("./productModel")
module.exports.addNewAd = (req, res) => {
    const adDetails = req.body.adDetails;
    adModel.createNewAd(adDetails)
        .then(succ => {
            res.send({ status: true, ad: succ })
        })
        .catch(err => {
            res.send({ status: false, err: err })
        })

}
module.exports.getAllProducts = (req, res) => {
    adModel.findMultipleWithQuery()
        .then(allProducts => {
            res.send({ status: true, products: allProducts })
        })
        .catch(err => {
            res.send({ status: true, err: err })
        })
}

module.exports.findSingleAd = (req, res) => {
    const adId = req.params.id
    adModel.findSingleWithQuery(adId)
        .then(ad => {
            res.send({ status: true, ad: ad })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.updateSpecficAd = (req, res) => {
    const adId = req.params.id
    const update = {
        productName: req.body.productName,
        price: req.body.price,
        number: req.body.number,
        homeAddress: req.body.homeAddress,
        cetagory: req.body.cetagory,
        subcetagory: req.body.subcetagory,
        details: req.body.details,
        coverImageUrl: req.body.coverImageUrl,
    }
    adModel.updateSpecficAd(adId, update)
        .then(updatedAd => {
            res.send({ status: true, updatedAd: updatedAd })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.delSpecificadd = (req, res) => {
    const adId = req.params.id
    adModel.deleteSingleWithQuery(adId)
        .then(succ => {
            res.send({ status: true, deleted: "Ok" })
        })
        .catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.findSpecficCetagoryProduct = (req, res) => {
    const cetagory = req.body.cetagory
    adModel.findSpecificCetagoryAd(cetagory)
        .then(succ => {
            res.send({ status: true, Ads: succ })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.findSpecficCetagoryAndSubCetagoryProduct = (req, res) => {
    const query = req.body.details 
    adModel.findSpecificCetagoryAndSubCetagoryAd(query)
        .then(succ => {
            res.send({ status: true, sortedArray: succ })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}
module.exports.specificUserAds = (req, res) => {
    const userId = req.params.id
    adModel.fintSpecificUserAds(userId)
        .then(succ => {
            res.send({ status: true, specficUserAd: succ })
        }).catch(err => {
            res.send({ status: false, err: err })

        })
}
// module.exports.updateCard = (req, res) => {
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
