const mongoose = require('mongoose');
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const productSchema = new mongoose.Schema({
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
    addedOn: { type: String, default: TodayDate },
})
const productModel = new mongoose.model('products', productSchema)

module.exports.createNewAd = (productDetails) => {
    return new Promise((resolve, reject) => {
        const newAd = new productModel(productDetails)
        newAd.save((err, ad) => {
            if (err) {
                console.log("Unable to create new Ad");
                console.log(err);
                reject(err);
            }
            resolve(ad);
        })
    })
}
module.exports.findMultipleWithQuery = (query = {}) => {
    return new Promise((resolve, reject) => {
        productModel.find(query)
            .then(users => {
                resolve(users)
            })
            .catch(err => {
                console.log("Unable to find reader, query ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.findSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        productModel.findOne({ _id: query })
            .populate("userInfo")
            .then(ad => {
                resolve(ad)
            })
            .catch(err => {
                console.log("Unable to find Ad, query ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.updateSpecficAd = (query, data) => {
    return new Promise((resolve, reject) => {
        productModel.updateOne({ _id: query }, data)
            .then(updateAd => {
                resolve(updateAd)
            }).catch(err => {
                console.log("Something went Wrong Error in Updating data", err)
                reject(err)
            })
    })
}
module.exports.fintSpecificUserAds = (userInfo) => {
    return new Promise((resolve, reject) => {
        productModel.find({ userInfo: userInfo })
            .populate("userInfo")
            .then(specificUserJob => {
                resolve(specificUserJob)
            }).catch(err => {
                console.log("Something went Wrong Error in finding data", err)
                reject(err)
            })
    })
}
module.exports.findSpecificCetagoryAd = (cetagory) => {
    return new Promise((resolve, reject) => {
        productModel.find({ cetagory: cetagory })
            .then(sortedAds => {
                resolve(sortedAds)
            }).catch(err => {
                console.log("Something went Wrong Error in finding data", err)
                reject(err)
            })
    })
}
module.exports.findSpecificCetagoryAndSubCetagoryAd = (query) => {
    return new Promise((resolve, reject) => {
        productModel.find({ cetagory: query.cetagory, subcetagory: query.subCetagory })
            .then(sortedAds => {
                resolve(sortedAds)
            }).catch(err => {
                console.log("Something went Wrong Error in finding data", err)
                reject(err)
            })
    })
}
module.exports.deleteSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        productModel.deleteOne({ _id: query })
            .then(ad => {
                resolve(ad)
            })
            .catch(err => {
                console.log("Unable to Delete Ad, query ", query);
                console.log(err);
                reject(err)
            })
    })
}

