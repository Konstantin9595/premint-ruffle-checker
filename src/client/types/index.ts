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
    isValid: boolean
    save: Function
    edit: Function
    premintCheck: Function
    textTypingHandle: Function
}
export interface EditModeComponentProps {
    walletAddresses: string[]
    textTypingHandle: Function
}