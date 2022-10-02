export interface WalletProps {
    walletAddresses: string[]
}

export interface Error {
    errors: string[]
}

export enum Mode {
    EDIT = 'edit',
    VIEW = 'view'
}

export interface SwitchModeProps {
    walletAddresses: string[]
    mode: Mode
    isValidInput: boolean
    save: Function
    edit: Function
    premintCheck: Function
    textTypingHandle: Function
}
export interface EditModeComponentProps {
    walletAddresses: string[]
    textTypingHandle: Function
}

export interface RuffleStatusByAddressProps {
    ruffleStatus: RuffleStatuses,
    message: string
}

export enum RuffleStatuses {
    ALLOWLIST_MINT = 'ALLOWLIST_MINT',
    PUBLIC_MINT = 'PUBLIC_MINT',
    UNREGISTRED = "UNREGISTRED",
    PENDING = 'PENDING',
    UNSELECTED = 'UNSELECTED',
}