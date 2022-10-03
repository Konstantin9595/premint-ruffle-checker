import {PremintInterface, RequestData, RuffleResultResponse, RuffleStatuses } from './types'
import { parse } from 'node-html-parser'
const initCycleTLS = require('cycletls')

export default class PremintClient implements PremintInterface {

    tlsInstance

    constructor() {
        this.tlsInstance = initCycleTLS()
    }

    async checkRuffleStatus(url: string, requestData: RequestData): Promise<RuffleResultResponse> {
        const resp = await this.checkRegister(url, requestData)

        return resp
    }

    async checkRuffleUrl(url: string): Promise<RuffleResultResponse> {
        const {status} = await (await this.tlsInstance).get(`${url}`, {
            ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.5',
                'accept-encoding': 'gzip, deflate, br',
                'referer': url,
                'origin': 'https://www.premint.xyz',
                'dnt': '1',
                'content-type': 'application/x-www-form-urlencoded',
                'upgrade-insecure-requests': '1',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'te': 'trailers'
            },
            cookies: {
                'csrftoken': "ECKYBHr2BExekhepOlB1mQInocyipOCGzvcXZhn8kLpxBB3bMhE7Wyj85plPz3ar",
                //'session_id': session_id
            },
            //disableRedirect: true
        })

        if(status !== 200) {
            return {responseStatus: status, url}
        }

        return {responseStatus: status, url}

    }

    private async checkRegister(url: string, requestData: RequestData): Promise<RuffleResultResponse> {
        const { wallet, proxy } = requestData

        const {status, body} = await (await this.tlsInstance).get(`${url}verify/?wallet=${wallet}`, {
            ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'accept-language': 'en-US,en;q=0.5',
                'accept-encoding': 'gzip, deflate, br',
                'referer': url,
                'origin': 'https://www.premint.xyz',
                'dnt': '1',
                'content-type': 'application/x-www-form-urlencoded',
                'upgrade-insecure-requests': '1',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'te': 'trailers'
            },
            cookies: {
                'csrftoken': "ECKYBHr2BExekhepOlB1mQInocyipOCGzvcXZhn8kLpxBB3bMhE7Wyj85plPz3ar",
                //'session_id': session_id
            },
            proxy
            //disableRedirect: true
        })

        if(status !== 200) {
            return {responseStatus: status, isRegister: false, message: '', url, proxy, registerWallet: requestData.wallet}
        }

        const dom = parse(body)
        const headingList = dom.querySelectorAll("section .card-body .heading")
        const headingLength = headingList.length
        const heading = headingList[headingLength - 1].innerText
        const registerStatusData =  this.extractStatusFromBody(heading)
        return { responseStatus: status, isRegister: registerStatusData.isRegister, message: registerStatusData.message, url, proxy, registerWallet: requestData.wallet }
        
    }

    private extractStatusFromBody(message?: string): never | { message: string, isRegister: boolean, ruffleStatus: RuffleStatuses} {
        if(!message) {
            throw new Error('Empty string passed')
        }

        const msg = message.toLowerCase()

        const messageList = [
            { message: "Allowlist", isRegister: true, ruffleStatus: RuffleStatuses.ALLOWLIST_MINT }, 
            { message: "Waitlist", isRegister: true, ruffleStatus: RuffleStatuses.PUBLIC_MINT },
            { message: "You aren't registered", isRegister: false, ruffleStatus: RuffleStatuses.UNREGISTRED },
            { message: "You are registered", isRegister: true, ruffleStatus: RuffleStatuses.PENDING },
            { message: "You were not selected", isRegister: true, ruffleStatus: RuffleStatuses.UNSELECTED },
            { message: "You were selected", isRegister: true, ruffleStatus: RuffleStatuses.ALLOWLIST_MINT }
        ]

        const matches = messageList.filter(el => msg.match(el.message.toLowerCase()) !== null)
        
        if(matches.length <= 0) {
            throw new Error('No match found in response text')
        }

        return matches[0]

    }

    private sleep(ms: number):Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

}