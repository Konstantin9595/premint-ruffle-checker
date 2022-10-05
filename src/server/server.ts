const PremintClient = require('./PremintClient').default
const restana = require('restana')
const bodyParser = require('body-parser')
const cors = require('cors')
const service = restana()

service.use(cors())
service.use(bodyParser.json())

service.post('/check-url', (req: any, res: any) => {
    const {ruffleUrl} = req.body
    if(!ruffleUrl) {
        const responseData = JSON.stringify({
            responseStatus: 400,
            message: 'Invalid request. RuffleUrl not found'
        })
        res.send(responseData, 400, {
            'content-type': 'application/json'
        })

        return false
    }

    const client = new PremintClient()
    client.checkRuffleUrl(ruffleUrl)
    .then((respData: any) => {
        const responseStatus = respData.responseStatus !== 200 ? 400 : 200
        const responseData = JSON.stringify({responseStatus})
        console.log("respData: ", respData)

        res.send(responseData, responseStatus, {
            'content-type': 'application/json',
        })
    })
    .catch((err:any) => {
        const responseData = JSON.stringify({responseStatus: 404, message: err.message})
        console.log("errData: ", err)
        res.send(responseData, 404, {
            'content-type': 'application/json',
        })
    })
    .finally(() => {
        client.tlsInstance.then((tls: any) => tls.exit().then(() => console.log('tls process closed.')))
    })

    //client.tlsInstance.exit()
})

service.post('/check-result', (req: any, res: any) => {
    const {wallet, ruffleUrl} = req.body

    if(!wallet || !ruffleUrl) {
        const responseData = JSON.stringify({
            responseStatus: 400,
            message: 'Invalid request. wallet or ruffleUrl not found'
        })
        res.send(responseData, 400, {
            'content-type': 'application/json',
        })

        return false
    }

    const client = new PremintClient()
    client.checkRuffleStatus(ruffleUrl, {wallet})
    .then((respData: any) => {
        const responseData = JSON.stringify(respData)
        console.log("checkRuffleStatusRespData: ", respData)
        res.send(responseData, respData.responseStatus, {
            'content-type': 'application/json',
        })
    })
    .catch((err:any) => {
        const responseData = JSON.stringify({responseStatus: 404, message: err.message})
        console.log("checkRuffleStatusErrData: ", err)
        res.send(responseData, 404, {
            'content-type': 'application/json',
        })
    })
    .finally(() => {
        client.tlsInstance.then((tls: any) => tls.exit().then(() => console.log('tls process closed.')))
    })

    // client.tlsInstance
    // .then((resp: any) => resp.exit())
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