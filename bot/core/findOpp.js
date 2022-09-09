const dexControllerCore = require('../../controllers/dexControllerCore');
var request = require("request");

async function fetchDexPrices() {
//    let data_pancake = await dexControllerCore.avaxFromPancake();
   let data_apeswap = await dexControllerCore.avaxFromApeSwap();
//    console.log("data_pancake: " , data_pancake);
   // console.log("data_apeswap: " , data_apeswap);


}

fetchDexPrices()



