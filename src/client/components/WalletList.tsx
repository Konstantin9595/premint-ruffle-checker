import React, { useState, useEffect, SyntheticEvent } from 'react'
import styled from 'styled-components'
import ErrorComponent from './ErrorComponent'
import SwitchModeComponent from './SwitchModeComponent'
import { Mode } from '../types'


const WalletList = () => {
    const [isValid, setValid] = useState<boolean>(true)
    const [errors, setError] = useState<string[]>([])
    const [textareaValues, setTextareaValue] = useState<string[]>([])
    const [walletAddresses, setWallets] = useState(() => getStorage())
    const [mode, setMode] = useState<Mode>(Mode.VIEW)

    function getStorage () {
        const walletAddresses = localStorage.getItem('walletAddresses')
        const isWallets = walletAddresses ? true : false
        return isWallets ? JSON.parse(walletAddresses as string) : []
    }
    
    useEffect(() => {
        console.log("Добавили новые адреса: ", walletAddresses)
        localStorage.setItem('walletAddresses', JSON.stringify(walletAddresses))
    }, [walletAddresses])


    const isValidTextareaField = (addresses: string[]): boolean => {
        const unvalidAddresses = addresses.filter(el => el.length !== 42)
        return unvalidAddresses.length > 0 ? false : true
    }


    const textTypingHandle = (e: SyntheticEvent) => {
        const values = (e.target as HTMLFormElement).value
        const splitedValues = values.split('\n').filter((el: string) => el !== '')
        setTextareaValue(splitedValues)
    }

    const save = () => {

        if(!isValidTextareaField(textareaValues)) {
            setValid(false)
            setError(['Every address must be on a new line and have 42 characters'])
            return
        }

        setValid(true)
        setError([])
        setWallets(textareaValues)
        setMode(Mode.VIEW)
    }

    const edit = () => {
        setMode(Mode.EDIT)
    }

    const premintCheck = () => {
        console.log('Premint check')
    }

    return (
        <>
            <SwitchModeComponent walletAddresses={walletAddresses} mode={mode} isValid={isValid} save={save} edit={edit} premintCheck={premintCheck} textTypingHandle={textTypingHandle}  />
            <ErrorComponent errors={errors}/>
        </>
    )
}



export default WalletList