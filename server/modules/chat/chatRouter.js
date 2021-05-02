const chatModel = require('./chatModel')
const express = require("express")
const router = express.Router();


router.get("/getAllMessage/:id", ((req, res) => {
    const productId = req.params.id
    chatModel.getMessages(productId)
        .then(messages => {
            res.send({ status: true, messages: messages })
        }).catch(err => {
            res.send({ status: false, err: err })
        })
}))
module.exports = router;