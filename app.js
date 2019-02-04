const request = require('request-promise');

(async () => {

    const usdPrice = await getUSDPrice();
    const ltcPrice = await getLTCPrice();
    console.log('LTC Price per TRTL is ' + ltcPrice + ' LTC.');
    console.log(`USD Price per LTC is $${usdPrice}.`);
    var pricePerMillion = ltcPrice * 1000000 * usdPrice;
    console.log(`USD price per MTRTL is $${pricePerMillion.toFixed(2)}`);

})().catch(err => {
    console.log('Async function failed:', err);
});

async function getUSDPrice() {
    const requestOptions = {
        method: 'GET',
        uri: 'https://api.coinbase.com/v2/prices/LTC-USD/sell',
        headers: {},
        json: true,
        gzip: true
    };

    try {
        const result = await request(requestOptions);
        return result.data.amount;
    } catch (err) {
        console.log('Request failed, TradeOgre API call error:', err);
        return undefined;
    }
}

async function getLTCPrice() {
    const requestOptions = {
        method: 'GET',
        uri: 'https://tradeogre.com/api/v1/ticker/LTC-TRTL',
        headers: {},
        json: true,
        gzip: true
    };

    try {
        const result = await request(requestOptions);
        return result.price;
    } catch (err) {
        console.log('Request failed, TradeOgre API call error:', err);
        return undefined;
    }
}

/*   FIX
var http = require('http');
http.createServer(function (req, res) {
   // Set CORS headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
   res.write(JSON.stringify(usdPrice));
   res.end();
}).listen(8080);
*/


