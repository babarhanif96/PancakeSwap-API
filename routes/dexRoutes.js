const express = require('express');
const router  = express.Router();
const dexController = require('../controllers/dexController');

router.get("/getPrice/:coinAddress", dexController.getPrice);
router.get("/latestPriceOfToken", dexController.latestPriceOfToken);
router.get("/priceOfTokens",dexController.priceOfTokens);
router.get("/avaxUsdtPrice", dexController.avaxUsdtPrice);
router.get("/avaxFromPancake", dexController.avaxFromPancake);
router.get("/avaxFromApeSwap", dexController.avaxFromApeSwap);

module.exports = router;