import PremintClient from "./PremintClient"
import restana from 'restana'
import bodyParser from 'body-parser'

(async() => {
    
    const service = restana()
    service.use(bodyParser.json())

    service.post('/check', (req, res) => {
        const body = req.body
        const headers = req.headers
        
        res.send('ok')
    })
    
    service.start(80)

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
    
})()

