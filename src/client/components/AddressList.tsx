import React, { useState, useEffect, SyntheticEvent } from 'react'
import styled from 'styled-components'
import ErrorComponent from './ErrorComponent'
import SwitchModeComponent from './SwitchModeComponent'
import PremintUrlForm from './PremintUrlForm'
import { Mode } from '../types'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CheckIcon from '@mui/icons-material/Check';


const SwitchModeButtons = styled.div`
`
const SwitchModeButton = styled.button`
    width: 200px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 1px 1px 5px 4px rgb(183 183 183 / 50%);
    border: 1px solid rgba(183,183,183,1);
    padding: 5px;
    margin: 10px;
`
const StyledEditIcon = styled(EditIcon)`
    font-size: 22px;
    vertical-align: bottom;
`
const StyledSaveIcon = styled(SaveIcon)`
    font-size: 22px;
    vertical-align: bottom;
`
const StyledCheckIcon = styled(CheckIcon)`
    font-size: 22px;
    vertical-align: bottom;
`

const ContentTopWrapper = styled.div``
const ContentBottomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


const AddressList = () => {
    const [isValidAddressList, setAddressList] = useState<boolean>(true)
    const [errors, setError] = useState<string[]>([])
    const [textareaValues, setTextareaValue] = useState<string[]>([])
    const [walletAddresses, setWallets] = useState(() => getStorage())
    const [mode, setMode] = useState<Mode>(Mode.VIEW)
    const [isValidUrlForm, setValidUrlForm] = useState<boolean>(false)

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


    const textareaTypingHandle = (e: SyntheticEvent) => {
        const values = (e.target as HTMLFormElement).value
        const splitedValues = values.split('\n').filter((el: string) => el !== '')
        setTextareaValue(splitedValues)
    }

    const save = () => {

        if(!isValidTextareaField(textareaValues)) {
            setAddressList(false)
            setError(['Each address must be on a new line and have 42 characters length.'])
            return
        }

        setAddressList(true)
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

    const checkValidUrlForm = (status: boolean): void => {
        status ? setValidUrlForm(true) : setValidUrlForm(false)
    }

    return (
        <>
            <ContentTopWrapper>
                <PremintUrlForm checkValidUrlForm={checkValidUrlForm}/>
                <SwitchModeComponent walletAddresses={walletAddresses} mode={mode} textareaTypingHandle={textareaTypingHandle}  />
            </ContentTopWrapper>
            <ContentBottomWrapper>
                <SwitchModeButtons>
                    { mode === Mode.VIEW ? 
                    <>
                        <SwitchModeButton 
                        disabled={mode === Mode.VIEW ? false : true } 
                        onClick={() => edit()}
                        >
                            <StyledEditIcon /> Edit
                        </SwitchModeButton>
                        <SwitchModeButton 
                        disabled={mode === Mode.VIEW && isValidAddressList && walletAddresses.length ? false : true } 
                        onClick={() => premintCheck()}
                        >
                            <StyledCheckIcon /> Premint Check
                        </SwitchModeButton>
                    </>
                    :
                    <SwitchModeButton 
                    disabled={mode === Mode.EDIT ? false : true } 
                    onClick={() => save()}
                    >
                    <StyledSaveIcon /> Save
                    </SwitchModeButton>
                    }
                </SwitchModeButtons>
                <ErrorComponent errors={errors}/>
            </ContentBottomWrapper>
        </>
    )
}



export default AddressList