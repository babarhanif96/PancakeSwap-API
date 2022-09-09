var express = require("express");
var router = express.Router();
var https = require("https");
var request = require("request");

router.get("/getPrice/:coinAddress", function (req, res) {
    try {
        if (req.params) {
            if (!req.params.coinAddress) {
                ResponseMessage = "Token address is missing \n";
                ResponseCode = 206;
            } else {
                let coinAddress = req.params.coinAddress;
                https
                    .get(
                        "https://api.pancakeswap.info/api/v2/tokens/" + coinAddress,
                        function (apiRes) {
                            apiRes.pipe(res);
                        }
                    )
                    .on("error", (e) => {
                        console.error(e);
                        res.status(500).send("Something went wrong");
                    });
            }
        } else {
            res.status(501).send("Something went wrong with parameter");
        }
    } catch (error) {
        res.status(501).send("Something went wrong");
    }
});

// BitQuery - not given required price in current date
router.get("/lastestPriceOfToken", function (req, res) {
    var options = {
        'method': 'POST',
        'url': 'https://graphql.bitquery.io',
        'headers': {
            'Content-Type': 'application/json',
            'X-API-KEY': 'BQYzH5N9OWLlTdgFH6nk0gvMsKteDbhJ'
        },
        body: JSON.stringify({
            "query": "{\n  ethereum(network: bsc) {\n    dexTrades(\n      options: {desc: [\"block.height\", \"tradeIndex\"], limit: 1}\n      exchangeName: {in: [\"Pancake\", \"Pancake v2\"]}\n      baseCurrency: {is: \"0x1CE0c2827e2eF14D5C4f29a091d735A204794041\"}\n      quoteCurrency: {is: \"0x55d398326f99059ff775485246999027b3197955\"}\n      date: {after: \"2021-04-28\"}\n    ) {\n      transaction {\n        hash\n      }\n      tradeIndex\n      smartContract {\n        address {\n          address\n        }\n        contractType\n        currency {\n          name\n        }\n      }\n      tradeIndex\n      date {\n        date\n      }\n      block {\n        height\n      }\n      buyAmount\n      buyAmountInUsd: buyAmount(in: USD)\n      buyCurrency {\n        symbol\n        address\n      }\n      sellAmount\n      sellAmountInUsd: sellAmount(in: USD)\n      sellCurrency {\n        symbol\n        address\n      }\n      sellAmountInUsd: sellAmount(in: USD)\n      tradeAmount(in: USD)\n      transaction {\n        gasValue\n        gasPrice\n        gas\n      }\n    }\n  }\n}\n",
            "variables": "{}"
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.json({ result: JSON.parse(response.body) });
    });

})

// BitQuery
router.get("/priceOfTokens", function (req, res) {
    var options = {
        'method': 'POST',
        'url': 'https://graphql.bitquery.io',
        'headers': {
            'Content-Type': 'application/json',
            'X-API-KEY': 'BQYzH5N9OWLlTdgFH6nk0gvMsKteDbhJ'
        },
        body: JSON.stringify({
            "query": "{\n  ethereum(network: bsc) {\n    list1: dexTrades(\n      options: {limitBy: {each: \"baseCurrency.address\", limit: 1}, desc: [\"block.timestamp.time\"]}\n      exchangeName: {in: [\"Pancake\", \"Pancake v2\"]}\n      quoteCurrency: {in: [\"0x55d398326f99059ff775485246999027b3197955\"]}\n      time: {since: \"2022-08-22T00:00:00\"}\n      tradeAmountUsd: {gt: 10}\n      priceAsymmetry: {lt: 0.5}\n    ) {\n      baseCurrency {\n        address\n      }\n      open: minimum(of: block, get: quote_price)\n      close: maximum(of: block, get: quote_price)\n      quoteCurrency {\n        address\n      }\n      block {\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n      }\n    }\n  }\n}\n",
            "variables": "{}"
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.json({ result: JSON.parse(response.body) });
    });
})

// BitQuery
router.get("/avax-usdt-Price", function (req, res) {
    var options = {
        'method': 'POST',
        'url': 'https://graphql.bitquery.io',
        'headers': {
            'Content-Type': 'application/json',
            'X-API-KEY': 'BQYzH5N9OWLlTdgFH6nk0gvMsKteDbhJ'
        },
        body: JSON.stringify({
            "query": "{\n  ethereum(network: bsc) {\n    dexTrades(\n      baseCurrency: {is: \"0x1CE0c2827e2eF14D5C4f29a091d735A204794041\"}\n      quoteCurrency: {is: \"0x55d398326f99059ff775485246999027b3197955\"}\n      options: {desc: [\"block.height\", \"transaction.index\"], limit: 1}\n    ) {\n      block {\n        height\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n      }\n      transaction {\n        index\n      }\n      baseCurrency {\n        symbol\n      }\n      quoteCurrency {\n        symbol\n      }\n      quotePrice\n    }\n  }\n}\n",
            "variables": "{}"
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.json({ result: JSON.parse(response.body) });
    });
})

router.get("/avaxFromPancake", function (req, res) {
    var options = {
        'method': 'POST',
        'url': 'https://graphql.bitquery.io',
        'headers': {
            'Content-Type': 'application/json',
            'X-API-KEY': 'BQYzH5N9OWLlTdgFH6nk0gvMsKteDbhJ'
        },
        body: JSON.stringify({
            "query": "{\n  ethereum(network: bsc) {\n    dexTrades(\n      baseCurrency: {is: \"0x1ce0c2827e2ef14d5c4f29a091d735a204794041\"}\n      quoteCurrency: {is: \"0x55d398326f99059ff775485246999027b3197955\"}\n      options: {desc: [\"block.height\", \"transaction.index\"], limit: 1}\n      exchangeName: {is: \"Pancake v2\"}\n    ) {\n      block {\n        height\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n      }\n      transaction {\n        index\n      }\n      baseCurrency {\n        symbol\n      }\n      quoteCurrency {\n        symbol\n      }\n      quotePrice\n    }\n  }\n}\n",
            "variables": "{}"
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.json({ result: JSON.parse(response.body) });
    });
})

router.get("/avaxFromApeSwap", function (req, res) {
    var options = {
        'method': 'POST',
        'url': 'https://graphql.bitquery.io',
        'headers': {
            'Content-Type': 'application/json',
            'X-API-KEY': 'BQYzH5N9OWLlTdgFH6nk0gvMsKteDbhJ'
        },
        body: JSON.stringify({
            "query": "{\n  ethereum(network: bsc) {\n    dexTrades(\n      baseCurrency: {is: \"0x1ce0c2827e2ef14d5c4f29a091d735a204794041\"}\n      quoteCurrency: {is: \"0x55d398326f99059ff775485246999027b3197955\"}\n      options: {desc: [\"block.height\", \"transaction.index\"], limit: 1}\n      exchangeName: {is: \"ApeSwap\"}\n    ) {\n      block {\n        height\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n      }\n      transaction {\n        index\n      }\n      baseCurrency {\n        symbol\n      }\n      quoteCurrency {\n        symbol\n      }\n      quotePrice\n    }\n  }\n}\n",
            "variables": "{}"
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.json({ result: JSON.parse(response.body) });
    });
})




module.exports = router;