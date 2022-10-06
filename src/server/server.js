"use strict";
exports.__esModule = true;
var PremintClient = require('./PremintClient')["default"];
var restana = require('restana');
var bodyParser = require('body-parser');
var cors = require('cors');
var service = restana();
service.use(cors());
service.use(bodyParser.json());
service.post('/check-url', function (req, res) {
    var ruffleUrl = req.body.ruffleUrl;
    if (!ruffleUrl) {
        var responseData = JSON.stringify({
            responseStatus: 400,
            message: 'Invalid request. RuffleUrl not found'
        });
        res.send(responseData, 400, {
            'content-type': 'application/json'
        });
        return false;
    }
    var client = new PremintClient();
    client.checkRuffleUrl(ruffleUrl)
        .then(function (respData) {
        var responseStatus = respData.responseStatus !== 200 ? 400 : 200;
        var responseData = JSON.stringify({ responseStatus: responseStatus });
        console.log("respData: ", respData);
        res.send(responseData, responseStatus, {
            'content-type': 'application/json'
        });
    })["catch"](function (err) {
        var responseData = JSON.stringify({ responseStatus: 404, message: err.message });
        console.log("errData: ", err);
        res.send(responseData, 404, {
            'content-type': 'application/json'
        });
    })["finally"](function () {
        client.tlsInstance.then(function (tls) { return tls.exit().then(function () { return console.log('tls process closed.'); }); });
    });
    //client.tlsInstance.exit()
});
service.post('/check-result', function (req, res) {
    var _a = req.body, wallet = _a.wallet, ruffleUrl = _a.ruffleUrl;
    if (!wallet || !ruffleUrl) {
        var responseData = JSON.stringify({
            responseStatus: 400,
            message: 'Invalid request. wallet or ruffleUrl not found'
        });
        res.send(responseData, 400, {
            'content-type': 'application/json'
        });
        return false;
    }
    var client = new PremintClient();
    client.checkRuffleStatus(ruffleUrl, { wallet: wallet })
        .then(function (respData) {
        var responseData = JSON.stringify(respData);
        console.log("checkRuffleStatusRespData: ", respData);
        res.send(responseData, respData.responseStatus, {
            'content-type': 'application/json'
        });
    })["catch"](function (err) {
        var responseData = JSON.stringify({ responseStatus: 404, message: err.message });
        console.log("checkRuffleStatusErrData: ", err);
        res.send(responseData, 404, {
            'content-type': 'application/json'
        });
    })["finally"](function () {
        client.tlsInstance.then(function (tls) { return tls.exit().then(function () { return console.log('tls process closed.'); }); });
    });
    // client.tlsInstance
    // .then((resp: any) => resp.exit())
});
service.start(80);
// const client = new PremintClient()
// const ruffleUrl = 'https://www.premint.xyz/piratesnft/'
// // correct proxy format: http://login:password@ip:port
// const wallets = [
//     {wallet: '0xA9D3525E05AE534120a33881F6aa2fD01fCA2F4E', proxy: ''},
//     {wallet: '0xecC0e35c616A3a53e3Dc95472D4D2914B74e8E3d', proxy: ''},
// ]
// for(let account of wallets) {
//     const {registerWallet, message} = await client.checkRuffleStatus(ruffleUrl, account)
//     console.log("registerWallet: ", registerWallet, "message: ", message)
// }
// // close tls instance
// await (await client.tlsInstance).exit()
