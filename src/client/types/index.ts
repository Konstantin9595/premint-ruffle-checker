
import {RuffleStatuses} from '../../server/types'

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
    statusListResults: string[]
    walletAddresses: string[]
    mode: Mode
    // save: Function
    // edit: Function
    // premintCheck: Function
    textareaTypingHandle: Function
}

export interface ViewModeProps {
    statusListResults: string[]
    walletAddresses: string[]
}

export interface EditModeProps {
    walletAddresses: string[]
    textareaTypingHandle: Function
}

export interface RuffleStatusByAddressProps {
    ruffleStatus: RuffleStatuses,
    message: string
}


export interface PremintUrlFormProps {
    validateFormField: Function,
    isValid: boolean
}