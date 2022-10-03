const PremintClient = require('./PremintClient').default
const restana = require('restana')
const bodyParser = require('body-parser')
const service = restana()
service.use(bodyParser.json())

service.post('/check-url', (req: any, res: any) => {
    const {wallet, ruffleUrl} = req.body
    if(!wallet || !ruffleUrl) {
        const responseData = JSON.stringify({
            responseStatus: 400,
            message: 'Invalid request. wallet or ruffleUrl not found'
        })
        res.send(responseData, 400, {
            'content-type': 'application/json'
        })

        return false
    }

    const client = new PremintClient()
    client.checkRuffleUrl(ruffleUrl)
    .then((respData: any) => {
        const responseData = JSON.stringify({responseStatus: respData.responseStatus})
        console.log("respData: ", respData)

        res.send(responseData, respData.responseStatus, {
            'content-type': 'application/json'
        })
    })
    .catch((err:any) => {
        const responseData = JSON.stringify({responseStatus: 404, message: err.message})
        console.log("errData: ", err)
        res.send(responseData, 404, {
            'content-type': 'application/json'
        })
    })
})

service.post('/check-result', (req: any, res: any) => {
    const {wallet, ruffleUrl} = req.body

    if(!wallet || !ruffleUrl) {
        const responseData = JSON.stringify({
            responseStatus: 400,
            message: 'Invalid request. wallet or ruffleUrl not found'
        })
        res.send(responseData, 400, {
            'content-type': 'application/json'
        })

        return false
    }

    const client = new PremintClient()
    client.checkRuffleStatus(ruffleUrl, {wallet})
    .then((respData: any) => {
        const responseData = JSON.stringify(respData)
        console.log("checkRuffleStatusRespData: ", respData)
        res.send(responseData, respData.responseStatus, {
            'content-type': 'application/json'
        })
    })
    .catch((err:any) => {
        const responseData = JSON.stringify({responseStatus: 404, message: err.message})
        console.log("checkRuffleStatusErrData: ", err)
        res.send(responseData, 404, {
            'content-type': 'application/json'
        })
    })
})
    
service.start(80)


export {}
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