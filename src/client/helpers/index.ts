export const checkValidUrl = (inputUrl: string) => {
    const response = fetch(`${process.env.REACT_APP_API_URL}/check-url`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ruffleUrl: inputUrl})
    })
    .then((resp: any) => resp.json())
    .then((jsonData: any) => jsonData)
    .catch(() => {
        return {responseStatus: 404, message: 'An error occurred while validating the url. Try a little later.'}
    })


    return response
}



export const checkResultByAddress = (ruffleUrl: string, wallet: string) => {
    const response = fetch(`${process.env.REACT_APP_API_URL}/check-result`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ruffleUrl, wallet })
    })
    .then((resp: any) => resp.json())
    .then((jsonData: any) => jsonData)
    .catch(() => {
        return {responseStatus: 404, message: 'Request error'}
    })


    return response
}


export function sleep(ms: number):Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}