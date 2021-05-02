const adContainer = require("./productContainer")
const express = require("express")
const router = express.Router();


router.post("/add-new", adContainer.addNewAd)
router.get("/", adContainer.getAllProducts)
router.get("/findSpecific/:id", adContainer.findSingleAd)
router.post("/updateAd/:id", adContainer.updateSpecficAd)
router.get("/specificUserAd/:id", adContainer.specificUserAds)
router.get("/deleteAd/:id", adContainer.delSpecificadd)
router.post("/findSpecficCetagoryAd", adContainer.findSpecficCetagoryProduct)
router.post("/findSortedProduct", adContainer.findSpecficCetagoryAndSubCetagoryProduct)

module.exports = router;
