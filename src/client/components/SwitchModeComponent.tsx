import React, { useState, useEffect, SyntheticEvent, useRef } from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CheckIcon from '@mui/icons-material/Check';
import { SwitchModeProps, WalletProps, Mode, EditModeComponentProps } from '../types'

const List = styled.ul`
    box-shadow: 1px 1px 5px 4px rgb(183 183 183 / 50%);
    border: 1px solid rgba(183, 183, 183, 1);
    padding: 10px;
    width: 400px;
    margin: 0 auto;
    text-align: center;
    height: 500px;
    overflow: auto;
    display: flex;
    flex-direction: column;
`
const ListItem = styled.li`
    list-style: none;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    padding: 2px;
    width: fit-content;
    margin: 0 auto;
`
const EmptyListItem = styled.li`
    list-style: none;
    color: #ccc;
    margin: auto;
`
const Textarea = styled.textarea`
    box-shadow: 1px 1px 5px 4px rgb(183 183 183 / 50%);
    border: 1px solid rgba(183, 183, 183, 1);
    padding: 10px;
    width: 400px;
    margin: 0 auto;
    text-align: center;
    height: 500px;
    overflow: auto;
    resize: none;
`
const SwitchModeButtons = styled.div`
    align-self: center;
    margin: 20px 0;
    justify-content: space-between;
    display: flex;
    width: 420px;
`
const SwitchModeButton = styled.button`
    width: 200px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 1px 1px 5px 4px rgb(183 183 183 / 50%);
    border: 1px solid rgba(183,183,183,1);
    padding: 5px;
    margin: 0 auto;
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


const ViewModeComponent = ({walletAddresses}: {walletAddresses: string[]}) => {
    return (
        <List>
            { walletAddresses.length ? walletAddresses.map((address: string, ndx: number) => {
                return (
                    <ListItem key={ndx}>{address}</ListItem>
                )
            }) : <EmptyListItem key={1}>Press the edit button and paste a list of metamask addresses (Each address on a new line)</EmptyListItem>}
        </List>
    )
}

const EditModeComponent = ({walletAddresses, textTypingHandle}: EditModeComponentProps) => {
    const addressString = walletAddresses.join('\n')

    return (
        <>
            <Textarea onChange={(e) => textTypingHandle(e)} defaultValue={addressString}/>
        </>
    )
}

const SwitchModeComponent = ({walletAddresses, mode, isValid, save, edit, premintCheck, textTypingHandle}: SwitchModeProps) => {

    return (
        <>
            {mode === Mode.VIEW ? <>{<ViewModeComponent walletAddresses={walletAddresses}/>}</> : <>{<EditModeComponent walletAddresses={walletAddresses} textTypingHandle={textTypingHandle} />}</>}
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
                    disabled={mode === Mode.VIEW && isValid && walletAddresses.length ? false : true } 
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
        </>
    )
}

export default SwitchModeComponent