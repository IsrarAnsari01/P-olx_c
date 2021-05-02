const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String },
    whatsapp: String,
    homeAddress: String,
    password: String,
    userImageUrl: String,
    addedOn: { type: String, default: TodayDate },
    card: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            productName: String,
            productPrice: String,
            productImage: String
        }
    ],
    wishlist: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            productName: String,
            productPrice: String,
            productImage: String
        }
    ],
})
const userModel = new mongoose.model('user', userSchema)

module.exports.createNewUser = (userDetails) => {

    return new Promise((resolve, reject) => {
        const newUser = new userModel(userDetails)
        newUser.save((err, student) => {
            if (err) {
                console.log("Unable to create new Student");
                console.log(err);
                reject(err);
            }
            resolve(student);
        })
    })
}
module.exports.findMultipleWithQuery = (query = {}) => {
    return new Promise((resolve, reject) => {
        userModel.find(query)
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

module.exports.loginWithQuery = (userDetails) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: userDetails.email })
            .then(user => {
                return bcrypt.compare(userDetails.password, user.password, (err, isMatch) => {
                    if (!isMatch) {
                        console.log("Password does not match")
                        return
                    }
                    resolve(user)
                })

            })
            .catch(err => {
                console.log("Unable to find User, query ", err);
                console.log(err);
                reject(err)
            })
    })
}

module.exports.findSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ _id: query })
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                console.log("Unable to find User, query ", query);
                console.log(err);
                reject(err)
            })
    })
}
module.exports.updateSpecficUser = (query, data) => {
    return new Promise((rej, res) => {
        userModel.updateOne({ _id: query }, data)
            .then(updatedUser => {
                res(updatedUser)
            }).catch(err => {
                console.log("Something went Wrong Error in Updating data", err)
                rej(err)
            })
    })
}
module.exports.updateSpecficUserAds = (query, data) => {
    return new Promise((resolve, reject) => {
        userModel.updateOne({ _id: query }, data)
            .then(updatedUser => {
                resolve(updatedUser)
            }).catch(err => {
                console.log("Something went Wrong Error in Updating data", err)
                reject(err)
            })
    })
}
module.exports.updateSpecficUserCard = (query, productId) => {
    return new Promise((resolve, reject) => {
        userModel.update(
            { _id: query },
            { $pull: { card: { productId: productId } } },
            { multi: true },
        )
            .then(updatedUser => {
                resolve(updatedUser)
            }).catch(err => {
                console.log("Something went Wrong Error in Updating data", err)
                reject(err)
            })
    })
}
module.exports.updateSpecficUserWishlist = (query, productId) => {
    return new Promise((resolve, reject) => {
        userModel.update(
            { _id: query },
            { $pull: { wishlist: { productId: productId } } },
            { multi: true },
        )
            .then(updatedUser => {
                resolve(updatedUser)
            }).catch(err => {
                console.log("Something went Wrong Error in Updating data", err)
                reject(err)
            })
    })
}
module.exports.updateUserInformation = (query, dataToBeUpdate) => {
    return new Promise((resolve, reject) => {
        userModel.updateOne({ _id: query }, dataToBeUpdate)
            .then(succ => {
                resolve(succ)
            }).catch(err => {
                console.log("Error in updating data ", err)
                reject(err)
            })

    })
}
module.exports.deleteSingleWithQuery = (query) => {
    return new Promise((resolve, reject) => {
        userModel.deleteOne({ _id: query })
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                console.log("Unable to Delete Student, query ", query);
                console.log(err);
                reject(err)
            })
    })
}

