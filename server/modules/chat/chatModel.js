const mongoose = require('mongoose');
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
let currentHour = date.getHours();
let formatter = "AM"
if (date.getHours() > 12) {
    currentHour -= 12
    formatter = "PM"
}
let currentTimeIn12HrFormat = `${currentHour}:${date.getMinutes()}:${date.getSeconds()} ${formatter}`
const TodayDate = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear() + ": " + currentTimeIn12HrFormat;
const messageSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    text: String,
    rn_chat_gift_id: String,
    createdAt: String,
    user: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        avatar: String
    },
    sendAt: { type: String, default: TodayDate }

})
const messageModel = new mongoose.model('message', messageSchema)

module.exports.saveNewMessage = (msgDetails) => {
    return new Promise((resolve, reject) => {
        const newMsg = new messageModel(msgDetails)
        newMsg.save((err, msgValue) => {
            if (err) {
                console.log("Unable to create new Msg");
                console.log(err);
                reject(err);
            }
            resolve(msgValue);
        })
    })
}
module.exports.getMessages = (productId) => {
    return new Promise((resolve, reject) => {
        messageModel.find({ productId: productId })
            .then(messages => {
                resolve(messages)
            })
            .catch(err => {
                console.log("Unable to find messgae, query ", query);
                console.log(err);
                reject(err)
            })
    })
}

