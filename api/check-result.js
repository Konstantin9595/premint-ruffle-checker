import PremintClient from '../src/server/PremintClient'

export default function handler(req, res) {
    const {wallet, ruffleUrl} = req.body

    if(!wallet || !ruffleUrl) {
        const responseData = JSON.stringify({
            responseStatus: 400,
            message: 'Invalid request. wallet or ruffleUrl not found'
        })

        res.status(400).json(responseData)

        return false
    }

    const client = new PremintClient()
    client.checkRuffleStatus(ruffleUrl, {wallet})
    .then((respData) => {
        const responseData = JSON.stringify(respData)

        res.status(respData.responseStatus).json(responseData)
    })
    .catch((err) => {
        const responseData = JSON.stringify({responseStatus: 404, message: err.message})

        res.status(404).json(responseData)

    })
    .finally(() => {
        client.tlsInstance.then((tls) => tls.exit().then(() => console.log('tls process closed.')))
    })

}