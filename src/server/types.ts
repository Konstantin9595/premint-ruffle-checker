export type RequestData = {
    //session_id: string
    wallet: string,
    proxy?: string,
}

export enum RuffleStatuses {
    ALLOWLIST_MINT = 'ALLOWLIST_MINT',
    PUBLIC_MINT = 'PUBLIC_MINT',
    UNREGISTRED = "UNREGISTRED",
    PENDING = 'PENDING',
    UNSELECTED = 'UNSELECTED',
}

export type RuffleResultResponse = {
    responseStatus: number
    isRegister?: boolean
    ruffleStatus?: RuffleStatuses
    message?: string
    url?: string
    proxy?: string
    registerWallet?: string
}

export interface PremintInterface {
    //initTlsClient: Function
    checkRuffleStatus(url: string, requestData: RequestData): Promise<RuffleResultResponse>
}
